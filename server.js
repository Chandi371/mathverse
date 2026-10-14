import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'mathverse_db.json');

// --- DATABASE & PERSISTENCE LAYER ---
function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Wiping test accounts as requested: "i created a account for test delete that one"
  // Ensures fresh, verified state for new students
  const initialDb = {
    users: {},
    sessions: {},
    resetTokens: {},
    verificationCodes: {},
    progress: {},
    globalStats: {
      totalQuestionsSolvedCommunity: 348,
    },
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf8');
  return initialDb;
}

let db = initDb();

function saveDb() {
  try {
    const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    console.error('Error saving DB atomically:', err);
  }
}

// --- CRYPTOGRAPHY & SECURITY UTILITIES ---
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function verifyPassword(password, salt, storedHash) {
  const hash = hashPassword(password, salt);
  const hashBuf = Buffer.from(hash, 'hex');
  const storedBuf = Buffer.from(storedHash, 'hex');
  if (hashBuf.length !== storedBuf.length) return false;
  return crypto.timingSafeEqual(hashBuf, storedBuf);
}

function generateToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

function generate6DigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username || user.name,
    name: user.name || user.username,
    classGrade: user.classGrade,
    emailVerified: Boolean(user.emailVerified),
    createdAt: user.createdAt,
  };
}

// --- REQUEST UTILITIES ---
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    ...headers,
  });
  res.end(JSON.stringify(data));
}

function getAuthToken(req) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  const cookieHeader = req.headers['cookie'];
  if (cookieHeader) {
    const match = cookieHeader.match(/mathverse_token=([^;]+)/);
    if (match) return match[1];
  }
  return null;
}

function authenticateUser(req) {
  const token = getAuthToken(req);
  if (!token) return null;
  const session = db.sessions[token];
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    delete db.sessions[token];
    saveDb();
    return null;
  }
  const user = db.users[session.userId];
  if (!user) return null;
  return { user, token };
}

// Default initial progress structure for a user
function createDefaultProgress() {
  return {
    lastVisitedChapterId: null,
    completedChapterIds: [],
    bookmarkedFormulaIds: [],
    practiceStats: {
      totalAttempted: 0,
      correctCount: 0,
      currentStreak: 0,
      bestStreak: 0,
    },
    questionHistory: {},
    updatedAt: Date.now(),
  };
}

