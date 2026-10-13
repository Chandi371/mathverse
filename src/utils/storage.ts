import type { UserProgress } from '../types/progress';

const STORAGE_KEY = 'mathverse_learning_progress_v1';

const defaultProgress: UserProgress = {
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

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch (err) {
    console.error('Failed to parse progress from localStorage:', err);
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

export function recordQuestionAnswer(questionId: string, isCorrect: boolean): UserProgress {
  const current = loadProgress();
  const existing = current.questionHistory[questionId];
  
  const totalAttempted = existing ? current.practiceStats.totalAttempted : current.practiceStats.totalAttempted + 1;
  const correctCount = !existing && isCorrect ? current.practiceStats.correctCount + 1 : current.practiceStats.correctCount;
  
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
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
  return defaultProgress;
}
