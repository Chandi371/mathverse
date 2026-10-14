import type {
  PracticeQuestion,
  QuestionDifficulty,
  QuestionFormat,
  ClassGrade,
  Semester,
  GenerationMethod,
  ValidationMethod,
} from '../types/curriculum';

export interface QuestionFamilyMeta {
  id: string;
  name: string;
  classGrade: ClassGrade;
  semester: Semester;
  chapterId: string;
  topic: string;
  subtopic: string;
  skill: string;
  supportedDifficulties: QuestionDifficulty[];
  format: QuestionFormat;
  generationMethod: GenerationMethod;
  validationMethod: ValidationMethod;
  generate: (difficulty: QuestionDifficulty, seed?: number) => PracticeQuestion;
}

// Pseudo-random generator with optional seed support for reproducibility
export function createRng(seed?: number) {
  let s = seed !== undefined ? seed % 2147483647 : Math.floor(Math.random() * 2147483647);
  if (s <= 0) s += 2147483646;

  return {
    next: () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    },
    int: (min: number, max: number) => {
      s = (s * 16807) % 2147483647;
      const r = (s - 1) / 2147483646;
      return Math.floor(r * (max - min + 1)) + min;
    },
    shuffle: <T>(arr: T[]): T[] => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        s = (s * 16807) % 2147483647;
        const j = Math.floor(((s - 1) / 2147483646) * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    },
  };
}

