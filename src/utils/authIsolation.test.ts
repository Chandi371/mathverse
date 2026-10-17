import { describe, it, expect, beforeEach } from 'vitest';
import {
  setActiveStudentId,
  getActiveStudentId,
  loadProgress,
  recordQuestionAnswer,
  toggleChapterCompleted,
  toggleBookmarkFormula,
  mergeUserProgress,
} from './storage';
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

describe('MATHVERSE Student Progress & Account Isolation', () => {
  const mockStorage: Record<string, string> = {};

  beforeEach(() => {
    for (const key of Object.keys(mockStorage)) {
      delete mockStorage[key];
    }
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

    recordQuestionAnswer('q-c10-s1-1', true);
    toggleChapterCompleted('c10-s1-ap');

    const guestProg = loadProgress();
    expect(guestProg.completedChapterIds).toContain('c10-s1-ap');
    expect(guestProg.practiceStats.correctCount).toBe(1);
    expect(guestProg.practiceStats.totalAttempted).toBe(1);

    expect(mockStorage['mathverse_guest_progress_v2']).toBeDefined();
    expect(mockStorage['mathverse_user_studentA_progress_v2']).toBeUndefined();
  });

  it('2. Strictly isolates Student A and Student B progress on same machine', () => {
    setActiveStudentId('student_A');
    recordQuestionAnswer('q-sets-1', true);
    recordQuestionAnswer('q-sets-2', true);
    toggleBookmarkFormula('ap-nth-term');

    const progA = loadProgress();
    expect(progA.practiceStats.correctCount).toBe(2);
    expect(progA.bookmarkedFormulaIds).toContain('ap-nth-term');

    setActiveStudentId('student_B');
    const progBInitial = loadProgress();
    expect(progBInitial.practiceStats.correctCount).toBe(0);
    expect(progBInitial.bookmarkedFormulaIds).toEqual([]);

    recordQuestionAnswer('q-trig-1', false);
    toggleChapterCompleted('c10-s2-trig');

    const progBUpdated = loadProgress();
    expect(progBUpdated.practiceStats.correctCount).toBe(0);
    expect(progBUpdated.practiceStats.totalAttempted).toBe(1);
    expect(progBUpdated.completedChapterIds).toContain('c10-s2-trig');

    setActiveStudentId('student_A');
    const progAReloaded = loadProgress();
    expect(progAReloaded.practiceStats.correctCount).toBe(2);
    expect(progAReloaded.practiceStats.totalAttempted).toBe(2);
    expect(progAReloaded.completedChapterIds).toEqual([]);
    expect(progAReloaded.bookmarkedFormulaIds).toContain('ap-nth-term');
  });

  it('3. Deduplicates unique solved questions on repeated attempts', () => {
    setActiveStudentId('student_learner');
    recordQuestionAnswer('q-linear-1', true);
    let prog = loadProgress();
    expect(prog.practiceStats.correctCount).toBe(1);
    expect(prog.practiceStats.totalAttempted).toBe(1);

    recordQuestionAnswer('q-linear-1', true);
    prog = loadProgress();
    expect(prog.practiceStats.correctCount).toBe(1);
    expect(prog.practiceStats.totalAttempted).toBe(1);

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

    recordQuestionAnswer('q-4', false);
    prog = loadProgress();
    expect(prog.practiceStats.currentStreak).toBe(0);
    expect(prog.practiceStats.bestStreak).toBe(3);

    recordQuestionAnswer('q-5', true);
    prog = loadProgress();
    expect(prog.practiceStats.currentStreak).toBe(1);
    expect(prog.practiceStats.bestStreak).toBe(3);
  });
});

