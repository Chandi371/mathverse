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

/**
 * Srinivasa Ramanujan Mathematics Utilities
 * (National Mathematics Day — December 22)
 */

export interface RamanujanMagicSquare {
  grid: number[][];
  magicConstant: number;
  rowSums: number[];
  colSums: number[];
  diag1Sum: number;
  diag2Sum: number;
  cornersSum: number;
  centerSum: number;
  quadrantSums: number[];
  isValid: boolean;
}

export function generateRamanujanMagicSquare(
  a: number,
  b: number,
  c: number,
  d: number
): RamanujanMagicSquare {
  const row1 = [a, b, c, d];
  const row2 = [d + 1, c - 1, b - 3, a + 3];
  const row3 = [b - 2, a + 2, d + 2, c - 2];
  const row4 = [c + 1, d - 1, a + 1, b - 1];
  const grid = [row1, row2, row3, row4];

  const magicConstant = a + b + c + d;
  const rowSums = grid.map((r) => r.reduce((acc, v) => acc + v, 0));
  const colSums = [0, 1, 2, 3].map((colIdx) =>
    grid.reduce((acc, row) => acc + row[colIdx], 0)
  );

  const diag1Sum = grid[0][0] + grid[1][1] + grid[2][2] + grid[3][3];
  const diag2Sum = grid[0][3] + grid[1][2] + grid[2][1] + grid[3][0];
  const cornersSum = grid[0][0] + grid[0][3] + grid[3][0] + grid[3][3];
  const centerSum = grid[1][1] + grid[1][2] + grid[2][1] + grid[2][2];

  const quadrantSums = [
    grid[0][0] + grid[0][1] + grid[1][0] + grid[1][1], // Top-Left
    grid[0][2] + grid[0][3] + grid[1][2] + grid[1][3], // Top-Right
    grid[2][0] + grid[2][1] + grid[3][0] + grid[3][1], // Bottom-Left
    grid[2][2] + grid[2][3] + grid[3][2] + grid[3][3], // Bottom-Right
  ];

  const allSumsMatch =
    rowSums.every((s) => s === magicConstant) &&
    colSums.every((s) => s === magicConstant) &&
    diag1Sum === magicConstant &&
    diag2Sum === magicConstant &&
    cornersSum === magicConstant &&
    centerSum === magicConstant &&
    quadrantSums.every((s) => s === magicConstant);

  return {
    grid,
    magicConstant,
    rowSums,
    colSums,
    diag1Sum,
    diag2Sum,
    cornersSum,
    centerSum,
    quadrantSums,
    isValid: allSumsMatch,
  };
}

export function evaluateRamanujanRadical(depth: number = 6): {
  depth: number;
  value: number;
  steps: { k: number; innerVal: number }[];
} {
  const safeDepth = Math.max(1, Math.min(15, Math.floor(depth)));
  const steps: { k: number; innerVal: number }[] = [];

  let current = Math.sqrt(1 + (safeDepth + 1) * (safeDepth + 2));
  steps.unshift({ k: safeDepth, innerVal: current });

  for (let k = safeDepth - 1; k >= 1; k--) {
    current = Math.sqrt(1 + (k + 1) * current);
    steps.unshift({ k, innerVal: current });
  }

  return {
    depth: safeDepth,
    value: current,
    steps,
  };
}

export function taxicab1729Metrics() {
  const pair1 = { a: 1, b: 12, cubeA: 1, cubeB: 1728, sum: 1729 };
  const pair2 = { a: 9, b: 10, cubeA: 729, cubeB: 1000, sum: 1729 };
  return {
    target: 1729,
    pair1,
    pair2,
    isEqual: pair1.sum === 1729 && pair2.sum === 1729,
  };
}

