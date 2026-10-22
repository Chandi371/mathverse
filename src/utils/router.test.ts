import { describe, it, expect } from 'vitest';
import { parseUrlToState, formatStateToUrl, areStatesEqual } from './router';

describe('Router Utility', () => {
  describe('parseUrlToState', () => {
    it('parses root URL to home tab', () => {
      expect(parseUrlToState('/', '', '')).toEqual({
        tab: 'home',
        selectedClass: null,
      });
    });

    it('parses root URL with class query param', () => {
      expect(parseUrlToState('/', '?class=10', '')).toEqual({
        tab: 'home',
        selectedClass: 10,
      });
      expect(parseUrlToState('/', '?class=9', '')).toEqual({
        tab: 'home',
        selectedClass: 9,
      });
    });

    it('parses chapters tab with class filter', () => {
      expect(parseUrlToState('/chapters', '?class=10', '')).toEqual({
        tab: 'chapters',
        selectedClass: 10,
      });
    });

    it('parses chapter detail route', () => {
      expect(parseUrlToState('/chapter/c10-s1-ap', '', '')).toEqual({
        tab: 'chapter-view',
        chapterId: 'c10-s1-ap',
        selectedClass: null,
      });
    });

    it('parses labs tab with specific labId', () => {
      expect(parseUrlToState('/labs/ramanujan-lab', '', '')).toEqual({
        tab: 'labs',
        labId: 'ramanujan-lab',
      });
      expect(parseUrlToState('/labs', '', '')).toEqual({
        tab: 'labs',
      });
    });

    it('parses formulas tab with formulaId', () => {
      expect(parseUrlToState('/formulas/ap-nth-term', '', '')).toEqual({
        tab: 'formulas',
        formulaId: 'ap-nth-term',
      });
      expect(parseUrlToState('/formulas', '', '')).toEqual({
        tab: 'formulas',
      });
    });

    it('parses practice, resources, and progress tabs', () => {
      expect(parseUrlToState('/practice', '', '')).toEqual({ tab: 'practice' });
      expect(parseUrlToState('/resources', '?class=9', '')).toEqual({
        tab: 'resources',
        selectedClass: 9,
      });
      expect(parseUrlToState('/progress', '', '')).toEqual({ tab: 'progress' });
    });

    it('supports hash fallback URLs', () => {
      expect(parseUrlToState('/', '', '#/chapter/c10-s1-ap')).toEqual({
        tab: 'chapter-view',
        chapterId: 'c10-s1-ap',
        selectedClass: null,
      });
      expect(parseUrlToState('/', '', '#/labs/ramanujan-lab')).toEqual({
        tab: 'labs',
        labId: 'ramanujan-lab',
      });
      expect(parseUrlToState('/', '', '#practice')).toEqual({
        tab: 'practice',
      });
    });
  });

  describe('formatStateToUrl', () => {
    it('formats home state', () => {
      expect(formatStateToUrl({ tab: 'home' })).toBe('/');
      expect(formatStateToUrl({ tab: 'home', selectedClass: 10 })).toBe('/?class=10');
    });

    it('formats chapters state', () => {
      expect(formatStateToUrl({ tab: 'chapters' })).toBe('/chapters');
      expect(formatStateToUrl({ tab: 'chapters', selectedClass: 9 })).toBe('/chapters?class=9');
    });

    it('formats chapter-view state', () => {
      expect(formatStateToUrl({ tab: 'chapter-view', chapterId: 'c10-s1-ap' })).toBe('/chapter/c10-s1-ap');
    });

    it('formats labs state with and without labId', () => {
      expect(formatStateToUrl({ tab: 'labs' })).toBe('/labs');
      expect(formatStateToUrl({ tab: 'labs', labId: 'ramanujan-lab' })).toBe('/labs/ramanujan-lab');
    });

    it('formats formulas state with and without formulaId', () => {
      expect(formatStateToUrl({ tab: 'formulas' })).toBe('/formulas');
      expect(formatStateToUrl({ tab: 'formulas', formulaId: 'ap-nth-term' })).toBe('/formulas/ap-nth-term');
    });

    it('formats practice, resources, progress', () => {
      expect(formatStateToUrl({ tab: 'practice' })).toBe('/practice');
      expect(formatStateToUrl({ tab: 'resources' })).toBe('/resources');
      expect(formatStateToUrl({ tab: 'resources', selectedClass: 10 })).toBe('/resources?class=10');
      expect(formatStateToUrl({ tab: 'progress' })).toBe('/progress');
    });
  });

  describe('areStatesEqual', () => {
    it('correctly compares matching and non-matching states', () => {
      expect(
        areStatesEqual(
          { tab: 'home', selectedClass: null },
          { tab: 'home' }
        )
      ).toBe(true);

      expect(
        areStatesEqual(
          { tab: 'chapter-view', chapterId: 'c10-s1-ap' },
          { tab: 'chapter-view', chapterId: 'c10-s1-ap' }
        )
      ).toBe(true);

      expect(
        areStatesEqual(
          { tab: 'chapter-view', chapterId: 'c10-s1-ap' },
          { tab: 'chapter-view', chapterId: 'c9-ch1' }
        )
      ).toBe(false);

      expect(
        areStatesEqual(
          { tab: 'labs', labId: 'ramanujan-lab' },
          { tab: 'labs', labId: 'area-model' }
        )
      ).toBe(false);
    });
  });
});