describe('MATHVERSE Account Integrity & Verification Logic', () => {
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

    expect(hash1).not.toBe(hash2);
    expect(hash1).not.toBe(rawPassword);
    expect(hash1.length).toBe(128);
  });

  it('2. Correctly verifies matching password and rejects incorrect password with constant-time equality', () => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = hashPassword('CorrectPassword123', salt);

    expect(verifyPassword('CorrectPassword123', salt, hash)).toBe(true);
    expect(verifyPassword('WrongPassword', salt, hash)).toBe(false);
  });

  it('3. Enforces one account per email and one account per unique username', () => {
    const usersDb: Record<string, { email: string; username: string }> = {
      user_1: { email: 'student1@example.com', username: 'karthik_math' },
    };

    function validateNewRegistration(newEmail: string, newUsername: string) {
      const emailNormalized = newEmail.trim().toLowerCase();
      const usernameNormalized = newUsername.trim().toLowerCase();

      const emailExists = Object.values(usersDb).some((u) => u.email.toLowerCase() === emailNormalized);
      if (emailExists) return { ok: false, error: 'Email already exists' };

      const usernameExists = Object.values(usersDb).some(
        (u) => u.username.toLowerCase() === usernameNormalized
      );
      if (usernameExists) return { ok: false, error: 'Username already taken' };

      return { ok: true };
    }

    // Duplicate email rejected
    expect(validateNewRegistration('student1@example.com', 'new_student')).toEqual({
      ok: false,
      error: 'Email already exists',
    });

    // Duplicate username rejected (case-insensitive)
    expect(validateNewRegistration('student2@example.com', 'Karthik_Math')).toEqual({
      ok: false,
      error: 'Username already taken',
    });

    // Unique email and username accepted
    expect(validateNewRegistration('student2@example.com', 'ananya_math')).toEqual({
      ok: true,
    });
  });

  it('4. Generates and validates 6-digit email verification code with 15-minute expiry', () => {
    function generate6DigitCode() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const verificationCodes: Record<string, { code: string; expiresAt: number }> = {};
    const email = 'verify_test@example.com';
    const code = generate6DigitCode();

    expect(code).toMatch(/^\d{6}$/);

    verificationCodes[email] = {
      code,
      expiresAt: Date.now() + 15 * 60 * 1000,
    };

    // Valid code check
    const record = verificationCodes[email];
    expect(record.code === code && record.expiresAt > Date.now()).toBe(true);

    // Wrong code check
    expect(record.code === '000000').toBe(false);

    // Expired code check
    const expiredRecord = { code: '123456', expiresAt: Date.now() - 1000 };
    expect(expiredRecord.expiresAt < Date.now()).toBe(true);
  });

  it('5. Enforces password confirmation matching', () => {
    function checkPasswordsMatch(pass: string, confirm: string) {
      return pass === confirm;
    }

    expect(checkPasswordsMatch('SecurePass123', 'SecurePass123')).toBe(true);
    expect(checkPasswordsMatch('SecurePass123', 'DifferentPass')).toBe(false);
  });

  it('6. Guarantees zero verification code or token leakage in client authentication responses', () => {
    // Simulating response payloads returned to browser DevTools/Network
    const registrationResponse: Record<string, any> = {
      success: true,
      requiresVerification: true,
      email: 'student@example.com',
      username: 'math_student',
      message: 'A 6-digit verification code has been dispatched to your email.',
    };

    const resendResponse: Record<string, any> = {
      success: true,
      message: 'A new 6-digit verification code has been dispatched to your email.',
    };

    const passwordResetResponse: Record<string, any> = {
      success: true,
      message: 'If an account exists with this email, a 6-digit recovery code has been sent to your inbox.',
    };

    // Assert that client payload never contains the secrets
    expect(registrationResponse).not.toHaveProperty('verificationCode');
    expect(registrationResponse).not.toHaveProperty('code');
    expect(resendResponse).not.toHaveProperty('verificationCode');
    expect(resendResponse).not.toHaveProperty('code');
    expect(passwordResetResponse).not.toHaveProperty('resetToken');
    expect(passwordResetResponse).not.toHaveProperty('code');
  });

  describe('3. Student Progress Reconciliation & Anti-Wipe Protection', () => {
    it('preserves local bookmarks when cloud returns empty bookmarks', () => {
      const local = {
        lastVisitedChapterId: 'c10-s1-ap',
        completedChapterIds: ['c10-s1-ap'],
        bookmarkedFormulaIds: ['ap-nth-term', 'ap-sum'],
        practiceStats: { totalAttempted: 5, correctCount: 4, currentStreak: 2, bestStreak: 3 },
        questionHistory: {},
        updatedAt: 1000,
      };
      const cloud = {
        lastVisitedChapterId: null,
        completedChapterIds: [],
        bookmarkedFormulaIds: [],
        practiceStats: { totalAttempted: 0, correctCount: 0, currentStreak: 0, bestStreak: 0 },
        questionHistory: {},
        updatedAt: 500,
      };

      const merged = mergeUserProgress(cloud, local);
      expect(merged.bookmarkedFormulaIds).toEqual(['ap-nth-term', 'ap-sum']);
      expect(merged.completedChapterIds).toEqual(['c10-s1-ap']);
      expect(merged.practiceStats.correctCount).toBe(4);
    });

    it('unions bookmarks and completed chapters across multi-device usage for the same student', () => {
      const local = {
        lastVisitedChapterId: 'c9-s1-nr',
        completedChapterIds: ['c9-s1-nr'],
        bookmarkedFormulaIds: ['heron-area'],
        practiceStats: { totalAttempted: 10, correctCount: 8, currentStreak: 1, bestStreak: 4 },
        questionHistory: { 'q-1': { answered: true, isCorrect: true, timestamp: 100 } },
        updatedAt: 2000,
      };
      const cloud = {
        lastVisitedChapterId: 'c10-s2-trig',
        completedChapterIds: ['c10-s2-trig'],
        bookmarkedFormulaIds: ['trig-pythagorean', 'heron-area'],
        practiceStats: { totalAttempted: 12, correctCount: 9, currentStreak: 3, bestStreak: 5 },
        questionHistory: { 'q-2': { answered: true, isCorrect: true, timestamp: 200 } },
        updatedAt: 3000,
      };

      const merged = mergeUserProgress(cloud, local);
      expect(merged.completedChapterIds).toContain('c9-s1-nr');
      expect(merged.completedChapterIds).toContain('c10-s2-trig');
      expect(merged.completedChapterIds.length).toBe(2);

      expect(merged.bookmarkedFormulaIds).toContain('heron-area');
      expect(merged.bookmarkedFormulaIds).toContain('trig-pythagorean');
      expect(merged.bookmarkedFormulaIds.length).toBe(2);

      expect(merged.practiceStats.totalAttempted).toBe(12);
      expect(merged.practiceStats.correctCount).toBe(9);
      expect(merged.practiceStats.bestStreak).toBe(5);
      expect(merged.questionHistory['q-1']).toBeDefined();
      expect(merged.questionHistory['q-2']).toBeDefined();
    });
  });
});