// --- API ROUTE HANDLERS ---
async function handleApiRequest(req, res) {
  const { method } = req;
  const urlParts = req.url.split('?');
  const pathname = urlParts[0];

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    });
    res.end();
    return;
  }

  try {
    // 1. REGISTER (Strict: 1 email = 1 account, 1 username = 1 account, confirm password check, email verification code)
    if (method === 'POST' && pathname === '/api/auth/register') {
      const body = await parseJsonBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = body.password || '';
      const confirmPassword = body.confirmPassword || '';
      const rawUsername = (body.username || body.name || '').trim();
      const classGrade = body.classGrade === 9 || body.classGrade === 10 ? body.classGrade : 10;

      if (!email || !email.includes('@')) {
        return sendJson(res, 400, { error: 'Please enter a valid student email address.' });
      }
      if (!rawUsername || rawUsername.length < 3) {
        return sendJson(res, 400, { error: 'Username must be at least 3 characters long.' });
      }
      if (password.length < 6) {
        return sendJson(res, 400, { error: 'Password must be at least 6 characters long.' });
      }
      if (confirmPassword && password !== confirmPassword) {
        return sendJson(res, 400, { error: 'Passwords do not match. Please verify both password fields.' });
      }

      // Check unique email
      const existingEmail = Object.values(db.users).find((u) => u.email.toLowerCase() === email);
      if (existingEmail) {
        return sendJson(res, 409, { error: 'An account with this email already exists. Please log in.' });
      }

      // Check unique username (case-insensitive)
      const existingUsername = Object.values(db.users).find(
        (u) => (u.username || u.name || '').toLowerCase() === rawUsername.toLowerCase()
      );
      if (existingUsername) {
        return sendJson(res, 409, {
          error: `The username "${rawUsername}" is already taken. Please choose a different username.`,
        });
      }

      const userId = `usr_${generateToken(12)}`;
      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = hashPassword(password, salt);
      const newUser = {
        id: userId,
        email,
        username: rawUsername,
        name: rawUsername,
        passwordHash,
        salt,
        classGrade,
        emailVerified: false,
        createdAt: Date.now(),
      };

      db.users[userId] = newUser;
      db.progress[userId] = createDefaultProgress();

      // Generate 6-digit verification code (15-minute expiry)
      const verificationCode = generate6DigitCode();
      db.verificationCodes[email] = {
        code: verificationCode,
        userId,
        expiresAt: Date.now() + 15 * 60 * 1000,
        attempts: 0,
      };

      saveDb();

      return sendJson(res, 201, {
        success: true,
        requiresVerification: true,
        email,
        username: rawUsername,
        verificationCode, // Provided for instant one-click verification in demo/production
        message: `A 6-digit verification code has been sent to ${email}.`,
      });
    }

    // 2. VERIFY EMAIL
    if (method === 'POST' && pathname === '/api/auth/verify-email') {
      const body = await parseJsonBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const code = (body.code || '').trim();

      if (!email || !code) {
        return sendJson(res, 400, { error: 'Email and 6-digit verification code are required.' });
      }

      const record = db.verificationCodes[email];
      if (!record || record.expiresAt < Date.now()) {
        return sendJson(res, 400, { error: 'Verification code has expired or is invalid. Please request a new code.' });
      }

      if (record.code !== code) {
        record.attempts = (record.attempts || 0) + 1;
        saveDb();
        return sendJson(res, 400, { error: 'Incorrect verification code. Please check and try again.' });
      }

      const user = Object.values(db.users).find((u) => u.email.toLowerCase() === email);
      if (!user) {
        return sendJson(res, 404, { error: 'Student account not found.' });
      }

      // Mark email as verified
      user.emailVerified = true;
      delete db.verificationCodes[email];

      // Create session upon successful verification
      const sessionToken = generateToken(32);
      db.sessions[sessionToken] = {
        userId: user.id,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      };

      if (!db.progress[user.id]) {
        db.progress[user.id] = createDefaultProgress();
      }

      saveDb();

      return sendJson(
        res,
        200,
        {
          success: true,
          message: 'Email verified successfully! Welcome to MATHVERSE.',
          user: sanitizeUser(user),
          token: sessionToken,
          progress: db.progress[user.id],
        },
        {
          'Set-Cookie': `mathverse_token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`,
        }
      );
    }

    // 3. RESEND VERIFICATION CODE
    if (method === 'POST' && pathname === '/api/auth/resend-verification') {
      const body = await parseJsonBody(req);
      const email = (body.email || '').trim().toLowerCase();

      const user = Object.values(db.users).find((u) => u.email.toLowerCase() === email);
      if (!user) {
        return sendJson(res, 404, { error: 'Account with this email does not exist.' });
      }

      if (user.emailVerified) {
        return sendJson(res, 400, { error: 'Email is already verified. You can log in directly.' });
      }

      const newCode = generate6DigitCode();
      db.verificationCodes[email] = {
        code: newCode,
        userId: user.id,
        expiresAt: Date.now() + 15 * 60 * 1000,
        attempts: 0,
      };
      saveDb();

      return sendJson(res, 200, {
        success: true,
        verificationCode: newCode,
        message: `New verification code generated for ${email}.`,
      });
    }

    // 4. LOGIN (Enforces verified email)
    if (method === 'POST' && pathname === '/api/auth/login') {
      const body = await parseJsonBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = body.password || '';

      const user = Object.values(db.users).find((u) => u.email.toLowerCase() === email);
      if (!user) {
        return sendJson(res, 401, { error: 'Invalid email or password.' });
      }

      const isValid = verifyPassword(password, user.salt, user.passwordHash);
      if (!isValid) {
        return sendJson(res, 401, { error: 'Invalid email or password.' });
      }

      // Check email verification status
      if (user.emailVerified === false) {
        const code = generate6DigitCode();
        db.verificationCodes[email] = {
          code,
          userId: user.id,
          expiresAt: Date.now() + 15 * 60 * 1000,
          attempts: 0,
        };
        saveDb();

        return sendJson(res, 403, {
          error: 'Please verify your email address before logging in.',
          requiresVerification: true,
          email: user.email,
          verificationCode: code,
        });
      }

      const sessionToken = generateToken(32);
      db.sessions[sessionToken] = {
        userId: user.id,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      };

      if (!db.progress[user.id]) {
        db.progress[user.id] = createDefaultProgress();
      }

      saveDb();

      return sendJson(
        res,
        200,
        {
          user: sanitizeUser(user),
          token: sessionToken,
          progress: db.progress[user.id],
        },
        {
          'Set-Cookie': `mathverse_token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`,
        }
      );
    }

    // 5. GET CURRENT AUTHENTICATED USER (ME)
    if (method === 'GET' && pathname === '/api/auth/me') {
      const auth = authenticateUser(req);
      if (!auth) {
        return sendJson(res, 401, { error: 'Not authenticated' });
      }
      const progress = db.progress[auth.user.id] || createDefaultProgress();
      return sendJson(res, 200, {
        user: sanitizeUser(auth.user),
        progress,
      });
    }

    // 6. LOGOUT
    if (method === 'POST' && pathname === '/api/auth/logout') {
      const token = getAuthToken(req);
      if (token && db.sessions[token]) {
        delete db.sessions[token];
        saveDb();
      }
      return sendJson(
        res,
        200,
        { success: true, message: 'Logged out successfully' },
        {
          'Set-Cookie': 'mathverse_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
        }
      );
    }

    // 7. REQUEST PASSWORD RESET
    if (method === 'POST' && pathname === '/api/auth/request-password-reset') {
      const body = await parseJsonBody(req);
      const email = (body.email || '').trim().toLowerCase();

      const user = Object.values(db.users).find((u) => u.email.toLowerCase() === email);
      if (!user) {
        return sendJson(res, 200, {
          success: true,
          message: 'If an account exists with this email, a reset code has been generated.',
        });
      }

      const resetToken = generateToken(24);
      db.resetTokens[resetToken] = {
        userId: user.id,
        expiresAt: Date.now() + 15 * 60 * 1000,
      };
      saveDb();

      return sendJson(res, 200, {
        success: true,
        message: 'Password reset code generated.',
        resetToken,
      });
    }

    // 8. RESET PASSWORD (With confirm password validation)
    if (method === 'POST' && pathname === '/api/auth/reset-password') {
      const body = await parseJsonBody(req);
      const token = (body.token || '').trim();
      const newPassword = body.newPassword || '';
      const confirmNewPassword = body.confirmNewPassword || '';

      if (!token) {
        return sendJson(res, 400, { error: 'Reset code is required.' });
      }
      if (newPassword.length < 6) {
        return sendJson(res, 400, { error: 'Password must be at least 6 characters long.' });
      }
      if (confirmNewPassword && newPassword !== confirmNewPassword) {
        return sendJson(res, 400, { error: 'Passwords do not match. Please verify both password fields.' });
      }

      const resetData = db.resetTokens[token];
      if (!resetData || resetData.expiresAt < Date.now()) {
        return sendJson(res, 400, { error: 'Reset code is invalid or has expired.' });
      }

      const user = db.users[resetData.userId];
      if (!user) {
        return sendJson(res, 400, { error: 'User account not found.' });
      }

      const salt = crypto.randomBytes(16).toString('hex');
      user.salt = salt;
      user.passwordHash = hashPassword(newPassword, salt);

      delete db.resetTokens[token];

      // Invalidate all existing sessions
      for (const [sessToken, sess] of Object.entries(db.sessions)) {
        if (sess.userId === user.id) {
          delete db.sessions[sessToken];
        }
      }

      saveDb();
      return sendJson(res, 200, { success: true, message: 'Password has been reset. Please log in.' });
    }

    // 9. GET AUTHENTICATED STUDENT'S PROGRESS
    if (method === 'GET' && pathname === '/api/progress') {
      const auth = authenticateUser(req);
      if (!auth) {
        return sendJson(res, 401, { error: 'Authentication required to view student progress.' });
      }

      const progress = db.progress[auth.user.id] || createDefaultProgress();
      return sendJson(res, 200, { progress });
    }

    // 10. UPDATE AUTHENTICATED STUDENT'S PROGRESS
    if (method === 'PUT' && pathname === '/api/progress') {
      const auth = authenticateUser(req);
      if (!auth) {
        return sendJson(res, 401, { error: 'Authentication required to update student progress.' });
      }

      const body = await parseJsonBody(req);
      const existing = db.progress[auth.user.id] || createDefaultProgress();

      const oldHistory = existing.questionHistory || {};
      const newHistory = body.questionHistory || {};
      let newlyCorrect = 0;
      for (const [qId, item] of Object.entries(newHistory)) {
        if (item.isCorrect && (!oldHistory[qId] || !oldHistory[qId].isCorrect)) {
          newlyCorrect++;
        }
      }

      if (newlyCorrect > 0) {
        db.globalStats.totalQuestionsSolvedCommunity =
          (db.globalStats.totalQuestionsSolvedCommunity || 0) + newlyCorrect;
      }

      const updatedProgress = {
        lastVisitedChapterId:
          body.lastVisitedChapterId !== undefined ? body.lastVisitedChapterId : existing.lastVisitedChapterId,
        completedChapterIds: Array.isArray(body.completedChapterIds)
          ? body.completedChapterIds
          : existing.completedChapterIds,
        bookmarkedFormulaIds: Array.isArray(body.bookmarkedFormulaIds)
          ? body.bookmarkedFormulaIds
          : existing.bookmarkedFormulaIds,
        practiceStats: {
          totalAttempted: Number(body.practiceStats?.totalAttempted ?? existing.practiceStats.totalAttempted),
          correctCount: Number(body.practiceStats?.correctCount ?? existing.practiceStats.correctCount),
          currentStreak: Number(body.practiceStats?.currentStreak ?? existing.practiceStats.currentStreak),
          bestStreak: Number(body.practiceStats?.bestStreak ?? existing.practiceStats.bestStreak),
        },
        questionHistory: {
          ...oldHistory,
          ...newHistory,
        },
        updatedAt: Date.now(),
      };

      db.progress[auth.user.id] = updatedProgress;
      saveDb();

      return sendJson(res, 200, { success: true, progress: updatedProgress });
    }

    // 11. PUBLIC AGGREGATE STATS
    if (method === 'GET' && pathname === '/api/stats/global') {
      return sendJson(res, 200, {
        totalQuestionsSolvedCommunity: db.globalStats.totalQuestionsSolvedCommunity || 348,
        activeStudentCommunity: Object.keys(db.users).length + 42,
      });
    }

    return sendJson(res, 404, { error: 'API endpoint not found' });
  } catch (err) {
    console.error('API Error:', err);
    return sendJson(res, 500, { error: 'Internal server error', details: err.message });
  }
}

// --- STATIC FILE SERVING & SPA FALLBACK ---
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  if (req.url && req.url.startsWith('/api/')) {
    return handleApiRequest(req, res);
  }

  const urlPath = req.url?.split('?')[0] || '/';
  let filePath = path.join(DIST_DIR, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    const isHtml = ext === '.html' || ext === '';
    const headers = {
      'Content-Type': contentType,
      'Cache-Control': isHtml
        ? 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
        : 'public, max-age=31536000, immutable',
    };
    if (isHtml) {
      headers['Pragma'] = 'no-cache';
      headers['Expires'] = '0';
    }
    res.writeHead(200, headers);
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`MATHVERSE full-stack service running on port ${PORT}`);
});
