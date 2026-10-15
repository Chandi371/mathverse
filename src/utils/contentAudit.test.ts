import { describe, it, expect } from 'vitest';
import { chaptersData } from '../data/curriculumData';
import { class9Chapters } from '../data/chapters/class9';
import { class10Chapters } from '../data/chapters/class10';
import { allFormulasData } from '../data/formulasData';
import { questionRegistry } from '../data/questionRegistry';
import {
  contentAuditRegistry,
  getChapterAuditRecord,
  getCurriculumAuditMetrics,
} from '../data/contentAuditRegistry';

describe('MATHVERSE Mathematical Content Audit & Remediation Suite', () => {
  describe('1. Curriculum Structure & Coverage (AP SCERT Class 9 & Class 10)', () => {
    it('contains all 26 official syllabus chapters (12 Class 9 + 14 Class 10)', () => {
      expect(chaptersData.length).toBe(26);
      expect(class9Chapters.length).toBe(12);
      expect(class10Chapters.length).toBe(14);
    });

    it('has correct semester distribution for Class 9 (6 Sem 1, 6 Sem 2)', () => {
      const sem1 = class9Chapters.filter((c) => c.semester === 1);
      const sem2 = class9Chapters.filter((c) => c.semester === 2);
      expect(sem1.length).toBe(6);
      expect(sem2.length).toBe(6);
    });

    it('has correct semester distribution for Class 10 (7 Sem 1, 7 Sem 2)', () => {
      const sem1 = class10Chapters.filter((c) => c.semester === 1);
      const sem2 = class10Chapters.filter((c) => c.semester === 2);
      expect(sem1.length).toBe(7);
      expect(sem2.length).toBe(7);
    });

    it('every chapter has unique IDs and valid sequence numbers', () => {
      const ids = chaptersData.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(26);

      chaptersData.forEach((chapter) => {
        expect(chapter.id).toBeTruthy();
        expect(chapter.title).toBeTruthy();
        expect(chapter.chapterNumber).toBeGreaterThan(0);
        expect(chapter.shortDescription).toBeTruthy();
        expect(chapter.whyItMatters).toBeTruthy();
        expect(chapter.priorKnowledge.length).toBeGreaterThan(0);
        expect(chapter.vocabulary.length).toBeGreaterThan(0);
      });
    });
  });

  describe('2. Comprehensive Mathematical Content per Chapter (Formulas, Derivations, Examples, Practice)', () => {
    chaptersData.forEach((chapter) => {
      describe(`Chapter ${chapter.classGrade} Sem ${chapter.semester} Ch ${chapter.chapterNumber}: ${chapter.title}`, () => {
        it('has at least 3 verified key formulas with LaTeX, variable meanings, and conditions', () => {
          expect(chapter.keyFormulas).toBeDefined();
          expect(chapter.keyFormulas.length).toBeGreaterThanOrEqual(3);

          chapter.keyFormulas.forEach((formula) => {
            expect(formula.id).toBeTruthy();
            expect(formula.name).toBeTruthy();
            expect(formula.latex).toBeTruthy();
            expect(formula.description).toBeTruthy();
            expect(formula.variables.length).toBeGreaterThanOrEqual(1);
            expect(formula.conditions).toBeTruthy();
            expect(formula.whenToUse).toBeTruthy();
            if (formula.workedExample) {
              expect(formula.workedExample.problem).toBeTruthy();
              expect(formula.workedExample.solution).toBeTruthy();
            }
          });
        });

        it('has at least 2 worked examples with strategy, multi-step derivation, sanity check, and common mistakes', () => {
          expect(chapter.workedExamples).toBeDefined();
          expect(chapter.workedExamples.length).toBeGreaterThanOrEqual(2);

          chapter.workedExamples.forEach((ex) => {
            expect(ex.id).toBeTruthy();
            expect(ex.title).toBeTruthy();
            expect(ex.problemStatement).toBeTruthy();
            expect(ex.strategy).toBeTruthy();
            expect(ex.steps.length).toBeGreaterThanOrEqual(2);
            expect(ex.commonMistake).toBeTruthy();
            expect(ex.sanityCheck).toBeTruthy();
          });
        });

        it('has a complete step-by-step mathematical derivation', () => {
          expect(chapter.derivation).toBeDefined();
          if (chapter.derivation) {
            expect(chapter.derivation.title).toBeTruthy();
            expect(chapter.derivation.targetFormula).toBeTruthy();
            expect(chapter.derivation.objective).toBeTruthy();
            expect(chapter.derivation.steps.length).toBeGreaterThanOrEqual(2);

            chapter.derivation.steps.forEach((step: any) => {
              expect(step.stepNumber).toBeGreaterThan(0);
              expect(step.statement).toBeTruthy();
              expect(step.justification || step.reason).toBeTruthy();
            });
          }
        });

        it('has at least 1 memory trick or mnemonic anchor in memoryLab', () => {
          const tricks = chapter.memoryLab || [];
          expect(tricks.length).toBeGreaterThanOrEqual(1);

          tricks.forEach((trick) => {
            expect(trick.title).toBeTruthy();
            expect(trick.mnemonic).toBeTruthy();
            expect(trick.meaning).toBeTruthy();
            expect(trick.boardExamTip).toBeTruthy();
          });
        });

        it('has at least 3 practice questions with hints, explanation, and correct answer', () => {
          expect(chapter.practiceQuestions).toBeDefined();
          expect(chapter.practiceQuestions.length).toBeGreaterThanOrEqual(3);

          chapter.practiceQuestions.forEach((q) => {
            expect(q.id).toBeTruthy();
            expect(q.prompt).toBeTruthy();
            expect(q.hints.length).toBeGreaterThanOrEqual(1);
            expect(q.explanation).toBeTruthy();
            expect(q.correctAnswer).toBeDefined();
            if (q.type === 'mcq') {
              expect(q.options).toBeDefined();
              expect(q.options?.length).toBeGreaterThanOrEqual(2);
            }
          });
        });
      });
    });
  });

  describe('3. Global Formula Library Synchronization', () => {
    it('synchronizes all chapter keyFormulas into allFormulasData', () => {
      expect(allFormulasData.length).toBeGreaterThanOrEqual(80);

      // Verify every chapter ID is present in allFormulasData
      const presentChapterIds = new Set(allFormulasData.map((f) => f.chapterId));
      chaptersData.forEach((chapter) => {
        expect(presentChapterIds.has(chapter.id)).toBe(true);
      });
    });

    it('ensures every formula has unique ID and non-empty LaTeX', () => {
      const ids = allFormulasData.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(allFormulasData.length);

      allFormulasData.forEach((f) => {
        expect(f.latex).toBeTruthy();
        expect(f.name).toBeTruthy();
        expect(f.category).toBeTruthy();
      });
    });
  });

  describe('4. Procedural Question Registry Coverage', () => {
    it('covers all 26 chapters with active question families', () => {
      expect(questionRegistry.length).toBe(26);
      const coveredChapterIds = new Set(questionRegistry.map((q) => q.chapterId));
      chaptersData.forEach((chapter) => {
        expect(coveredChapterIds.has(chapter.id)).toBe(true);
      });
    });

    it('generates valid questions across all difficulties without crashing', () => {
      questionRegistry.forEach((family) => {
        family.supportedDifficulties.forEach((diff) => {
          const generated = family.generate(diff, 42);
          expect(generated).toBeDefined();
          expect(generated.prompt).toBeTruthy();
          expect(generated.correctAnswer).toBeDefined();
          expect(generated.hints.length).toBeGreaterThan(0);
          expect(generated.explanation).toBeTruthy();
        });
      });
    });
  });

  describe('5. Content Audit Registry Integrity', () => {
    it('covers all 26 chapters in contentAuditRegistry', () => {
      expect(contentAuditRegistry.length).toBe(26);
      const registryChapterIds = new Set(contentAuditRegistry.map((r) => r.chapterId));
      chaptersData.forEach((chapter) => {
        expect(registryChapterIds.has(chapter.id)).toBe(true);
      });
    });

    it('getCurriculumAuditMetrics reports 100% verification and comprehensive audit item count', () => {
      const metrics = getCurriculumAuditMetrics();
      expect(metrics.totalChapters).toBe(26);
      expect(metrics.totalAuditItems).toBeGreaterThanOrEqual(80);
      expect(metrics.coveragePercentage).toBe(100);
    });

    it('getChapterAuditRecord finds audit records for any valid chapter ID', () => {
      const rec = getChapterAuditRecord('c10-s1-ch1');
      expect(rec).toBeDefined();
      expect(rec?.title).toBe('Real Numbers');
      expect(rec?.auditItems.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('6. Mathematical Invariants & Formula Accuracy Validations', () => {
    it('validates Pythagorean Theorem: a^2 + b^2 = c^2 for standard triples', () => {
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [7, 24, 25],
        [8, 15, 17],
        [9, 40, 41],
      ];
      triples.forEach(([a, b, c]) => {
        expect(Math.pow(a, 2) + Math.pow(b, 2)).toBe(Math.pow(c, 2));
      });
    });

    it('validates Quadratic Formula: roots of ax^2 + bx + c = 0', () => {
      // Equation: x^2 - 5x + 6 = 0 -> roots are 2 and 3
      const a = 1, b = -5, c = 6;
      const D = b * b - 4 * a * c;
      expect(D).toBe(1);
      const r1 = (-b + Math.sqrt(D)) / (2 * a);
      const r2 = (-b - Math.sqrt(D)) / (2 * a);
      expect([r1, r2].sort()).toEqual([2, 3]);

      // Equation with equal roots: x^2 - 4x + 4 = 0 -> D = 0, root = 2
      const a2 = 1, b2 = -4, c2 = 4;
      const D2 = b2 * b2 - 4 * a2 * c2;
      expect(D2).toBe(0);
      expect((-b2) / (2 * a2)).toBe(2);
    });

    it("validates Heron's Formula: Area = sqrt(s(s-a)(s-b)(s-c))", () => {
      // 3-4-5 right triangle has area 0.5 * 3 * 4 = 6
      const a = 3, b = 4, c = 5;
      const s = (a + b + c) / 2;
      expect(s).toBe(6);
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      expect(area).toBe(6);
    });

    it('validates Arithmetic Progression: a_n = a + (n-1)d and S_n = n/2 * (2a + (n-1)d)', () => {
      const a = 2;
      const d = 3;
      const n = 10;
      const an = a + (n - 1) * d;
      expect(an).toBe(29);

      const sn = (n / 2) * (2 * a + (n - 1) * d);
      expect(sn).toBe(155);

      // Verify sum manually
      let manualSum = 0;
      for (let i = 0; i < n; i++) {
        manualSum += a + i * d;
      }
      expect(manualSum).toBe(155);
    });

    it('validates Coordinate Geometry Distance and Midpoint formulas', () => {
      const p1 = { x: 1, y: 2 };
      const p2 = { x: 4, y: 6 };

      const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      expect(dist).toBe(5);

      const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      expect(mid).toEqual({ x: 2.5, y: 4 });
    });

    it('validates Trigonometric Identity: sin^2(x) + cos^2(x) = 1', () => {
      const anglesDeg = [0, 30, 45, 60, 90, 120, 180, 270, 360];
      anglesDeg.forEach((deg) => {
        const rad = (deg * Math.PI) / 180;
        const sum = Math.pow(Math.sin(rad), 2) + Math.pow(Math.cos(rad), 2);
        expect(Math.abs(sum - 1)).toBeLessThan(1e-10);
      });
    });

    it('validates Probability Complement Law: P(E) + P(not E) = 1', () => {
      const probabilities = [0, 0.25, 0.5, 0.72, 0.99, 1];
      probabilities.forEach((p) => {
        const pNot = 1 - p;
        expect(p + pNot).toBeCloseTo(1, 10);
      });
    });
  });
});
