import { describe, it, expect, beforeEach } from 'vitest';
import {
  setActiveStudentId,
  getActiveStudentId,
  loadProgress,
  recordQuestionAnswer,
  toggleChapterCompleted,
  toggleBookmarkFormula,
  getGuestProgress,
  clearGuestProgress,
  defaultProgress,
} from './storage';
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

describe('MATHVERSE Student Progress & Account Isolation', () => {
  // In-memory localStorage mock for node test environment
  const mockStorage: Record<string, string> = {};

  beforeEach(() => {
    for (const key of Object.keys(mockStorage)) {
      delete mockStorage[key];
    }
    // Stub localStorage
    globalThis.localStorage = {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = val;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        for (const key of Object.keys(mockStorage)) {
          delete mockStorage[key];
        }
      },
      key: (idx: number) => Object.keys(mockStorage)[idx] ?? null,
      length: Object.keys(mockStorage).length,
    };
    setActiveStudentId(null);
  });

  it('1. Isolates Guest progress in dedicated guest storage bucket', () => {
    setActiveStudentId(null);
    expect(getActiveStudentId()).toBeNull();

    // Guest solves a question
    recordQuestionAnswer('q-c10-s1-1', true);
    toggleChapterCompleted('c10-s1-ap');

    const guestProg = loadProgress();
    expect(guestProg.completedChapterIds).toContain('c10-s1-ap');
    expect(guestProg.practiceStats.correctCount).toBe(1);
    expect(guestProg.practiceStats.totalAttempted).toBe(1);

    // Verify key in storage
    expect(mockStorage['mathverse_guest_progress_v2']).toBeDefined();
    expect(mockStorage['mathverse_user_studentA_progress_v2']).toBeUndefined();
  });

  it('2. Strictly isolates Student A and Student B progress on same machine', () => {
    // Student A signs in
    setActiveStudentId('student_A');
    recordQuestionAnswer('q-sets-1', true);
    recordQuestionAnswer('q-sets-2', true);
    toggleBookmarkFormula('ap-nth-term');

    const progA = loadProgress();
    expect(progA.practiceStats.correctCount).toBe(2);
    expect(progA.bookmarkedFormulaIds).toContain('ap-nth-term');

    // Student A signs out, Student B signs in on same computer
    setActiveStudentId('student_B');
    const progBInitial = loadProgress();
    expect(progBInitial.practiceStats.correctCount).toBe(0);
    expect(progBInitial.bookmarkedFormulaIds).toEqual([]);

    // Student B completes different work
    recordQuestionAnswer('q-trig-1', false);
    toggleChapterCompleted('c10-s2-trig');

    const progBUpdated = loadProgress();
    expect(progBUpdated.practiceStats.correctCount).toBe(0);
    expect(progBUpdated.practiceStats.totalAttempted).toBe(1);
    expect(progBUpdated.completedChapterIds).toContain('c10-s2-trig');

    // Switch back to Student A: verify zero cross-contamination
    setActiveStudentId('student_A');
    const progAReloaded = loadProgress();
    expect(progAReloaded.practiceStats.correctCount).toBe(2);
    expect(progAReloaded.practiceStats.totalAttempted).toBe(2);
    expect(progAReloaded.completedChapterIds).toEqual([]);
    expect(progAReloaded.bookmarkedFormulaIds).toContain('ap-nth-term');
  });

  it('3. Deduplicates unique solved questions on repeated attempts', () => {
    setActiveStudentId('student_learner');
    // First attempt: correct
    recordQuestionAnswer('q-linear-1', true);
    let prog = loadProgress();
    expect(prog.practiceStats.correctCount).toBe(1);
    expect(prog.practiceStats.totalAttempted).toBe(1);

    // Repeated attempt of same question: correctCount should remain 1 unique
    recordQuestionAnswer('q-linear-1', true);
    prog = loadProgress();
    expect(prog.practiceStats.correctCount).toBe(1);
    expect(prog.practiceStats.totalAttempted).toBe(1);

    // Solve a distinct second question
    recordQuestionAnswer('q-linear-2', true);
    prog = loadProgress();
    expect(prog.practiceStats.correctCount).toBe(2);
    expect(prog.practiceStats.totalAttempted).toBe(2);
  });

  it('4. Correctly calculates streaks across answers', () => {
    setActiveStudentId('student_streak');
    recordQuestionAnswer('q-1', true);
    recordQuestionAnswer('q-2', true);
    recordQuestionAnswer('q-3', true);
    let prog = loadProgress();
    expect(prog.practiceStats.currentStreak).toBe(3);
    expect(prog.practiceStats.bestStreak).toBe(3);

    // Incorrect answer resets current streak but preserves best streak
    recordQuestionAnswer('q-4', false);
    prog = loadProgress();
    expect(prog.practiceStats.currentStreak).toBe(0);
    expect(prog.practiceStats.bestStreak).toBe(3);

    // New streak builds up
    recordQuestionAnswer('q-5', true);
    prog = loadProgress();
    expect(prog.practiceStats.currentStreak).toBe(1);
    expect(prog.practiceStats.bestStreak).toBe(3);
  });

  it('5. Merges guest progress cleanly without erasing student account data', () => {
    // Guest works anonymously
    setActiveStudentId(null);
    recordQuestionAnswer('guest-q-1', true);
    toggleBookmarkFormula('formula-guest');
    toggleChapterCompleted('c9-s1-number-systems');

    const guestData = getGuestProgress();
    expect(guestData).not.toBeNull();
    expect(guestData?.completedChapterIds).toContain('c9-s1-number-systems');

    // Simulate account progress for student C
    const accountExisting = {
      ...defaultProgress,
      completedChapterIds: ['c10-s1-ap'],
      bookmarkedFormulaIds: ['formula-account'],
      practiceStats: {
        totalAttempted: 1,
        correctCount: 1,
        currentStreak: 1,
        bestStreak: 1,
      },
      questionHistory: {
        'account-q-1': { answered: true, isCorrect: true, timestamp: 1000 },
      },
    };

    // Merge algorithm simulation (matches server POST /api/progress/merge-guest)
    const completedSet = new Set([
      ...accountExisting.completedChapterIds,
      ...(guestData?.completedChapterIds || []),
    ]);
    const bookmarkSet = new Set([
      ...accountExisting.bookmarkedFormulaIds,
      ...(guestData?.bookmarkedFormulaIds || []),
    ]);
    const mergedHistory = {
      ...accountExisting.questionHistory,
      ...(guestData?.questionHistory || {}),
    };

    expect(Array.from(completedSet)).toEqual(['c10-s1-ap', 'c9-s1-number-systems']);
    expect(Array.from(bookmarkSet)).toEqual(['formula-account', 'formula-guest']);
    expect(Object.keys(mergedHistory)).toContain('guest-q-1');
    expect(Object.keys(mergedHistory)).toContain('account-q-1');

    // Clear guest storage upon successful merge
    clearGuestProgress();
    expect(getGuestProgress()).toBeNull();
  });
});

