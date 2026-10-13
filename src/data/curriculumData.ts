import type { Chapter } from '../types/curriculum';

export const chaptersData: Chapter[] = [
  // ==========================================
  // CLASS 10 — SEMESTER 1
  // ==========================================
  {
    id: 'c10-s1-ap',
    classGrade: 10,
    semester: 1,
    chapterNumber: 5,
    title: 'Arithmetic Progressions',
    shortDescription: 'Discover arithmetic patterns, general terms, and Gauss’s pairing technique for sum of n terms.',
    whyItMatters: 'Arithmetic Progressions model real-world constant-rate growth: compound monthly savings, seating in stadiums, depreciation, and stepping frequencies.',
    priorKnowledge: [
      'Basic linear sequences and differences',
      'Algebraic substitution of variables',
      'Solving simple linear equations in one variable',
    ],
    vocabulary: [
      { term: 'Sequence', definition: 'An ordered list of numbers following a definite mathematical rule.' },
      { term: 'Arithmetic Progression (AP)', definition: 'A sequence in which each term after the first is obtained by adding a fixed constant (d) to the preceding term.' },
      { term: 'Common Difference (d)', definition: 'The constant difference between any term and its preceding term (d = aₖ - aₖ₋₁). Can be positive, negative, or zero.' },
      { term: 'Finite vs Infinite AP', definition: 'An AP with a countable end term is finite; one that continues indefinitely is infinite.' },
    ],
    keyFormulas: [
      {
        id: 'f-ap-nth-term',
        name: 'nth Term of an AP (General Term)',
        latex: 'a_n = a + (n - 1)d',
        description: 'Computes the value of the nth term without listing all previous terms.',
        variables: [
          { symbol: 'a_n', meaning: 'nth term' },
          { symbol: 'a', meaning: 'First term' },
          { symbol: 'n', meaning: 'Position / term number (n ∈ ℕ)' },
          { symbol: 'd', meaning: 'Common difference' },
        ],
        chapterId: 'c10-s1-ap',
        classGrade: 10,
        category: 'Algebra',
        labId: 'arithmetic-progression',
      },
      {
        id: 'f-ap-sum-n',
        name: 'Sum of First n Terms of an AP',
        latex: 'S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)',
        description: 'Computes the total sum of the first n terms using Gauss’s pairing logic.',
        variables: [
          { symbol: 'S_n', meaning: 'Sum of first n terms' },
          { symbol: 'a', meaning: 'First term' },
          { symbol: 'l', meaning: 'Last term (a_n)' },
          { symbol: 'n', meaning: 'Number of terms' },
          { symbol: 'd', meaning: 'Common difference' },
        ],
        chapterId: 'c10-s1-ap',
        classGrade: 10,
        category: 'Algebra',
        labId: 'arithmetic-progression',
        derivationSummary: 'Inverted pairing method by Carl Friedrich Gauss: writing the sequence forwards and backwards sums to n identical pairs of (a + l).',
      },
    ],
    labId: 'arithmetic-progression',
    labTitle: 'AP Sequence Visualizer & Gauss Summation Pairing',
    derivation: {
      title: 'Derivation of Sum of n Terms (Sₙ)',
      targetFormula: 'S_n = \\frac{n}{2}[2a + (n-1)d]',
      objective: 'Prove that adding n terms of an AP yields half of n times the sum of the first and last terms.',
      startingObservation: 'Let the AP be a, a+d, a+2d, ..., a+(n-1)d. Denote the sum by Sₙ.',
      steps: [
        {
          stepNumber: 1,
          statement: 'Write Sₙ in ascending order from the first term to the nth term:',
          latex: 'S_n = a + (a+d) + (a+2d) + \\dots + [a+(n-1)d]',
          justification: 'By definition of the arithmetic progression sum.',
        },
        {
          stepNumber: 2,
          statement: 'Write the same sum in reverse order (from last term to first):',
          latex: 'S_n = l + (l-d) + (l-2d) + \\dots + a',
          justification: 'Addition is commutative; reversing order preserves the sum.',
        },
        {
          stepNumber: 3,
          statement: 'Add both equations term-by-term vertically:',
          latex: '2S_n = (a+l) + (a+l) + (a+l) + \\dots + (a+l) \\quad (\\text{n times})',
          justification: 'Each vertical pair: (a + k·d) + (l - k·d) = a + l. The d terms cancel out entirely!',
        },
        {
          stepNumber: 4,
          statement: 'Group the n identical terms on the right-hand side:',
          latex: '2S_n = n(a + l) \\implies S_n = \\frac{n}{2}(a + l)',
          justification: 'Multiplying n copies of (a + l) and dividing both sides by 2.',
        },
        {
          stepNumber: 5,
          statement: 'Substitute l = a + (n-1)d into the formula:',
          latex: 'S_n = \\frac{n}{2}[a + a + (n-1)d] = \\frac{n}{2}[2a + (n-1)d]',
          justification: 'Replacing the nth term l with its explicit formula.',
        },
      ],
      finalFormulaLatex: 'S_n = \\frac{n}{2}[2a + (n-1)d]',
      conclusion: 'This formula allows calculating sums of thousands of terms in O(1) arithmetic operations!',
    },
    memoryLab: [
      {
        title: 'The (n - 1) Step Rule',
        mnemonic: 'Remember: 1st step is free!',
        meaning: 'To reach term n, you start at a and take only (n - 1) jumps of size d.',
        boardExamTip: 'Never multiply a by (n-1); only d is multiplied by (n-1). Common blunder: writing a + nd.',
      },
      {
        title: 'Gauss Pairing Visual Hook',
        mnemonic: 'Head + Tail = Constant',
        meaning: 'Pairing first and last terms always gives (a + l). Multiplying by n/2 yields the sum.',
        boardExamTip: 'When first term and last term are known, prefer S_n = (n/2)(a + l) over the longer 2a+(n-1)d form.',
      },
      {
        title: 'Setting 3 Consecutive Terms in AP',
        mnemonic: '(a - d), a, (a + d)',
        meaning: 'Using symmetric terms simplifies sum problems because their sum immediately gives 3a (the d cancels).',
        boardExamTip: 'Frequently tested in SSC 4-mark questions: "The sum of three numbers in AP is 15...".',
      },
    ],
    workedExamples: [
      {
        id: 'we-ap-1',
        title: 'Finding the 20th Term of an AP',
        problemStatement: 'Find the 20th term of the AP: 3, 8, 13, 18, ...',
        given: ['First term a = 3', 'Common difference d = 8 - 3 = 5', 'Term index n = 20'],
        toFind: 'Value of the 20th term (a₂₀)',
        strategy: 'Direct substitution into the nth term formula a_n = a + (n-1)d.',
        steps: [
          { stepNumber: 1, title: 'Identify known variables', explanation: 'From the given sequence, a = 3 and d = a₂ - a₁ = 8 - 3 = 5.' },
          { stepNumber: 2, title: 'Apply general term formula', latex: 'a_n = a + (n-1)d', explanation: 'Substitute a = 3, d = 5, n = 20.' },
          { stepNumber: 3, title: 'Perform arithmetic', latex: 'a_{20} = 3 + (20 - 1) \\times 5 = 3 + 19 \\times 5 = 3 + 95 = 98', explanation: 'Multiplication takes precedence over addition.' },
        ],
        commonMistake: 'Writing 3 + 20 × 5 = 103 (forgetting the minus 1 in n-1).',
        sanityCheck: 'Each step adds 5. 19 steps of 5 = 95. 3 + 95 = 98. Correct!',
      },
      {
        id: 'we-ap-2',
        title: 'Sum of Consecutive Integers',
        problemStatement: 'Find the sum of the first 25 terms of the AP: 4, 7, 10, 13, ...',
        given: ['a = 4', 'd = 7 - 4 = 3', 'n = 25'],
        toFind: 'S₂₅',
        strategy: 'Use S_n = (n/2)[2a + (n-1)d].',
        steps: [
          { stepNumber: 1, title: 'Setup the formula', latex: 'S_{25} = \\frac{25}{2}[2(4) + (25-1)(3)]', explanation: 'Substitute the given values.' },
          { stepNumber: 2, title: 'Simplify inside brackets', latex: '2(4) + 24(3) = 8 + 72 = 80', explanation: 'Compute products inside bracket first.' },
          { stepNumber: 3, title: 'Multiply by n/2', latex: 'S_{25} = \\frac{25}{2} \\times 80 = 25 \\times 40 = 1000', explanation: 'Divide 80 by 2 first to avoid messy fraction multiplication.' },
        ],
        commonMistake: 'Leaving 25/2 as 12.5 and making calculation errors.',
        sanityCheck: 'Average term is (4 + 76)/2 = 40. 25 terms × 40 = 1000.',
      },
    ],
    problemSolvingStrategies: [
      'Always test if a sequence is an AP first by verifying: a₂ - a₁ = a₃ - a₂.',
      'Check if n must be an integer: when solving for n (e.g., "Is 301 a term of AP 5, 11, 17...?"), if n is a fraction or negative, the number is NOT in the AP.',
      'If given S_n, you can find the nth term using the powerful relation: a_n = S_n - S_{n-1}.',
      'For AP word problems, carefully identify whether the question asks for a specific day/year value (a_n) or the accumulated total over all days/years (S_n).',
    ],
    practiceQuestions: [
      {
        id: 'pq-ap-1',
        type: 'numerical',
        prompt: 'In the AP: 2, 7, 12, ..., what is the 10th term?',
        correctAnswer: 47,
        tolerance: 0,
        hints: [
          'Identify a = 2 and find the common difference d = 7 - 2.',
          'Use the formula a₁₀ = a + 9d.',
        ],
        explanation: 'a = 2, d = 5. a₁₀ = 2 + 9(5) = 2 + 45 = 47.',
        difficulty: 'Foundation',
      },
      {
        id: 'pq-ap-2',
        type: 'mcq',
        prompt: 'If the common difference of an AP is 5, then what is the value of a₁₈ - a₁₃?',
        options: ['5', '20', '25', '30'],
        correctAnswer: '25',
        hints: [
          'Express a₁₈ as a + 17d and a₁₃ as a + 12d.',
          'Subtract: (a + 17d) - (a + 12d) = 5d.',
        ],
        explanation: 'a₁₈ - a₁₃ = (a + 17d) - (a + 12d) = 5d = 5 × 5 = 25.',
        difficulty: 'Standard',
      },
      {
        id: 'pq-ap-3',
        type: 'spot-error',
        prompt: 'A student claims that 301 is a term of the AP 5, 11, 17, 23... because 301 = 5 + (n-1)6 gives 6n = 302, so n = 50.33. Why is this reasoning incorrect?',
        options: [
          'The common difference is not 6.',
          'n must be a positive integer, so 301 cannot be a term.',
          'The first term was subtracted incorrectly.',
          'The student should have used the sum formula.',
        ],
        correctAnswer: 'n must be a positive integer, so 301 cannot be a term.',
        hints: ['Can you have a 50.33th term in a sequence of real positions?'],
        explanation: 'Positions in a sequence are counted by natural numbers n ∈ {1, 2, 3, ...}. Since 50.33 is not an integer, 301 does not belong to the sequence.',
        difficulty: 'Standard',
      },
      {
        id: 'pq-ap-4',
        type: 'numerical',
        prompt: 'Find the sum of the first 10 terms of the AP: 1, 3, 5, 7, ... (the first 10 odd numbers).',
        correctAnswer: 100,
        tolerance: 0,
        hints: [
          'The sum of the first n odd natural numbers is n².',
          'Alternatively: a = 1, d = 2, n = 10 in S_n = (n/2)[2(1) + 9(2)].',
        ],
        explanation: 'S₁₀ = (10/2)[2 + 18] = 5 × 20 = 100. (Note: Sum of first n odd numbers is always n² = 10² = 100).',
        difficulty: 'Foundation',
      },
      {
        id: 'pq-ap-5',
        type: 'missing-step',
        prompt: 'To find how many terms of the AP 24, 21, 18... must be taken so that their sum is 78, we set S_n = 78. What quadratic equation in n is obtained?',
        options: [
          'n² - 17n + 52 = 0',
          'n² + 17n - 52 = 0',
          'n² - 15n + 78 = 0',
          '2n² - 17n + 26 = 0',
        ],
        correctAnswer: 'n² - 17n + 52 = 0',
        hints: [
          'Here a = 24 and d = -3.',
          '78 = (n/2)[48 + (n-1)(-3)] = (n/2)[51 - 3n].',
          'Multiply by 2 and rearrange.',
        ],
        explanation: '78 = (n/2)(51 - 3n) => 156 = 51n - 3n² => 3n² - 51n + 156 = 0. Dividing by 3 yields n² - 17n + 52 = 0.',
        difficulty: 'Challenge',
      },
    ],
    revisionSummary: {
      corePoints: [
        'An AP is defined by first term a and constant common difference d.',
        'nth term formula: a_n = a + (n-1)d.',
        'Sum formula: S_n = (n/2)[2a + (n-1)d] = (n/2)(a + l).',
        'Relation between nth term and sum: a_n = S_n - S_{n-1}.',
        'Three consecutive terms in AP can be assumed as a - d, a, a + d.',
      ],
      commonTraps: [
        'Writing a + nd instead of a + (n-1)d.',
        'Confusing common difference sign: when sequence decreases, d is negative!',
        'Forgetting that n must be a positive natural number.',
      ],
    },
  },

  // ==========================================
  // CLASS 10 — SEMESTER 2
  // ==========================================
  {
    id: 'c10-s2-trig',
    classGrade: 10,
    semester: 2,
    chapterNumber: 8,
    title: 'Introduction to Trigonometry',
    shortDescription: 'Master right-triangle ratios, SOH-CAH-TOA, standard angle values, and the fundamental Pythagorean identity.',
    whyItMatters: 'Trigonometry is the mathematical bridge between angles and lengths, powering GPS navigation, computer graphics, architecture, and sound engineering.',
    priorKnowledge: [
      'Pythagorean theorem: hypotenuse² = base² + perpendicular²',
      'Concept of similar triangles and angle invariants',
      'Basic square roots and fractions',
    ],
    vocabulary: [
      { term: 'Trigonometric Ratios', definition: 'Ratios of the sides of a right-angled triangle with respect to its acute angles.' },
      { term: 'Hypotenuse', definition: 'The side opposite to the 90° right angle; always the longest side.' },
      { term: 'Opposite Side', definition: 'The side directly across from reference angle θ.' },
      { term: 'Adjacent Side', definition: 'The non-hypotenuse side next to reference angle θ.' },
    ],
    keyFormulas: [
      {
        id: 'f-trig-sin',
        name: 'Sine Ratio (sin θ)',
        latex: '\\sin\\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}',
        description: 'Ratio of the opposite side to the hypotenuse.',
        variables: [
          { symbol: '\\theta', meaning: 'Reference acute angle' },
          { symbol: '\\text{Opposite}', meaning: 'Perpendicular side facing θ' },
          { symbol: '\\text{Hypotenuse}', meaning: 'Side facing 90°' },
        ],
        chapterId: 'c10-s2-trig',
        classGrade: 10,
        category: 'Trigonometry',
        labId: 'trig-triangle',
      },
      {
        id: 'f-trig-cos',
        name: 'Cosine Ratio (cos θ)',
        latex: '\\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}',
        description: 'Ratio of the adjacent base to the hypotenuse.',
        variables: [
          { symbol: '\\text{Adjacent}', meaning: 'Side adjacent to θ' },
          { symbol: '\\text{Hypotenuse}', meaning: 'Side facing 90°' },
        ],
        chapterId: 'c10-s2-trig',
        classGrade: 10,
        category: 'Trigonometry',
        labId: 'trig-triangle',
      },
      {
        id: 'f-trig-tan',
        name: 'Tangent Ratio (tan θ)',
        latex: '\\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\sin\\theta}{\\cos\\theta}',
        description: 'Ratio of opposite to adjacent side.',
        variables: [],
        chapterId: 'c10-s2-trig',
        classGrade: 10,
        category: 'Trigonometry',
        labId: 'trig-triangle',
      },
      {
        id: 'f-trig-identity-1',
        name: 'Fundamental Pythagorean Identity',
        latex: '\\sin^2\\theta + \\cos^2\\theta = 1',
        description: 'Derived directly from the Pythagorean theorem by dividing by hypotenuse squared.',
        variables: [],
        chapterId: 'c10-s2-trig',
        classGrade: 10,
        category: 'Trigonometry',
        labId: 'trig-triangle',
        derivationSummary: 'opp² + adj² = hyp². Divide every term by hyp² gives (opp/hyp)² + (adj/hyp)² = 1.',
      },
    ],
    labId: 'trig-triangle',
    labTitle: 'Interactive Right Triangle & SOH-CAH-TOA Lab',
    derivation: {
      title: 'Derivation of sin²θ + cos²θ = 1',
      targetFormula: '\\sin^2\\theta + \\cos^2\\theta = 1',
      objective: 'Prove the fundamental identity connecting sine and cosine for any acute angle θ in a right triangle.',
      startingObservation: 'Consider a right-angled triangle ABC with ∠B = 90° and ∠A = θ.',
      steps: [
        {
          stepNumber: 1,
          statement: 'State the Pythagorean theorem for triangle ABC:',
          latex: 'AB^2 + BC^2 = AC^2',
          justification: 'In any right-angled triangle, base² + height² = hypotenuse².',
        },
        {
          stepNumber: 2,
          statement: 'Divide each term on both sides by AC² (hypotenuse squared):',
          latex: '\\frac{AB^2}{AC^2} + \\frac{BC^2}{AC^2} = \\frac{AC^2}{AC^2}',
          justification: 'Dividing both sides of an equality by a non-zero quantity preserves the equation.',
        },
        {
          stepNumber: 3,
          statement: 'Rewrite each fraction as a whole ratio squared:',
          latex: '\\left(\\frac{AB}{AC}\\right)^2 + \\left(\\frac{BC}{AC}\\right)^2 = 1',
          justification: 'Using the exponent rule a²/b² = (a/b)²',
        },
        {
          stepNumber: 4,
          statement: 'Identify the trigonometric definitions: AB/AC = cos θ and BC/AC = sin θ:',
          latex: '(\\cos\\theta)^2 + (\\sin\\theta)^2 = 1 \\implies \\sin^2\\theta + \\cos^2\\theta = 1',
          justification: 'By definition of sine and cosine ratios in a right triangle.',
        },
      ],
      finalFormulaLatex: '\\sin^2\\theta + \\cos^2\\theta = 1',
      conclusion: 'This identity is true for all angles 0° ≤ θ ≤ 90° and forms the bedrock of all trigonometric transformations.',
    },
    memoryLab: [
      {
        title: 'SOH — CAH — TOA',
        mnemonic: 'SOH - CAH - TOA',
        meaning: 'Sin = Opp/Hyp | Cos = Adj/Hyp | Tan = Opp/Adj',
        boardExamTip: 'Write this at the margin of your scratch paper as soon as the exam begins.',
      },
      {
        title: 'The Hand-Trick for Standard Angles',
        mnemonic: 'Values: √(Fingers) / 2',
        meaning: 'For sin of 0°, 30°, 45°, 60°, 90°, count fingers below: √0/2=0, √1/2=1/2, √2/2=1/√2, √3/2, √4/2=1.',
        boardExamTip: 'Cosine is simply the exact reverse sequence of sine values!',
      },
      {
        title: 'Reciprocal Pairs',
        mnemonic: 'S pairs with C; C pairs with S',
        meaning: 'sin θ pairs with cosec θ; cos θ pairs with sec θ; tan θ pairs with cot θ.',
        boardExamTip: 'Common confusion: students assume sin pairs with sec. Remember the opposite letter rule!',
      },
    ],
    workedExamples: [
      {
        id: 'we-trig-1',
        title: 'Given tan A = 4/3, find all other trigonometric ratios',
        problemStatement: 'In a right triangle ABC with ∠B = 90°, given that tan A = 4/3, find sin A and cos A.',
        given: ['tan A = 4/3', '∠B = 90°'],
        toFind: 'sin A and cos A',
        strategy: 'Set up opposite side = 4k and adjacent side = 3k. Use Pythagoras theorem to find hypotenuse.',
        steps: [
          { stepNumber: 1, title: 'Define sides using a constant ratio k', latex: '\\text{Opposite } BC = 4k, \\quad \\text{Adjacent } AB = 3k', explanation: 'Since tan A = Opp/Adj = 4/3.' },
          { stepNumber: 2, title: 'Find hypotenuse using Pythagoras theorem', latex: 'AC = \\sqrt{AB^2 + BC^2} = \\sqrt{(3k)^2 + (4k)^2} = \\sqrt{9k^2 + 16k^2} = \\sqrt{25k^2} = 5k', explanation: 'Hypotenuse is always positive length.' },
          { stepNumber: 3, title: 'Compute sin A and cos A', latex: '\\sin A = \\frac{BC}{AC} = \\frac{4k}{5k} = \\frac{4}{5}, \\quad \\cos A = \\frac{AB}{AC} = \\frac{3k}{5k} = \\frac{3}{5}', explanation: 'The ratio constant k cancels out cleanly.' },
        ],
        commonMistake: 'Forgetting to check which angle is reference. Opposite of A is BC, but opposite of C would be AB!',
        sanityCheck: 'Verify identity: sin²A + cos²A = (4/5)² + (3/5)² = 16/25 + 9/25 = 25/25 = 1. Verified!',
      },
    ],
    problemSolvingStrategies: [
      'Draw the right triangle FIRST before touching any equation. Clearly mark the 90° angle and the reference angle θ.',
      'Remember that Opposite and Adjacent switch places when you look from the other acute angle (e.g. angle C instead of angle A).',
      'For standard value expressions, replace symbols with known values (e.g. sin 30° = 1/2, cos 60° = 1/2) and simplify systematically.',
    ],
    practiceQuestions: [
      {
        id: 'pq-trig-1',
        type: 'mcq',
        prompt: 'What is the value of sin 30° + cos 60°?',
        options: ['1/2', '1', '√3/2', '2'],
        correctAnswer: '1',
        hints: ['Recall sin 30° = 1/2 and cos 60° = 1/2.'],
        explanation: 'sin 30° = 1/2 and cos 60° = 1/2. Their sum is 1/2 + 1/2 = 1.',
        difficulty: 'Foundation',
      },
      {
        id: 'pq-trig-2',
        type: 'numerical',
        prompt: 'If cos θ = 12/13, what is the value of 13·sin θ?',
        correctAnswer: 5,
        tolerance: 0,
        hints: [
          '5-12-13 is a Pythagorean triple.',
          'sin θ = √(1 - cos²θ) = √(1 - 144/169) = 5/13.',
        ],
        explanation: 'In a 5-12-13 right triangle, Opposite = 5, Hypotenuse = 13. Thus sin θ = 5/13. 13 · sin θ = 13 × (5/13) = 5.',
        difficulty: 'Standard',
      },
      {
        id: 'pq-trig-3',
        type: 'missing-step',
        prompt: 'Evaluate (sec θ + tan θ)(1 - sin θ). What does this expression simplify to?',
        options: ['cos θ', 'sin θ', 'sec θ', '1'],
        correctAnswer: 'cos θ',
        hints: [
          'Convert everything to sin and cos:',
          'sec θ + tan θ = (1 + sin θ)/cos θ.',
          'Multiply with (1 - sin θ) to get (1 - sin²θ)/cos θ.',
        ],
        explanation: '((1 + sin θ)/cos θ) × (1 - sin θ) = (1 - sin²θ)/cos θ = cos²θ / cos θ = cos θ.',
        difficulty: 'Challenge',
      },
    ],
    revisionSummary: {
      corePoints: [
        'sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj.',
        'cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ.',
        'Fundamental identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ.',
        'Standard angle table: 0°, 30°, 45°, 60°, 90°.',
      ],
      commonTraps: [
        'Confusing sin(A+B) with sin A + sin B (trig functions do NOT distribute over addition!).',
        'Writing (sin θ)² as sin θ² instead of sin²θ.',
      ],
    },
  },

  // ==========================================
  // CLASS 9 — SEMESTER 2: HERON'S FORMULA
  // ==========================================
  {
    id: 'c9-s2-heron',
    classGrade: 9,
    semester: 2,
    chapterNumber: 10,
    title: "Heron's Formula",
    shortDescription: 'Calculate triangle area purely from side lengths without knowing altitude, and understand the triangle inequality condition.',
    whyItMatters: 'Land surveyors, cartographers, and civil engineers use Heron’s formula to determine triangular plot areas directly from boundary measurements without needing perpendicular heights.',
    priorKnowledge: [
      'Basic area of a triangle: 1/2 × base × height',
      'Pythagorean theorem in right triangles',
      'Algebraic factoring and square roots',
    ],
    vocabulary: [
      { term: 'Semi-perimeter (s)', definition: 'Half the perimeter of a polygon: s = (a + b + c) / 2.' },
      { term: 'Altitude / Height', definition: 'The perpendicular distance from a vertex to the opposite base.' },
      { term: 'Triangle Inequality Theorem', definition: 'The sum of the lengths of any two sides of a triangle must be strictly greater than the length of the third side.' },
    ],
    keyFormulas: [
      {
        id: 'f-heron-semiperimeter',
        name: 'Semi-perimeter of a Triangle',
        latex: 's = \\frac{a + b + c}{2}',
        description: 'Half of the total boundary distance.',
        variables: [
          { symbol: 'a, b, c', meaning: 'Lengths of the three sides' },
          { symbol: 's', meaning: 'Semi-perimeter' },
        ],
        chapterId: 'c9-s2-heron',
        classGrade: 9,
        category: 'Mensuration',
        labId: 'herons-formula',
      },
      {
        id: 'f-heron-area',
        name: "Heron's Area Formula",
        latex: '\\text{Area} = \\sqrt{s(s - a)(s - b)(s - c)}',
        description: 'Computes area solely using lengths of all three sides.',
        variables: [
          { symbol: 's', meaning: 'Semi-perimeter' },
          { symbol: 'a, b, c', meaning: 'Lengths of sides' },
        ],
        chapterId: 'c9-s2-heron',
        classGrade: 9,
        category: 'Mensuration',
        labId: 'herons-formula',
      },
    ],
    labId: 'herons-formula',
    labTitle: "Interactive Heron's Formula & Triangle Inequality Lab",
    derivation: {
      title: "Conceptual Genesis of Heron's Formula",
      targetFormula: '\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}',
      objective: 'Understand how eliminating altitude h using Pythagoras theorem leads to Heron’s symmetric form.',
      startingObservation: 'Let a triangle have base c and unknown altitude h dividing c into segments d and (c - d).',
      steps: [
        {
          stepNumber: 1,
          statement: 'Express altitude h in both right-angled sub-triangles using Pythagoras theorem:',
          latex: 'h^2 = b^2 - d^2 \\quad \\text{and} \\quad h^2 = a^2 - (c - d)^2',
          justification: 'Applying Pythagoras theorem to each half.',
        },
        {
          stepNumber: 2,
          statement: 'Equate both expressions to solve for segment d:',
          latex: 'b^2 - d^2 = a^2 - c^2 + 2cd - d^2 \\implies d = \\frac{b^2 + c^2 - a^2}{2c}',
          justification: 'The -d² terms cancel from both sides.',
        },
        {
          stepNumber: 3,
          statement: 'Substitute d back into h² = b² - d²:',
          latex: 'h^2 = (b - d)(b + d)',
          justification: 'Factoring difference of two squares.',
        },
        {
          stepNumber: 4,
          statement: 'Express Area = (1/2)·c·h and replace sides in terms of semi-perimeter s = (a+b+c)/2:',
          latex: '\\text{Area}^2 = s(s-a)(s-b)(s-c)',
          justification: 'Algebraic simplification yields the famous 4 symmetric factors.',
        },
      ],
      finalFormulaLatex: '\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}',
      conclusion: 'A triumph of Hellenistic geometry discovered by Hero of Alexandria around 60 CE.',
    },
    memoryLab: [
      {
        title: 'The 4-Factor Multiplication Rule',
        mnemonic: 's times (s-a), (s-b), (s-c)',
        meaning: 'Always write down the 4 numbers before taking the square root: s, and its differences with each side.',
        boardExamTip: 'Double check: (s-a) + (s-b) + (s-c) always equals s!',
      },
      {
        title: 'Equilateral Triangle Special Case',
        mnemonic: '√3/4 × a²',
        meaning: 'When a = b = c, Heron’s formula reduces cleanly to (√3/4)a².',
        boardExamTip: 'In exams, use (√3/4)a² directly for equilateral triangles to save 5 minutes.',
      },
    ],
    workedExamples: [
      {
        id: 'we-heron-1',
        title: 'Area of a Triangle with sides 13 cm, 14 cm, 15 cm',
        problemStatement: 'Find the area of a triangle whose sides are 13 cm, 14 cm, and 15 cm.',
        given: ['a = 13 cm', 'b = 14 cm', 'c = 15 cm'],
        toFind: 'Area of the triangle',
        strategy: 'Compute semi-perimeter s, calculate differences (s-a), (s-b), (s-c), then take the square root.',
        steps: [
          { stepNumber: 1, title: 'Calculate semi-perimeter s', latex: 's = \\frac{13 + 14 + 15}{2} = \\frac{42}{2} = 21 \\text{ cm}', explanation: 'Add the three sides and divide by 2.' },
          { stepNumber: 2, title: 'Find the differences', latex: 's - a = 21 - 13 = 8, \\quad s - b = 21 - 14 = 7, \\quad s - c = 21 - 15 = 6', explanation: 'Subtract each side length from s.' },
          { stepNumber: 3, title: 'Substitute into Heron’s formula', latex: '\\text{Area} = \\sqrt{21 \\times 8 \\times 7 \\times 6}', explanation: 'Apply the formula.' },
          { stepNumber: 4, title: 'Factor smartly before multiplying large numbers', latex: '\\text{Area} = \\sqrt{(7 \\times 3) \\times (2 \\times 4) \\times 7 \\times (2 \\times 3)} = \\sqrt{7^2 \\times 3^2 \\times 2^2 \\times 4} = 7 \\times 3 \\times 2 \\times 2 = 84 \\text{ cm}^2', explanation: 'Pair prime factors to extract clean square roots without long multiplication.' },
        ],
        commonMistake: 'Multiplying 21 × 8 × 7 × 6 = 7056 and making errors finding its long square root.',
        sanityCheck: 'If base = 14, height = 2 × 84 / 14 = 12 cm. Sides 13, 14, 15 form right triangles of legs (5, 12, 13) and (9, 12, 15). 5 + 9 = 14. Perfect match!',
      },
    ],
    problemSolvingStrategies: [
      'Check triangle inequality first: if any side ≥ sum of the other two, area is 0 or invalid!',
      'Instead of multiplying large numbers under the radical, break each factor into primes to pull out pairs.',
      'For finding height of triangle corresponding to the longest side: first find Area using Heron, then set Area = (1/2)·base·height.',
    ],
    practiceQuestions: [
      {
        id: 'pq-heron-1',
        type: 'numerical',
        prompt: 'Find the area of an equilateral triangle with side length 8 cm (in terms of √3, find k where Area = k√3).',
        correctAnswer: 16,
        tolerance: 0,
        hints: ['Area = (√3/4) × a².', 'Substitute a = 8: (√3/4) × 64.'],
        explanation: 'Area = (√3/4) × 8² = (√3/4) × 64 = 16√3 cm². Thus k = 16.',
        difficulty: 'Foundation',
      },
      {
        id: 'pq-heron-2',
        type: 'spot-error',
        prompt: 'Can a triangle have side lengths 4 cm, 5 cm, and 10 cm?',
        options: [
          'Yes, Heron formula gives a real area.',
          'No, because 4 + 5 = 9 which is less than 10 (violates triangle inequality).',
          'Yes, as long as all sides are positive numbers.',
          'Only if it is a right-angled triangle.',
        ],
        correctAnswer: 'No, because 4 + 5 = 9 which is less than 10 (violates triangle inequality).',
        hints: ['The sum of any two sides must strictly exceed the third side.'],
        explanation: '4 + 5 = 9 < 10. The two shorter sticks cannot meet, so no triangle can close.',
        difficulty: 'Foundation',
      },
    ],
    revisionSummary: {
      corePoints: [
        'Heron’s formula: Area = √[s(s-a)(s-b)(s-c)].',
        's = (a+b+c)/2.',
        'Sides must satisfy triangle inequality: a+b > c.',
        'Prime factorization under the radical simplifies finding square roots.',
      ],
      commonTraps: [
        'Forgetting to divide by 2 when calculating s (using perimeter instead of semi-perimeter).',
        'Multiplication errors with large numbers under the square root.',
      ],
    },
  },

  // ==========================================
  // CLASS 9 — SEMESTER 1: POLYNOMIALS
  // ==========================================
  {
    id: 'c9-s1-poly',
    classGrade: 9,
    semester: 1,
    chapterNumber: 2,
    title: 'Polynomials & Algebraic Identities',
    shortDescription: 'Visual area models for identities (a+b)², (a-b)², factor theorem, and degree of polynomials.',
    whyItMatters: 'Polynomials are the building blocks of calculus, physics trajectories, and computer graphic Bézier curves.',
    priorKnowledge: [
      'Basic algebraic terms and exponents',
      'Distributive property: a(b + c) = ab + ac',
    ],
    vocabulary: [
      { term: 'Polynomial', definition: 'An algebraic expression consisting of variables and coefficients with non-negative integer exponents.' },
      { term: 'Degree', definition: 'The highest power of the variable in the polynomial.' },
      { term: 'Zero of Polynomial', definition: 'A value of x for which p(x) = 0.' },
    ],
    keyFormulas: [
      {
        id: 'f-poly-id1',
        name: 'Square of a Binomial (Sum)',
        latex: '(a + b)^2 = a^2 + 2ab + b^2',
        description: 'Geometric square decomposition into 4 regions: 1 of a², 2 of ab, and 1 of b².',
        variables: [
          { symbol: 'a, b', meaning: 'Any real numbers or algebraic expressions' },
        ],
        chapterId: 'c9-s1-poly',
        classGrade: 9,
        category: 'Algebra',
        labId: 'area-model',
      },
      {
        id: 'f-poly-id2',
        name: 'Difference of Squares',
        latex: 'a^2 - b^2 = (a - b)(a + b)',
        description: 'Factorization of difference between two squares.',
        variables: [],
        chapterId: 'c9-s1-poly',
        classGrade: 9,
        category: 'Algebra',
        labId: 'area-model',
      },
    ],
    labId: 'area-model',
    labTitle: 'Interactive Geometric Area Model for Identities',
    derivation: {
      title: 'Geometric Area Derivation of (a + b)²',
      targetFormula: '(a + b)^2 = a^2 + 2ab + b^2',
      objective: 'Prove geometrically why (a+b)² contains the middle term 2ab and is NOT just a² + b².',
      startingObservation: 'Construct a square with side length equal to (a + b).',
      steps: [
        {
          stepNumber: 1,
          statement: 'Total area of the big square:',
          latex: '\\text{Area}_{\\text{total}} = (\\text{side})^2 = (a + b)^2',
          justification: 'By definition of the area of a square.',
        },
        {
          stepNumber: 2,
          statement: 'Divide the square into four distinct rectangular regions:',
          latex: '\\text{Region 1: } a \\times a = a^2, \\quad \\text{Region 4: } b \\times b = b^2',
          justification: 'Sub-squares in opposite corners.',
        },
        {
          stepNumber: 3,
          statement: 'Calculate the remaining two corner rectangles:',
          latex: '\\text{Region 2: } a \\times b = ab, \\quad \\text{Region 3: } b \\times a = ab',
          justification: 'Rectangles of length a and width b.',
        },
        {
          stepNumber: 4,
          statement: 'Sum all four partial regions:',
          latex: '\\text{Area}_{\\text{total}} = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2',
          justification: 'Total area equals the sum of its non-overlapping parts.',
        },
      ],
      finalFormulaLatex: '(a + b)^2 = a^2 + 2ab + b^2',
      conclusion: 'The visual dissection proves unequivocally why the 2ab term MUST exist!',
    },
    memoryLab: [
      {
        title: 'The "Middle Child" Rule',
        mnemonic: 'Don’t forget the middle child: 2ab!',
        meaning: '(a + b)² is NEVER a² + b². The cross term 2ab accounts for the two orange side rectangles.',
        boardExamTip: 'Most common mistake in Class 9 exams: expanding (x + 3)² as x² + 9 instead of x² + 6x + 9.',
      },
    ],
    workedExamples: [
      {
        id: 'we-poly-1',
        title: 'Evaluate 103² using algebraic identities',
        problemStatement: 'Evaluate 103² without direct multiplication.',
        given: ['Number: 103²'],
        toFind: 'Value of 103²',
        strategy: 'Rewrite 103 as (100 + 3) and apply (a + b)² = a² + 2ab + b².',
        steps: [
          { stepNumber: 1, title: 'Decompose base', latex: '103^2 = (100 + 3)^2', explanation: 'Split into convenient round numbers.' },
          { stepNumber: 2, title: 'Apply identity with a = 100, b = 3', latex: '(100 + 3)^2 = 100^2 + 2(100)(3) + 3^2', explanation: 'Substitute into formula.' },
          { stepNumber: 3, title: 'Calculate terms', latex: '= 10000 + 600 + 9 = 10609', explanation: 'Add the three parts.' },
        ],
        commonMistake: 'Writing 100² + 3² = 10009.',
        sanityCheck: '103 × 100 = 10300; 103 × 3 = 309; 10300 + 309 = 10609. Exact match!',
      },
    ],
    problemSolvingStrategies: [
      'Look for difference of squares (a² - b²) whenever you see products like (103 × 97) = (100 + 3)(100 - 3) = 10000 - 9 = 9991.',
      'Check whether an algebraic expression is a polynomial: check powers of x. If any power is negative or fractional (like √x or 1/x), it is NOT a polynomial.',
    ],
    practiceQuestions: [
      {
        id: 'pq-poly-1',
        type: 'mcq',
        prompt: 'Which of the following expressions is a polynomial in one variable?',
        options: ['x² + 2/x + 1', 'x³ + √2·x + 5', 'x + 1/√x', 'x^(1/2) + 4'],
        correctAnswer: 'x³ + √2·x + 5',
        hints: ['Coefficients can be irrational (like √2), but exponents of x MUST be non-negative integers!'],
        explanation: 'In x³ + √2·x + 5, all powers of x are {3, 1, 0} (non-negative integers). √2 is a real coefficient, which is fully valid.',
        difficulty: 'Foundation',
      },
    ],
    revisionSummary: {
      corePoints: [
        '(a + b)² = a² + 2ab + b²',
        '(a - b)² = a² - 2ab + b²',
        'a² - b² = (a - b)(a + b)',
        'Degree of a non-zero constant polynomial is 0; degree of zero polynomial is undefined.',
      ],
      commonTraps: [
        'Dropping the 2ab term in binomial expansions.',
        'Confusing coefficients with exponents when checking polynomial validity.',
      ],
    },
  },

  // ==========================================
  // CLASS 10 — SEMESTER 1: QUADRATIC EQUATIONS
  // ==========================================
  {
    id: 'c10-s1-quad',
    classGrade: 10,
    semester: 1,
    chapterNumber: 4,
    title: 'Quadratic Equations',
    shortDescription: 'Derivation of the quadratic formula by completing the square, discriminant analysis, and root nature.',
    whyItMatters: 'Projectiles follow quadratic paths, braking distances scale quadratically, and optimization problems in business rely on parabolas.',
    priorKnowledge: [
      'Factoring quadratic polynomials',
      'Square roots and algebraic equations',
    ],
    vocabulary: [
      { term: 'Standard Quadratic Form', definition: 'ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0.' },
      { term: 'Discriminant (D)', definition: 'D = b² - 4ac. Determines the nature of real roots.' },
      { term: 'Roots / Solutions', definition: 'Values of x that satisfy ax² + bx + c = 0.' },
    ],
    keyFormulas: [
      {
        id: 'f-quad-formula',
        name: 'The Quadratic Formula',
        latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        description: 'General solution for any quadratic equation ax² + bx + c = 0.',
        variables: [
          { symbol: 'a', meaning: 'Coefficient of x² (a ≠ 0)' },
          { symbol: 'b', meaning: 'Coefficient of x' },
          { symbol: 'c', meaning: 'Constant term' },
        ],
        chapterId: 'c10-s1-quad',
        classGrade: 10,
        category: 'Algebra',
        labId: 'quadratic-parabola',
      },
      {
        id: 'f-quad-discriminant',
        name: 'Discriminant Formula',
        latex: 'D = b^2 - 4ac',
        description: 'D > 0: two distinct real roots; D = 0: two equal real roots; D < 0: no real roots.',
        variables: [],
        chapterId: 'c10-s1-quad',
        classGrade: 10,
        category: 'Algebra',
        labId: 'quadratic-parabola',
      },
    ],
    labId: 'quadratic-parabola',
    labTitle: 'Parabola Curve Explorer & Discriminant Lab',
    derivation: {
      title: 'Derivation of the Quadratic Formula (Completing the Square)',
      targetFormula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      objective: 'Solve ax² + bx + c = 0 in full generality.',
      startingObservation: 'Start with the general form ax² + bx + c = 0 (with a ≠ 0).',
      steps: [
        {
          stepNumber: 1,
          statement: 'Divide throughout by leading coefficient a:',
          latex: 'x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0',
          justification: 'Since a ≠ 0, division is permissible.',
        },
        {
          stepNumber: 2,
          statement: 'Move the constant term to the right side:',
          latex: 'x^2 + \\frac{b}{a}x = -\\frac{c}{a}',
          justification: 'Subtracting c/a from both sides.',
        },
        {
          stepNumber: 3,
          statement: 'Add [b/(2a)]² to both sides to complete the square on the left:',
          latex: 'x^2 + 2\\left(\\frac{b}{2a}\\right)x + \\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2} - \\frac{c}{a}',
          justification: 'Creating a perfect square trinomial (x + b/(2a))².',
        },
        {
          stepNumber: 4,
          statement: 'Factor the left side and find common denominator on the right:',
          latex: '\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}',
          justification: 'Multiplying c/a by 4a/4a yields (b² - 4ac) / (4a²).',
        },
        {
          stepNumber: 5,
          statement: 'Take square root on both sides:',
          latex: 'x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}',
          justification: '√(4a²) = 2a.',
        },
        {
          stepNumber: 6,
          statement: 'Subtract b/(2a) to isolate x:',
          latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          justification: 'Combining fractions with common denominator 2a.',
        },
      ],
      finalFormulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      conclusion: 'Completing the square guarantees this formula solves ANY quadratic equation over the reals.',
    },
    memoryLab: [
      {
        title: 'Song Rhythm for the Formula',
        mnemonic: 'Negative b, plus or minus root b² - 4ac, all over 2a!',
        meaning: 'Rhythmic recall ensures you don’t forget the denominator 2a or the negative sign on b.',
        boardExamTip: 'Always write down a, b, c explicitly with their signs (+ or -) before substituting.',
      },
    ],
    workedExamples: [
      {
        id: 'we-quad-1',
        title: 'Solve 2x² - 7x + 3 = 0',
        problemStatement: 'Find the roots of the quadratic equation 2x² - 7x + 3 = 0.',
        given: ['a = 2', 'b = -7', 'c = 3'],
        toFind: 'Roots of the equation',
        strategy: 'Calculate D first, then apply quadratic formula.',
        steps: [
          { stepNumber: 1, title: 'Compute Discriminant D', latex: 'D = (-7)^2 - 4(2)(3) = 49 - 24 = 25', explanation: 'Since D = 25 > 0, there are two distinct real roots.' },
          { stepNumber: 2, title: 'Substitute into formula', latex: 'x = \\frac{-(-7) \\pm \\sqrt{25}}{2(2)} = \\frac{7 \\pm 5}{4}', explanation: '-(-7) becomes positive 7.' },
          { stepNumber: 3, title: 'Compute two roots', latex: 'x_1 = \\frac{7 + 5}{4} = \\frac{12}{4} = 3, \\quad x_2 = \\frac{7 - 5}{4} = \\frac{2}{4} = \\frac{1}{2}', explanation: 'Split into plus and minus branches.' },
        ],
        commonMistake: 'Forgetting that -b with b = -7 becomes +7.',
        sanityCheck: 'Substitute x = 3: 2(9) - 7(3) + 3 = 18 - 21 + 3 = 0. Satisfies the equation!',
      },
    ],
    problemSolvingStrategies: [
      'Always calculate D = b² - 4ac first! If D is negative, you can immediately conclude "no real roots" without wasting time.',
      'Check if factorization by splitting middle term is obvious before jumping into the quadratic formula.',
    ],
    practiceQuestions: [
      {
        id: 'pq-quad-1',
        type: 'mcq',
        prompt: 'What is the nature of the roots of 3x² - 4√3·x + 4 = 0?',
        options: ['Two distinct real roots', 'Two equal real roots', 'No real roots', 'Roots cannot be determined'],
        correctAnswer: 'Two equal real roots',
        hints: ['Calculate D = b² - 4ac with b = -4√3.'],
        explanation: 'D = (-4√3)² - 4(3)(4) = (16 × 3) - 48 = 48 - 48 = 0. D = 0 implies two equal real roots.',
        difficulty: 'Standard',
      },
    ],
    revisionSummary: {
      corePoints: [
        'Standard form: ax² + bx + c = 0 (a ≠ 0).',
        'Quadratic formula: x = [-b ± √(b² - 4ac)] / (2a).',
        'D = b² - 4ac determines root nature (D > 0, D = 0, D < 0).',
      ],
      commonTraps: [
        'Missing negative sign on b when b is already negative (-(-b)).',
        'Forgetting to divide the entire numerator by 2a, not just the square root.',
      ],
    },
  },

  // ==========================================
  // CLASS 10 — SEMESTER 2: PROBABILITY
  // ==========================================
  {
    id: 'c10-s2-prob',
    classGrade: 10,
    semester: 2,
    chapterNumber: 14,
    title: 'Probability',
    shortDescription: 'Theoretical probability vs Law of Large Numbers empirical simulations, sample spaces, and impossible/sure events.',
    whyItMatters: 'Probability governs weather forecasting, insurance actuarial tables, artificial intelligence, genetics, and quantum mechanics.',
    priorKnowledge: [
      'Fractions and percentages',
      'Sample space concepts and fair games',
    ],
    vocabulary: [
      { term: 'Sample Space (S)', definition: 'The set of all possible outcomes of a random experiment.' },
      { term: 'Favourable Outcomes n(E)', definition: 'Outcomes that satisfy the specific condition of event E.' },
      { term: 'Equally Likely Outcomes', definition: 'Outcomes where each has the exact same likelihood of occurring.' },
    ],
    keyFormulas: [
      {
        id: 'f-prob-classical',
        name: 'Classical Probability of an Event',
        latex: 'P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{Number of favourable outcomes}}{\\text{Total number of possible outcomes}}',
        description: 'Calculates the theoretical probability for equally likely outcomes.',
        variables: [
          { symbol: 'P(E)', meaning: 'Probability of event E (0 ≤ P(E) ≤ 1)' },
          { symbol: 'n(E)', meaning: 'Count of favourable outcomes' },
          { symbol: 'n(S)', meaning: 'Total count in sample space' },
        ],
        chapterId: 'c10-s2-prob',
        classGrade: 10,
        category: 'Statistics & Probability',
        labId: 'probability-sim',
      },
      {
        id: 'f-prob-complement',
        name: 'Complementary Event Formula',
        latex: 'P(E) + P(\\bar{E}) = 1 \\implies P(\\bar{E}) = 1 - P(E)',
        description: 'Sum of probability of an event and its non-occurrence is always 1.',
        variables: [],
        chapterId: 'c10-s2-prob',
        classGrade: 10,
        category: 'Statistics & Probability',
        labId: 'probability-sim',
      },
    ],
    labId: 'probability-sim',
    labTitle: 'Law of Large Numbers & Monte Carlo Simulator',
    derivation: {
      title: 'Probability Axioms & The Range 0 ≤ P(E) ≤ 1',
      targetFormula: '0 \\le P(E) \\le 1',
      objective: 'Prove why probability cannot be negative and cannot exceed 1.',
      startingObservation: 'For any event E in sample space S, the number of favourable outcomes n(E) satisfies 0 ≤ n(E) ≤ n(S).',
      steps: [
        {
          stepNumber: 1,
          statement: 'Observe the bounds on favourable counts:',
          latex: '0 \\le n(E) \\le n(S)',
          justification: 'An event can have at least 0 outcomes (empty set) and at most all outcomes in S.',
        },
        {
          stepNumber: 2,
          statement: 'Divide all terms by n(S) (since n(S) > 0 for non-empty experiments):',
          latex: '\\frac{0}{n(S)} \\le \\frac{n(E)}{n(S)} \\le \\frac{n(S)}{n(S)}',
          justification: 'Dividing inequalities by a positive number preserves direction.',
        },
        {
          stepNumber: 3,
          statement: 'Simplify each part:',
          latex: '0 \\le P(E) \\le 1',
          justification: 'P(E) = n(E) / n(S) by definition.',
        },
      ],
      finalFormulaLatex: '0 \\le P(E) \\le 1',
      conclusion: 'P(impossible event) = 0 and P(sure event) = 1.',
    },
    memoryLab: [
      {
        title: 'Favourable Over Total',
        mnemonic: 'F / T: Free Tickets!',
        meaning: 'Always put Favourable count in numerator and Total count in denominator.',
        boardExamTip: 'Never leave probability as an unreduced fraction in SSC exams; always reduce to lowest terms.',
      },
    ],
    workedExamples: [
      {
        id: 'we-prob-1',
        title: 'Probability of Getting a Prime Number on a Die',
        problemStatement: 'A fair die is thrown once. What is the probability of getting a prime number?',
        given: ['Die outcomes: {1, 2, 3, 4, 5, 6}', 'Total n(S) = 6'],
        toFind: 'P(Prime number)',
        strategy: 'Identify prime numbers in {1, 2, 3, 4, 5, 6} and divide by 6.',
        steps: [
          { stepNumber: 1, title: 'Identify prime outcomes', explanation: 'Prime numbers are numbers greater than 1 with exactly two divisors: {2, 3, 5}. (Note: 1 is NOT prime!)' },
          { stepNumber: 2, title: 'Count favourable outcomes', latex: 'n(E) = 3', explanation: 'Outcomes {2, 3, 5}.' },
          { stepNumber: 3, title: 'Compute probability', latex: 'P(E) = \\frac{3}{6} = \\frac{1}{2}', explanation: 'Simplify to lowest terms.' },
        ],
        commonMistake: 'Counting 1 as a prime number (giving 4/6 = 2/3). 1 is neither prime nor composite!',
        sanityCheck: 'Exactly half the faces {2, 3, 5} are prime, the other half {1, 4, 6} are not. 1/2 is correct.',
      },
    ],
    problemSolvingStrategies: [
      'Beware of 1: 1 is NEITHER prime nor composite.',
      'For two dice problems: total sample space is 6 × 6 = 36. Always write out outcomes in a 6×6 grid if needed.',
      'For cards: 52 total cards = 26 red + 26 black. 4 suits of 13 cards each (Spades, Clubs are black; Hearts, Diamonds are red). 12 face cards (4 Jacks, 4 Queens, 4 Kings).',
    ],
    practiceQuestions: [
      {
        id: 'pq-prob-1',
        type: 'mcq',
        prompt: 'Which of the following CANNOT be the probability of an event?',
        options: ['2/3', '-1.5', '15%', '0.7'],
        correctAnswer: '-1.5',
        hints: ['Probability of any event must satisfy 0 ≤ P(E) ≤ 1.'],
        explanation: 'Probability can never be negative. Hence -1.5 is impossible.',
        difficulty: 'Foundation',
      },
    ],
    revisionSummary: {
      corePoints: [
        'P(E) = n(E) / n(S).',
        '0 ≤ P(E) ≤ 1.',
        'P(E) + P(not E) = 1.',
        'P(sure event) = 1, P(impossible event) = 0.',
      ],
      commonTraps: [
        'Including 1 in the list of prime numbers.',
        'Giving probabilities greater than 1 or negative numbers.',
      ],
    },
  },
];

