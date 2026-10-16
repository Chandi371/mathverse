import type { UserProgress } from '../types/progress';
import { getStoredToken } from './auth';

const GUEST_STORAGE_KEY = 'mathverse_guest_progress_v2';
const LEGACY_STORAGE_KEY = 'mathverse_learning_progress_v1';

let activeStudentId: string | null = null;

export const defaultProgress: UserProgress = {
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
};

export function setActiveStudentId(userId: string | null): void {
  activeStudentId = userId;
}

export function getActiveStudentId(): string | null {
  return activeStudentId;
}

function getStorageKey(): string {
  if (activeStudentId) {
    return `mathverse_user_${activeStudentId}_progress_v2`;
  }
  return GUEST_STORAGE_KEY;
}

export function mergeUserProgress(base: UserProgress, incoming: UserProgress): UserProgress {
  const completed = Array.from(new Set([
    ...(Array.isArray(base?.completedChapterIds) ? base.completedChapterIds : []),
    ...(Array.isArray(incoming?.completedChapterIds) ? incoming.completedChapterIds : []),
  ]));

  const bookmarked = Array.from(new Set([
    ...(Array.isArray(base?.bookmarkedFormulaIds) ? base.bookmarkedFormulaIds : []),
    ...(Array.isArray(incoming?.bookmarkedFormulaIds) ? incoming.bookmarkedFormulaIds : []),
  ]));

  return {
    lastVisitedChapterId: incoming?.lastVisitedChapterId || base?.lastVisitedChapterId || null,
    completedChapterIds: completed,
    bookmarkedFormulaIds: bookmarked,
    practiceStats: {
      totalAttempted: Math.max(base?.practiceStats?.totalAttempted || 0, incoming?.practiceStats?.totalAttempted || 0),
      correctCount: Math.max(base?.practiceStats?.correctCount || 0, incoming?.practiceStats?.correctCount || 0),
      currentStreak: Math.max(base?.practiceStats?.currentStreak || 0, incoming?.practiceStats?.currentStreak || 0),
      bestStreak: Math.max(base?.practiceStats?.bestStreak || 0, incoming?.practiceStats?.bestStreak || 0),
    },
    questionHistory: {
      ...(base?.questionHistory || {}),
      ...(incoming?.questionHistory || {}),
    },
    updatedAt: Math.max(base?.updatedAt || 0, incoming?.updatedAt || 0, Date.now()),
  };
}

export function loadProgress(): UserProgress {
  try {
    const key = getStorageKey();
    let raw = localStorage.getItem(key);

    let parsed: any = null;
    if (raw) {
      try {
        parsed = JSON.parse(raw);
      } catch {}
    }

    // Check fallback storage if current key is empty or has zero bookmarks/progress
    const guestRaw = localStorage.getItem(GUEST_STORAGE_KEY);
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    let guestParsed: any = null;
    let legacyParsed: any = null;

    if (guestRaw) {
      try { guestParsed = JSON.parse(guestRaw); } catch {}
    }
    if (legacyRaw) {
      try { legacyParsed = JSON.parse(legacyRaw); } catch {}
    }

    let combined = { ...defaultProgress };

    // 1. Seed from legacy if present
    if (legacyParsed) {
      combined = mergeUserProgress(combined, legacyParsed);
    }
    // 2. Seed from guest if present
    if (guestParsed) {
      combined = mergeUserProgress(combined, guestParsed);
    }
    // 3. Seed from current user storage if present
    if (parsed) {
      combined = mergeUserProgress(combined, parsed);
    }

    return combined;
  } catch (err) {
    console.error('Failed to parse progress from localStorage:', err);
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(progress));

    // Also update guest storage as fallback cache
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(progress));

    // If authenticated, sync asynchronously to server
    if (activeStudentId && getStoredToken()) {
      pushProgressToCloud(progress).catch((err) => {
        console.warn('Background cloud progress sync deferred:', err);
      });
    }
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

export async function pushProgressToCloud(progress: UserProgress): Promise<void> {
  const token = getStoredToken();
  if (!token) return;

  try {
    await fetch('/api/progress', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(progress),
    });
  } catch (err) {
    console.warn('Failed to sync progress to cloud:', err);
  }
}

