import { describe, it, expect } from 'vitest';
import {
  expandBinomialSquare,
  trigRatios,
  apNthTerm,
  apSum,
  checkTriangleInequality,
  heronArea,
  cartesianDistance,
  cartesianMidpoint,
  quadraticRoots,
  cylinderMetrics,
  circleMetrics,
  expandBinomialDiff,
  diffOfSquares,
  solveLinearSystem,
  thalesTheorem,
  calculateStatistics,
  sectionFormula,
} from './mathUtils';

describe('MATHVERSE Mathematical Accuracy Test Suite', () => {
  describe('Algebraic Identities & Area Model', () => {
    it('(a + b)² = a² + 2ab + b² holds for various values', () => {
      const cases = [
        [3, 4],
        [5, 5],
        [1.5, 2.5],
        [10, 20],
      ];
      cases.forEach(([a, b]) => {
        const res = expandBinomialSquare(a, b);
        expect(res.sumOfRegions).toBeCloseTo(res.directSquare, 6);
        expect(res.isIdentical).toBe(true);
      });
    });
  });

  describe('Trigonometry & Pythagorean Invariant', () => {
    it('sin²θ + cos²θ === 1 for any acute angle', () => {
      const angles = [15, 30, 45, 60, 75, 89];
      angles.forEach((angle) => {
        const { pythagoreanSum } = trigRatios(angle);
        expect(pythagoreanSum).toBeCloseTo(1, 10);
      });
    });

    it('Standard angle values match known exact constants', () => {
      const r30 = trigRatios(30);
      expect(r30.sin).toBeCloseTo(0.5, 6);
      expect(r30.cos).toBeCloseTo(Math.sqrt(3) / 2, 6);

      const r45 = trigRatios(45);
      expect(r45.sin).toBeCloseTo(1 / Math.sqrt(2), 6);
      expect(r45.cos).toBeCloseTo(1 / Math.sqrt(2), 6);
      expect(r45.tan).toBeCloseTo(1.0, 6);
    });

    it('Throws error on non-acute angle bounds', () => {
      expect(() => trigRatios(0)).toThrow();
      expect(() => trigRatios(90)).toThrow();
    });
  });

  describe('Arithmetic Progressions', () => {
    it('Computes nth term accurately', () => {
      // AP: 2, 7, 12, ... (a = 2, d = 5)
      expect(apNthTerm(2, 5, 1)).toBe(2);
      expect(apNthTerm(2, 5, 10)).toBe(47);
      expect(apNthTerm(2, 5, 20)).toBe(97);
    });

    it('Computes sum using Gauss pairing method accurately', () => {
      // Sum of first 10 terms of 1, 3, 5, 7, ... = 100
      expect(apSum(1, 2, 10)).toBe(100);

      // Sum of integers 1 to 100
      expect(apSum(1, 1, 100)).toBe(5050);
    });

    it('Guards against invalid term positions', () => {
      expect(() => apNthTerm(1, 2, 0)).toThrow();
      expect(() => apNthTerm(1, 2, 2.5)).toThrow();
    });
  });

  describe("Triangle Inequality & Heron's Formula", () => {
    it('Validates triangle inequality correctly', () => {
      expect(checkTriangleInequality(3, 4, 5)).toBe(true);
      expect(checkTriangleInequality(5, 5, 5)).toBe(true);
      // Fails inequality
      expect(checkTriangleInequality(1, 2, 3)).toBe(false); // 1 + 2 = 3 (flat line)
      expect(checkTriangleInequality(4, 5, 10)).toBe(false); // 4 + 5 < 10
      expect(checkTriangleInequality(-3, 4, 5)).toBe(false);
    });

    it('Computes exact area for known triangles using Heron formula', () => {
      // 3-4-5 right triangle -> Area = (1/2)*3*4 = 6
      expect(heronArea(3, 4, 5)).toBeCloseTo(6, 6);

      // 13-14-15 triangle -> Area = 84
      expect(heronArea(13, 14, 15)).toBeCloseTo(84, 6);

      // Equilateral of side 8 -> Area = (√3 / 4) * 64 = 16√3 ≈ 27.7128129
      const expectedEquilateral = (Math.sqrt(3) / 4) * 64;
      expect(heronArea(8, 8, 8)).toBeCloseTo(expectedEquilateral, 6);
    });

    it('Returns 0 for invalid triangles', () => {
      expect(heronArea(4, 5, 10)).toBe(0);
    });
  });

  describe('Coordinate Geometry', () => {
    it('Computes distance via Pythagorean theorem correctly', () => {
      // (1, 2) to (4, 6) -> 3-4-5 triangle -> distance = 5
      expect(cartesianDistance(1, 2, 4, 6)).toBeCloseTo(5, 6);
      expect(cartesianDistance(0, 0, 0, 0)).toBe(0);
    });

    it('Computes midpoint correctly', () => {
      const mid = cartesianMidpoint(2, 4, 6, 8);
      expect(mid.x).toBe(4);
      expect(mid.y).toBe(6);
    });
  });

  describe('Quadratic Equations & Discriminant', () => {
    it('Solves two distinct real roots (D > 0)', () => {
      // x² - 5x + 6 = 0 -> roots 2, 3
      const res = quadraticRoots(1, -5, 6);
      expect(res.type).toBe('two_distinct_real');
      expect(res.disc).toBe(1);
      expect([res.root1, res.root2].sort()).toEqual([2, 3]);
    });

    it('Solves equal real roots (D = 0)', () => {
      // x² - 4x + 4 = 0 -> root 2
      const res = quadraticRoots(1, -4, 4);
      expect(res.type).toBe('equal_real');
      expect(res.disc).toBe(0);
      expect(res.root1).toBe(2);
    });

    it('Detects no real roots (D < 0)', () => {
      // x² + x + 2 = 0 -> D = 1 - 8 = -7
      const res = quadraticRoots(1, 1, 2);
      expect(res.type).toBe('no_real');
      expect(res.disc).toBe(-7);
      expect(res.root1).toBeNull();
    });

    it('Throws error if leading coefficient a is zero', () => {
      expect(() => quadraticRoots(0, 2, 3)).toThrow();
    });
  });

  describe('Cylinder & Circle Mensuration', () => {
    it('Computes cylinder curved and total surface areas', () => {
      const r = 7;
      const h = 10;
      const { csa, tsa, volume } = cylinderMetrics(r, h);

      const expectedCSA = 2 * Math.PI * 7 * 10;
      const expectedTSA = 2 * Math.PI * 7 * (7 + 10);
      const expectedVol = Math.PI * 49 * 10;

      expect(csa).toBeCloseTo(expectedCSA, 6);
      expect(tsa).toBeCloseTo(expectedTSA, 6);
      expect(volume).toBeCloseTo(expectedVol, 6);
    });

    it('Computes circle circumference and area', () => {
      const r = 14;
      const { circumference, area } = circleMetrics(r);
      expect(circumference).toBeCloseTo(2 * Math.PI * 14, 6);
      expect(area).toBeCloseTo(Math.PI * 196, 6);
    });
  });

  describe('Additional Algebraic Identities', () => {
    it('(a - b)² = a² - 2ab + b² holds for all real inputs', () => {
      const cases = [
        [5, 2],
        [8, 3],
        [10, 10],
        [7.5, 2.5],
      ];
      cases.forEach(([a, b]) => {
        const res = expandBinomialDiff(a, b);
        expect(res.computed).toBeCloseTo(res.directSquare, 6);
        expect(res.isIdentical).toBe(true);
      });
    });

    it('a² - b² = (a - b)(a + b) difference of squares holds', () => {
      const cases = [
        [5, 3],
        [10, 4],
        [12, 12],
        [9.2, 3.2],
      ];
      cases.forEach(([a, b]) => {
        const res = diffOfSquares(a, b);
        expect(res.diff).toBeCloseTo(res.factored, 6);
        expect(res.isIdentical).toBe(true);
      });
    });
  });

  describe('Pair of Linear Equations (Consistency & Intersection)', () => {
    it('Finds unique intersection for intersecting lines (a1/a2 ≠ b1/b2)', () => {
      // Line 1: 2x + 3y = 8
      // Line 2: 5x + 4y = 13
      // det = 2*4 - 5*3 = 8 - 15 = -7
      // Solution: x = 1, y = 2
      const res = solveLinearSystem(2, 3, 8, 5, 4, 13);
      expect(res.type).toBe('intersecting');
      expect(res.x).toBeCloseTo(1, 6);
      expect(res.y).toBeCloseTo(2, 6);
    });

    it('Detects parallel lines / inconsistent system (no solution)', () => {
      // Line 1: 2x + 4y = 6
      // Line 2: 2x + 4y = 10
      const res = solveLinearSystem(2, 4, 6, 2, 4, 10);
      expect(res.type).toBe('parallel');
      expect(res.x).toBeNull();
      expect(res.y).toBeNull();
    });

    it('Detects coincident lines (infinitely many solutions)', () => {
      // Line 1: 2x + 3y = 6
      // Line 2: 4x + 6y = 12
      const res = solveLinearSystem(2, 3, 6, 4, 6, 12);
      expect(res.type).toBe('coincident');
      expect(res.x).toBeNull();
      expect(res.y).toBeNull();
    });
  });

  describe('Thales Theorem (Basic Proportionality Theorem)', () => {
    it('Computes EC correctly so that AD/DB = AE/EC', () => {
      // AD = 2, DB = 3, AE = 4 -> EC should be (4 * 3) / 2 = 6
      const res = thalesTheorem(2, 3, 4);
      expect(res.ec).toBeCloseTo(6, 6);
      expect(res.ratioLeft).toBeCloseTo(res.ratioRight, 6);
      expect(res.isProportional).toBe(true);
    });

    it('Guards against zero or negative segment lengths', () => {
      expect(() => thalesTheorem(0, 3, 4)).toThrow();
      expect(() => thalesTheorem(2, -1, 4)).toThrow();
    });
  });

  describe('Statistics (Central Tendency & Dispersion)', () => {
    it('Computes mean, median, and mode accurately', () => {
      const data = [10, 20, 20, 30, 40];
      const stats = calculateStatistics(data);
      expect(stats.mean).toBe(24);
      expect(stats.median).toBe(20);
      expect(stats.modes).toEqual([20]);
      expect(stats.min).toBe(10);
      expect(stats.max).toBe(40);
    });

    it('Computes median correctly for even number of data points', () => {
      const data = [4, 8, 12, 16];
      const stats = calculateStatistics(data);
      expect(stats.median).toBe(10); // (8 + 12) / 2
    });

    it('Handles outlier effect on mean vs median', () => {
      const normalData = [10, 11, 12, 13, 14];
      const withOutlier = [10, 11, 12, 13, 140]; // 140 is extreme outlier
      const stats1 = calculateStatistics(normalData);
      const stats2 = calculateStatistics(withOutlier);

      expect(stats1.median).toBe(12);
      expect(stats2.median).toBe(12); // Median remains robust!
      expect(stats2.mean).toBeGreaterThan(stats1.mean); // Mean is heavily distorted!
    });
  });

  describe('Coordinate Section Formula', () => {
    it('Computes internal division point correctly', () => {
      // Points A(1, 1) and B(5, 5), ratio 1:1 (midpoint)
      const mid = sectionFormula(1, 1, 5, 5, 1, 1);
      expect(mid.x).toBe(3);
      expect(mid.y).toBe(3);

      // Ratio 1:2 on segment (0, 0) to (6, 9) -> (1*6 + 2*0)/3 = 2, (1*9 + 2*0)/3 = 3
      const pt = sectionFormula(0, 0, 6, 9, 1, 2);
      expect(pt.x).toBe(2);
      expect(pt.y).toBe(3);
    });
  });
});

