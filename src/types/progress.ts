export interface UserProgress {
  lastVisitedChapterId: string | null;
  completedChapterIds: string[];
  bookmarkedFormulaIds: string[];
  practiceStats: {
    totalAttempted: number;
    correctCount: number;
    currentStreak: number;
    bestStreak: number;
  };
  questionHistory: Record<string, { answered: boolean; isCorrect: boolean; timestamp: number }>;
  updatedAt?: number;
}
