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

    // If guest mode and no v2 guest data, check legacy v1 storage
    if (!raw && !activeStudentId) {
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        localStorage.setItem(GUEST_STORAGE_KEY, legacyRaw);
      }
    }

    if (!raw) return { ...defaultProgress };

    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      completedChapterIds: Array.isArray(parsed.completedChapterIds) ? parsed.completedChapterIds : [],
      bookmarkedFormulaIds: Array.isArray(parsed.bookmarkedFormulaIds) ? parsed.bookmarkedFormulaIds : [],
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

export function mergeUserProgress(
  cloud: UserProgress | null | undefined,
  local: UserProgress | null | undefined
): UserProgress {
  if (!cloud && !local) return { ...defaultProgress };
  if (!cloud) return { ...defaultProgress, ...local };
  if (!local) return { ...defaultProgress, ...cloud };

  // Combine unique completed chapters
  const completedSet = new Set<string>([
    ...(Array.isArray(cloud.completedChapterIds) ? cloud.completedChapterIds : []),
    ...(Array.isArray(local.completedChapterIds) ? local.completedChapterIds : []),
  ]);

  // Combine unique bookmarked formulas
  const bookmarkSet = new Set<string>([
    ...(Array.isArray(cloud.bookmarkedFormulaIds) ? cloud.bookmarkedFormulaIds : []),
    ...(Array.isArray(local.bookmarkedFormulaIds) ? local.bookmarkedFormulaIds : []),
  ]);

  // Take the highest practice stats
  const totalAttempted = Math.max(
    Number(cloud.practiceStats?.totalAttempted ?? 0),
    Number(local.practiceStats?.totalAttempted ?? 0)
  );
  const correctCount = Math.max(
    Number(cloud.practiceStats?.correctCount ?? 0),
    Number(local.practiceStats?.correctCount ?? 0)
  );
  const currentStreak = Math.max(
    Number(cloud.practiceStats?.currentStreak ?? 0),
    Number(local.practiceStats?.currentStreak ?? 0)
  );
  const bestStreak = Math.max(
    Number(cloud.practiceStats?.bestStreak ?? 0),
    Number(local.practiceStats?.bestStreak ?? 0)
  );

  return {
    lastVisitedChapterId: cloud.lastVisitedChapterId || local.lastVisitedChapterId || null,
    completedChapterIds: Array.from(completedSet),
    bookmarkedFormulaIds: Array.from(bookmarkSet),
    practiceStats: {
      totalAttempted,
      correctCount,
      currentStreak,
      bestStreak,
    },
    questionHistory: {
      ...(local.questionHistory || {}),
      ...(cloud.questionHistory || {}),
    },
    updatedAt: Math.max(Number(cloud.updatedAt ?? 0), Number(local.updatedAt ?? 0), Date.now()),
  };
}

export function saveProgress(progress: UserProgress): void {
  try {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(progress));

    // If authenticated, sync asynchronously to server for this specific user
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
      saveProgress(data.progress);
      return data.progress;
    }
    return null;
  } catch (err) {
    console.warn('Failed to pull progress from cloud, using cached local copy:', err);
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
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
  const fresh = { ...defaultProgress };
  saveProgress(fresh);
  return fresh;
}
