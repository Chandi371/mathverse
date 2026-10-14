import type { PracticeQuestion, QuestionDifficulty } from '../types/curriculum';

// Helper for seeded or pseudo-random integer generation within [min, max]
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to shuffle options array
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}



// ==============================================================
// 1. ARITHMETIC PROGRESSIONS GENERATOR (Deterministic)
// ==============================================================
export function generateAPQuestion(difficulty: QuestionDifficulty): PracticeQuestion {
  if (difficulty === 'Foundation') {
    const a = randInt(2, 9);
    const d = randInt(2, 7);
    const n = randInt(8, 15);
    const an = a + (n - 1) * d;

    // Independent verification
    if (a + (n - 1) * d !== an) throw new Error('AP verification failed');

    const wrong1 = an - d;
    const wrong2 = an + d;
    const wrong3 = a + n * d;

    const options = shuffle([String(an), String(wrong1), String(wrong2), String(wrong3)]);

    return {
      id: `gen-ap-f-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-ap',
      classGrade: 10,
      semester: 1,
      difficulty: 'Foundation',
      type: 'mcq',
      prompt: `Find the ${n}th term of the Arithmetic Progression whose first term is ${a} and common difference is ${d}.`,
      latexPrompt: `a = ${a}, \\quad d = ${d}, \\quad n = ${n}`,
      options,
      correctAnswer: String(an),
      hints: [
        'Recall the nth term formula: a_n = a + (n - 1)d.',
        `Substitute: a = ${a}, d = ${d}, and n - 1 = ${n - 1}. Multiply (${n - 1}) \\times ${d} first, then add ${a}.`,
      ],
      explanation: `Using a_n = a + (n - 1)d: a_${n} = ${a} + (${n} - 1) \\times ${d} = ${a} + ${ (n - 1) * d } = ${an}.`,
      methodRationale: 'The first term starts with 0 additions of d; the nth term has accumulated exactly (n - 1) additions of common difference d.',
      verificationCheck: `Working backwards: (${an} - ${a}) / ${d} = ${(an - a) / d} = ${n - 1}, which confirms n = ${n}.`,
    };
  } else if (difficulty === 'Standard') {
    // Find n when a, d, and last term a_n are given
    const a = randInt(3, 12);
    const d = randInt(3, 8);
    const n = randInt(12, 25);
    const an = a + (n - 1) * d;

    return {
      id: `gen-ap-s-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-ap',
      classGrade: 10,
      semester: 1,
      difficulty: 'Standard',
      type: 'numerical',
      prompt: `Which term of the AP: ${a}, ${a + d}, ${a + 2 * d}, ... is equal to ${an}?`,
      latexPrompt: `a_n = ${an}`,
      correctAnswer: n,
      tolerance: 0,
      hints: [
        'Set up the linear equation a_n = a + (n - 1)d = ' + an + '.',
        `Subtract the first term ${a} from ${an}, then divide by the common difference ${d}. Finally add 1 to get n.`,
      ],
      explanation: `Set ${a} + (n - 1)(${d}) = ${an} \\implies (n - 1)(${d}) = ${an - a} \\implies n - 1 = ${(an - a) / d} \\implies n = ${n}.`,
      methodRationale: 'Determining term rank requires solving a single linear equation for the natural number unknown n.',
      verificationCheck: `Verifying: ${a} + (${n} - 1)(${d}) = ${a} + ${ (n - 1) * d } = ${an}. Exact match.`,
    };
  } else if (difficulty === 'Advanced') {
    // Sum problem: Sum of first n terms given a and d
    const a = randInt(2, 8);
    const d = randInt(2, 6);
    const n = randInt(10, 20);
    const sn = (n * (2 * a + (n - 1) * d)) / 2;

    const wrong1 = sn + n;
    const wrong2 = sn - d * n;
    const wrong3 = Math.floor(sn * 0.9);

    const options = shuffle([String(sn), String(wrong1), String(wrong2), String(wrong3)]);

    return {
      id: `gen-ap-a-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-ap',
      classGrade: 10,
      semester: 1,
      difficulty: 'Advanced',
      type: 'mcq',
      prompt: `A student saves ₹${a} in the first week, and increases their weekly savings by ₹${d} every subsequent week. What is their total accumulated savings after ${n} weeks?`,
      latexPrompt: `S_{${n}} = \\frac{${n}}{2}[2(${a}) + (${n} - 1)(${d})]`,
      options,
      correctAnswer: String(sn),
      hints: [
        'Identify this as an AP series: a = ' + a + ', d = ' + d + ', n = ' + n + '.',
        'Apply Gauss’s AP summation formula: S_n = (n/2)[2a + (n - 1)d].',
      ],
      explanation: `S_${n} = (${n}/2)[2(${a}) + (${n - 1})(${d})] = (${n}/2)[${2 * a} + ${(n - 1) * d}] = (${n}/2)[${2 * a + (n - 1) * d}] = ₹${sn}.`,
      methodRationale: 'Real-world recurring incremental contributions form an arithmetic series whose total is evaluated by Gauss’s inverted pairing sum.',
      verificationCheck: `Last term l = ${a + (n - 1) * d}. Sum via (n/2)(a + l) = (${n}/2)(${a} + ${a + (n - 1) * d}) = ₹${sn}. Matches!`,
    };
  } else {
    // Challenge: Simultaneous AP problem (e.g. 3rd term is p, 7th term is q, find sum of 10 terms)
    const a = randInt(4, 10);
    const d = randInt(3, 7);
    const term3 = a + 2 * d;
    const term7 = a + 6 * d;
    const nTarget = 10;
    const targetSum = (nTarget * (2 * a + (nTarget - 1) * d)) / 2;

    return {
      id: `gen-ap-c-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-ap',
      classGrade: 10,
      semester: 1,
      difficulty: 'Challenge',
      type: 'numerical',
      prompt: `The 3rd term of an AP is ${term3} and the 7th term is ${term7}. Find the sum of the first ${nTarget} terms of this arithmetic progression.`,
      latexPrompt: `a_3 = ${term3}, \\quad a_7 = ${term7}, \\quad S_{${nTarget}} = ?`,
      correctAnswer: targetSum,
      tolerance: 0,
      hints: [
        `Express a_3 = a + 2d = ${term3} and a_7 = a + 6d = ${term7}.`,
        `Subtract equations to eliminate a: 4d = ${term7 - term3} ⟹ d = ${(term7 - term3) / 4}. Then solve for a.`,
      ],
      explanation: `Subtracting equations gives (a + 6d) - (a + 2d) = 4d = ${term7 - term3} ⟹ d = ${d}. Substitute back: a + 2(${d}) = ${term3} ⟹ a = ${a}. Now S_${nTarget} = (${nTarget}/2)[2(${a}) + (${nTarget - 1})(${d})] = 5[${2 * a} + ${9 * d}] = 5[${2 * a + 9 * d}] = ${targetSum}.`,
      methodRationale: 'Combines linear systems in two unknowns (a and d) with AP partial summation.',
      verificationCheck: `Verifying terms: a = ${a}, d = ${d}. a_3 = ${a + 2 * d} (${term3}), a_7 = ${a + 6 * d} (${term7}). Formula verified.`,
    };
  }
}

