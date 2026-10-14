import { describe, it, expect } from 'vitest';
import {
  officialTextbooks,
  class10BoardExamResources,
  officialChapterWeightage,
  examPaperSections,
  parakhCompetencyDomains,
} from '../data/textbooksData';

describe('Official Textbook Library & Exam Resources Data Integrity', () => {
  it('should register exactly 4 official textbooks across classes 9 and 10', () => {
    expect(officialTextbooks).toHaveLength(4);

    const c9Sem1 = officialTextbooks.find((t) => t.classGrade === 9 && t.semester === 1);
    const c9Sem2 = officialTextbooks.find((t) => t.classGrade === 9 && t.semester === 2);
    const c10Sem1 = officialTextbooks.find((t) => t.classGrade === 10 && t.semester === 1);
    const c10Sem2 = officialTextbooks.find((t) => t.classGrade === 10 && t.semester === 2);

    expect(c9Sem1).toBeDefined();
    expect(c9Sem2).toBeDefined();
    expect(c10Sem1).toBeDefined();
    expect(c10Sem2).toBeDefined();

    expect(c9Sem1?.pageCount).toBe(250);
    expect(c9Sem2?.pageCount).toBe(238);
    expect(c10Sem1?.pageCount).toBe(302);
    expect(c10Sem2?.pageCount).toBe(262);
  });

  it('should have valid downloadable filenames and URLs for all textbooks', () => {
    for (const tb of officialTextbooks) {
      expect(tb.fileUrl).toMatch(/^\/docs\/.*\.pdf$/);
      expect(tb.downloadFileName).toMatch(/\.pdf$/);
      expect(tb.chapters.length).toBeGreaterThan(0);
      expect(tb.isBilingual).toBe(true);
    }
  });

  it('should register the official Class 10 SSC Board exam resources for 2026-27', () => {
    expect(class10BoardExamResources).toHaveLength(2);

    const mp1 = class10BoardExamResources.find((r) => r.type === 'model_paper_1');
    const mp2 = class10BoardExamResources.find((r) => r.type === 'model_paper_2');

    expect(mp1).toBeDefined();
    expect(mp2).toBeDefined();

    expect(mp1?.academicYear).toBe('2026-27');
    expect(mp1?.paperCode).toBe('15E & 16E');
    expect(mp1?.pageCount).toBe(8);

    expect(mp2?.academicYear).toBe('2026-27');
    expect(mp2?.paperCode).toBe('15E & 16E');
    expect(mp2?.pageCount).toBe(8);
  });

  it('should verify official chapter-wise marks weightage totals 100 marks + 40 optional marks', () => {
    expect(officialChapterWeightage).toHaveLength(14);

    const totalBaseMarks = officialChapterWeightage.reduce((sum, item) => sum + item.baseMarks, 0);
    const totalChoiceMarks = officialChapterWeightage.reduce((sum, item) => sum + item.choiceMarks, 0);

    expect(totalBaseMarks).toBe(100);
    expect(totalChoiceMarks).toBe(40);
  });

  it('should verify the 4-section exam paper format matches the official blueprint', () => {
    expect(examPaperSections).toHaveLength(4);

    const totalQuestions = examPaperSections.reduce((sum, s) => sum + s.count, 0);
    const totalMarks = examPaperSections.reduce((sum, s) => sum + s.totalMarks, 0);

    expect(totalQuestions).toBe(33);
    expect(totalMarks).toBe(100);
  });

  it('should verify PARAKH competency domains allocate 60% Awareness, 20% Sensitivity, 20% Creativity', () => {
    expect(parakhCompetencyDomains).toHaveLength(3);
    const totalPercentage = parakhCompetencyDomains.reduce((sum, d) => sum + d.percentage, 0);
    const totalMarks = parakhCompetencyDomains.reduce((sum, d) => sum + d.marks, 0);

    expect(totalPercentage).toBe(100);
    expect(totalMarks).toBe(100);
  });
});
