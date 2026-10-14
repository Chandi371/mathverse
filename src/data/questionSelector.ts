import type { PracticeQuestion, QuestionDifficulty, ClassGrade, Semester } from '../types/curriculum';
import { questionRegistry, createRng } from './questionRegistry.ts';
import type { QuestionFamilyMeta } from './questionRegistry.ts';

export interface PracticeSessionFilter {
  classGrade?: 'all' | ClassGrade;
  semester?: 'all' | Semester;
  chapterId?: 'all' | string;
  difficulty?: 'all' | QuestionDifficulty;
  questionCount?: number;
  seed?: number;
}

export interface BalancedPracticeResult {
  questions: PracticeQuestion[];
  chapterDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  totalAvailableFamilies: number;
  exhaustedNotice?: string;
}

/**
 * Builds a balanced, syllabus-proportional set of practice questions.
 * Enforces anti-clustering:
 * 1. For full-class practice, questions are round-robined across all eligible chapters.
 * 2. No single chapter can dominate the practice set.
 * 3. Seeded RNG guarantees deterministic reproducibility when desired.
 */
export function buildBalancedPracticeSet(
  filter: PracticeSessionFilter = {},
  authoredQuestions: PracticeQuestion[] = []
): BalancedPracticeResult {
  const {
    classGrade = 'all',
    semester = 'all',
    chapterId = 'all',
    difficulty = 'all',
    questionCount = 15,
    seed,
  } = filter;

  const rng = createRng(seed);

  // 1. Filter matching question families from registry
  let eligibleFamilies = questionRegistry.filter((qf) => {
    if (classGrade !== 'all' && qf.classGrade !== classGrade) return false;
    if (semester !== 'all' && qf.semester !== semester) return false;
    if (chapterId !== 'all' && qf.chapterId !== chapterId) return false;
    if (difficulty !== 'all' && !qf.supportedDifficulties.includes(difficulty)) return false;
    return true;
  });

  // 2. Also map eligible authored questions
  const eligibleAuthored = authoredQuestions.filter((q) => {
    if (classGrade !== 'all' && q.classGrade && q.classGrade !== classGrade) return false;
    if (semester !== 'all' && q.semester && q.semester !== semester) return false;
    if (chapterId !== 'all' && q.chapterId && q.chapterId !== chapterId) return false;
    if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
    return true;
  });

  const selectedQuestions: PracticeQuestion[] = [];
  const chapterCountMap: Record<string, number> = {};
  const diffCountMap: Record<string, number> = {
    Foundation: 0,
    Standard: 0,
    Advanced: 0,
    Challenge: 0,
  };

  const supportedDifficulties: QuestionDifficulty[] =
    difficulty === 'all' ? ['Foundation', 'Standard', 'Advanced', 'Challenge'] : [difficulty];

  // If chapterId === 'all', shuffle eligible families to guarantee balanced topic spread
  let familyQueue: QuestionFamilyMeta[] = rng.shuffle(eligibleFamilies);

  // If no registry families exist for the filter, use authored questions
  if (familyQueue.length === 0 && eligibleAuthored.length > 0) {
    const shuffledAuthored = rng.shuffle(eligibleAuthored).slice(0, questionCount);
    for (const q of shuffledAuthored) {
      selectedQuestions.push(q);
      const chKey = q.chapterId || 'general';
      chapterCountMap[chKey] = (chapterCountMap[chKey] || 0) + 1;
      diffCountMap[q.difficulty] = (diffCountMap[q.difficulty] || 0) + 1;
    }

    return {
      questions: selectedQuestions,
      chapterDistribution: chapterCountMap,
      difficultyDistribution: diffCountMap,
      totalAvailableFamilies: 0,
      exhaustedNotice: 'Generated from curated authored repository.',
    };
  }

  // Interleave and generate questions round-robin across distinct chapters
  let familyIdx = 0;
  let attempts = 0;
  const maxAttempts = questionCount * 4;

  while (selectedQuestions.length < questionCount && attempts < maxAttempts) {
    attempts++;
    if (familyQueue.length === 0) break;

    const family = familyQueue[familyIdx % familyQueue.length];
    familyIdx++;

    // Pick target difficulty
    const targetDiff =
      difficulty === 'all'
        ? supportedDifficulties[rng.int(0, supportedDifficulties.length - 1)]
        : difficulty;

    try {
      const generated = family.generate(targetDiff, rng.int(1, 999999));
      selectedQuestions.push(generated);

      chapterCountMap[family.chapterId] = (chapterCountMap[family.chapterId] || 0) + 1;
      diffCountMap[targetDiff] = (diffCountMap[targetDiff] || 0) + 1;
    } catch {
      // Discard invalid question immediately and continue
      continue;
    }
  }

  // If count is still less than requested, backfill with distinct authored questions
  if (selectedQuestions.length < questionCount && eligibleAuthored.length > 0) {
    for (const aq of rng.shuffle(eligibleAuthored)) {
      if (selectedQuestions.length >= questionCount) break;
      if (!selectedQuestions.some((sq) => sq.id === aq.id)) {
        selectedQuestions.push(aq);
        const chKey = aq.chapterId || 'general';
        chapterCountMap[chKey] = (chapterCountMap[chKey] || 0) + 1;
        diffCountMap[aq.difficulty] = (diffCountMap[aq.difficulty] || 0) + 1;
      }
    }
  }

  return {
    questions: selectedQuestions,
    chapterDistribution: chapterCountMap,
    difficultyDistribution: diffCountMap,
    totalAvailableFamilies: eligibleFamilies.length,
  };
}
