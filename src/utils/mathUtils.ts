/**
 * Mathematical Calculation Utilities for MATHVERSE
 * Ensures calculations are completely independent from UI components for rigorous testing.
 */

export function expandBinomialSquare(a: number, b: number) {
  const squareA = a * a;
  const crossTerm = 2 * a * b;
  const squareB = b * b;
  const sumOfRegions = squareA + crossTerm + squareB;
  const directSquare = (a + b) ** 2;
  return {
    squareA,
    crossTerm,
    squareB,
    sumOfRegions,
    directSquare,
    isIdentical: sumOfRegions === directSquare,
  };
}

export function trigRatios(angleDeg: number, hyp: number = 10) {
  if (angleDeg <= 0 || angleDeg >= 90) {
    throw new Error('Angle must be acute for standard right-triangle definitions (0 < θ < 90).');
  }
  const rad = (angleDeg * Math.PI) / 180;
  const opp = hyp * Math.sin(rad);
  const adj = hyp * Math.cos(rad);
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.tan(rad);
  const pythagoreanSum = sin * sin + cos * cos;
  return {
    opp,
    adj,
    sin,
    cos,
    tan,
    pythagoreanSum,
  };
}

export function apNthTerm(a: number, d: number, n: number): number {
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error('n must be a positive integer.');
  }
  return a + (n - 1) * d;
}

export function apSum(a: number, d: number, n: number): number {
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error('n must be a positive integer.');
  }
  return (n / 2) * (2 * a + (n - 1) * d);
}

export function checkTriangleInequality(a: number, b: number, c: number): boolean {
  if (a <= 0 || b <= 0 || c <= 0) return false;
  return a + b > c && b + c > a && c + a > b;
}

export function heronArea(a: number, b: number, c: number): number {
  if (!checkTriangleInequality(a, b, c)) return 0;
  const s = (a + b + c) / 2;
  const product = s * (s - a) * (s - b) * (s - c);
  return product > 0 ? Math.sqrt(product) : 0;
}

export function cartesianDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function cartesianMidpoint(x1: number, y1: number, x2: number, y2: number) {
  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2,
  };
}

export function quadraticRoots(a: number, b: number, c: number) {
  if (a === 0) {
    throw new Error('Leading coefficient a cannot be zero in a quadratic equation.');
  }
  const disc = b * b - 4 * a * c;
  if (disc > 0) {
    return {
      disc,
      type: 'two_distinct_real' as const,
      root1: (-b + Math.sqrt(disc)) / (2 * a),
      root2: (-b - Math.sqrt(disc)) / (2 * a),
    };
  } else if (disc === 0) {
    const root = -b / (2 * a);
    return {
      disc: 0,
      type: 'equal_real' as const,
      root1: root,
      root2: root,
    };
  } else {
    return {
      disc,
      type: 'no_real' as const,
      root1: null,
      root2: null,
    };
  }
}

export function cylinderMetrics(r: number, h: number) {
  if (r <= 0 || h <= 0) {
    throw new Error('Dimensions must be strictly positive.');
  }
  const baseArea = Math.PI * r * r;
  const csa = 2 * Math.PI * r * h;
  const tsa = 2 * Math.PI * r * (r + h);
  const volume = Math.PI * r * r * h;
  return { baseArea, csa, tsa, volume };
}

export function circleMetrics(r: number) {
  if (r <= 0) {
    throw new Error('Radius must be strictly positive.');
  }
  const circumference = 2 * Math.PI * r;
  const area = Math.PI * r * r;
  return { circumference, area };
}