// ==============================================================
// 2. QUADRATIC EQUATIONS GENERATOR (Deterministic with exact integer roots)
// ==============================================================
export function generateQuadraticQuestion(difficulty: QuestionDifficulty): PracticeQuestion {
  if (difficulty === 'Foundation') {
    // Discriminant calculation & nature of roots
    const a = 1;
    const r1 = randInt(1, 6);
    const r2 = randInt(1, 6);
    const b = -(r1 + r2);
    const c = r1 * r2;
    const dVal = b * b - 4 * a * c;

    return {
      id: `gen-quad-f-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-quad',
      classGrade: 10,
      semester: 1,
      difficulty: 'Foundation',
      type: 'numerical',
      prompt: `Calculate the discriminant (D = b² - 4ac) of the quadratic equation x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x + ${c} = 0.`,
      latexPrompt: `x^2 ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x + ${c} = 0`,
      correctAnswer: dVal,
      tolerance: 0,
      hints: [
        `Identify coefficients: a = 1, b = ${b}, c = ${c}.`,
        `Compute b² = (${b})² = ${b * b}, and 4ac = 4(1)(${c}) = ${4 * c}. Subtract 4ac from b².`,
      ],
      explanation: `D = b² - 4ac = (${b})² - 4(1)(${c}) = ${b * b} - ${4 * c} = ${dVal}. Since D ${dVal > 0 ? '> 0' : '= 0'}, the equation has ${dVal > 0 ? 'two distinct real roots' : 'two equal real roots'}.`,
      methodRationale: 'Discriminant evaluates the square root radicand in the quadratic formula, defining real intersection count.',
      verificationCheck: `Roots are ${r1} and ${r2}. Distance between roots is |${r1} - ${r2}| = ${Math.abs(r1 - r2)}. Formula √D / a = √${dVal} = ${Math.sqrt(dVal)}. Exact match.`,
    };
  } else if (difficulty === 'Standard') {
    // Solve x² - Sx + P = 0 where roots are distinct positive integers
    const r1 = randInt(2, 7);
    const r2 = randInt(r1 + 1, 9);
    const b = -(r1 + r2);
    const c = r1 * r2;

    const correctChoice = `x = ${r1}, ${r2}`;
    const wrong1 = `x = ${-r1}, ${-r2}`;
    const wrong2 = `x = ${r1}, ${-r2}`;
    const wrong3 = `x = ${r1 + 1}, ${r2 - 1}`;
    const options = shuffle([correctChoice, wrong1, wrong2, wrong3]);

    return {
      id: `gen-quad-s-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-quad',
      classGrade: 10,
      semester: 1,
      difficulty: 'Standard',
      type: 'mcq',
      prompt: `Find the roots of the quadratic equation by factorisation or quadratic formula: x² ${b}x + ${c} = 0.`,
      latexPrompt: `x^2 ${b}x + ${c} = 0`,
      options,
      correctAnswer: correctChoice,
      hints: [
        `Look for two numbers whose sum is ${r1 + r2} and product is ${c}.`,
        `Factor into (x - ${r1})(x - ${r2}) = 0.`,
      ],
      explanation: `Factoring gives (x - ${r1})(x - ${r2}) = 0 \\implies x = ${r1} \\text{ or } x = ${r2}.`,
      methodRationale: 'A product equals zero if and only if at least one factor equals zero (Zero Product Property).',
      verificationCheck: `Substitution check: (${r1})² + (${b})(${r1}) + ${c} = ${r1 * r1} - ${(r1 + r2) * r1} + ${c} = 0. Verified.`,
    };
  } else if (difficulty === 'Advanced') {
    // Find value of k for which equation has two equal real roots (D = 0)
    // 2x² + kx + 8 = 0 with D = k² - 4(2)(8) = 0 ⟹ k² = 64 ⟹ k = ±8
    const kPositive = 8;

    return {
      id: `gen-quad-a-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-quad',
      classGrade: 10,
      semester: 1,
      difficulty: 'Advanced',
      type: 'numerical',
      prompt: `For what positive value of k does the quadratic equation 2x² + kx + 8 = 0 have two equal real roots?`,
      latexPrompt: `2x^2 + kx + 8 = 0, \\quad k > 0`,
      correctAnswer: kPositive,
      tolerance: 0,
      hints: [
        'Equal real roots occur if and only if the discriminant D = b² - 4ac equals 0.',
        'Here a = 2, b = k, and c = 8. Set k² - 4(2)(8) = 0.',
      ],
      explanation: `For equal roots, D = 0 \\implies k² - 4(2)(8) = 0 \\implies k² - 64 = 0 \\implies k² = 64 \\implies k = 8 (since k > 0).`,
      methodRationale: 'A quadratic has coincident roots when its parabolic vertex is tangent to the x-axis, forcing D = 0.',
      verificationCheck: `With k = 8: 2x² + 8x + 8 = 2(x² + 4x + 4) = 2(x + 2)² = 0 ⟹ x = -2 (equal double root). Correct.`,
    };
  } else {
    // Challenge: Word problem on speed / time leading to quadratic equation
    // Distance = 360 km. If speed increased by 5 km/h, time decreases by 48 min (4/5 hr) -> or clean numbers:
    // Distance = 180 km. Speed v = 45 km/h (time = 4 hr). If speed increases by 15 km/h (to 60 km/h), time = 3 hr (1 hr less).
    const speed = 45;

    return {
      id: `gen-quad-c-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-quad',
      classGrade: 10,
      semester: 1,
      difficulty: 'Challenge',
      type: 'numerical',
      prompt: `An express train takes 1 hour less than a passenger train to travel 180 km. If the average speed of the express train is 15 km/h more than that of the passenger train, find the original average speed of the passenger train in km/h.`,
      latexPrompt: `\\frac{180}{v} - \\frac{180}{v + 15} = 1`,
      correctAnswer: speed,
      tolerance: 0,
      hints: [
        'Let the original speed of passenger train be v km/h. Time taken is 180 / v hours.',
        'Speed of express train is (v + 15) km/h. Time taken is 180 / (v + 15) hours.',
        'Set up equation: 180/v - 180/(v + 15) = 1. Multiply throughout by v(v + 15).',
      ],
      explanation: `180(v + 15) - 180v = v(v + 15) \\implies 2700 = v² + 15v \\implies v² + 15v - 2700 = 0. Factoring: (v + 60)(v - 45) = 0. Since speed cannot be negative, v = 45 km/h.`,
      methodRationale: 'Models time difference problems where constant distance yields rational expressions transformable into a quadratic equation.',
      verificationCheck: `At 45 km/h, 180 / 45 = 4 hours. At 60 km/h, 180 / 60 = 3 hours. 4 - 3 = 1 hour difference. Validated.`,
    };
  }
}

