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

export function expandBinomialDiff(a: number, b: number) {
  const squareA = a * a;
  const crossTerm = 2 * a * b;
  const squareB = b * b;
  const computed = squareA - crossTerm + squareB;
  const directSquare = (a - b) ** 2;
  return {
    squareA,
    crossTerm,
    squareB,
    computed,
    directSquare,
    isIdentical: Math.abs(computed - directSquare) < 1e-9,
  };
}

export function diffOfSquares(a: number, b: number) {
  const squareA = a * a;
  const squareB = b * b;
  const diff = squareA - squareB;
  const factored = (a - b) * (a + b);
  return {
    squareA,
    squareB,
    diff,
    factored,
    isIdentical: Math.abs(diff - factored) < 1e-9,
  };
}

export function solveLinearSystem(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
) {
  // Line 1: a1*x + b1*y = c1
  // Line 2: a2*x + b2*y = c2
  const det = a1 * b2 - a2 * b1;
  const detX = c1 * b2 - c2 * b1;
  const detY = a1 * c2 - a2 * c1;

  if (Math.abs(det) > 1e-9) {
    return {
      type: 'intersecting' as const,
      x: detX / det,
      y: detY / det,
      consistency: 'Consistent with Unique Solution',
      ratioComparison: 'a1/a2 ≠ b1/b2',
    };
  }

  // If det === 0, check if lines are coincident or parallel
  if (Math.abs(detX) < 1e-9 && Math.abs(detY) < 1e-9) {
    return {
      type: 'coincident' as const,
      x: null,
      y: null,
      consistency: 'Consistent and Dependent (Infinitely Many Solutions)',
      ratioComparison: 'a1/a2 = b1/b2 = c1/c2',
    };
  }

  return {
    type: 'parallel' as const,
    x: null,
    y: null,
    consistency: 'Inconsistent (No Real Solution)',
    ratioComparison: 'a1/a2 = b1/b2 ≠ c1/c2',
  };
}

export function thalesTheorem(ad: number, db: number, ae: number) {
  if (ad <= 0 || db <= 0 || ae <= 0) {
    throw new Error('Segment lengths must be strictly positive.');
  }
  // By Thales Theorem (BPT): AD / DB = AE / EC => EC = (AE * DB) / AD
  const ec = (ae * db) / ad;
  const ab = ad + db;
  const ac = ae + ec;
  const ratioLeft = ad / db;
  const ratioRight = ae / ec;
  const similarityScale = ad / ab;
  return {
    ec,
    ab,
    ac,
    ratioLeft,
    ratioRight,
    similarityScale,
    isProportional: Math.abs(ratioLeft - ratioRight) < 1e-9,
  };
}

export function calculateStatistics(data: number[]) {
  if (data.length === 0) {
    throw new Error('Dataset must contain at least one value.');
  }
  const n = data.length;
  const sum = data.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  const sorted = [...data].sort((a, b) => a - b);
  let median: number;
  const mid = Math.floor(n / 2);
  if (n % 2 !== 0) {
    median = sorted[mid];
  } else {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // Mode
  const counts: Record<number, number> = {};
  let maxCount = 0;
  sorted.forEach((v) => {
    counts[v] = (counts[v] || 0) + 1;
    if (counts[v] > maxCount) maxCount = counts[v];
  });
  const modes: number[] = [];
  if (maxCount > 1) {
    Object.keys(counts).forEach((k) => {
      if (counts[Number(k)] === maxCount) modes.push(Number(k));
    });
  }

  // Variance & standard deviation
  const variance = sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);

  return {
    n,
    sum,
    mean,
    median,
    modes,
    min: sorted[0],
    max: sorted[n - 1],
    variance,
    stdDev,
  };
}

export function sectionFormula(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  m: number,
  n: number
) {
  if (m + n === 0) {
    throw new Error('Sum of ratio terms m + n cannot be zero.');
  }
  return {
    x: (m * x2 + n * x1) / (m + n),
    y: (m * y2 + n * y1) / (m + n),
  };
}
