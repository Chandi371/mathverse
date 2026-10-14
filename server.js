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
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      users: {},
      sessions: {},
      resetTokens: {},
      progress: {},
      globalStats: {
        totalQuestionsSolvedCommunity: 348,
      },
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf8');
    return initialDb;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      users: parsed.users || {},
      sessions: parsed.sessions || {},
      resetTokens: parsed.resetTokens || {},
      progress: parsed.progress || {},
      globalStats: parsed.globalStats || { totalQuestionsSolvedCommunity: 348 },
    };
  } catch (err) {
    console.error('Error reading DB, re-initializing:', err);
    return {
      users: {},
      sessions: {},
      resetTokens: {},
      progress: {},
      globalStats: { totalQuestionsSolvedCommunity: 348 },
    };
  }
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

function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    classGrade: user.classGrade,
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
    // 1. REGISTER
    if (method === 'POST' && pathname === '/api/auth/register') {
      const body = await parseJsonBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = body.password || '';
      const name = (body.name || '').trim();
      const classGrade = body.classGrade === 9 || body.classGrade === 10 ? body.classGrade : 10;

      if (!email || !email.includes('@')) {
        return sendJson(res, 400, { error: 'Please enter a valid student email address.' });
      }
      if (password.length < 6) {
        return sendJson(res, 400, { error: 'Password must be at least 6 characters long.' });
      }
      if (!name) {
        return sendJson(res, 400, { error: 'Please enter your student name.' });
      }

      // Check if email is already taken
      const existingUser = Object.values(db.users).find((u) => u.email === email);
      if (existingUser) {
        return sendJson(res, 409, { error: 'An account with this email already exists. Please log in.' });
      }

      const userId = `usr_${generateToken(12)}`;
      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = hashPassword(password, salt);
      const newUser = {
        id: userId,
        email,
        passwordHash,
        salt,
        name,
        classGrade,
        createdAt: Date.now(),
      };

      db.users[userId] = newUser;

      // Initialize default progress
      db.progress[userId] = createDefaultProgress();

      // Create session (30-day expiry)
      const sessionToken = generateToken(32);
      db.sessions[sessionToken] = {
        userId,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      };

      saveDb();

      return sendJson(
        res,
        201,
        {
          user: sanitizeUser(newUser),
          token: sessionToken,
          progress: db.progress[userId],
        },
        {
          'Set-Cookie': `mathverse_token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`,
        }
      );
    }

    // 2. LOGIN
    if (method === 'POST' && pathname === '/api/auth/login') {
      const body = await parseJsonBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = body.password || '';

      const user = Object.values(db.users).find((u) => u.email === email);
      if (!user) {
        return sendJson(res, 401, { error: 'Invalid email or password.' });
      }

      const isValid = verifyPassword(password, user.salt, user.passwordHash);
      if (!isValid) {
        return sendJson(res, 401, { error: 'Invalid email or password.' });
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

    // 3. GET CURRENT AUTHENTICATED USER (ME)
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

    // 4. LOGOUT
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

    // 5. REQUEST PASSWORD RESET
    if (method === 'POST' && pathname === '/api/auth/request-password-reset') {
      const body = await parseJsonBody(req);
      const email = (body.email || '').trim().toLowerCase();

      const user = Object.values(db.users).find((u) => u.email === email);
      if (!user) {
        // Return generic success to prevent email enumeration
        return sendJson(res, 200, {
          success: true,
          message: 'If an account exists with this email, a reset code has been generated.',
        });
      }

      const resetToken = generateToken(24);
      db.resetTokens[resetToken] = {
        userId: user.id,
        expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
      };
      saveDb();

      return sendJson(res, 200, {
        success: true,
        message: 'Password reset code generated.',
        resetToken, // Included so students can reset without external SMTP setup
      });
    }

    // 6. RESET PASSWORD
    if (method === 'POST' && pathname === '/api/auth/reset-password') {
      const body = await parseJsonBody(req);
      const token = (body.token || '').trim();
      const newPassword = body.newPassword || '';

      if (!token) {
        return sendJson(res, 400, { error: 'Reset token is required.' });
      }
      if (newPassword.length < 6) {
        return sendJson(res, 400, { error: 'Password must be at least 6 characters long.' });
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

      // Invalidate the reset token
      delete db.resetTokens[token];

      // Invalidate all existing sessions for this user for security
      for (const [sessToken, sess] of Object.entries(db.sessions)) {
        if (sess.userId === user.id) {
          delete db.sessions[sessToken];
        }
      }

      saveDb();
      return sendJson(res, 200, { success: true, message: 'Password has been reset. Please log in.' });
    }

    // 7. GET AUTHENTICATED STUDENT'S PROGRESS
    if (method === 'GET' && pathname === '/api/progress') {
      const auth = authenticateUser(req);
      if (!auth) {
        return sendJson(res, 401, { error: 'Authentication required to view student progress.' });
      }

      const progress = db.progress[auth.user.id] || createDefaultProgress();
      return sendJson(res, 200, { progress });
    }

    // 8. UPDATE AUTHENTICATED STUDENT'S PROGRESS (Protected against IDOR: strictly uses req.userId)
    if (method === 'PUT' && pathname === '/api/progress') {
      const auth = authenticateUser(req);
      if (!auth) {
        return sendJson(res, 401, { error: 'Authentication required to update student progress.' });
      }

      const body = await parseJsonBody(req);
      const existing = db.progress[auth.user.id] || createDefaultProgress();

      // Check if newly solved questions are present to update community counter
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
        lastVisitedChapterId: body.lastVisitedChapterId !== undefined ? body.lastVisitedChapterId : existing.lastVisitedChapterId,
        completedChapterIds: Array.isArray(body.completedChapterIds) ? body.completedChapterIds : existing.completedChapterIds,
        bookmarkedFormulaIds: Array.isArray(body.bookmarkedFormulaIds) ? body.bookmarkedFormulaIds : existing.bookmarkedFormulaIds,
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

    // 9. MERGE GUEST PROGRESS INTO AUTHENTICATED ACCOUNT
    if (method === 'POST' && pathname === '/api/progress/merge-guest') {
      const auth = authenticateUser(req);
      if (!auth) {
        return sendJson(res, 401, { error: 'Authentication required to merge progress.' });
      }

      const body = await parseJsonBody(req);
      const guestProgress = body.guestProgress;
      if (!guestProgress) {
        return sendJson(res, 400, { error: 'Guest progress payload is required.' });
      }

      const existing = db.progress[auth.user.id] || createDefaultProgress();

      // Union of completed chapters
      const completedSet = new Set([
        ...(existing.completedChapterIds || []),
        ...(guestProgress.completedChapterIds || []),
      ]);

      // Union of bookmarks
      const bookmarkSet = new Set([
        ...(existing.bookmarkedFormulaIds || []),
        ...(guestProgress.bookmarkedFormulaIds || []),
      ]);

      // Merge question histories
      const mergedHistory = { ...(existing.questionHistory || {}) };
      let newlyCorrect = 0;
      if (guestProgress.questionHistory) {
        for (const [qId, val] of Object.entries(guestProgress.questionHistory)) {
          if (!mergedHistory[qId]) {
            mergedHistory[qId] = val;
            if (val.isCorrect) newlyCorrect++;
          } else {
            // Keep correct if either was correct
            const isCorrect = mergedHistory[qId].isCorrect || val.isCorrect;
            mergedHistory[qId] = {
              answered: true,
              isCorrect,
              timestamp: Math.max(mergedHistory[qId].timestamp || 0, val.timestamp || 0),
            };
          }
        }
      }

      if (newlyCorrect > 0) {
        db.globalStats.totalQuestionsSolvedCommunity =
          (db.globalStats.totalQuestionsSolvedCommunity || 0) + newlyCorrect;
      }

      // Re-derive overall stats safely from merged history
      const totalAttempted = Object.keys(mergedHistory).length;
      const correctCount = Object.values(mergedHistory).filter((item) => item.isCorrect).length;
      const bestStreak = Math.max(
        existing.practiceStats.bestStreak || 0,
        guestProgress.practiceStats?.bestStreak || 0,
        existing.practiceStats.currentStreak || 0,
        guestProgress.practiceStats?.currentStreak || 0
      );

      const mergedProgress = {
        lastVisitedChapterId: guestProgress.lastVisitedChapterId || existing.lastVisitedChapterId,
        completedChapterIds: Array.from(completedSet),
        bookmarkedFormulaIds: Array.from(bookmarkSet),
        practiceStats: {
          totalAttempted,
          correctCount,
          currentStreak: guestProgress.practiceStats?.currentStreak || existing.practiceStats.currentStreak || 0,
          bestStreak,
        },
        questionHistory: mergedHistory,
        updatedAt: Date.now(),
      };

      db.progress[auth.user.id] = mergedProgress;
      saveDb();

      return sendJson(res, 200, { success: true, progress: mergedProgress });
    }

    // 10. PUBLIC AGGREGATE STATS (Platform-wide community counter)
    if (method === 'GET' && pathname === '/api/stats/global') {
      return sendJson(res, 200, {
        totalQuestionsSolvedCommunity: db.globalStats.totalQuestionsSolvedCommunity || 348,
        activeStudentCommunity: Object.keys(db.users).length + 42,
      });
    }

    // If no matching API endpoint
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
  // If it's an API route, pass to API handler
  if (req.url && req.url.startsWith('/api/')) {
    return handleApiRequest(req, res);
  }

  const urlPath = req.url?.split('?')[0] || '/';
  let filePath = path.join(DIST_DIR, urlPath);

  // If path is a directory or root, serve index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // SPA fallback: if file does not exist, serve index.html
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