// Complete Syllabus Index of all 26 AP Board Chapters (Class 9 & Class 10)
export interface ChapterMeta {
  id: string;
  classGrade: 9 | 10;
  semester: 1 | 2;
  chapterNumber: number;
  title: string;
  topicCategory: string;
  description: string;
  hasInteractiveLab: boolean;
  labId?: string;
}

export const allCurriculumChapters: ChapterMeta[] = [
  // Class 9 Semester 1
  { id: 'c9-s1-ch1', classGrade: 9, semester: 1, chapterNumber: 1, title: 'Number Systems', topicCategory: 'Number Systems', description: 'Real numbers, irrationality proofs, decimal expansions, and laws of exponents.', hasInteractiveLab: false },
  { id: 'c9-s1-poly', classGrade: 9, semester: 1, chapterNumber: 2, title: 'Polynomials', topicCategory: 'Algebra', description: 'Algebraic identities, area models, remainder theorem, and factorization.', hasInteractiveLab: true, labId: 'area-model' },
  { id: 'c9-s1-ch3', classGrade: 9, semester: 1, chapterNumber: 3, title: 'Coordinate Geometry', topicCategory: 'Coordinate Geometry', description: 'Cartesian plane, quadrants, plotting coordinates, and distance visualization.', hasInteractiveLab: true, labId: 'coordinate-geometry' },
  { id: 'c9-s1-ch4', classGrade: 9, semester: 1, chapterNumber: 4, title: 'Linear Equations in Two Variables', topicCategory: 'Algebra', description: 'Solutions, graphing linear equations, and interpreting intersections.', hasInteractiveLab: false },
  { id: 'c9-s1-ch5', classGrade: 9, semester: 1, chapterNumber: 5, title: "Introduction to Euclid's Geometry", topicCategory: 'Geometry', description: 'Axioms, postulates, definitions, and Euclid’s five postulates.', hasInteractiveLab: false },
  { id: 'c9-s1-ch6', classGrade: 9, semester: 1, chapterNumber: 6, title: 'Lines and Angles', topicCategory: 'Geometry', description: 'Intersecting lines, parallel lines, alternate angles, and angle sum property.', hasInteractiveLab: false },

  // Class 9 Semester 2
  { id: 'c9-s2-ch7', classGrade: 9, semester: 2, chapterNumber: 7, title: 'Triangles', topicCategory: 'Geometry', description: 'Congruence criteria (SAS, ASA, AAS, SSS, RHS) and inequalities in triangles.', hasInteractiveLab: false },
  { id: 'c9-s2-ch8', classGrade: 9, semester: 2, chapterNumber: 8, title: 'Quadrilaterals', topicCategory: 'Geometry', description: 'Properties of parallelograms, mid-point theorem, and classification.', hasInteractiveLab: false },
  { id: 'c9-s2-ch9', classGrade: 9, semester: 2, chapterNumber: 9, title: 'Circles', topicCategory: 'Geometry', description: 'Chords, subtended angles, cyclic quadrilaterals, and angle at center theorem.', hasInteractiveLab: true, labId: 'circle-area' },
  { id: 'c9-s2-heron', classGrade: 9, semester: 2, chapterNumber: 10, title: "Heron's Formula", topicCategory: 'Mensuration', description: 'Area of triangles from side lengths and triangle inequality validation.', hasInteractiveLab: true, labId: 'herons-formula' },
  { id: 'c9-s2-ch11', classGrade: 9, semester: 2, chapterNumber: 11, title: 'Surface Areas and Volumes', topicCategory: 'Mensuration', description: 'Cubes, cuboids, cylinders, cones, and spheres with 2D net unrolling.', hasInteractiveLab: true, labId: 'cylinder-net' },
  { id: 'c9-s2-ch12', classGrade: 9, semester: 2, chapterNumber: 12, title: 'Statistics', topicCategory: 'Statistics & Probability', description: 'Collection, presentation, bar graphs, histograms, and frequency polygons.', hasInteractiveLab: false },

  // Class 10 Semester 1
  { id: 'c10-s1-ch1', classGrade: 10, semester: 1, chapterNumber: 1, title: 'Real Numbers', topicCategory: 'Number Systems', description: 'Fundamental Theorem of Arithmetic, irrationality of √2 and √3, decimal terminations.', hasInteractiveLab: false },
  { id: 'c10-s1-ch2', classGrade: 10, semester: 1, chapterNumber: 2, title: 'Polynomials', topicCategory: 'Algebra', description: 'Geometric meaning of zeroes, relationship between coefficients and zeroes of quadratic polynomials.', hasInteractiveLab: true, labId: 'quadratic-parabola' },
  { id: 'c10-s1-ch3', classGrade: 10, semester: 1, chapterNumber: 3, title: 'Pair of Linear Equations in Two Variables', topicCategory: 'Algebra', description: 'Graphical method, consistency conditions (a₁/a₂), substitution, and elimination.', hasInteractiveLab: false },
  { id: 'c10-s1-quad', classGrade: 10, semester: 1, chapterNumber: 4, title: 'Quadratic Equations', topicCategory: 'Algebra', description: 'Completing the square, quadratic formula derivation, and discriminant analysis.', hasInteractiveLab: true, labId: 'quadratic-parabola' },
  { id: 'c10-s1-ap', classGrade: 10, semester: 1, chapterNumber: 5, title: 'Arithmetic Progressions', topicCategory: 'Algebra', description: 'nth term, Gauss sum formula derivation, and sequence visualization.', hasInteractiveLab: true, labId: 'arithmetic-progression' },
  { id: 'c10-s1-ch6', classGrade: 10, semester: 1, chapterNumber: 6, title: 'Triangles', topicCategory: 'Geometry', description: 'Basic Proportionality Theorem (Thales), similarity criteria (AAA, SSS, SAS), and proofs.', hasInteractiveLab: false },
  { id: 'c10-s1-ch7', classGrade: 10, semester: 1, chapterNumber: 7, title: 'Coordinate Geometry', topicCategory: 'Coordinate Geometry', description: 'Distance formula derivation from Pythagoras, section formula, and collinearity.', hasInteractiveLab: true, labId: 'coordinate-geometry' },

  // Class 10 Semester 2
  { id: 'c10-s2-trig', classGrade: 10, semester: 2, chapterNumber: 8, title: 'Introduction to Trigonometry', topicCategory: 'Trigonometry', description: 'Right-triangle ratios, SOH-CAH-TOA, standard angle values, and Pythagorean identities.', hasInteractiveLab: true, labId: 'trig-triangle' },
  { id: 'c10-s2-ch9', classGrade: 10, semester: 2, chapterNumber: 9, title: 'Some Applications of Trigonometry', topicCategory: 'Trigonometry', description: 'Heights and distances, line of sight, angle of elevation and depression.', hasInteractiveLab: true, labId: 'trig-triangle' },
  { id: 'c10-s2-ch10', classGrade: 10, semester: 2, chapterNumber: 10, title: 'Circles', topicCategory: 'Geometry', description: 'Tangents to a circle, radius perpendicular to tangent, and lengths of tangents from external point.', hasInteractiveLab: false },
  { id: 'c10-s2-ch11', classGrade: 10, semester: 2, chapterNumber: 11, title: 'Areas Related to Circles', topicCategory: 'Mensuration', description: 'Perimeter and area of circle, sector rearrangement model, area of sector and segment.', hasInteractiveLab: true, labId: 'circle-area' },
  { id: 'c10-s2-ch12', classGrade: 10, semester: 2, chapterNumber: 12, title: 'Surface Areas and Volumes', topicCategory: 'Mensuration', description: 'Surface areas and volumes of combinations of solids (cone on cylinder, hemisphere on cube).', hasInteractiveLab: true, labId: 'cylinder-net' },
  { id: 'c10-s2-ch13', classGrade: 10, semester: 2, chapterNumber: 13, title: 'Statistics', topicCategory: 'Statistics & Probability', description: 'Mean of grouped data (Direct, Assumed Mean, Step Deviation), Mode, and Median.', hasInteractiveLab: false },
  { id: 'c10-s2-prob', classGrade: 10, semester: 2, chapterNumber: 14, title: 'Probability', topicCategory: 'Statistics & Probability', description: 'Classical probability, Law of Large Numbers Monte Carlo trials, coin and dice simulations.', hasInteractiveLab: true, labId: 'probability-sim' },
];
