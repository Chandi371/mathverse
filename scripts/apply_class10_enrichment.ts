import fs from 'fs';
import path from 'path';
import { class10Chapters } from '../src/data/chapters/class10';

// Enrich each chapter with the required additions
const additions: Record<string, { keyFormulas?: any[]; workedExamples?: any[] }> = {
  'c10-s1-ch3': {
    keyFormulas: [
      {
        id: 'f-c10-ch3-no-sol',
        name: 'Parallel Lines & Inconsistency Condition',
        latex: '\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}',
        description: 'When the ratio of x coefficients equals the ratio of y coefficients but differs from the constant ratio, the lines are parallel and possess no common solution.',
        variables: [
          { symbol: 'a_1, a_2', meaning: 'Coefficients of x' },
          { symbol: 'b_1, b_2', meaning: 'Coefficients of y' },
          { symbol: 'c_1, c_2', meaning: 'Constant terms' },
        ],
        chapterId: 'c10-s1-ch3',
        classGrade: 10,
        category: 'Algebra',
        conditions: 'a_1, a_2, b_1, b_2 not all zero.',
        whenToUse: 'Testing if two linear equations represent parallel lines with no solution.',
        workedExample: {
          problem: 'Check consistency of 2x + 4y = 10 and 3x + 6y = 12.',
          latexProblem: '2x + 4y = 10, \\quad 3x + 6y = 12',
          solution: 'a1/a2 = 2/3, b1/b2 = 4/6 = 2/3, c1/c2 = 10/12 = 5/6. Since a1/a2 = b1/b2 ≠ c1/c2, the system is inconsistent (parallel lines).',
          latexSolution: '\\frac{2}{3} = \\frac{2}{3} \\neq \\frac{5}{6}',
        },
      },
    ],
    workedExamples: [
      {
        id: 'we-c10-ch3-2',
        title: 'Solving by Elimination Method',
        problemStatement: 'Solve the pair of equations: 2x + 3y = 11 and 2x - 4y = -24. Hence find the value of m for which y = mx + 3.',
        given: ['2x + 3y = 11 (eq 1)', '2x - 4y = -24 (eq 2)', 'y = mx + 3'],
        toFind: 'Values of x, y, and m',
        strategy: 'Subtract eq 2 from eq 1 to eliminate x, then substitute y to find x, and lastly substitute into y = mx + 3.',
        steps: [
          { stepNumber: 1, title: 'Subtract equations', latex: '(2x + 3y) - (2x - 4y) = 11 - (-24) \\implies 7y = 35 \\implies y = 5', explanation: 'Subtracting cancels out 2x.' },
          { stepNumber: 2, title: 'Substitute to find x', latex: '2x + 3(5) = 11 \\implies 2x + 15 = 11 \\implies 2x = -4 \\implies x = -2', explanation: 'Substitute y = 5 into eq 1.' },
          { stepNumber: 3, title: 'Calculate m', latex: 'y = mx + 3 \\implies 5 = m(-2) + 3 \\implies 2 = -2m \\implies m = -1', explanation: 'Substitute x = -2, y = 5 into the linear relation.' },
        ],
        commonMistake: 'Sign error when subtracting -4y: 3y - (-4y) = 7y, not -y.',
        sanityCheck: 'Check in eq 2: 2(-2) - 4(5) = -4 - 20 = -24. Verified!',
      },
    ],
  },

  'c10-s1-quad': {
    keyFormulas: [
      {
        id: 'f-c10-quad-roots-rel',
        name: 'Sum and Product of Roots & Equation Formation',
        latex: '\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a} \\implies x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0',
        description: 'The symmetric relations between roots and coefficients for any quadratic equation ax² + bx + c = 0.',
        variables: [
          { symbol: '\\alpha, \\beta', meaning: 'Roots of quadratic equation' },
          { symbol: 'a, b, c', meaning: 'Real coefficients with a ≠ 0' },
        ],
        chapterId: 'c10-s1-quad',
        classGrade: 10,
        category: 'Algebra',
        conditions: 'a ≠ 0.',
        whenToUse: 'Constructing quadratic equations or evaluating symmetric functions of roots.',
        workedExample: {
          problem: 'Form a quadratic equation whose roots are 3 and -5.',
          latexProblem: '\\alpha = 3, \\beta = -5',
          solution: 'Sum = 3 + (-5) = -2. Product = 3(-5) = -15. Equation: x² - (-2)x + (-15) = 0 => x² + 2x - 15 = 0.',
          latexSolution: 'x^2 + 2x - 15 = 0',
        },
      },
    ],
    workedExamples: [
      {
        id: 'we-c10-quad-2',
        title: 'Finding Parameter k for Equal Real Roots',
        problemStatement: 'Find the values of k for which the equation 2x² + kx + 3 = 0 has two equal real roots.',
        given: ['Quadratic equation: 2x² + kx + 3 = 0', 'Roots are equal real roots'],
        toFind: 'Value(s) of k',
        strategy: 'For two equal real roots, set the discriminant D = b² - 4ac equal to 0.',
        steps: [
          { stepNumber: 1, title: 'Identify coefficients', latex: 'a = 2, \\quad b = k, \\quad c = 3', explanation: 'Standard form ax² + bx + c = 0.' },
          { stepNumber: 2, title: 'Apply condition D = 0', latex: 'D = b^2 - 4ac = 0 \\implies k^2 - 4(2)(3) = 0 \\implies k^2 - 24 = 0', explanation: 'Discriminant must vanish for equal roots.' },
          { stepNumber: 3, title: 'Solve for k', latex: 'k^2 = 24 \\implies k = \\pm \\sqrt{24} = \\pm 2\\sqrt{6}', explanation: 'Take both positive and negative square roots.' },
        ],
        commonMistake: 'Forgetting the negative root and writing only k = 2√6.',
        sanityCheck: 'Substituting k = 2√6: (2√6)² - 24 = 24 - 24 = 0. Verified!',
      },
    ],
  },

  'c10-s1-ap': {
    workedExamples: [
      {
        id: 'we-c10-ap-2',
        title: 'Finding Number of Terms and Sum from Last Term',
        problemStatement: 'In an AP, the first term is 5, the common difference is 3, and the last term is 50. Find the number of terms n and the sum of the terms S_n.',
        given: ['a = 5', 'd = 3', 'a_n = 50'],
        toFind: 'n and S_n',
        strategy: 'Use a_n = a + (n - 1)d to solve for n, then use S_n = n/2 * (a + l).',
        steps: [
          { stepNumber: 1, title: 'Find n', latex: '50 = 5 + (n - 1)(3) \\implies 45 = 3(n - 1) \\implies n - 1 = 15 \\implies n = 16', explanation: 'Substitute into general term formula.' },
          { stepNumber: 2, title: 'Calculate Sum S_n', latex: 'S_{16} = \\frac{16}{2} (a + l) = 8(5 + 50) = 8(55) = 440', explanation: 'Use concise first + last term sum formula.' },
        ],
        commonMistake: 'Not verifying that n is a positive integer (if n is fractional, the given number is not a term).',
        sanityCheck: 'Average of first and last is (5 + 50)/2 = 27.5. Total sum = 16 × 27.5 = 440. Verified!',
      },
    ],
  },

  'c10-s1-ch6': {
    workedExamples: [
      {
        id: 'we-c10-ch6-2',
        title: 'Solving Segments using Basic Proportionality Theorem',
        problemStatement: 'In triangle ABC, DE is parallel to BC with D on AB and E on AC. If AD = x, DB = x - 2, AE = x + 2, and EC = x - 1, find the value of x.',
        given: ['DE || BC', 'AD = x, DB = x - 2, AE = x + 2, EC = x - 1'],
        toFind: 'Value of x',
        strategy: 'Apply Thales Theorem: AD/DB = AE/EC and solve the resulting algebraic equation.',
        steps: [
          { stepNumber: 1, title: 'Apply BPT', latex: '\\frac{AD}{DB} = \\frac{AE}{EC} \\implies \\frac{x}{x - 2} = \\frac{x + 2}{x - 1}', explanation: 'A line parallel to one side divides other two sides proportionally.' },
          { stepNumber: 2, title: 'Cross multiply', latex: 'x(x - 1) = (x - 2)(x + 2) \\implies x^2 - x = x^2 - 4', explanation: 'Expand both sides; (x-2)(x+2) = x² - 4.' },
          { stepNumber: 3, title: 'Solve for x', latex: '-x = -4 \\implies x = 4', explanation: 'x² terms cancel out leaving linear equation.' },
        ],
        commonMistake: 'Cross multiplying incorrectly or neglecting that side lengths must be positive.',
        sanityCheck: 'AD = 4, DB = 2 (ratio 4/2 = 2); AE = 6, EC = 3 (ratio 6/3 = 2). 2 = 2! Verified!',
      },
    ],
  },

  'c10-s1-ch7': {
    workedExamples: [
      {
        id: 'we-c10-ch7-2',
        title: 'Ratio of Division by Coordinate Axes',
        problemStatement: 'Find the ratio in which the y-axis divides the line segment joining the points A(5, -6) and B(-1, -4). Also find the point of intersection.',
        given: ['Points A(5, -6) and B(-1, -4)', 'Divided by y-axis'],
        toFind: 'Ratio k:1 and intersection point P(0, y)',
        strategy: 'Any point on y-axis has x-coordinate = 0. Set x-coordinate in section formula to 0.',
        steps: [
          { stepNumber: 1, title: 'Set ratio k:1 and x-coordinate to 0', latex: 'x = \\frac{k(-1) + 1(5)}{k + 1} = 0 \\implies -k + 5 = 0 \\implies k = 5', explanation: 'Since point lies on y-axis, x = 0.' },
          { stepNumber: 2, title: 'State ratio', latex: '\\text{Ratio } k : 1 = 5 : 1', explanation: 'The y-axis divides AB internally in the ratio 5:1.' },
          { stepNumber: 3, title: 'Find y-coordinate', latex: 'y = \\frac{5(-4) + 1(-6)}{5 + 1} = \\frac{-20 - 6}{6} = \\frac{-26}{6} = -\\frac{13}{3}', explanation: 'Substitute k = 5 into the y-coordinate formula.' },
        ],
        commonMistake: 'Confusing x-axis (where y = 0) with y-axis (where x = 0).',
        sanityCheck: 'Point P(0, -13/3) lies on line AB: slope AP = (-13/3 + 6)/(-5) = (5/3)/(-5) = -1/3. Slope AB = (-4 + 6)/(-1 - 5) = 2/(-6) = -1/3. Verified!',
      },
    ],
  },

  'c10-s2-trig': {
    workedExamples: [
      {
        id: 'we-c10-trig-2',
        title: 'Proving Trigonometric Identities',
        problemStatement: 'Prove the identity: (sin θ - 2 sin³ θ) / (2 cos³ θ - cos θ) = tan θ.',
        given: ['LHS = (sin θ - 2 sin³ θ) / (2 cos³ θ - cos θ)'],
        toFind: 'Proof that LHS = tan θ (RHS)',
        strategy: 'Factor out common terms sin θ from numerator and cos θ from denominator, then simplify the quadratic trigonometric factor using sin² θ + cos² θ = 1.',
        steps: [
          { stepNumber: 1, title: 'Factor out common terms', latex: '\\text{LHS} = \\frac{\\sin\\theta (1 - 2\\sin^2\\theta)}{\\cos\\theta (2\\cos^2\\theta - 1)} = \\tan\\theta \\cdot \\frac{1 - 2\\sin^2\\theta}{2\\cos^2\\theta - 1}', explanation: 'Factor sin θ from numerator and cos θ from denominator.' },
          { stepNumber: 2, title: 'Replace 1 by sin² θ + cos² θ in numerator', latex: '1 - 2\\sin^2\\theta = (\\sin^2\\theta + \\cos^2\\theta) - 2\\sin^2\\theta = \\cos^2\\theta - \\sin^2\\theta', explanation: 'Use fundamental identity 1 = sin² θ + cos² θ.' },
          { stepNumber: 3, title: 'Replace 1 in denominator', latex: '2\\cos^2\\theta - 1 = 2\\cos^2\\theta - (\\sin^2\\theta + \\cos^2\\theta) = \\cos^2\\theta - \\sin^2\\theta', explanation: 'Denominator factor is identical to numerator factor.' },
          { stepNumber: 4, title: 'Cancel identical factors', latex: '\\tan\\theta \\cdot \\frac{\\cos^2\\theta - \\sin^2\\theta}{\\cos^2\\theta - \\sin^2\\theta} = \\tan\\theta = \\text{RHS}', explanation: 'Both factors cancel out to 1, leaving tan θ.' },
        ],
        commonMistake: 'Trying to cross-multiply instead of transforming LHS independently.',
        sanityCheck: 'For θ = 30°: tan 30° = 1/√3. Numerator = 1/2 - 2(1/8) = 1/4. Denominator = 2(3√3/8) - √3/2 = √3/4. Ratio = (1/4)/(√3/4) = 1/√3. Verified!',
      },
    ],
  },

  'c10-s2-ch9': {
    keyFormulas: [
      {
        id: 'f-c10-ch9-two-pt',
        name: 'Two-Point Elevation Difference Formula',
        latex: 'h = \\frac{d}{\\cot\\theta_1 - \\cot\\theta_2} = \\frac{d \\tan\\theta_1 \\tan\\theta_2}{\\tan\\theta_2 - \\tan\\theta_1}',
        description: 'Height of a vertical object observed from two positions along the same horizontal line at distance d apart with elevation angles θ1 and θ2 (θ2 > θ1).',
        variables: [
          { symbol: 'h', meaning: 'Height of tower or cliff' },
          { symbol: 'd', meaning: 'Horizontal distance moved between two observations' },
          { symbol: '\\theta_1, \\theta_2', meaning: 'Angles of elevation from initial and final points' },
        ],
        chapterId: 'c10-s2-ch9',
        classGrade: 10,
        category: 'Trigonometry',
        conditions: 'Both observation points lie in the same vertical plane passing through the object.',
        whenToUse: 'Finding height when observer approaches or retreats from an object without knowing distance to the base.',
        workedExample: {
          problem: 'Angles of elevation of a tower top from two points 20 m apart on ground are 30° and 60°. Find height.',
          latexProblem: 'd = 20\\text{ m}, \\theta_1 = 30^\\circ, \\theta_2 = 60^\\circ',
          solution: 'h = 20 / (cot 30° - cot 60°) = 20 / (√3 - 1/√3) = 20 / (2/√3) = 10√3 ≈ 17.32 m.',
          latexSolution: 'h = 10\\sqrt{3}\\text{ m} \\approx 17.32\\text{ m}',
        },
      },
    ],
    workedExamples: [
      {
        id: 'we-c10-ch9-2',
        title: 'Observer Walking Towards a Building',
        problemStatement: 'A 1.5 m tall boy is standing at some distance from a 30 m tall building. The angle of elevation from his eyes to the top of the building increases from 30° to 60° as he walks towards the building. Find the distance he walked towards the building.',
        given: ['Height of building = 30 m', 'Height of boy = 1.5 m', 'Effective height h = 30 - 1.5 = 28.5 m', 'Initial angle θ1 = 30°, Final angle θ2 = 60°'],
        toFind: 'Distance walked (d)',
        strategy: 'Find distance from initial point x1 = h cot 30°, final distance x2 = h cot 60°, and distance walked d = x1 - x2.',
        steps: [
          { stepNumber: 1, title: 'Calculate effective height', latex: 'h = 30 - 1.5 = 28.5 = \\frac{57}{2}\\text{ m}', explanation: "Sightline starts from the boy's eye level (1.5 m above ground)." },
          { stepNumber: 2, title: 'Find initial horizontal distance', latex: 'x_1 = h \\cot 30^\\circ = 28.5 \\times \\sqrt{3}\\text{ m}', explanation: 'In right triangle with angle 30°, base = height × cot 30°.' },
          { stepNumber: 3, title: 'Find final horizontal distance', latex: 'x_2 = h \\cot 60^\\circ = \\frac{28.5}{\\sqrt{3}}\\text{ m}', explanation: 'In right triangle with angle 60°, base = height × cot 60°.' },
          { stepNumber: 4, title: 'Calculate distance walked', latex: 'd = x_1 - x_2 = 28.5\\left(\\sqrt{3} - \\frac{1}{\\sqrt{3}}\\right) = 28.5 \\times \\frac{2}{\\sqrt{3}} = \\frac{57}{\\sqrt{3}} = 19\\sqrt{3}\\text{ m}', explanation: 'Rationalise denominator: 57√3 / 3 = 19√3.' },
        ],
        commonMistake: "Forgetting to subtract the boy's height 1.5 m from the building's height.",
        sanityCheck: '19√3 ≈ 19 × 1.732 = 32.91 m. x2 = 28.5/√3 ≈ 16.45 m. x1 = 49.36 m. 49.36 - 16.45 = 32.91 m. Verified!',
      },
    ],
  },

  'c10-s2-ch10': {
    workedExamples: [
      {
        id: 'we-c10-ch10-2',
        title: 'Quadrilateral Circumscribing a Circle Property',
        problemStatement: 'A quadrilateral ABCD is drawn to circumscribe a circle. Prove that AB + CD = AD + BC.',
        given: ['Quadrilateral ABCD circumscribes a circle, touching sides AB, BC, CD, DA at P, Q, R, S respectively.'],
        toFind: 'Proof that AB + CD = AD + BC',
        strategy: 'Apply Theorem 10.2: Tangents drawn from an external point to a circle are equal in length.',
        steps: [
          { stepNumber: 1, title: 'Apply tangent equality from each vertex', latex: 'AP = AS, \\quad BP = BQ, \\quad CR = CQ, \\quad DR = DS', explanation: 'From vertices A, B, C, D, pairs of tangents to circle touchpoints are equal.' },
          { stepNumber: 2, title: 'Add all four equations', latex: '(AP + BP) + (CR + DR) = (AS + DS) + (BQ + CQ)', explanation: 'Sum LHS and RHS terms grouped into opposite sides.' },
          { stepNumber: 3, title: 'Combine collinear segments', latex: 'AB + CD = AD + BC', explanation: 'AP + BP = AB, CR + DR = CD, AS + DS = AD, BQ + CQ = BC.' },
        ],
        commonMistake: 'Grouping terms inconsistently (e.g. putting CQ on LHS and CR on RHS), preventing side recombination.',
        sanityCheck: 'For a square circumscribing circle of diameter d: all 4 sides = d. d + d = d + d = 2d. Verified!',
      },
    ],
  },

  'c10-s2-ch11': {
    keyFormulas: [
      {
        id: 'f-c10-ch11-segment',
        name: 'Area of Minor and Major Segments',
        latex: '\\text{Area(Minor Segment)} = \\frac{\\theta}{360^\\circ} \\pi r^2 - \\frac{1}{2} r^2 \\sin\\theta',
        description: 'Area of a segment is formed by subtracting the area of the isosceles triangle formed by the radius vectors from the sector area.',
        variables: [
          { symbol: 'r', meaning: 'Radius of circle' },
          { symbol: '\\theta', meaning: 'Angle subtended by chord at centre' },
        ],
        chapterId: 'c10-s2-ch11',
        classGrade: 10,
        category: 'Mensuration',
        conditions: '0° < θ < 180°.',
        whenToUse: 'Finding the area bounded by a chord and an arc.',
        workedExample: {
          problem: 'Find area of minor segment of circle radius 14 cm subtending 90° at centre.',
          latexProblem: 'r = 14\\text{ cm}, \\theta = 90^\\circ',
          solution: 'Sector area = (90/360) × (22/7) × 14² = 154 cm². Triangle area = 1/2 × 14 × 14 = 98 cm². Segment area = 154 - 98 = 56 cm².',
          latexSolution: '\\text{Area} = 154 - 98 = 56\\text{ cm}^2',
        },
      },
    ],
    workedExamples: [
      {
        id: 'we-c10-ch11-2',
        title: 'Area of Minor Segment with 60° Central Angle',
        problemStatement: 'A chord of a circle of radius 15 cm subtends an angle of 60° at the centre. Find the areas of the corresponding minor and major segments of the circle. (Use π = 3.14 and √3 = 1.73).',
        given: ['r = 15 cm', 'θ = 60°', 'π = 3.14', '√3 = 1.73'],
        toFind: 'Areas of minor and major segments',
        strategy: 'Calculate sector area, equilateral triangle area, subtract for minor segment, then subtract minor segment from full circle area for major segment.',
        steps: [
          { stepNumber: 1, title: 'Calculate sector area', latex: '\\text{Area of sector} = \\frac{60^\\circ}{360^\\circ} \\times 3.14 \\times 15^2 = \\frac{1}{6} \\times 3.14 \\times 225 = 117.75\\text{ cm}^2', explanation: 'Area = (θ/360) × π r².' },
          { stepNumber: 2, title: 'Calculate equilateral triangle area', latex: '\\text{Area of } \\triangle OAB = \\frac{\\sqrt{3}}{4} \\times 15^2 = \\frac{1.73 \\times 225}{4} = 97.3125\\text{ cm}^2', explanation: 'Since OA = OB and angle is 60°, triangle is equilateral.' },
          { stepNumber: 3, title: 'Calculate minor segment area', latex: '\\text{Minor segment} = 117.75 - 97.3125 = 20.4375\\text{ cm}^2 \\approx 20.44\\text{ cm}^2', explanation: 'Subtract triangle from sector.' },
          { stepNumber: 4, title: 'Calculate major segment area', latex: '\\text{Circle area} = 3.14 \\times 225 = 706.5\\text{ cm}^2 \\implies \\text{Major segment} = 706.5 - 20.4375 = 686.0625\\text{ cm}^2', explanation: 'Major segment = Total circle area - Minor segment area.' },
        ],
        commonMistake: 'Using right-angled triangle formula (1/2 base × height) instead of equilateral triangle formula for 60°.',
        sanityCheck: '20.44 + 686.06 = 706.5 = π r². Exact match!',
      },
    ],
  },

  'c10-s2-ch12': {
    workedExamples: [
      {
        id: 'we-c10-ch12-2',
        title: 'Volume and Surface Area of a Combined Solid Toy',
        problemStatement: 'A solid toy is in the form of a hemisphere surmounted by a right circular cone. The height of the cone is 2 cm and the diameter of the base is 4 cm. Determine the volume of the toy. (Take π = 3.14).',
        given: ['Diameter of common base = 4 cm => Radius r = 2 cm', 'Height of cone h = 2 cm', 'π = 3.14'],
        toFind: 'Total volume of the toy',
        strategy: 'Total volume = Volume of hemisphere + Volume of cone.',
        steps: [
          { stepNumber: 1, title: 'Volume of hemisphere', latex: 'V_{\\text{hemisphere}} = \\frac{2}{3} \\pi r^3 = \\frac{2}{3} \\times 3.14 \\times 2^3 = \\frac{50.24}{3} \\approx 16.75\\text{ cm}^3', explanation: 'Hemisphere volume is (2/3) π r³.' },
          { stepNumber: 2, title: 'Volume of cone', latex: 'V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 2^2 \\times 2 = \\frac{25.12}{3} \\approx 8.37\\text{ cm}^3', explanation: 'Cone volume is (1/3) π r² h.' },
          { stepNumber: 3, title: 'Total volume', latex: 'V_{\\text{total}} = \\frac{50.24 + 25.12}{3} = \\frac{75.36}{3} = 25.12\\text{ cm}^3', explanation: 'Sum the two partial volumes.' },
        ],
        commonMistake: 'Using 4 cm as radius instead of halving the diameter to get r = 2 cm.',
        sanityCheck: 'Factoring: (1/3) π r² (2r + h) = (1/3)(3.14)(4)(4 + 2) = (1/3)(12.56)(6) = 25.12 cm³. Verified!',
      },
    ],
  },

  'c10-s2-ch13': {
    workedExamples: [
      {
        id: 'we-c10-ch13-2',
        title: 'Finding Missing Frequencies Given Median',
        problemStatement: 'The median of 60 observations is 28.5. The classes are 0-10, 10-20, 20-30, 30-40, 40-50, 50-60 with frequencies 5, x, 20, 15, y, 5. Find the values of x and y.',
        given: ['Total frequency N = 60', 'Median = 28.5', 'Frequencies: 5, x, 20, 15, y, 5'],
        toFind: 'Unknown frequencies x and y',
        strategy: 'Sum frequencies to get first equation x + y = 15. Identify median class 20-30 (since median 28.5 lies in it) and use median formula to find x.',
        steps: [
          { stepNumber: 1, title: 'First equation from total frequency', latex: '5 + x + 20 + 15 + y + 5 = 60 \\implies 45 + x + y = 60 \\implies x + y = 15', explanation: 'The sum of all frequencies equals N = 60.' },
          { stepNumber: 2, title: 'Identify median class', latex: '\\text{Median } 28.5 \\in [20, 30] \\implies l = 20, \\quad h = 10, \\quad f = 20, \\quad cf = 5 + x', explanation: 'Median class parameters.' },
          { stepNumber: 3, title: 'Apply median formula to solve for x', latex: '28.5 = 20 + \\left(\\frac{30 - (5 + x)}{20}\\right) \\times 10 \\implies 8.5 = \\frac{25 - x}{2} \\implies 17 = 25 - x \\implies x = 8', explanation: 'Solve linear equation for x.' },
          { stepNumber: 4, title: 'Calculate y', latex: 'x + y = 15 \\implies 8 + y = 15 \\implies y = 7', explanation: 'Substitute x = 8 into equation 1.' },
        ],
        commonMistake: 'Selecting median class by N/2 = 30 instead of checking which interval contains the given median value 28.5.',
        sanityCheck: 'Total = 5 + 8 + 20 + 15 + 7 + 5 = 60. Check median: 20 + ((30 - 13)/20) * 10 = 20 + 8.5 = 28.5. Verified!',
      },
    ],
  },

  'c10-s2-prob': {
    workedExamples: [
      {
        id: 'we-c10-prob-2',
        title: 'Playing Cards Probability (Face Cards, Honors, Non-Face)',
        problemStatement: 'One card is drawn from a well-shuffled deck of 52 playing cards. Find the probability of getting: (i) a king of red color, (ii) a face card, (iii) neither a king nor a queen.',
        given: ['Standard deck of 52 cards'],
        toFind: 'Probabilities of events (i), (ii), and (iii)',
        strategy: 'Apply P(E) = n(E) / n(S) where total sample space n(S) = 52.',
        steps: [
          { stepNumber: 1, title: 'King of red color', latex: 'n(\\text{Red Kings}) = 2 \\implies P = \\frac{2}{52} = \\frac{1}{26}', explanation: 'Red suits are Hearts and Diamonds, each having 1 king.' },
          { stepNumber: 2, title: 'Face card', latex: 'n(\\text{Face cards}) = 4 \\times 3 = 12 \\implies P = \\frac{12}{52} = \\frac{3}{13}', explanation: 'Each of the 4 suits has 3 face cards (Jack, Queen, King). Note: Aces are NOT face cards!' },
          { stepNumber: 3, title: 'Neither a king nor a queen', latex: 'n(\\text{Kings + Queens}) = 4 + 4 = 8 \\implies n(\\text{Neither}) = 52 - 8 = 44 \\implies P = \\frac{44}{52} = \\frac{11}{13}', explanation: 'Subtract the 8 kings and queens from 52.' },
        ],
        commonMistake: 'Counting Aces as face cards (Aces are honor cards, not face cards; only J, Q, K have pictures/faces).',
        sanityCheck: 'Sum of P(Kings or Queens = 8/52 = 2/13) + P(Neither = 11/13) = 13/13 = 1. Verified!',
      },
    ],
  },
};

// Merge additions into class10Chapters
for (const ch of class10Chapters) {
  const add = additions[ch.id];
  if (add) {
    if (add.keyFormulas) {
      ch.keyFormulas = [...ch.keyFormulas, ...add.keyFormulas];
    }
    if (add.workedExamples) {
      ch.workedExamples = [...ch.workedExamples, ...add.workedExamples];
    }
  }
}

// Write back to src/data/chapters/class10.ts
const fileHeader = `import type { Chapter } from '../../types/curriculum';

export const class10Chapters: Chapter[] = `;
const fileContent = fileHeader + JSON.stringify(class10Chapters, null, 2) + ';\n';
fs.writeFileSync(path.resolve('src/data/chapters/class10.ts'), fileContent);
console.log('Successfully enriched and updated src/data/chapters/class10.ts!');
