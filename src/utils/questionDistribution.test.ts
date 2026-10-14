import { describe, it, expect } from 'vitest';
import { questionRegistry } from '../data/questionRegistry';
import { buildBalancedPracticeSet } from '../data/questionSelector';
import { allCurriculumChapters } from '../data/curriculumData';

describe('Syllabus-Wide Question Registry & Balanced Distribution', () => {
  it('should have registered question families covering all 26 chapters', () => {
    const registryChapters = new Set(questionRegistry.map((qf) => qf.chapterId));
    expect(registryChapters.size).toBe(26);

    for (const ch of allCurriculumChapters) {
      expect(registryChapters.has(ch.id)).toBe(true);
    }
  });

  it('should generate valid mathematical questions across all 4 difficulty levels for every family', () => {
    const diffs = ['Foundation', 'Standard', 'Advanced', 'Challenge'] as const;
    for (const qf of questionRegistry) {
      for (const d of diffs) {
        if (qf.supportedDifficulties.includes(d)) {
          const q = qf.generate(d, 42);
          expect(q.prompt).toBeTruthy();
          expect(q.explanation).toBeTruthy();
          expect(q.hints.length).toBeGreaterThanOrEqual(1);
          expect(q.correctAnswer).toBeDefined();
          expect(q.difficulty).toBe(d);
          expect(q.chapterId).toBe(qf.chapterId);
        }
      }
    }
  });

  it('should balance questions across Class 10 chapters without AP dominating', () => {
    const session = buildBalancedPracticeSet({
      classGrade: 10,
      questionCount: 14,
      seed: 12345,
    });

    expect(session.questions.length).toBe(14);
    // Every question should come from a different chapter (14 chapters in Class 10)
    const chDist = session.chapterDistribution;
    expect(Object.keys(chDist).length).toBe(14);

    // Arithmetic Progressions (c10-s1-ap) must have exactly 1 question, NOT dominate
    expect(chDist['c10-s1-ap']).toBe(1);

    // All other chapters must also have exactly 1 question
    for (const count of Object.values(chDist)) {
      expect(count).toBe(1);
    }
  });

  it('should balance questions across Class 9 chapters without any single chapter dominating', () => {
    const session = buildBalancedPracticeSet({
      classGrade: 9,
      questionCount: 12,
      seed: 98765,
    });

    expect(session.questions.length).toBe(12);
    const chDist = session.chapterDistribution;
    expect(Object.keys(chDist).length).toBe(12);

    for (const count of Object.values(chDist)) {
      expect(count).toBe(1);
    }
  });

  it('should allow filtering by specific chapter while respecting chosen difficulty', () => {
    const session = buildBalancedPracticeSet({
      classGrade: 10,
      chapterId: 'c10-s1-ap',
      difficulty: 'Advanced',
      questionCount: 3,
      seed: 777,
    });

    expect(session.questions.length).toBe(3);
    for (const q of session.questions) {
      expect(q.chapterId).toBe('c10-s1-ap');
      expect(q.difficulty).toBe('Advanced');
    }
  });
});