export async function pullProgressFromCloud(): Promise<UserProgress | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/progress', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.progress) {
      const local = loadProgress();
      const merged = mergeUserProgress(local, data.progress);
      saveProgress(merged);
      return merged;
    }
    return null;
  } catch (err) {
    console.warn('Failed to pull progress from cloud, using cached local copy:', err);
    return null;
  }
}

export function getGuestProgress(): UserProgress | null {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const hasData =
      (parsed.completedChapterIds && parsed.completedChapterIds.length > 0) ||
      (parsed.bookmarkedFormulaIds && parsed.bookmarkedFormulaIds.length > 0) ||
      (parsed.questionHistory && Object.keys(parsed.questionHistory).length > 0) ||
      (parsed.practiceStats && parsed.practiceStats.totalAttempted > 0);
    return hasData ? parsed : null;
  } catch {
    return null;
  }
}

export function clearGuestProgress(): void {
  try {
    localStorage.removeItem(GUEST_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear guest storage:', err);
  }
}

export async function mergeGuestProgressIntoCloud(): Promise<UserProgress | null> {
  const guest = getGuestProgress();
  const token = getStoredToken();
  if (!guest || !token) return null;

  try {
    const res = await fetch('/api/progress/merge-guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ guestProgress: guest }),
    });

    if (!res.ok) throw new Error('Failed to merge guest progress');
    const data = await res.json();
    if (data.progress) {
      saveProgress(data.progress);
      return data.progress;
    }
    return null;
  } catch (err) {
    console.error('Error merging guest progress into cloud:', err);
    return null;
  }
}

export function recordQuestionAnswer(questionId: string, isCorrect: boolean): UserProgress {
  const current = loadProgress();
  const existing = current.questionHistory[questionId];

  const totalAttempted = existing
    ? current.practiceStats.totalAttempted
    : current.practiceStats.totalAttempted + 1;

  const wasAlreadyCorrect = existing && existing.isCorrect;
  const correctCount = !wasAlreadyCorrect && isCorrect
    ? current.practiceStats.correctCount + 1
    : current.practiceStats.correctCount;

  const currentStreak = isCorrect ? current.practiceStats.currentStreak + 1 : 0;
  const bestStreak = Math.max(current.practiceStats.bestStreak, currentStreak);

  const updated: UserProgress = {
    ...current,
    practiceStats: {
      totalAttempted,
      correctCount,
      currentStreak,
      bestStreak,
    },
    questionHistory: {
      ...current.questionHistory,
      [questionId]: {
        answered: true,
        isCorrect,
        timestamp: Date.now(),
      },
    },
    updatedAt: Date.now(),
  };

  saveProgress(updated);
  return updated;
}

export function toggleChapterCompleted(chapterId: string): UserProgress {
  const current = loadProgress();
  const exists = current.completedChapterIds.includes(chapterId);
  const updated: UserProgress = {
    ...current,
    completedChapterIds: exists
      ? current.completedChapterIds.filter((id) => id !== chapterId)
      : [...current.completedChapterIds, chapterId],
    updatedAt: Date.now(),
  };
  saveProgress(updated);
  return updated;
}

export function toggleBookmarkFormula(formulaId: string): UserProgress {
  const current = loadProgress();
  const exists = current.bookmarkedFormulaIds.includes(formulaId);
  const updated: UserProgress = {
    ...current,
    bookmarkedFormulaIds: exists
      ? current.bookmarkedFormulaIds.filter((id) => id !== formulaId)
      : [...current.bookmarkedFormulaIds, formulaId],
    updatedAt: Date.now(),
  };
  saveProgress(updated);
  return updated;
}

export function setLastVisitedChapter(chapterId: string): void {
  const current = loadProgress();
  current.lastVisitedChapterId = chapterId;
  saveProgress(current);
}

export function resetAllProgress(): UserProgress {
  try {
    const key = getStorageKey();
    localStorage.removeItem(key);
    localStorage.removeItem(GUEST_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
  const fresh = { ...defaultProgress };
  saveProgress(fresh);
  return fresh;
}