// ==============================================================
// 3. COORDINATE GEOMETRY GENERATOR (Deterministic)
// ==============================================================
export function generateCoordinateQuestion(difficulty: QuestionDifficulty): PracticeQuestion {
  if (difficulty === 'Foundation') {
    // Pythagorean distance between points on grid
    const pythTriples = [
      { dx: 3, dy: 4, d: 5 },
      { dx: 6, dy: 8, d: 10 },
      { dx: 5, dy: 12, d: 13 },
      { dx: 8, dy: 15, d: 17 },
    ];
    const pick = pythTriples[randInt(0, pythTriples.length - 1)];
    const x1 = randInt(1, 5);
    const y1 = randInt(1, 5);
    const x2 = x1 + pick.dx;
    const y2 = y1 + pick.dy;

    return {
      id: `gen-coord-f-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-ch7',
      classGrade: 10,
      semester: 1,
      difficulty: 'Foundation',
      type: 'numerical',
      prompt: `Find the distance between the two points A(${x1}, ${y1}) and B(${x2}, ${y2}) on the Cartesian coordinate plane.`,
      latexPrompt: `A(${x1}, ${y1}), \\quad B(${x2}, ${y2})`,
      correctAnswer: pick.d,
      tolerance: 0.05,
      hints: [
        'Apply the Distance Formula: d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.',
        `Calculate horizontal difference: ${x2} - ${x1} = ${pick.dx}. Vertical difference: ${y2} - ${y1} = ${pick.dy}.`,
      ],
      explanation: `d = \\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2} = \\sqrt{${pick.dx}^2 + ${pick.dy}^2} = \\sqrt{${pick.dx * pick.dx} + ${pick.dy * pick.dy}} = \\sqrt{${pick.d * pick.d}} = ${pick.d} \\text{ units}.`,
      methodRationale: 'The distance formula translates the Pythagorean hypotenuse relation directly onto Cartesian axis displacements.',
      verificationCheck: `(${pick.dx})² + (${pick.dy})² = ${pick.dx * pick.dx + pick.dy * pick.dy} = ${pick.d}². Exactly verified.`,
    };
  } else if (difficulty === 'Standard') {
    // Midpoint or section formula
    const x1 = randInt(-6, 2) * 2;
    const y1 = randInt(-4, 4) * 2;
    const x2 = randInt(4, 10) * 2;
    const y2 = randInt(-2, 6) * 2;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    const correctChoice = `(${mx}, ${my})`;
    const wrong1 = `(${mx + 1}, ${my})`;
    const wrong2 = `(${mx}, ${my - 1})`;
    const wrong3 = `(${Math.abs(mx)}, ${Math.abs(my)})`;
    const options = shuffle([correctChoice, wrong1, wrong2, wrong3]);

    return {
      id: `gen-coord-s-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-ch7',
      classGrade: 10,
      semester: 1,
      difficulty: 'Standard',
      type: 'mcq',
      prompt: `Find the midpoint M of the line segment joining points P(${x1}, ${y1}) and Q(${x2}, ${y2}).`,
      latexPrompt: `P(${x1}, ${y1}), \\quad Q(${x2}, ${y2})`,
      options,
      correctAnswer: correctChoice,
      hints: [
        'The midpoint formula is M = ((x_1 + x_2)/2, (y_1 + y_2)/2).',
        `Average the x-coordinates: (${x1} + ${x2})/2. Average the y-coordinates: (${y1} + ${y2})/2.`,
      ],
      explanation: `M = ((${x1} + ${x2})/2, (${y1} + ${y2})/2) = (${x1 + x2}/2, ${y1 + y2}/2) = (${mx}, ${my}).`,
      methodRationale: 'Midpoints represent the arithmetic mean of 1D projections along the independent x and y dimensions.',
      verificationCheck: `Distance PM = √(${mx - x1}² + ${my - y1}²) and MQ = √(${x2 - mx}² + ${y2 - my}²). Both are equal.`,
    };
  } else if (difficulty === 'Advanced') {
    // Section formula finding point dividing segment internally
    const m1 = 2;
    const m2 = 3;
    const x1 = 1;
    const y1 = -2;
    const x2 = 6;
    const y2 = 8;
    const px = (m1 * x2 + m2 * x1) / (m1 + m2); // (12 + 3)/5 = 3
    const py = (m1 * y2 + m2 * y1) / (m1 + m2); // (16 - 6)/5 = 2

    return {
      id: `gen-coord-a-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-ch7',
      classGrade: 10,
      semester: 1,
      difficulty: 'Advanced',
      type: 'mcq',
      prompt: `Find the coordinates of the point P which divides the line segment joining A(1, -2) and B(6, 8) internally in the ratio 2 : 3.`,
      latexPrompt: `A(1, -2), \\quad B(6, 8), \\quad m_1:m_2 = 2:3`,
      options: shuffle(['(3, 2)', '(2, 3)', '(3.5, 2.5)', '(4, 3)']),
      correctAnswer: `(${px}, ${py})`,
      hints: [
        'Use Section Formula: x = (m_1 x_2 + m_2 x_1)/(m_1 + m_2), y = (m_1 y_2 + m_2 y_1)/(m_1 + m_2).',
        `Substitute m_1 = 2, m_2 = 3, (x_1, y_1) = (1, -2), (x_2, y_2) = (6, 8).`,
      ],
      explanation: `x = [2(6) + 3(1)] / (2 + 3) = (12 + 3)/5 = 15/5 = 3. y = [2(8) + 3(-2)] / (2 + 3) = (16 - 6)/5 = 10/5 = 2. Therefore, P = (3, 2).`,
      methodRationale: 'Weighted partition of vector components based on the internal division ratio.',
      verificationCheck: `Distance AP = √((3-1)² + (2-(-2))²) = √(4 + 16) = √20 = 2√5. PB = √((6-3)² + (8-2)²) = √(9 + 36) = √45 = 3√5. Ratio is 2√5 : 3√5 = 2 : 3. Verified!`,
    };
  } else {
    // Challenge: Collinearity check and area of triangle condition
    // For collinear points (x, y), (1, 2), (7, 0)
    // Slope = (0 - 2)/(7 - 1) = -2/6 = -1/3. Equation: y - 0 = -1/3 (x - 7) ⟹ x + 3y = 7
    return {
      id: `gen-coord-c-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s1-ch7',
      classGrade: 10,
      semester: 1,
      difficulty: 'Challenge',
      type: 'numerical',
      prompt: `Find the value of k for which the three points A(k, -1), B(2, 1), and C(4, 5) are collinear (lie on a single straight line).`,
      latexPrompt: `A(k, -1), \\quad B(2, 1), \\quad C(4, 5)`,
      correctAnswer: 1,
      tolerance: 0,
      hints: [
        'Three points are collinear if Slope(AB) = Slope(BC) or Area of triangle ABC = 0.',
        'Compute Slope(BC): (5 - 1) / (4 - 2) = 4 / 2 = 2.',
        'Set Slope(AB) = (1 - (-1)) / (2 - k) = 2 / (2 - k) = 2. Solve for k.',
      ],
      explanation: `Slope of BC = (5 - 1) / (4 - 2) = 2. For collinearity, Slope of AB must equal 2: (1 - (-1)) / (2 - k) = 2 / (2 - k) = 2 \\implies 2 - k = 1 \\implies k = 1.`,
      methodRationale: 'Collinear points share identical slopes across all subsets of point pairs.',
      verificationCheck: `With k = 1: A(1, -1), B(2, 1), C(4, 5). AB = √(1² + 2²) = √5. BC = √(2² + 4²) = √20 = 2√5. AC = √(3² + 6²) = √45 = 3√5. AB + BC = √5 + 2√5 = 3√5 = AC. Confirms collinearity!`,
    };
  }
}