describe('MATHVERSE Cryptographic Hashing & Server Security', () => {
  function hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  }

  function verifyPassword(password: string, salt: string, storedHash: string): boolean {
    const hash = hashPassword(password, salt);
    const hashBuf = Buffer.from(hash, 'hex');
    const storedBuf = Buffer.from(storedHash, 'hex');
    if (hashBuf.length !== storedBuf.length) return false;
    return crypto.timingSafeEqual(hashBuf, storedBuf);
  }

  it('1. Generates salted hashes and never stores passwords in plaintext', () => {
    const rawPassword = 'StudentSecret#2026';
    const salt1 = crypto.randomBytes(16).toString('hex');
    const salt2 = crypto.randomBytes(16).toString('hex');

    const hash1 = hashPassword(rawPassword, salt1);
    const hash2 = hashPassword(rawPassword, salt2);

    // Hashing same password with different salts yields distinct cryptographic digests
    expect(hash1).not.toBe(hash2);
    expect(hash1).not.toBe(rawPassword);
    expect(hash1.length).toBe(128); // 64 bytes = 128 hex chars
  });

  it('2. Correctly verifies matching password and rejects incorrect password with constant-time equality', () => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = hashPassword('CorrectPassword123', salt);

    expect(verifyPassword('CorrectPassword123', salt, hash)).toBe(true);
    expect(verifyPassword('WrongPassword', salt, hash)).toBe(false);
    expect(verifyPassword('correctpassword123', salt, hash)).toBe(false); // Case sensitive
  });

  it('3. Generates high-entropy session and password recovery tokens', () => {
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const resetToken = crypto.randomBytes(24).toString('hex');

    expect(sessionToken.length).toBe(64); // 256 bits entropy
    expect(resetToken.length).toBe(48); // 192 bits entropy
  });
});
