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

export function loadProgress(): UserProgress {
  try {
    const key = getStorageKey();
    let raw = localStorage.getItem(key);

    // Backward compatibility: If guest storage is empty, check legacy v1 storage
    if (!raw && !activeStudentId) {
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        // Migrate to guest v2
        localStorage.setItem(GUEST_STORAGE_KEY, legacyRaw);
      }
    }

    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      practiceStats: {
        ...defaultProgress.practiceStats,
        ...(parsed.practiceStats || {}),
      },
      questionHistory: parsed.questionHistory || {},
    };
  } catch (err) {
    console.error('Failed to parse progress from localStorage:', err);
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(progress));

    // If authenticated, also sync asynchronously to server
    if (activeStudentId && getStoredToken()) {
      pushProgressToCloud(progress).catch((err) => {
        console.warn('Background cloud progress sync deferred:', err);
      });
    }
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

async function pushProgressToCloud(progress: UserProgress): Promise<void> {
  const token = getStoredToken();
  if (!token) return;

  await fetch('/api/progress', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(progress),
  });
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
      saveProgress(data.progress);
      return data.progress;
    }
    return null;
  } catch (err) {
    console.warn('Failed to pull progress from cloud, using cached local copy:', err);
    return null;
  }
}

export function getGuestProgress(): UserProgress | null {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
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
      clearGuestProgress();
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

  // If question was never attempted before, increment unique attempted
  const totalAttempted = existing
    ? current.practiceStats.totalAttempted
    : current.practiceStats.totalAttempted + 1;

  // If question was never answered correctly before, and now is correct, increment correctCount
  const wasAlreadyCorrect = existing && existing.isCorrect;
  const correctCount = !wasAlreadyCorrect && isCorrect
    ? current.practiceStats.correctCount + 1
    : current.practiceStats.correctCount;

  // Streak logic: streaks reflect consecutive correct answers
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
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
  const fresh = { ...defaultProgress };
  if (activeStudentId && getStoredToken()) {
    pushProgressToCloud(fresh).catch(console.warn);
  }
  return fresh;
}