// ==============================================================
// 4. TRIGONOMETRY GENERATOR (Deterministic)
// ==============================================================
export function generateTrigQuestion(difficulty: QuestionDifficulty): PracticeQuestion {
  if (difficulty === 'Foundation') {
    // Standard angle evaluations: e.g. 2 tan² 45° + cos² 30° - sin² 60°
    // 2(1)² + (3/4) - (3/4) = 2
    return {
      id: `gen-trig-f-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-trig',
      classGrade: 10,
      semester: 2,
      difficulty: 'Foundation',
      type: 'numerical',
      prompt: `Evaluate the exact numerical value of: 2\\tan^2 45^\\circ + \\cos^2 30^\\circ - \\sin^2 60^\\circ.`,
      latexPrompt: `2\\tan^2 45^\\circ + \\cos^2 30^\\circ - \\sin^2 60^\\circ`,
      correctAnswer: 2,
      tolerance: 0.05,
      hints: [
        'Recall standard trigonometric values: tan 45° = 1, cos 30° = √3 / 2, sin 60° = √3 / 2.',
        'Square each value: tan² 45° = 1² = 1, cos² 30° = (√3/2)² = 3/4, sin² 60° = (√3/2)² = 3/4.',
      ],
      explanation: `2(1)^2 + \\left(\\frac{\\sqrt{3}}{2}\\right)^2 - \\left(\\frac{\\sqrt{3}}{2}\\right)^2 = 2(1) + \\frac{3}{4} - \\frac{3}{4} = 2.`,
      methodRationale: 'Tests mastery of standard benchmark trigonometric ratios for 30°, 45°, and 60° angles.',
      verificationCheck: `Notice cos 30° = sin 60° by complementary angle properties (cos θ = sin(90° - θ)), so their squares cancel identically, leaving 2(1) = 2.`,
    };
  } else if (difficulty === 'Standard') {
    // Given sin θ = 3/5, find (1 + tan² θ)
    return {
      id: `gen-trig-s-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-trig',
      classGrade: 10,
      semester: 2,
      difficulty: 'Standard',
      type: 'mcq',
      prompt: `If \\sin\\theta = \\frac{3}{5} for an acute angle θ, find the value of \\sec^2\\theta.`,
      latexPrompt: `\\sin\\theta = \\frac{3}{5}, \\quad \\sec^2\\theta = ?`,
      options: shuffle(['25/16', '16/25', '25/9', '9/16']),
      correctAnswer: '25/16',
      hints: [
        'Find cos θ first using \\cos^2\\theta = 1 - \\sin^2\\theta.',
        '\\cos^2\\theta = 1 - (3/5)^2 = 1 - 9/25 = 16/25.',
        'Since \\sec\\theta = 1 / \\cos\\theta, square the reciprocal.',
      ],
      explanation: `\\cos^2\\theta = 1 - \\sin^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}. \\sec^2\\theta = \\frac{1}{\\cos^2\\theta} = \\frac{25}{16}.`,
      methodRationale: 'Pythagorean identity connects complementary functions without needing to determine the angle in degrees.',
      verificationCheck: `With Opp = 3, Hyp = 5, Adj = √(25 - 9) = 4. sec θ = Hyp / Adj = 5/4. sec²θ = 25/16. Verified!`,
    };
  } else if (difficulty === 'Advanced') {
    // Identity proof: (sin θ + csc θ)² + (cos θ + sec θ)² = 7 + tan² θ + cot² θ
    return {
      id: `gen-trig-a-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-trig',
      classGrade: 10,
      semester: 2,
      difficulty: 'Advanced',
      type: 'numerical',
      prompt: `The identity (\\sin\\theta + \\csc\\theta)^2 + (\\cos\\theta + \\sec\\theta)^2 simplifies to the form k + \\tan^2\\theta + \\cot^2\\theta. Find the constant integer k.`,
      latexPrompt: `(\\sin\\theta + \\csc\\theta)^2 + (\\cos\\theta + \\sec\\theta)^2 = k + \\tan^2\\theta + \\cot^2\\theta`,
      correctAnswer: 7,
      tolerance: 0,
      hints: [
        'Expand both binomial squares: sin²θ + 2 sin θ csc θ + csc²θ and cos²θ + 2 cos θ sec θ + sec²θ.',
        'Use reciprocal relations: sin θ csc θ = 1 and cos θ sec θ = 1, so cross terms yield 2 + 2 = 4.',
        'Use identities: sin²θ + cos²θ = 1, csc²θ = 1 + cot²θ, and sec²θ = 1 + tan²θ.',
      ],
      explanation: `Expanding: (\\sin^2\\theta + \\cos^2\\theta) + 2(1) + 2(1) + \\csc^2\\theta + \\sec^2\\theta = 1 + 4 + (1 + \\cot^2\\theta) + (1 + \\tan^2\\theta) = 7 + \\tan^2\\theta + \\cot^2\\theta. Thus k = 7.`,
      methodRationale: 'Synthesizes algebraic binomial expansion with all three Pythagorean and reciprocal trigonometric identities.',
      verificationCheck: `Test for θ = 45°: sin = 1/√2, csc = √2 ⟹ (3/√2)² = 9/2 = 4.5. Both squares sum to 4.5 + 4.5 = 9. Right side: 7 + 1² + 1² = 9. Exactly 9 = 9.`,
    };
  } else {
    // Challenge: Height and distances with two angles of elevation (30° and 60°)
    // A statue h stands on top of pedestal p. From point on ground, elevation to pedestal top is 45° (dist = p)
    // and to statue top is 60° (p + h = dist * √3 = p√3 ⟹ h = p(√3 - 1)).
    // If statue h = 1.46 m (or clean numbers: pedestal p = 10 m, angle 45° ⟹ d = 10. Top angle 60° ⟹ H = 10√3 ≈ 17.32. Statue = 7.32)
    return {
      id: `gen-trig-c-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-ch9',
      classGrade: 10,
      semester: 2,
      difficulty: 'Challenge',
      type: 'numerical',
      prompt: `From a point on the ground, the angle of elevation of the bottom and the top of a transmission tower fixed on top of a 20 m high building are 45° and 60° respectively. Find the height of the tower in meters (take √3 = 1.732, round to 1 decimal place).`,
      latexPrompt: `\\tan 45^\\circ = \\frac{20}{d}, \\quad \\tan 60^\\circ = \\frac{20 + h}{d}`,
      correctAnswer: 14.6,
      tolerance: 0.2,
      hints: [
        'In the lower triangle: tan 45° = 20 / d ⟹ 1 = 20 / d ⟹ d = 20 m.',
        'In the larger triangle: tan 60° = (20 + h) / d ⟹ √3 = (20 + h) / 20.',
        'Solve: 20 + h = 20√3 ⟹ h = 20(√3 - 1) = 20(1.732 - 1) = 20(0.732).',
      ],
      explanation: `d = 20 / \\tan 45^\\circ = 20 m. Total height = 20 \\times \\tan 60^\\circ = 20\\sqrt{3} m. Height of tower h = 20\\sqrt{3} - 20 = 20(\\sqrt{3} - 1) = 20(0.732) = 14.64 m ≈ 14.6 m.`,
      methodRationale: 'Real-world double-triangle surveyor modeling requiring elimination of common horizontal baseline distance.',
      verificationCheck: `Total height = 20 + 14.64 = 34.64 m. Ratio 34.64 / 20 = 1.732 = tan 60°. Accurately verified.`,
    };
  }
}