// ==============================================================
// QUESTION REGISTRY: 26 CHAPTERS DEFINED COMPREHENSIVELY
// ==============================================================
export const questionRegistry: QuestionFamilyMeta[] = [
  // ------------------------------------------------------------
  // CLASS 9 — SEMESTER 1
  // ------------------------------------------------------------

  // Ch 1: Number Systems (Exponents & Real Numbers)
  {
    id: 'qf-c9-num-laws',
    name: 'Laws of Exponents & Rational Powers',
    classGrade: 9,
    semester: 1,
    chapterId: 'c9-s1-ch1',
    topic: 'Number Systems',
    subtopic: 'Laws of Integral & Rational Exponents',
    skill: 'Evaluating and simplifying expressions using exponent laws',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      if (diff === 'Foundation') {
        const base = rng.int(2, 5);
        const p1 = rng.int(2, 4);
        const p2 = rng.int(1, 3);
        const ans = Math.pow(base, p1 + p2);
        return {
          id: `qf-c9-num-${diff}-${Date.now()}-${rng.int(10, 99)}`,
          familyId: 'qf-c9-num-laws',
          type: 'numerical',
          prompt: `Simplify and compute the numerical value of: ${base}^${p1} \\cdot ${base}^${p2}.`,
          latexPrompt: `${base}^{${p1}} \\cdot ${base}^{${p2}}`,
          correctAnswer: ans,
          tolerance: 0,
          hints: [
            'Use product law of exponents: a^m \\cdot a^n = a^{m+n}.',
            `Add the exponents: ${p1} + ${p2} = ${p1 + p2}, then compute ${base}^{${p1 + p2}}.`,
          ],
          explanation: `Using a^m \\cdot a^n = a^{m+n}: ${base}^${p1} \\cdot ${base}^${p2} = ${base}^{${p1 + p2}} = ${ans}.`,
          difficulty: diff,
          chapterId: 'c9-s1-ch1',
          classGrade: 9,
          semester: 1,
          topic: 'Number Systems',
          subtopic: 'Laws of Exponents',
          skill: 'Product law simplification',
          generationMethod: 'deterministic',
          validationMethod: 'exact-match',
          methodRationale: 'Identical bases in multiplication combine by summing powers.',
          verificationCheck: `${Math.pow(base, p1)} \\times ${Math.pow(base, p2)} = ${ans}. Verified.`,
        };
      } else {
        // Standard / Advanced: Rationalising factor
        const a = rng.int(2, 5);
        const b = rng.int(2, 3);
        const denom = a * a - b;
        return {
          id: `qf-c9-num-${diff}-${Date.now()}-${rng.int(10, 99)}`,
          familyId: 'qf-c9-num-laws',
          type: 'mcq',
          prompt: `Identify the rationalised denominator when simplifying 1 / (${a} + \\sqrt{${b}}).`,
          latexPrompt: `\\frac{1}{${a} + \\sqrt{${b}}}`,
          options: rng.shuffle([String(denom), String(a * a + b), String(denom - 1), String(a - b)]),
          correctAnswer: String(denom),
          hints: [
            'Multiply numerator and denominator by conjugate surd (' + a + ' - √' + b + ').',
            `Denominator becomes (${a})² - (√${b})² = ${a * a} - ${b}.`,
          ],
          explanation: `Multiplying by conjugate: (${a} + √${b})(${a} - √${b}) = ${a}² - ${b} = ${a * a - b} = ${denom}.`,
          difficulty: diff,
          chapterId: 'c9-s1-ch1',
          classGrade: 9,
          semester: 1,
          topic: 'Number Systems',
          subtopic: 'Rationalisation of Surds',
          skill: 'Conjugate multiplication',
          generationMethod: 'deterministic',
          validationMethod: 'exact-match',
        };
      }
    },
  },

  // Ch 2: Polynomials & Identities (Class 9)
  {
    id: 'qf-c9-poly-identities',
    name: 'Algebraic Identities & Factor Theorem',
    classGrade: 9,
    semester: 1,
    chapterId: 'c9-s1-poly',
    topic: 'Algebra',
    subtopic: 'Special Binomial Identities and Zeroes',
    skill: 'Evaluating polynomials and applying special cubic/quadratic identities',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      if (diff === 'Foundation' || diff === 'Standard') {
        // Degree or remainder
        const a = rng.int(2, 4);
        const r = rng.int(1, 3);
        // p(x) = x^2 - a*x + 5, find remainder when divided by (x - r)
        const p_r = r * r - a * r + 5;
        return {
          id: `qf-c9-poly-${diff}-${Date.now()}-${rng.int(10, 99)}`,
          familyId: 'qf-c9-poly-identities',
          type: 'numerical',
          prompt: `Find the remainder when p(x) = x² - ${a}x + 5 is divided by (x - ${r}).`,
          latexPrompt: `p(${r}) = (${r})^2 - ${a}(${r}) + 5`,
          correctAnswer: p_r,
          tolerance: 0,
          hints: [
            'By the Remainder Theorem, the remainder upon dividing p(x) by (x - a) is simply p(a).',
            `Substitute x = ${r} into the polynomial expression.`,
          ],
          explanation: `p(${r}) = (${r})² - ${a}(${r}) + 5 = ${r * r} - ${a * r} + 5 = ${p_r}.`,
          difficulty: diff,
          chapterId: 'c9-s1-poly',
          classGrade: 9,
          semester: 1,
          topic: 'Algebra',
          subtopic: 'Remainder Theorem',
          skill: 'Evaluating polynomial remainder',
          generationMethod: 'deterministic',
          validationMethod: 'exact-match',
        };
      } else {
        // Advanced: sum of cubes with a + b + c = 0
        const x = rng.int(5, 12);
        const y = rng.int(2, 6);
        const z = -(x + y);
        const ans = 3 * x * y * z;
        return {
          id: `qf-c9-poly-${diff}-${Date.now()}-${rng.int(10, 99)}`,
          familyId: 'qf-c9-poly-identities',
          type: 'numerical',
          prompt: `Evaluate without direct cubing: (${x})³ + (${y})³ + (${z})³.`,
          latexPrompt: `(${x})^3 + (${y})^3 + (${z})^3`,
          correctAnswer: ans,
          tolerance: 0,
          hints: [
            `Check the sum: ${x} + ${y} + (${z}) = ${x + y + z}.`,
            'Recall identity: if a + b + c = 0, then a³ + b³ + c³ = 3abc.',
          ],
          explanation: `Since a + b + c = ${x} + ${y} + (${z}) = 0, sum of cubes = 3abc = 3(${x})(${y})(${z}) = ${ans}.`,
          difficulty: diff,
          chapterId: 'c9-s1-poly',
          classGrade: 9,
          semester: 1,
          topic: 'Algebra',
          subtopic: 'Sum of Three Cubes Identity',
          skill: 'Symmetric cubic evaluation',
          generationMethod: 'deterministic',
          validationMethod: 'exact-match',
        };
      }
    },
  },

  // Ch 3: Coordinate Geometry (Class 9)
  {
    id: 'qf-c9-coord-quadrants',
    name: 'Cartesian Plane & Quadrants',
    classGrade: 9,
    semester: 1,
    chapterId: 'c9-s1-ch3',
    topic: 'Coordinate Geometry',
    subtopic: 'Sign of coordinates and axes placement',
    skill: 'Identifying quadrants and geometric loci',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'mcq',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const x = rng.int(-8, 8);
      const y = rng.int(-8, 8);
      let quad = 'Quadrant I';
      if (x > 0 && y > 0) quad = 'Quadrant I';
      else if (x < 0 && y > 0) quad = 'Quadrant II';
      else if (x < 0 && y < 0) quad = 'Quadrant III';
      else if (x > 0 && y < 0) quad = 'Quadrant IV';
      else if (x === 0) quad = 'On Y-Axis';
      else quad = 'On X-Axis';

      return {
        id: `qf-c9-coord-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-coord-quadrants',
        type: 'mcq',
        prompt: `In which quadrant or on which axis does the point P(${x}, ${y}) lie?`,
        latexPrompt: `P(${x}, ${y})`,
        options: rng.shuffle(['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV']),
        correctAnswer: quad.startsWith('Quadrant') ? quad : 'Quadrant I',
        hints: [
          'Signs determine quadrant: (+, +) in Q1, (-, +) in Q2, (-, -) in Q3, (+, -) in Q4.',
          `x = ${x} and y = ${y}. Observe their positive/negative signs.`,
        ],
        explanation: `With x = ${x} and y = ${y}, point P lies in ${quad}.`,
        difficulty: diff,
        chapterId: 'c9-s1-ch3',
        classGrade: 9,
        semester: 1,
        topic: 'Coordinate Geometry',
        subtopic: 'Quadrant Identification',
        skill: 'Spatial 2D coordinate analysis',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 4: Linear Equations in Two Variables (Class 9)
  {
    id: 'qf-c9-linear-solutions',
    name: 'Linear Equations Solutions & Coordinates',
    classGrade: 9,
    semester: 1,
    chapterId: 'c9-s1-ch4',
    topic: 'Algebra',
    subtopic: 'Finding solutions for ax + by = c',
    skill: 'Evaluating unknowns and satisfying linear equations',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const a = rng.int(2, 5);
      const b = rng.int(2, 4);
      const x = rng.int(1, 5);
      const y = rng.int(1, 5);
      const k = a * x + b * y;

      return {
        id: `qf-c9-lin-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-linear-solutions',
        type: 'numerical',
        prompt: `If x = ${x} and y = ${y} is a solution of the equation ${a}x + ${b}y = k, find the value of k.`,
        latexPrompt: `${a}(${x}) + ${b}(${y}) = k`,
        correctAnswer: k,
        tolerance: 0,
        hints: [
          `Substitute x = ${x} and y = ${y} into the left side of the equation.`,
          `Calculate ${a} × ${x} = ${a * x} and ${b} × ${y} = ${b * y}, then sum them.`,
        ],
        explanation: `k = ${a}(${x}) + ${b}(${y}) = ${a * x} + ${b * y} = ${k}.`,
        difficulty: diff,
        chapterId: 'c9-s1-ch4',
        classGrade: 9,
        semester: 1,
        topic: 'Algebra',
        subtopic: 'Linear Equation Solutions',
        skill: 'Substitution into linear model',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 5: Euclid's Geometry (Class 9)
  {
    id: 'qf-c9-euclid-postulates',
    name: "Euclid's Axioms & Postulates",
    classGrade: 9,
    semester: 1,
    chapterId: 'c9-s1-ch5',
    topic: 'Geometry',
    subtopic: "Axioms and Euclid's 5th Postulate",
    skill: 'Geometric reasoning from axiomatic foundations',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'mcq',
    generationMethod: 'authored',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const ang1 = rng.int(75, 88);
      const ang2 = rng.int(75, 89);
      const sum = ang1 + ang2;
      return {
        id: `qf-c9-euc-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-euclid-postulates',
        type: 'mcq',
        prompt: `A transversal line intersects two straight lines. If the interior angles on the same side measure ${ang1}° and ${ang2}°, on which side will the two lines eventually intersect?`,
        latexPrompt: `${ang1}^\\circ + ${ang2}^\\circ = ${sum}^\\circ < 180^\\circ`,
        options: rng.shuffle([
          'On the same side where the angles lie',
          'On the opposite side',
          'They will never intersect (parallel)',
          'Cannot be determined without side lengths',
        ]),
        correctAnswer: 'On the same side where the angles lie',
        hints: [
          'Recall Euclid’s Fifth Postulate regarding interior angles on the same side.',
          `Calculate the sum: ${ang1}° + ${ang2}° = ${sum}°. Compare this with 180° (two right angles).`,
        ],
        explanation: `Since the sum of consecutive interior angles is ${sum}° < 180°, Euclid's 5th Postulate states the lines intersect on that very side.`,
        difficulty: diff,
        chapterId: 'c9-s1-ch5',
        classGrade: 9,
        semester: 1,
        topic: 'Geometry',
        subtopic: 'Euclid’s Postulates',
        skill: 'Axiomatic deductive reasoning',
        generationMethod: 'authored',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 6: Lines and Angles (Class 9)
  {
    id: 'qf-c9-lines-angles',
    name: 'Parallel Lines, Transversals & Angle Sum',
    classGrade: 9,
    semester: 1,
    chapterId: 'c9-s1-ch6',
    topic: 'Geometry',
    subtopic: 'Interior, Alternate, and Exterior Angles',
    skill: 'Angle deduction on Euclidean grids',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const a1 = rng.int(40, 75);
      const a2 = rng.int(35, 70);
      const a3 = 180 - (a1 + a2);
      return {
        id: `qf-c9-line-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-lines-angles',
        type: 'numerical',
        prompt: `In △ABC, ∠A = ${a1}° and ∠B = ${a2}°. Find the measure of interior angle ∠C in degrees.`,
        latexPrompt: `\\angle C = 180^\\circ - (${a1}^\\circ + ${a2}^\\circ)`,
        correctAnswer: a3,
        tolerance: 0,
        hints: [
          'The sum of interior angles in any Euclidean triangle is 180°.',
          `Subtract (${a1} + ${a2}) from 180.`,
        ],
        explanation: `∠C = 180° - (${a1}° + ${a2}°) = 180° - ${a1 + a2}° = ${a3}°.`,
        difficulty: diff,
        chapterId: 'c9-s1-ch6',
        classGrade: 9,
        semester: 1,
        topic: 'Geometry',
        subtopic: 'Angle Sum Property',
        skill: 'Deductive angle calculation',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // ------------------------------------------------------------
  // CLASS 9 — SEMESTER 2
  // ------------------------------------------------------------

  // Ch 7: Triangles (Class 9)
  {
    id: 'qf-c9-tri-congruence',
    name: 'Triangle Congruence Rules (SAS, ASA, AAS, SSS, RHS)',
    classGrade: 9,
    semester: 2,
    chapterId: 'c9-s2-ch7',
    topic: 'Geometry',
    subtopic: 'Valid vs Invalid Congruence Criteria',
    skill: 'Distinguishing valid congruence criteria from similarity criteria',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'mcq',
    generationMethod: 'authored',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      return {
        id: `qf-c9-tri-c-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-tri-congruence',
        type: 'mcq',
        prompt: 'Which of the following is NOT a valid criterion for the congruence of two triangles?',
        options: rng.shuffle(['AAA', 'SAS', 'ASA', 'RHS']),
        correctAnswer: 'AAA',
        hints: [
          'Congruence requires identical size as well as identical shape.',
          'Equal angles ensure identical shape (similarity), but sides can be scaled larger or smaller.',
        ],
        explanation: 'AAA guarantees similarity only, not congruence. Triangles with angles (60°, 60°, 60°) can have completely different side lengths.',
        difficulty: diff,
        chapterId: 'c9-s2-ch7',
        classGrade: 9,
        semester: 2,
        topic: 'Geometry',
        subtopic: 'Congruence Criteria',
        skill: 'Conceptual identification of geometric theorems',
        generationMethod: 'authored',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 8: Quadrilaterals (Class 9)
  {
    id: 'qf-c9-quad-midpoint',
    name: 'Mid-Point Theorem of Triangle',
    classGrade: 9,
    semester: 2,
    chapterId: 'c9-s2-ch8',
    topic: 'Geometry',
    subtopic: 'Line Segment Joining Midpoints',
    skill: 'Applying the Mid-Point Theorem to compute parallel segment lengths',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const half = rng.int(4, 15);
      const bc = half * 2;
      return {
        id: `qf-c9-quad-m-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-quad-midpoint',
        type: 'numerical',
        prompt: `In △ABC, points D and E are the midpoints of sides AB and AC respectively. If the third side BC = ${bc} cm, find the length of segment DE in cm.`,
        latexPrompt: `DE = \\frac{1}{2}BC = \\frac{1}{2}(${bc}\\text{ cm})`,
        correctAnswer: half,
        tolerance: 0,
        hints: [
          'Recall the Mid-Point Theorem: the segment joining midpoints of two sides is parallel to the third side and half its length.',
          `Calculate: ${bc} / 2.`,
        ],
        explanation: `By Mid-Point Theorem, DE = (1/2) BC = (1/2)(${bc}) = ${half} cm.`,
        difficulty: diff,
        chapterId: 'c9-s2-ch8',
        classGrade: 9,
        semester: 2,
        topic: 'Geometry',
        subtopic: 'Mid-Point Theorem',
        skill: 'Direct geometric ratio deduction',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 9: Circles (Class 9)
  {
    id: 'qf-c9-circle-subtended',
    name: 'Angle Subtended by Arc & Cyclic Quadrilaterals',
    classGrade: 9,
    semester: 2,
    chapterId: 'c9-s2-ch9',
    topic: 'Geometry',
    subtopic: 'Central vs Inscribed Angles',
    skill: 'Evaluating angles subtended by arcs and inscribed quadrilaterals',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const circum = rng.int(35, 75);
      const center = circum * 2;
      return {
        id: `qf-c9-circ-sub-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-circle-subtended',
        type: 'numerical',
        prompt: `An arc AB of a circle subtends an angle of ${center}° at the center O. Find the measure of the angle ∠APB subtended by it at a point P on the remaining part of the circle (in degrees).`,
        latexPrompt: `\\angle APB = \\frac{1}{2}\\angle AOB = \\frac{1}{2}(${center}^\\circ)`,
        correctAnswer: circum,
        tolerance: 0,
        hints: [
          'The angle subtended by an arc at the center is double the angle subtended by it at any point on the remaining circumference.',
          `Divide ${center}° by 2.`,
        ],
        explanation: `∠APB = (1/2) ∠AOB = (1/2)(${center}°) = ${circum}°.`,
        difficulty: diff,
        chapterId: 'c9-s2-ch9',
        classGrade: 9,
        semester: 2,
        topic: 'Geometry',
        subtopic: 'Central Angle Theorem',
        skill: 'Circle angle relationship calculation',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 10: Heron's Formula (Class 9)
  {
    id: 'qf-c9-heron-area',
    name: "Heron's Formula Triangle Area",
    classGrade: 9,
    semester: 2,
    chapterId: 'c9-s2-heron',
    topic: 'Mensuration',
    subtopic: 'Semi-perimeter and Area Computation',
    skill: 'Computing triangle area from 3 side lengths',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      // Valid Pythagorean triangle scaled: 3, 4, 5 (area = 6) or 5, 12, 13 (area = 30) or 6, 8, 10 (area = 24)
      const triangles = [
        { a: 3, b: 4, c: 5, area: 6 },
        { a: 6, b: 8, c: 10, area: 24 },
        { a: 5, b: 12, c: 13, area: 30 },
        { a: 9, b: 12, c: 15, area: 54 },
      ];
      const t = triangles[rng.int(0, triangles.length - 1)];
      const s = (t.a + t.b + t.c) / 2;

      return {
        id: `qf-c9-heron-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-heron-area',
        type: 'numerical',
        prompt: `Using Heron's Formula, calculate the area in cm² of a triangle having side lengths a = ${t.a} cm, b = ${t.b} cm, and c = ${t.c} cm.`,
        latexPrompt: `s = \\frac{${t.a} + ${t.b} + ${t.c}}{2} = ${s}, \\quad \\text{Area} = \\sqrt{s(s - a)(s - b)(s - c)}`,
        correctAnswer: t.area,
        tolerance: 0.1,
        hints: [
          `Find semi-perimeter s = (${t.a} + ${t.b} + ${t.c})/2 = ${s}.`,
          `Calculate products: ${s}(${s - t.a})(${s - t.b})(${s - t.c}) = ${s * (s - t.a) * (s - t.b) * (s - t.c)}, then take square root.`,
        ],
        explanation: `s = ${s}. Area = \\sqrt{${s}(${s - t.a})(${s - t.b})(${s - t.c})} = \\sqrt{${t.area * t.area}} = ${t.area} cm².`,
        difficulty: diff,
        chapterId: 'c9-s2-heron',
        classGrade: 9,
        semester: 2,
        topic: 'Mensuration',
        subtopic: "Heron's Formula",
        skill: 'Semi-perimeter radical calculation',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 11: Surface Areas & Volumes (Class 9)
  {
    id: 'qf-c9-mensuration-cylinder',
    name: 'Cylinder Surface Area and Volume',
    classGrade: 9,
    semester: 2,
    chapterId: 'c9-s2-ch11',
    topic: 'Mensuration',
    subtopic: 'Curved Surface Area & Volume of Cylinders',
    skill: 'Evaluating solid geometry formulas using π',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const r = 7 * rng.int(1, 2); // multiple of 7 simplifies 22/7
      const h = rng.int(5, 12);
      const csa = 2 * (22 / 7) * r * h;

      return {
        id: `qf-c9-cyl-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-mensuration-cylinder',
        type: 'numerical',
        prompt: `Find the curved surface area (CSA) in cm² of a right circular cylinder having base radius r = ${r} cm and height h = ${h} cm (take π = 22/7).`,
        latexPrompt: `\\text{CSA} = 2\\pi rh = 2 \\times \\frac{22}{7} \\times ${r} \\times ${h}`,
        correctAnswer: csa,
        tolerance: 0.5,
        hints: [
          'Recall formula: CSA = 2πrh.',
          `Substitute: 2 × (22/7) × ${r} × ${h}.`,
        ],
        explanation: `CSA = 2 \\times (22/7) \\times ${r} \\times ${h} = ${csa} cm².`,
        difficulty: diff,
        chapterId: 'c9-s2-ch11',
        classGrade: 9,
        semester: 2,
        topic: 'Mensuration',
        subtopic: 'Cylinder Surface Area',
        skill: 'Solid mensuration arithmetic',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 12: Statistics (Class 9)
  {
    id: 'qf-c9-stat-mean',
    name: 'Mean & Class Marks of Ungrouped Data',
    classGrade: 9,
    semester: 2,
    chapterId: 'c9-s2-ch12',
    topic: 'Statistics & Probability',
    subtopic: 'Central tendencies of raw discrete datasets',
    skill: 'Calculating arithmetic mean and class marks',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const base = rng.int(15, 30);
      const vals = [base - 4, base - 2, base, base + 2, base + 4];
      const sum = vals.reduce((a, b) => a + b, 0);
      const mean = sum / vals.length;

      return {
        id: `qf-c9-stat-m-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c9-stat-mean',
        type: 'numerical',
        prompt: `Find the arithmetic mean of the five observations: ${vals.join(', ')}.`,
        latexPrompt: `\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${sum}}{5}`,
        correctAnswer: mean,
        tolerance: 0.05,
        hints: [
          `Sum all 5 numbers: ${vals.join(' + ')} = ${sum}.`,
          `Divide the sum by total count 5.`,
        ],
        explanation: `Mean \\bar{x} = ${sum} / 5 = ${mean}.`,
        difficulty: diff,
        chapterId: 'c9-s2-ch12',
        classGrade: 9,
        semester: 2,
        topic: 'Statistics & Probability',
        subtopic: 'Ungrouped Mean',
        skill: 'Basic statistical averaging',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // ------------------------------------------------------------
  // CLASS 10 — SEMESTER 1
  // ------------------------------------------------------------

  // Ch 1: Real Numbers (Class 10)
  {
    id: 'qf-c10-real-hcf-lcm',
    name: 'Fundamental Theorem of Arithmetic & HCF-LCM',
    classGrade: 10,
    semester: 1,
    chapterId: 'c10-s1-ch1',
    topic: 'Number Systems',
    subtopic: 'HCF × LCM = a × b Relationship',
    skill: 'Finding LCM from HCF and integer factors',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const hcf = rng.int(4, 9);
      const m1 = rng.int(2, 5);
      const m2 = rng.int(6, 9);
      const a = hcf * m1;
      const b = hcf * m2;
      const lcm = hcf * m1 * m2;

      return {
        id: `qf-c10-real-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-real-hcf-lcm',
        type: 'numerical',
        prompt: `Given that HCF(${a}, ${b}) = ${hcf}, use the product relation HCF(a, b) × LCM(a, b) = a × b to calculate LCM(${a}, ${b}).`,
        latexPrompt: `\\text{LCM} = \\frac{${a} \\times ${b}}{${hcf}}`,
        correctAnswer: lcm,
        tolerance: 0,
        hints: [
          `Recall formula: HCF \\times LCM = a \\times b.`,
          `Substitute: LCM = (${a} \\times ${b}) / ${hcf}.`,
        ],
        explanation: `LCM = (${a} \\times ${b}) / ${hcf} = (${a / hcf} \\times ${b}) = ${lcm}.`,
        difficulty: diff,
        chapterId: 'c10-s1-ch1',
        classGrade: 10,
        semester: 1,
        topic: 'Number Systems',
        subtopic: 'HCF & LCM Product Property',
        skill: 'Integer divisibility deduction',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 2: Polynomials (Class 10)
  {
    id: 'qf-c10-poly-zeroes',
    name: 'Zeroes & Coefficients of Quadratic Polynomial',
    classGrade: 10,
    semester: 1,
    chapterId: 'c10-s1-ch2',
    topic: 'Algebra',
    subtopic: 'Sum and Product of Zeroes α, β',
    skill: 'Forming polynomials and finding coefficient ratios',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const r1 = rng.int(2, 6);
      const r2 = rng.int(1, 5);
      const sum = r1 + r2;
      const prod = r1 * r2;

      return {
        id: `qf-c10-poly-z-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-poly-zeroes',
        type: 'numerical',
        prompt: `If α and β are the zeroes of the quadratic polynomial p(x) = x² - ${sum}x + ${prod}, what is the numerical product of its zeroes (α · β)?`,
        latexPrompt: `p(x) = x^2 - ${sum}x + ${prod}, \\quad \\alpha\\beta = ?`,
        correctAnswer: prod,
        tolerance: 0,
        hints: [
          'For p(x) = ax² + bx + c, the product of zeroes is αβ = c / a.',
          `Here a = 1 and constant term c = ${prod}.`,
        ],
        explanation: `αβ = c / a = ${prod} / 1 = ${prod}.`,
        difficulty: diff,
        chapterId: 'c10-s1-ch2',
        classGrade: 10,
        semester: 1,
        topic: 'Algebra',
        subtopic: 'Relations Between Zeroes and Coefficients',
        skill: 'Polynomial coefficient interpretation',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 3: Pair of Linear Equations (Class 10)
  {
    id: 'qf-c10-linear-consistency',
    name: 'Linear System Consistency & Ratio Criteria',
    classGrade: 10,
    semester: 1,
    chapterId: 'c10-s1-ch3',
    topic: 'Algebra',
    subtopic: 'Unique, No Solution, and Infinitely Many Solutions',
    skill: 'Comparing coefficient ratios a1/a2, b1/b2, c1/c2',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'mcq',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const scenarios = [
        {
          a1: 2, b1: 3, c1: 7, a2: 4, b2: 6, c2: 14,
          ans: 'Coincident lines (Infinitely many solutions)',
          exp: 'a1/a2 = b1/b2 = c1/c2 = 1/2.',
        },
        {
          a1: 3, b1: 2, c1: 5, a2: 6, b2: 4, c2: 9,
          ans: 'Parallel lines (No solution / Inconsistent)',
          exp: 'a1/a2 = b1/b2 (1/2) ≠ c1/c2 (5/9).',
        },
        {
          a1: 1, b1: 2, c1: 3, a2: 3, b2: 4, c2: 5,
          ans: 'Intersecting lines (Unique solution / Consistent)',
          exp: 'a1/a2 = 1/3 ≠ b1/b2 = 2/4 = 1/2.',
        },
      ];
      const sc = scenarios[rng.int(0, scenarios.length - 1)];

      return {
        id: `qf-c10-lin-c-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-linear-consistency',
        type: 'mcq',
        prompt: `Determine the geometric nature of the pair of linear equations: ${sc.a1}x + ${sc.b1}y = ${sc.c1} and ${sc.a2}x + ${sc.b2}y = ${sc.c2}.`,
        latexPrompt: `\\frac{a_1}{a_2} = \\frac{${sc.a1}}{${sc.a2}}, \\quad \\frac{b_1}{b_2} = \\frac{${sc.b1}}{${sc.b2}}, \\quad \\frac{c_1}{c_2} = \\frac{${sc.c1}}{${sc.c2}}`,
        options: rng.shuffle([
          'Intersecting lines (Unique solution / Consistent)',
          'Parallel lines (No solution / Inconsistent)',
          'Coincident lines (Infinitely many solutions)',
          'Perpendicular lines passing through origin',
        ]),
        correctAnswer: sc.ans,
        hints: [
          `Compute ratio a1/a2 = ${sc.a1}/${sc.a2} and b1/b2 = ${sc.b1}/${sc.b2}.`,
          `Check whether ratios are equal, then compare with c1/c2 = ${sc.c1}/${sc.c2}.`,
        ],
        explanation: `${sc.exp} Hence, the system represents: ${sc.ans}.`,
        difficulty: diff,
        chapterId: 'c10-s1-ch3',
        classGrade: 10,
        semester: 1,
        topic: 'Algebra',
        subtopic: 'Consistency Criteria',
        skill: 'Analytical system classification',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 4: Quadratic Equations (Class 10)
  {
    id: 'qf-c10-quad-discriminant',
    name: 'Quadratic Discriminant & Exact Roots',
    classGrade: 10,
    semester: 1,
    chapterId: 'c10-s1-quad',
    topic: 'Algebra',
    subtopic: 'Roots by factorisation, completing square & formula',
    skill: 'Evaluating discriminant and solving ax² + bx + c = 0',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      if (diff === 'Foundation') {
        const r1 = rng.int(1, 5);
        const r2 = rng.int(1, 5);
        const b = -(r1 + r2);
        const c = r1 * r2;
        const dVal = b * b - 4 * c;
        return {
          id: `qf-c10-quad-f-${Date.now()}-${rng.int(10, 99)}`,
          familyId: 'qf-c10-quad-discriminant',
          type: 'numerical',
          prompt: `Find the discriminant D = b² - 4ac of the quadratic equation x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x + ${c} = 0.`,
          latexPrompt: `x^2 ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x + ${c} = 0`,
          correctAnswer: dVal,
          tolerance: 0,
          hints: [
            `Identify a = 1, b = ${b}, c = ${c}.`,
            `Calculate (${b})² - 4(1)(${c}).`,
          ],
          explanation: `D = b² - 4ac = (${b})² - 4(${c}) = ${b * b} - ${4 * c} = ${dVal}.`,
          difficulty: diff,
          chapterId: 'c10-s1-quad',
          classGrade: 10,
          semester: 1,
          topic: 'Algebra',
          subtopic: 'Discriminant',
          skill: 'Discriminant evaluation',
          generationMethod: 'deterministic',
          validationMethod: 'exact-match',
        };
      } else {
        // Find roots or positive root
        const r1 = rng.int(2, 6);
        const r2 = rng.int(7, 10);
        const b = -(r1 + r2);
        const c = r1 * r2;
        return {
          id: `qf-c10-quad-s-${Date.now()}-${rng.int(10, 99)}`,
          familyId: 'qf-c10-quad-discriminant',
          type: 'numerical',
          prompt: `Find the larger root of the quadratic equation x² ${b}x + ${c} = 0.`,
          latexPrompt: `x^2 ${b}x + ${c} = 0`,
          correctAnswer: r2,
          tolerance: 0,
          hints: [
            `Factor the quadratic into (x - ${r1})(x - ${r2}) = 0.`,
            `The two roots are ${r1} and ${r2}. Identify the larger one.`,
          ],
          explanation: `Factoring yields (x - ${r1})(x - ${r2}) = 0. Roots are x = ${r1} and x = ${r2}. The larger root is ${r2}.`,
          difficulty: diff,
          chapterId: 'c10-s1-quad',
          classGrade: 10,
          semester: 1,
          topic: 'Algebra',
          subtopic: 'Solving Quadratic Equations',
          skill: 'Factoring trinomials',
          generationMethod: 'deterministic',
          validationMethod: 'exact-match',
        };
      }
    },
  },

  // Ch 5: Arithmetic Progressions (Class 10)
  {
    id: 'qf-c10-ap-nth-term',
    name: 'AP nth Term & Sequence Properties',
    classGrade: 10,
    semester: 1,
    chapterId: 'c10-s1-ap',
    topic: 'Algebra',
    subtopic: 'First term, common difference, and general term an',
    skill: 'Finding specific terms and verifying AP sequences',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const a = rng.int(3, 9);
      const d = rng.int(3, 7);
      const n = rng.int(10, 20);
      const an = a + (n - 1) * d;

      return {
        id: `qf-c10-ap-n-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-ap-nth-term',
        type: 'numerical',
        prompt: `Find the ${n}th term of the AP: ${a}, ${a + d}, ${a + 2 * d}, ...`,
        latexPrompt: `a = ${a}, \\quad d = ${d}, \\quad a_{${n}} = ?`,
        correctAnswer: an,
        tolerance: 0,
        hints: [
          'Apply the general term formula: a_n = a + (n - 1)d.',
          `Substitute: a = ${a}, d = ${d}, n = ${n}.`,
        ],
        explanation: `a_${n} = ${a} + (${n} - 1)(${d}) = ${a} + ${(n - 1) * d} = ${an}.`,
        difficulty: diff,
        chapterId: 'c10-s1-ap',
        classGrade: 10,
        semester: 1,
        topic: 'Algebra',
        subtopic: 'nth Term of an AP',
        skill: 'Linear sequence interpolation',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 6: Triangles (Class 10)
  {
    id: 'qf-c10-tri-bpt',
    name: 'Basic Proportionality Theorem (Thales)',
    classGrade: 10,
    semester: 1,
    chapterId: 'c10-s1-ch6',
    topic: 'Geometry',
    subtopic: 'Thales Theorem and Segment Proportions',
    skill: 'Applying AD/DB = AE/EC to calculate unknown lengths',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const ad = rng.int(2, 5);
      const db = ad * 2;
      const ae = rng.int(3, 6);
      const ec = ae * 2;

      return {
        id: `qf-c10-bpt-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-tri-bpt',
        type: 'numerical',
        prompt: `In △ABC, line segment DE is drawn parallel to BC intersecting AB at D and AC at E. If AD = ${ad} cm, DB = ${db} cm, and AE = ${ae} cm, find the length of EC in cm.`,
        latexPrompt: `\\frac{AD}{DB} = \\frac{AE}{EC} \\implies \\frac{${ad}}{${db}} = \\frac{${ae}}{EC}`,
        correctAnswer: ec,
        tolerance: 0.1,
        hints: [
          'State Thales Theorem: AD / DB = AE / EC.',
          `Cross multiply: ${ad} \\times EC = ${db} \\times ${ae}.`,
        ],
        explanation: `By Basic Proportionality Theorem, AD/DB = AE/EC ⟹ ${ad}/${db} = ${ae}/EC ⟹ 1/2 = ${ae}/EC ⟹ EC = ${ec} cm.`,
        difficulty: diff,
        chapterId: 'c10-s1-ch6',
        classGrade: 10,
        semester: 1,
        topic: 'Geometry',
        subtopic: 'Basic Proportionality Theorem',
        skill: 'Proportional geometric reasoning',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 7: Coordinate Geometry (Class 10)
  {
    id: 'qf-c10-coord-distance',
    name: 'Distance & Section Formulas',
    classGrade: 10,
    semester: 1,
    chapterId: 'c10-s1-ch7',
    topic: 'Coordinate Geometry',
    subtopic: 'Distance Formula and Internal Division',
    skill: 'Evaluating Cartesian metric distance between points',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const triples = [
        { dx: 3, dy: 4, d: 5 },
        { dx: 6, dy: 8, d: 10 },
        { dx: 5, dy: 12, d: 13 },
      ];
      const pick = triples[rng.int(0, triples.length - 1)];
      const x1 = rng.int(1, 4);
      const y1 = rng.int(1, 4);
      const x2 = x1 + pick.dx;
      const y2 = y1 + pick.dy;

      return {
        id: `qf-c10-coord-d-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-coord-distance',
        type: 'numerical',
        prompt: `Find the distance between point A(${x1}, ${y1}) and point B(${x2}, ${y2}) on the Cartesian plane.`,
        latexPrompt: `d = \\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2}`,
        correctAnswer: pick.d,
        tolerance: 0.05,
        hints: [
          'Apply Distance Formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²].',
          `Compute (Δx)² = (${pick.dx})² = ${pick.dx * pick.dx} and (Δy)² = (${pick.dy})² = ${pick.dy * pick.dy}.`,
        ],
        explanation: `d = \\sqrt{${pick.dx}^2 + ${pick.dy}^2} = \\sqrt{${pick.dx * pick.dx + pick.dy * pick.dy}} = ${pick.d} units.`,
        difficulty: diff,
        chapterId: 'c10-s1-ch7',
        classGrade: 10,
        semester: 1,
        topic: 'Coordinate Geometry',
        subtopic: 'Distance Formula',
        skill: 'Cartesian distance computation',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // ------------------------------------------------------------
  // CLASS 10 — SEMESTER 2
  // ------------------------------------------------------------

  // Ch 8: Introduction to Trigonometry (Class 10)
  {
    id: 'qf-c10-trig-benchmark',
    name: 'Trigonometric Ratios & Pythagorean Identity',
    classGrade: 10,
    semester: 2,
    chapterId: 'c10-s2-trig',
    topic: 'Trigonometry',
    subtopic: 'Standard angles (30°, 45°, 60°) and sin²θ + cos²θ = 1',
    skill: 'Evaluating trigonometric functions and identities',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      // e.g. 2 tan² 45° + cos² 30° - sin² 60° = 2
      return {
        id: `qf-c10-trig-b-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-trig-benchmark',
        type: 'numerical',
        prompt: `Evaluate the exact value of: 2\\tan^2 45^\\circ + \\cos^2 30^\\circ - \\sin^2 60^\\circ.`,
        latexPrompt: `2(1)^2 + \\left(\\frac{\\sqrt{3}}{2}\\right)^2 - \\left(\\frac{\\sqrt{3}}{2}\\right)^2`,
        correctAnswer: 2,
        tolerance: 0.05,
        hints: [
          'tan 45° = 1, cos 30° = √3 / 2, sin 60° = √3 / 2.',
          'Notice that cos² 30° and sin² 60° cancel each other out.',
        ],
        explanation: `2(1)² + (3/4) - (3/4) = 2.`,
        difficulty: diff,
        chapterId: 'c10-s2-trig',
        classGrade: 10,
        semester: 2,
        topic: 'Trigonometry',
        subtopic: 'Standard Angle Ratios',
        skill: 'Exact radical trigonometric arithmetic',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 9: Some Applications of Trigonometry (Class 10)
  {
    id: 'qf-c10-trig-heights',
    name: 'Heights and Distances (Elevations & Depressions)',
    classGrade: 10,
    semester: 2,
    chapterId: 'c10-s2-ch9',
    topic: 'Trigonometry',
    subtopic: 'Single and Double Right Triangle Surveying',
    skill: 'Calculating inaccessible heights using tangent relations',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const d = rng.int(10, 30);
      // Angle 45°: height = d
      return {
        id: `qf-c10-trig-h-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-trig-heights',
        type: 'numerical',
        prompt: `From a point on the ground ${d} meters away from the foot of a vertical tower, the angle of elevation of the top of the tower is 45°. Find the height of the tower in meters.`,
        latexPrompt: `\\tan 45^\\circ = \\frac{h}{${d}} = 1`,
        correctAnswer: d,
        tolerance: 0.1,
        hints: [
          'tan θ = Opposite / Adjacent.',
          `Substitute θ = 45° and Adjacent = ${d} m. Since tan 45° = 1, height = distance.`,
        ],
        explanation: `h = ${d} \\times \\tan 45^\\circ = ${d} \\times 1 = ${d} meters.`,
        difficulty: diff,
        chapterId: 'c10-s2-ch9',
        classGrade: 10,
        semester: 2,
        topic: 'Trigonometry',
        subtopic: 'Angle of Elevation',
        skill: 'Surveyor height calculation',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 10: Circles (Class 10)
  {
    id: 'qf-c10-circles-tangents',
    name: 'Circle Tangents & External Point Theorem',
    classGrade: 10,
    semester: 2,
    chapterId: 'c10-s2-ch10',
    topic: 'Geometry',
    subtopic: 'Tangent Perpendicularity and Length Equivalence',
    skill: 'Evaluating tangent lengths using right-angle triangles',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const r = 5;
      const oq = 13;
      const pq = Math.round(Math.sqrt(oq * oq - r * r)); // 12

      return {
        id: `qf-c10-circ-t-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-circles-tangents',
        type: 'numerical',
        prompt: `A tangent PQ at a point P of a circle of radius r = ${r} cm meets a line through the center O at a point Q so that OQ = ${oq} cm. Find the length of the tangent PQ in cm.`,
        latexPrompt: `PQ = \\sqrt{OQ^2 - OP^2} = \\sqrt{${oq}^2 - ${r}^2}`,
        correctAnswer: pq,
        tolerance: 0.1,
        hints: [
          'The radius OP is perpendicular to the tangent PQ at the point of contact P (∠OPQ = 90°).',
          'Apply the Pythagorean Theorem in △OPQ: PQ² = OQ² - OP².',
        ],
        explanation: `In right △OPQ, PQ = \\sqrt{${oq}^2 - ${r}^2} = \\sqrt{${oq * oq} - ${r * r}} = \\sqrt{${pq * pq}} = ${pq} cm.`,
        difficulty: diff,
        chapterId: 'c10-s2-ch10',
        classGrade: 10,
        semester: 2,
        topic: 'Geometry',
        subtopic: 'Tangent to Circle',
        skill: 'Pythagorean deduction with circle tangents',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 11: Areas Related to Circles (Class 10)
  {
    id: 'qf-c10-areas-circles-sector',
    name: 'Sector Area & Arc Length',
    classGrade: 10,
    semester: 2,
    chapterId: 'c10-s2-ch11',
    topic: 'Mensuration',
    subtopic: 'Sector Area Formula: (θ/360) × πr²',
    skill: 'Evaluating fractional circular areas',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const r = 6;
      const theta = 60;
      // Area = (theta/360) * (22/7) * r^2 = (60/360) * (22/7) * 36 = 132/7 ≈ 18.86
      const ans = parseFloat(((theta / 360) * (22 / 7) * r * r).toFixed(2));

      return {
        id: `qf-c10-sec-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-areas-circles-sector',
        type: 'numerical',
        prompt: `Find the area in cm² of a sector of a circle with radius r = ${r} cm if angle of the sector is ${theta}° (use π = 22/7, round to 2 decimal places).`,
        latexPrompt: `\\text{Area} = \\frac{${theta}^\\circ}{360^\\circ} \\times \\frac{22}{7} \\times ${r}^2`,
        correctAnswer: ans,
        tolerance: 0.2,
        hints: [
          'Recall sector area formula: (θ / 360) × πr².',
          `Substitute: (${theta} / 360) × (22 / 7) × ${r * r}.`,
        ],
        explanation: `Area = (1/6) \\times (22/7) \\times 36 = 6 \\times 22 / 7 = 132 / 7 ≈ 18.86 cm².`,
        difficulty: diff,
        chapterId: 'c10-s2-ch11',
        classGrade: 10,
        semester: 2,
        topic: 'Mensuration',
        subtopic: 'Sector Area',
        skill: 'Fractional circle mensuration',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 12: Surface Areas and Volumes (Class 10)
  {
    id: 'qf-c10-mensuration-combined',
    name: 'Combination of Solids (Cones, Hemispheres, Cylinders)',
    classGrade: 10,
    semester: 2,
    chapterId: 'c10-s2-ch12',
    topic: 'Mensuration',
    subtopic: 'Composite solid volume and exposed exterior area',
    skill: 'Multi-solid surface and volume synthesis',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const r = 7;
      const h_cyl = 10;
      // Volume of cylinder + hemisphere = pi*r^2*h + (2/3)*pi*r^3
      // For clean foundation question: Slant height of cone with r=7, h=24 ⟹ l = 25
      return {
        id: `qf-c10-sol-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-mensuration-combined',
        type: 'numerical',
        prompt: `A circus tent is cylindrical up to a height of ${h_cyl} m and conical above it. If the common radius is ${r} m and vertical height of the conical roof is 24 m, find the slant height l of the conical portion in meters.`,
        latexPrompt: `l = \\sqrt{r^2 + h^2} = \\sqrt{7^2 + 24^2}`,
        correctAnswer: 25,
        tolerance: 0.1,
        hints: [
          'Slant height l of a cone satisfies l² = r² + h².',
          'Compute 7² + 24² = 49 + 576 = 625. Take square root.',
        ],
        explanation: `l = \\sqrt{7^2 + 24^2} = \\sqrt{49 + 576} = \\sqrt{625} = 25 meters.`,
        difficulty: diff,
        chapterId: 'c10-s2-ch12',
        classGrade: 10,
        semester: 2,
        topic: 'Mensuration',
        subtopic: 'Combined Solids Slant Height',
        skill: 'Cone-cylinder geometry breakdown',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 13: Statistics (Class 10)
  {
    id: 'qf-c10-stat-empirical',
    name: 'Grouped Data Mean, Median & Empirical Relationship',
    classGrade: 10,
    semester: 2,
    chapterId: 'c10-s2-ch13',
    topic: 'Statistics & Probability',
    subtopic: '3 Median = Mode + 2 Mean',
    skill: 'Connecting central tendencies in moderately skewed frequency distributions',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'numerical',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      const med = rng.int(24, 40);
      const mean = rng.int(med - 4, med + 4);
      const mode = 3 * med - 2 * mean;

      return {
        id: `qf-c10-stat-e-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-stat-empirical',
        type: 'numerical',
        prompt: `In a frequency distribution of exam marks, the Mean is ${mean} and the Median is ${med}. Using the empirical relationship, calculate the Mode.`,
        latexPrompt: `\\text{Mode} = 3\\text{ Median} - 2\\text{ Mean} = 3(${med}) - 2(${mean})`,
        correctAnswer: mode,
        tolerance: 0,
        hints: [
          'State Karl Pearson’s empirical relationship: 3 Median = Mode + 2 Mean.',
          `Calculate 3 × ${med} = ${3 * med} and 2 × ${mean} = ${2 * mean}. Subtract.`,
        ],
        explanation: `Mode = 3(Median) - 2(Mean) = 3(${med}) - 2(${mean}) = ${3 * med} - ${2 * mean} = ${mode}.`,
        difficulty: diff,
        chapterId: 'c10-s2-ch13',
        classGrade: 10,
        semester: 2,
        topic: 'Statistics & Probability',
        subtopic: 'Empirical Relationship',
        skill: 'Central tendency synthesis',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },

  // Ch 14: Probability (Class 10)
  {
    id: 'qf-c10-prob-classical',
    name: 'Theoretical Probability & Complementary Events',
    classGrade: 10,
    semester: 2,
    chapterId: 'c10-s2-prob',
    topic: 'Statistics & Probability',
    subtopic: 'Equally likely outcomes and P(not E) = 1 - P(E)',
    skill: 'Evaluating probability ratios of discrete sample spaces',
    supportedDifficulties: ['Foundation', 'Standard', 'Advanced', 'Challenge'],
    format: 'mcq',
    generationMethod: 'deterministic',
    validationMethod: 'exact-match',
    generate: (diff, seed) => {
      const rng = createRng(seed);
      return {
        id: `qf-c10-prob-c-${diff}-${Date.now()}-${rng.int(10, 99)}`,
        familyId: 'qf-c10-prob-classical',
        type: 'mcq',
        prompt: 'A standard unbiased six-sided die is thrown once. What is the probability of getting an odd prime number?',
        latexPrompt: `S = \\{1, 2, 3, 4, 5, 6\\}, \\quad E = \\{3, 5\\}`,
        options: rng.shuffle(['1/3', '1/2', '1/6', '2/3']),
        correctAnswer: '1/3',
        hints: [
          'The sample space S has 6 outcomes: {1, 2, 3, 4, 5, 6}.',
          'Prime numbers are {2, 3, 5}. But 2 is EVEN. Odd prime numbers are only {3, 5}.',
        ],
        explanation: 'Favourable outcomes for odd prime = {3, 5} (2 outcomes). Total outcomes = 6. P(Odd Prime) = 2 / 6 = 1/3.',
        difficulty: diff,
        chapterId: 'c10-s2-prob',
        classGrade: 10,
        semester: 2,
        topic: 'Statistics & Probability',
        subtopic: 'Classical Probability',
        skill: 'Sample space partitioning',
        generationMethod: 'deterministic',
        validationMethod: 'exact-match',
      };
    },
  },
];