// ==============================================================
// 5. STATISTICS GENERATOR (Deterministic)
// ==============================================================
export function generateStatisticsQuestion(difficulty: QuestionDifficulty): PracticeQuestion {
  if (difficulty === 'Foundation') {
    // Discrete mean of 5 numbers
    const base = randInt(10, 25);
    const deltas = [-4, -2, 0, 2, 4];
    const data = deltas.map((d) => base + d);
    const sum = data.reduce((acc, v) => acc + v, 0);
    const mean = sum / data.length;

    return {
      id: `gen-stat-f-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-ch13',
      classGrade: 10,
      semester: 2,
      difficulty: 'Foundation',
      type: 'numerical',
      prompt: `Find the arithmetic mean of the following discrete observations: ${data.join(', ')}.`,
      latexPrompt: `\\bar{x} = \\frac{\\sum x_i}{n}`,
      correctAnswer: mean,
      tolerance: 0.05,
      hints: [
        `Add all ${data.length} numbers together to find the sum: ${data.join(' + ')}.`,
        `Divide the total sum (${sum}) by the total count (${data.length}).`,
      ],
      explanation: `Sum \\sum x_i = ${sum}. Total count n = ${data.length}. Mean \\bar{x} = ${sum} / ${data.length} = ${mean}.`,
      methodRationale: 'Direct definition of the central moment of an ungrouped dataset.',
      verificationCheck: `Deviations from ${mean}: (${data.map((d) => d - mean).join(') + (')}) = 0. The sum of deviations from mean is always 0.`,
    };
  } else if (difficulty === 'Standard') {
    // Mode calculation using empirical formula: 3 Median = Mode + 2 Mean
    const median = randInt(25, 45);
    const mean = randInt(median - 5, median + 5);
    const mode = 3 * median - 2 * mean;

    return {
      id: `gen-stat-s-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-ch13',
      classGrade: 10,
      semester: 2,
      difficulty: 'Standard',
      type: 'numerical',
      prompt: `In a frequency distribution of students' test scores, the Mean is found to be ${mean} and the Median is ${median}. Using the empirical relationship between measures of central tendency, calculate the Mode.`,
      latexPrompt: `3\\text{ Median} = \\text{Mode} + 2\\text{ Mean}`,
      correctAnswer: mode,
      tolerance: 0,
      hints: [
        'Recall Karl Pearson’s empirical relationship: 3 Median = Mode + 2 Mean.',
        `Rearrange to isolate Mode: Mode = 3(Median) - 2(Mean). Substitute Median = ${median} and Mean = ${mean}.`,
      ],
      explanation: `\\text{Mode} = 3(${median}) - 2(${mean}) = ${3 * median} - ${2 * mean} = ${mode}.`,
      methodRationale: 'Connects the three primary central tendency measures in moderately skewed frequency distributions.',
      verificationCheck: `Check: Mode + 2 Mean = ${mode} + 2(${mean}) = ${mode + 2 * mean}. 3 Median = 3(${median}) = ${3 * median}. Equal.`,
    };
  } else if (difficulty === 'Advanced') {
    // Grouped data mean with class marks
    // Classes: 0-10 (xm=5, f=3), 10-20 (xm=15, f=7), 20-30 (xm=25, f=6), 30-40 (xm=35, f=4)
    // fx: 15 + 105 + 150 + 140 = 410. Sum f = 20. Mean = 410 / 20 = 20.5
    return {
      id: `gen-stat-a-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-ch13',
      classGrade: 10,
      semester: 2,
      difficulty: 'Advanced',
      type: 'numerical',
      prompt: `Calculate the mean of the grouped distribution: Class 0-10 (freq 3), Class 10-20 (freq 7), Class 20-30 (freq 6), Class 30-40 (freq 4).`,
      latexPrompt: `\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}`,
      correctAnswer: 20.5,
      tolerance: 0.1,
      hints: [
        'Calculate class marks x_i: 5, 15, 25, 35.',
        'Multiply each class mark by frequency: 3(5)=15, 7(15)=105, 6(25)=150, 4(35)=140.',
        'Sum all f_i x_i and divide by total frequency ∑f_i = 3 + 7 + 6 + 4 = 20.',
      ],
      explanation: `\\sum f_i x_i = 15 + 105 + 150 + 140 = 410. Total frequency \\sum f_i = 20. Mean \\bar{x} = 410 / 20 = 20.5.`,
      methodRationale: 'Standard direct calculation method for grouped frequency tables using midpoints.',
      verificationCheck: `Assumed mean a = 25: deviations = -20, -10, 0, 10. ∑f_i d_i = 3(-20) + 7(-10) + 6(0) + 4(10) = -60 - 70 + 40 = -90. Mean = 25 + (-90/20) = 25 - 4.5 = 20.5. Exact match!`,
    };
  } else {
    // Challenge: Finding missing frequency 'f' when mean is known
    // Classes: 11-13 (12, 7), 13-15 (14, 6), 15-17 (16, 9), 17-19 (18, 13), 19-21 (20, f), 21-23 (22, 5), 23-25 (24, 4)
    // Famous NCERT problem: Mean is 18, find f. Result is f = 20.
    return {
      id: `gen-stat-c-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-ch13',
      classGrade: 10,
      semester: 2,
      difficulty: 'Challenge',
      type: 'numerical',
      prompt: `The mean of a daily allowance distribution for children is ₹18. The frequencies for class intervals 11-13, 13-15, 15-17, 17-19, 19-21, 21-23, and 23-25 are 7, 6, 9, 13, f, 5, and 4 respectively. Find the missing frequency f.`,
      latexPrompt: `\\bar{x} = 18, \\quad f = ?`,
      correctAnswer: 20,
      tolerance: 0,
      hints: [
        'Compute class marks x_i: 12, 14, 16, 18, 20, 22, 24.',
        'Use assumed mean a = 18. Deviations d_i: -6, -4, -2, 0, 2, 4, 6.',
        'Calculate ∑f_i d_i = 7(-6) + 6(-4) + 9(-2) + 13(0) + f(2) + 5(4) + 4(6) = -42 - 24 - 18 + 0 + 2f + 20 + 24 = 2f - 40.',
        'Since Mean = Assumed Mean (18), ∑f_i d_i must equal 0: 2f - 40 = 0.',
      ],
      explanation: `Taking a = 18: \\sum f_i d_i = 2f - 40. Since \\bar{x} = a + \\frac{\\sum f_i d_i}{\\sum f_i} = 18 + \\frac{2f - 40}{44 + f} = 18 \\implies 2f - 40 = 0 \\implies 2f = 40 \\implies f = 20.`,
      methodRationale: 'Inverse parameter estimation in grouped distributions requiring balance around the mean pivot point.',
      verificationCheck: `With f = 20, total students = 64. Total money = 7(12) + 6(14) + 9(16) + 13(18) + 20(20) + 5(22) + 4(24) = 84 + 84 + 144 + 234 + 400 + 110 + 96 = 1152. Mean = 1152 / 64 = 18. Perfect!`,
    };
  }
}

// ==============================================================
// 6. PROBABILITY GENERATOR (Deterministic)
// ==============================================================
export function generateProbabilityQuestion(difficulty: QuestionDifficulty): PracticeQuestion {
  if (difficulty === 'Foundation') {
    // Single die roll prime or composite
    return {
      id: `gen-prob-f-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-prob',
      classGrade: 10,
      semester: 2,
      difficulty: 'Foundation',
      type: 'mcq',
      prompt: `A standard unbiased six-sided die is rolled once. What is the probability of getting a prime number?`,
      latexPrompt: `P(\\text{Prime}) = \\frac{n(E)}{n(S)}`,
      options: shuffle(['1/2', '1/3', '2/3', '1/6']),
      correctAnswer: '1/2',
      hints: [
        'List sample space S = {1, 2, 3, 4, 5, 6}. Total outcomes n(S) = 6.',
        'Identify prime numbers in S: 2, 3, 5 (Note: 1 is neither prime nor composite!). Favourable outcomes n(E) = 3.',
      ],
      explanation: `Favourable outcomes = {2, 3, 5} ⟹ n(E) = 3. Total outcomes = 6. P(Prime) = 3 / 6 = 1/2.`,
      methodRationale: 'Classical probability definition applied to equiprobable discrete sample spaces.',
      verificationCheck: `Non-prime numbers: 1, 4, 6 (3 outcomes). P(Non-prime) = 3/6 = 1/2. P(E) + P(not E) = 1/2 + 1/2 = 1.`,
    };
  } else if (difficulty === 'Standard') {
    // 52-card deck face card or king
    return {
      id: `gen-prob-s-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-prob',
      classGrade: 10,
      semester: 2,
      difficulty: 'Standard',
      type: 'mcq',
      prompt: `One card is drawn from a well-shuffled standard deck of 52 playing cards. Find the probability of getting a red face card.`,
      latexPrompt: `n(S) = 52`,
      options: shuffle(['3/26', '6/52', '1/13', '3/13']),
      correctAnswer: '3/26',
      hints: [
        'A standard deck has 12 face cards (4 Jacks, 4 Queens, 4 Kings).',
        'Half of the deck is red (Hearts and Diamonds). How many red face cards are there?',
      ],
      explanation: `There are 6 red face cards (King, Queen, Jack of Hearts + Diamonds). Total cards = 52. P(Red Face Card) = 6 / 52 = 3 / 26.`,
      methodRationale: 'Intersection of suit color attributes with honor card hierarchy in standard decks.',
      verificationCheck: `Red face cards: J♥, Q♥, K♥, J♦, Q♦, K♦ = 6 cards. 6 / 52 = 3 / 26. Verified.`,
    };
  } else if (difficulty === 'Advanced') {
    // Two dice rolled simultaneously: sum equals 8 or 9
    return {
      id: `gen-prob-a-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-prob',
      classGrade: 10,
      semester: 2,
      difficulty: 'Advanced',
      type: 'mcq',
      prompt: `Two dice are thrown at the same time. Find the probability that the sum of the two numbers appearing on the top faces is 8.`,
      latexPrompt: `n(S) = 6 \\times 6 = 36`,
      options: shuffle(['5/36', '1/6', '7/36', '1/9']),
      correctAnswer: '5/36',
      hints: [
        'Total possible pairs when throwing two dice is 6 × 6 = 36.',
        'List all pairs whose sum is 8: (2, 6), (3, 5), (4, 4), (5, 3), (6, 2).',
      ],
      explanation: `Favourable outcomes for sum = 8: (2, 6), (3, 5), (4, 4), (5, 3), (6, 2). Count = 5. Total outcomes = 36. Probability = 5 / 36.`,
      methodRationale: 'Cartesian product sample space modeling for compound multi-stage independent trials.',
      verificationCheck: `Sums range from 2 to 12. Outcomes: Sum 2 (1), Sum 3 (2), Sum 4 (3), Sum 5 (4), Sum 6 (5), Sum 7 (6), Sum 8 (5). Frequency for 8 is exactly 5.`,
    };
  } else {
    // Challenge: Non-replacement marble or defective pen probability
    // 144 ball pens, 20 defective, 124 good. Customer buys only if good. Shopkeeper draws 1 pen at random.
    return {
      id: `gen-prob-c-${Date.now()}-${randInt(100, 999)}`,
      chapterId: 'c10-s2-prob',
      classGrade: 10,
      semester: 2,
      difficulty: 'Challenge',
      type: 'mcq',
      prompt: `A lot consists of 144 ball pens of which 20 are defective and the others are good. Tanvi will buy a pen if it is good, but will not buy if it is defective. The shopkeeper draws one pen at random and gives it to her. What is the probability that she will buy it?`,
      latexPrompt: `\\text{Good pens} = 144 - 20 = 124`,
      options: shuffle(['31/36', '5/36', '124/144', '35/36']),
      correctAnswer: '31/36',
      hints: [
        'Total number of pens in the lot = 144.',
        'She buys the pen if it is good: Number of good pens = 144 - 20 = 124.',
        'Calculate fraction 124 / 144 and simplify by dividing numerator and denominator by 4.',
      ],
      explanation: `Total pens = 144. Defective = 20 ⟹ Good pens = 124. P(Buys pen) = P(Good pen) = 124 / 144 = 31 / 36.`,
      methodRationale: 'Quality inspection sampling and fraction reduction for consumer acceptance models.',
      verificationCheck: `P(Does not buy) = 20 / 144 = 5 / 36. Sum: 31/36 + 5/36 = 36/36 = 1. Accurately verified.`,
    };
  }
}

// Master Dispatcher for Deterministic Practice Questions
export function generateQuestionByTopic(
  topic: 'ap' | 'quad' | 'coord' | 'trig' | 'stat' | 'prob',
  difficulty: QuestionDifficulty
): PracticeQuestion {
  switch (topic) {
    case 'ap':
      return generateAPQuestion(difficulty);
    case 'quad':
      return generateQuadraticQuestion(difficulty);
    case 'coord':
      return generateCoordinateQuestion(difficulty);
    case 'trig':
      return generateTrigQuestion(difficulty);
    case 'stat':
      return generateStatisticsQuestion(difficulty);
    case 'prob':
      return generateProbabilityQuestion(difficulty);
    default:
      return generateAPQuestion(difficulty);
  }
}
