import type { Chapter } from '../../types/curriculum';

export const class10Chapters: Chapter[] = [
  {
    "id": "c10-s1-ch1",
    "classGrade": 10,
    "semester": 1,
    "chapterNumber": 1,
    "title": "Real Numbers",
    "shortDescription": "Master the Fundamental Theorem of Arithmetic, HCF & LCM relationships, and analytical proofs of irrationality.",
    "whyItMatters": "Modern cryptography (RSA encryption), secure internet banking, and data hashing rely directly on prime factorisation of real numbers.",
    "priorKnowledge": [
      "Divisibility tests and prime factorisation",
      "Rational vs irrational numbers distinction",
      "Finding HCF and LCM of numbers by prime factors"
    ],
    "vocabulary": [
      {
        "term": "Fundamental Theorem of Arithmetic",
        "definition": "Every composite number can be expressed as a unique product of primes, up to the order of factors."
      },
      {
        "term": "HCF (Highest Common Factor)",
        "definition": "Product of the smallest power of each common prime factor involved in the numbers."
      },
      {
        "term": "LCM (Least Common Multiple)",
        "definition": "Product of the greatest power of each prime factor involved in the numbers."
      },
      {
        "term": "Co-prime Numbers",
        "definition": "Two integers whose HCF is strictly 1."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch1-fta",
        "name": "Fundamental Theorem of Arithmetic",
        "latex": "n = p_1^{a_1} p_2^{a_2} \\cdots p_k^{a_k} \\quad (p_1 < p_2 < \\dots < p_k)",
        "description": "Every composite integer can be uniquely factored into a product of primes, apart from the rearrangement of factors.",
        "variables": [
          {
            "symbol": "n",
            "meaning": "Composite integer > 1"
          },
          {
            "symbol": "p_i",
            "meaning": "Unique prime factors"
          },
          {
            "symbol": "a_i",
            "meaning": "Natural exponent powers"
          }
        ],
        "chapterId": "c10-s1-ch1",
        "classGrade": 10,
        "category": "Number Systems",
        "conditions": "Unique up to factor ordering.",
        "whenToUse": "Finding HCF and LCM and proving irrationality."
      },
      {
        "id": "f-c10-ch1-hcf-lcm",
        "name": "Two-Integer HCF and LCM Product Invariant",
        "latex": "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b",
        "description": "For any two positive integers a and b, the product of their HCF and LCM equals their direct product.",
        "variables": [
          {
            "symbol": "a, b",
            "meaning": "Two positive integers"
          }
        ],
        "chapterId": "c10-s1-ch1",
        "classGrade": 10,
        "category": "Number Systems",
        "conditions": "Valid for EXACTLY two integers a, b. Does NOT hold in general for 3 numbers!",
        "whenToUse": "Finding LCM when HCF and the numbers are given, or vice versa.",
        "workedExample": {
          "problem": "Given HCF(306, 657) = 9, find LCM(306, 657)",
          "solution": "LCM = (a × b) / HCF = (306 × 657) / 9 = 34 × 657 = 22338."
        },
        "mnemonic": "HCF × LCM = Product of Two Numbers!"
      },
      {
        "id": "f-c10-ch1-irrat",
        "name": "Prime Divisibility Lemma for Irrationality",
        "latex": "p \\mid a^2 \\implies p \\mid a \\quad (p \\text{ is prime}, a \\in \\mathbb{Z}^+)",
        "description": "Key lemma from Fundamental Theorem of Arithmetic used in proof by contradiction that √p is irrational.",
        "variables": [
          {
            "symbol": "p",
            "meaning": "Prime number"
          },
          {
            "symbol": "a",
            "meaning": "Positive integer"
          }
        ],
        "chapterId": "c10-s1-ch1",
        "classGrade": 10,
        "category": "Number Systems",
        "conditions": "p must be a prime number.",
        "whenToUse": "Proving √2, √3, √5 are irrational."
      },
      {
        "id": "f-c10-ch1-term-test",
        "name": "Terminating Decimal Condition",
        "latex": "q = 2^n \\cdot 5^m \\quad (n, m \\in \\mathbb{W}) \\iff \\frac{p}{q} \\text{ terminates}",
        "description": "A rational number p/q in simplest form has a terminating decimal expansion if and only if the prime factorisation of q has only 2s and/or 5s.",
        "variables": [
          {
            "symbol": "p/q",
            "meaning": "Rational fraction in lowest terms (HCF(p, q) = 1)"
          },
          {
            "symbol": "n, m",
            "meaning": "Non-negative whole numbers"
          }
        ],
        "chapterId": "c10-s1-ch1",
        "classGrade": 10,
        "category": "Number Systems",
        "conditions": "Fraction must be fully simplified before factorising denominator.",
        "whenToUse": "Predicting whether decimal terminates without actual long division."
      }
    ],
    "derivation": {
      "title": "Proof of Irrationality of √5 by Contradiction",
      "targetFormula": "\\sqrt{5} \\notin \\mathbb{Q}",
      "objective": "Prove that √5 is irrational using the Fundamental Theorem of Arithmetic lemma.",
      "startingObservation": "Assume √5 is rational, so √5 = a/b where a and b are co-prime integers (HCF(a, b) = 1) and b ≠ 0.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Square both sides:",
          "latex": "5 = \\frac{a^2}{b^2} \\implies a^2 = 5b^2",
          "justification": "Squaring equality preserves balance."
        },
        {
          "stepNumber": 2,
          "statement": "Apply prime divisibility lemma:",
          "latex": "5 \\mid a^2 \\implies 5 \\mid a \\implies a = 5c \\quad (c \\in \\mathbb{Z})",
          "justification": "Since 5 is prime and divides a², it must divide a."
        },
        {
          "stepNumber": 3,
          "statement": "Substitute a = 5c into step 1:",
          "latex": "(5c)^2 = 5b^2 \\implies 25c^2 = 5b^2 \\implies b^2 = 5c^2",
          "justification": "Algebraic substitution and division by 5."
        },
        {
          "stepNumber": 4,
          "statement": "Deduce divisibility of b:",
          "latex": "5 \\mid b^2 \\implies 5 \\mid b",
          "justification": "Same lemma applied to b."
        },
        {
          "stepNumber": 5,
          "statement": "Identify the contradiction:",
          "latex": "5 \\mid a \\land 5 \\mid b \\implies \\text{HCF}(a, b) \\ge 5",
          "justification": "Contradicts our starting premise that a and b were co-prime with HCF(a, b) = 1."
        }
      ],
      "finalFormulaLatex": "\\sqrt{5} \\text{ is Irrational}",
      "conclusion": "Our initial assumption that √5 is rational must be false. Therefore, √5 is irrational."
    },
    "memoryLab": [
      {
        "title": "HCF × LCM Limit",
        "mnemonic": "HCF × LCM = a × b works for TWO numbers only!",
        "meaning": "Never use HCF × LCM = a × b × c for three numbers! It is mathematically false.",
        "boardExamTip": "For 3 numbers: HCF is product of smallest power of each common prime; LCM is product of greatest power of each prime factor."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch1-1",
        "title": "Finding HCF and LCM and Verifying Product Formula",
        "problemStatement": "Find the HCF and LCM of 96 and 404 by the prime factorisation method, and verify that HCF × LCM = Product of the two numbers.",
        "given": [
          "Numbers: 96 and 404"
        ],
        "toFind": "HCF, LCM, and verification of HCF × LCM = a × b",
        "strategy": "Express both numbers as products of prime factors.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Prime factorisation",
            "latex": "96 = 2^5 \\times 3, \\quad 404 = 2^2 \\times 101",
            "explanation": "Break into prime powers."
          },
          {
            "stepNumber": 2,
            "title": "Calculate HCF",
            "latex": "\\text{HCF}(96, 404) = 2^2 = 4",
            "explanation": "Smallest power of common prime factor 2."
          },
          {
            "stepNumber": 3,
            "title": "Calculate LCM",
            "latex": "\\text{LCM}(96, 404) = 2^5 \\times 3 \\times 101 = 32 \\times 303 = 9696",
            "explanation": "Greatest power of each prime involved."
          },
          {
            "stepNumber": 4,
            "title": "Verify Product",
            "latex": "\\text{HCF} \\times \\text{LCM} = 4 \\times 9696 = 38784, \\quad 96 \\times 404 = 38784",
            "explanation": "Both products are equal to 38784."
          }
        ],
        "commonMistake": "Taking LCM power of 2 as 2² instead of highest power 2⁵.",
        "sanityCheck": "38784 = 38784. Verified!"
      },
      {
        "id": "we-c10-ch1-2",
        "title": "Proving Irrationality of 3 + 2√5",
        "problemStatement": "Prove that 3 + 2√5 is irrational, given that √5 is irrational.",
        "given": [
          "√5 is irrational"
        ],
        "toFind": "Proof that 3 + 2√5 is irrational",
        "strategy": "Assume 3 + 2√5 is rational = a/b and isolate √5.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Assume rational",
            "latex": "3 + 2\\sqrt{5} = \\frac{a}{b} \\quad (b \\neq 0, a, b \\in \\mathbb{Z})",
            "explanation": "Proof by contradiction."
          },
          {
            "stepNumber": 2,
            "title": "Isolate √5",
            "latex": "2\\sqrt{5} = \\frac{a}{b} - 3 = \\frac{a - 3b}{b} \\implies \\sqrt{5} = \\frac{a - 3b}{2b}",
            "explanation": "Rearrange algebraically."
          },
          {
            "stepNumber": 3,
            "title": "State contradiction",
            "latex": "\\text{RHS is rational since } a, b \\in \\mathbb{Z}, \\text{ but LHS } \\sqrt{5} \\text{ is irrational.}",
            "explanation": "A rational number cannot equal an irrational number."
          }
        ],
        "commonMistake": "Trying to square both sides (which makes the algebra needlessly complex).",
        "sanityCheck": "Contradiction reached cleanly in 3 lines. Correct!"
      }
    ],
    "problemSolvingStrategies": [
      "For composite forms like a + b√p, always isolate √p on LHS and express RHS as a fraction of integers.",
      "Check if a number ends in zero: a number 6^n ends with digit zero if and only if prime factorisation contains BOTH 2 and 5."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch1-1",
        "type": "numerical",
        "prompt": "If HCF(a, b) = 12 and a × b = 1800, find LCM(a, b).",
        "correctAnswer": 150,
        "tolerance": 0,
        "hints": [
          "HCF × LCM = a × b => 12 × LCM = 1800."
        ],
        "explanation": "LCM = 1800 / 12 = 150.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch1-2",
        "type": "mcq",
        "prompt": "The decimal expansion of 17 / (2³ × 5) will terminate after how many decimal places?",
        "options": [
          "1 place",
          "2 places",
          "3 places",
          "4 places"
        ],
        "correctAnswer": "3 places",
        "hints": [
          "The number of decimal places is determined by the maximum exponent of 2 or 5 in denominator.",
          "Max(3, 1) = 3."
        ],
        "explanation": "The maximum power of 2 or 5 in the denominator is 3, so it terminates after 3 decimal places.",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c10-ch1-3",
        "type": "mcq",
        "prompt": "For what natural value of n can 6^n end with the digit 0?",
        "options": [
          "For n = 5",
          "For even n",
          "For odd n",
          "For no natural number n"
        ],
        "correctAnswer": "For no natural number n",
        "hints": [
          "To end with 0, prime factors must include 5. Prime factors of 6^n are (2 × 3)^n, which lacks 5."
        ],
        "explanation": "Since 5 is not in the prime factorisation of 6, 6^n can never end with digit 0.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "FTA: Every composite number is uniquely expressible as a product of primes.",
        "HCF(a, b) × LCM(a, b) = a × b.",
        "p prime and p | a² => p | a.",
        "Denominator of simplest fraction terminates iff q = 2^n · 5^m."
      ],
      "commonTraps": [
        "Applying HCF × LCM = a × b × c for 3 numbers (invalid!).",
        "Not simplifying fraction before checking denominator powers of 2 and 5."
      ]
    },
    "labId": "area-model",
    "labTitle": "Real Numbers"
  },
  {
    "id": "c10-s1-ch2",
    "classGrade": 10,
    "semester": 1,
    "chapterNumber": 2,
    "title": "Polynomials",
    "shortDescription": "Master zeroes of polynomials, relationships between zeroes and coefficients (quadratic & cubic), and polynomial formation.",
    "whyItMatters": "Polynomial roots govern equilibrium solutions in economics, structural natural frequencies, and parabolic trajectory physics.",
    "priorKnowledge": [
      "Degree and classification of polynomials",
      "Factorisation of quadratic expressions by splitting the middle term",
      "Value of polynomial p(k) at x = k"
    ],
    "vocabulary": [
      {
        "term": "Zero of Polynomial",
        "definition": "A real value of x at which the value of polynomial p(x) becomes zero; geometrically, the x-intercepts of y = p(x)."
      },
      {
        "term": "Quadratic Polynomial",
        "definition": "A polynomial of degree 2: p(x) = ax² + bx + c (a ≠ 0)."
      },
      {
        "term": "Cubic Polynomial",
        "definition": "A polynomial of degree 3: p(x) = ax³ + bx² + cx + d (a ≠ 0)."
      },
      {
        "term": "Parabola",
        "definition": "The U-shaped curve representing the graph of a quadratic polynomial y = ax² + bx + c."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch2-quad-rel",
        "name": "Quadratic Zeroes and Coefficients Relations",
        "latex": "\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}",
        "description": "Sum of zeroes equals -(coefficient of x) / (coefficient of x²); product of zeroes equals (constant term) / (coefficient of x²).",
        "variables": [
          {
            "symbol": "\\alpha, \\beta",
            "meaning": "Zeroes (roots) of ax² + bx + c = 0"
          },
          {
            "symbol": "a, b, c",
            "meaning": "Coefficients with a ≠ 0"
          }
        ],
        "chapterId": "c10-s1-ch2",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "a ≠ 0.",
        "whenToUse": "Relating roots directly to coefficients without solving the quadratic.",
        "workedExample": {
          "problem": "Find sum and product of zeroes of 3x² + 5x - 2",
          "solution": "Sum = -b/a = -5/3. Product = c/a = -2/3."
        },
        "mnemonic": "Sum is -b/a, Product is +c/a!"
      },
      {
        "id": "f-c10-ch2-quad-form",
        "name": "Quadratic Polynomial Formation Formula",
        "latex": "p(x) = k [x^2 - (\\alpha + \\beta)x + \\alpha\\beta] \\quad (k \\neq 0)",
        "description": "Forms the family of quadratic polynomials with specified sum and product of zeroes.",
        "variables": [
          {
            "symbol": "k",
            "meaning": "Any non-zero real scaling constant"
          }
        ],
        "chapterId": "c10-s1-ch2",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "k ≠ 0.",
        "whenToUse": "Constructing quadratic equation when zeroes or sum/product are given.",
        "workedExample": {
          "problem": "Form a quadratic polynomial with sum = -3 and product = 2",
          "solution": "p(x) = k[x² - (-3)x + 2] = k[x² + 3x + 2]. For k = 1, p(x) = x² + 3x + 2."
        }
      },
      {
        "id": "f-c10-ch2-cubic-rel",
        "name": "Cubic Polynomial Zeroes and Coefficients Relations",
        "latex": "\\alpha + \\beta + \\gamma = -\\frac{b}{a}, \\quad \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac{c}{a}, \\quad \\alpha\\beta\\gamma = -\\frac{d}{a}",
        "description": "Relations between the three zeroes α, β, γ of cubic polynomial ax³ + bx² + cx + d and its coefficients.",
        "variables": [
          {
            "symbol": "\\alpha, \\beta, \\gamma",
            "meaning": "Roots of cubic polynomial"
          },
          {
            "symbol": "a, b, c, d",
            "meaning": "Coefficients with a ≠ 0"
          }
        ],
        "chapterId": "c10-s1-ch2",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "a ≠ 0.",
        "whenToUse": "Cubic polynomial questions in Board exams."
      },
      {
        "id": "f-c10-ch2-sym-exp",
        "name": "Symmetric Expressions of Zeroes",
        "latex": "\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta, \\quad \\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta}",
        "description": "Evaluates symmetric combinations of zeroes using only their sum and product.",
        "variables": [
          {
            "symbol": "\\alpha, \\beta",
            "meaning": "Zeroes of quadratic polynomial"
          }
        ],
        "chapterId": "c10-s1-ch2",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "αβ ≠ 0 for fractional forms.",
        "whenToUse": "High-frequency 2-mark and 4-mark Board exam algebra problems."
      }
    ],
    "derivation": {
      "title": "Derivation of Zeroes-Coefficients Relationship for Quadratic Polynomial",
      "targetFormula": "\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}",
      "objective": "Prove the relation between zeroes α, β and coefficients a, b, c of ax² + bx + c.",
      "startingObservation": "Let α and β be the zeroes of p(x) = ax² + bx + c. Then (x - α) and (x - β) are its factors.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Express p(x) as product of factors with constant k:",
          "latex": "ax^2 + bx + c = k(x - \\alpha)(x - \\beta)",
          "justification": "By Factor Theorem, where k is a non-zero real constant."
        },
        {
          "stepNumber": 2,
          "statement": "Expand the right-hand side:",
          "latex": "ax^2 + bx + c = k[x^2 - (\\alpha + \\beta)x + \\alpha\\beta] = kx^2 - k(\\alpha + \\beta)x + k\\alpha\\beta",
          "justification": "Distributive algebraic expansion."
        },
        {
          "stepNumber": 3,
          "statement": "Equate coefficients of like powers of x:",
          "latex": "a = k, \\quad b = -k(\\alpha + \\beta), \\quad c = k\\alpha\\beta",
          "justification": "Two polynomials are identically equal iff coefficients of corresponding powers match."
        },
        {
          "stepNumber": 4,
          "statement": "Substitute k = a into equations:",
          "latex": "b = -a(\\alpha + \\beta) \\implies \\alpha + \\beta = -\\frac{b}{a}",
          "justification": "Dividing by -a."
        },
        {
          "stepNumber": 5,
          "statement": "Solve for product αβ:",
          "latex": "c = a\\alpha\\beta \\implies \\alpha\\beta = \\frac{c}{a}",
          "justification": "Dividing by a."
        }
      ],
      "finalFormulaLatex": "\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}",
      "conclusion": "The fundamental relationships between roots and coefficients are rigorously proved."
    },
    "memoryLab": [
      {
        "title": "Sign Alternation in Polynomial Roots",
        "mnemonic": "Minus, Plus, Minus Alternation!",
        "meaning": "Sum of 1 root at a time = -b/a; Sum of 2-at-a-time products = +c/a; Product of 3 roots = -d/a.",
        "boardExamTip": "Signs alternate strictly: -, +, -, + as you move down the coefficients!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch2-1",
        "title": "Verifying Zeroes and Coefficients for Quadratic Polynomial",
        "problemStatement": "Find the zeroes of the quadratic polynomial x² + 7x + 10, and verify the relationship between the zeroes and the coefficients.",
        "given": [
          "p(x) = x² + 7x + 10",
          "a = 1, b = 7, c = 10"
        ],
        "toFind": "Zeroes α, β and verification of sum and product",
        "strategy": "Split middle term to factorise, find roots, then compare with -b/a and c/a.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Factorise p(x)",
            "latex": "x^2 + 7x + 10 = x^2 + 5x + 2x + 10 = (x + 5)(x + 2)",
            "explanation": "Split 7 into 5 and 2 (5 × 2 = 10)."
          },
          {
            "stepNumber": 2,
            "title": "Find zeroes",
            "latex": "p(x) = 0 \\implies x = -2 \\quad \\text{or} \\quad x = -5",
            "explanation": "Set each factor to zero."
          },
          {
            "stepNumber": 3,
            "title": "Verify Sum of zeroes",
            "latex": "\\alpha + \\beta = (-2) + (-5) = -7, \\quad -\\frac{b}{a} = -\\frac{7}{1} = -7",
            "explanation": "Sum matches -b/a."
          },
          {
            "stepNumber": 4,
            "title": "Verify Product of zeroes",
            "latex": "\\alpha\\beta = (-2)(-5) = 10, \\quad \\frac{c}{a} = \\frac{10}{1} = 10",
            "explanation": "Product matches c/a."
          }
        ],
        "commonMistake": "Forgetting the minus sign: sum is -7, not +7.",
        "sanityCheck": "Both sum and product match coefficients identically. Verified!"
      },
      {
        "id": "we-c10-ch2-2",
        "title": "Evaluating Symmetric Expressions of Zeroes",
        "problemStatement": "If α and β are the zeroes of the quadratic polynomial f(x) = x² - 5x + 4, find the value of 1/α + 1/β - 2αβ.",
        "given": [
          "f(x) = x² - 5x + 4",
          "a = 1, b = -5, c = 4"
        ],
        "toFind": "Value of 1/α + 1/β - 2αβ",
        "strategy": "Find α + β and αβ from coefficients, express in terms of sum and product.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find sum and product",
            "latex": "\\alpha + \\beta = -\\frac{-5}{1} = 5, \\quad \\alpha\\beta = \\frac{4}{1} = 4",
            "explanation": "Using relations."
          },
          {
            "stepNumber": 2,
            "title": "Combine fractions",
            "latex": "\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{5}{4}",
            "explanation": "Common denominator."
          },
          {
            "stepNumber": 3,
            "title": "Evaluate full expression",
            "latex": "\\frac{5}{4} - 2(4) = \\frac{5}{4} - 8 = \\frac{5 - 32}{4} = -\\frac{27}{4}",
            "explanation": "Subtract 8."
          }
        ],
        "commonMistake": "Trying to find α and β individually; using sum and product directly is far faster and error-free.",
        "sanityCheck": "Roots of x² - 5x + 4 are 1 and 4. 1/1 + 1/4 - 2(4) = 5/4 - 8 = -27/4. Exact match!"
      }
    ],
    "problemSolvingStrategies": [
      "Whenever asked for α² + β², 1/α + 1/β, or α/β + β/α, never solve for individual roots; use symmetric identities with (α + β) and (αβ).",
      "The number of zeroes of y = p(x) equals the number of times its graph intersects the x-axis."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch2-1",
        "type": "numerical",
        "prompt": "If the sum of zeroes of the quadratic polynomial kx² - 3x + 5 is 1, find the value of k.",
        "correctAnswer": 3,
        "tolerance": 0,
        "hints": [
          "Sum of zeroes = -b/a = -(-3)/k = 3/k.",
          "3/k = 1 => k = 3."
        ],
        "explanation": "Sum = 3/k = 1 => k = 3.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch2-2",
        "type": "numerical",
        "prompt": "If one zero of the quadratic polynomial 2x² - 8x - m is 5/2, find the other zero.",
        "correctAnswer": 1.5,
        "tolerance": 0.1,
        "hints": [
          "Sum of zeroes = -b/a = -(-8)/2 = 4.",
          "5/2 + other zero = 4 => other zero = 4 - 2.5 = 1.5."
        ],
        "explanation": "Sum of zeroes = 4. Other zero = 4 - 2.5 = 1.5 (or 3/2).",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c10-ch2-3",
        "type": "mcq",
        "prompt": "The graph of a quadratic polynomial ax² + bx + c is a parabola opening downwards if:",
        "options": [
          "a > 0",
          "a < 0",
          "b > 0",
          "c < 0"
        ],
        "correctAnswer": "a < 0",
        "hints": [
          "The sign of coefficient a determines whether parabola opens upwards (a > 0) or downwards (a < 0)."
        ],
        "explanation": "When a < 0, the parabola opens downwards.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Number of zeroes of p(x) equals x-intercepts of graph.",
        "Quadratic zeroes: α + β = -b/a, αβ = c/a.",
        "Quadratic formation: k[x² - (sum)x + (product)].",
        "Cubic zeroes: sum = -b/a, sum of pairs = c/a, product = -d/a."
      ],
      "commonTraps": [
        "Missing the negative sign in α + β = -b/a.",
        "Confusing zeroes of polynomial with factors (if root is α, factor is (x - α))."
      ]
    },
    "labId": "quadratic-parabola",
    "labTitle": "Polynomials"
  },
  {
    "id": "c10-s1-ch3",
    "classGrade": 10,
    "semester": 1,
    "chapterNumber": 3,
    "title": "Pair of Linear Equations in Two Variables",
    "shortDescription": "Master consistency conditions, graphical representations, and algebraic methods (substitution & elimination).",
    "whyItMatters": "Systems of linear equations solve multi-variable allocation problems in logistics, network traffic flow, economic supply-demand equilibria, and circuit analysis.",
    "priorKnowledge": [
      "Standard form of a single linear equation ax + by + c = 0",
      "Plotting straight lines on Cartesian plane",
      "Basic algebraic manipulation and substitution"
    ],
    "vocabulary": [
      {
        "term": "Consistent System",
        "definition": "A pair of linear equations that has at least one common solution (unique or infinitely many)."
      },
      {
        "term": "Inconsistent System",
        "definition": "A pair of linear equations that has no solution; graphically, the lines are strictly parallel."
      },
      {
        "term": "Coincident Lines",
        "definition": "Two lines that lie directly on top of each other, having infinitely many common points."
      },
      {
        "term": "Elimination Method",
        "definition": "Algebraic technique of eliminating one variable by making its coefficients equal and adding or subtracting equations."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch3-ratios",
        "name": "Linear System Consistency & Solution Criteria",
        "latex": "\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2} \\implies 1\\text{ sol (Intersecting)}, \\quad \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} \\implies \\infty\\text{ sol (Coincident)}, \\quad \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2} \\implies 0\\text{ sol (Parallel)}",
        "description": "Complete ratio comparison criterion to determine solvability and geometric behaviour of two linear equations without graphing.",
        "variables": [
          {
            "symbol": "a_1, a_2",
            "meaning": "Coefficients of x"
          },
          {
            "symbol": "b_1, b_2",
            "meaning": "Coefficients of y"
          },
          {
            "symbol": "c_1, c_2",
            "meaning": "Constant terms"
          }
        ],
        "chapterId": "c10-s1-ch3",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "Equations written in identical form: a_i x + b_i y + c_i = 0.",
        "whenToUse": "Predicting solution count and finding unknown parameter k for unique/infinite/no solution.",
        "workedExample": {
          "problem": "Find k for which 2x + 3y = 7 and 4x + ky = 14 have infinitely many solutions",
          "solution": "Condition: 2/4 = 3/k = 7/14 => 1/2 = 3/k => k = 6."
        },
        "mnemonic": "a1/a2 ≠ b1/b2? One unique cross! All three equal? Infinite lines! First two equal, third not? Parallel gap!"
      },
      {
        "id": "f-c10-ch3-elim",
        "name": "Elimination Method Equation",
        "latex": "b_2(a_1 x + b_1 y + c_1) - b_1(a_2 x + b_2 y + c_2) = 0 \\implies x = \\frac{b_1 c_2 - b_2 c_1}{a_1 b_2 - a_2 b_1}",
        "description": "Algebraic method equating coefficients of one variable to eliminate it and solve for the other.",
        "variables": [
          {
            "symbol": "a_1 b_2 - a_2 b_1",
            "meaning": "System determinant (non-zero for unique solution)"
          }
        ],
        "chapterId": "c10-s1-ch3",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "a_1 b_2 - a_2 b_1 ≠ 0.",
        "whenToUse": "Solving standard 2x2 linear systems quickly and reliably."
      },
      {
        "id": "f-c10-ch3-no-sol",
        "name": "Parallel Lines & Inconsistency Condition",
        "latex": "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}",
        "description": "When the ratio of x coefficients equals the ratio of y coefficients but differs from the constant ratio, the lines are parallel and possess no common solution.",
        "variables": [
          {
            "symbol": "a_1, a_2",
            "meaning": "Coefficients of x"
          },
          {
            "symbol": "b_1, b_2",
            "meaning": "Coefficients of y"
          },
          {
            "symbol": "c_1, c_2",
            "meaning": "Constant terms"
          }
        ],
        "chapterId": "c10-s1-ch3",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "a_1, a_2, b_1, b_2 not all zero.",
        "whenToUse": "Testing if two linear equations represent parallel lines with no solution.",
        "workedExample": {
          "problem": "Check consistency of 2x + 4y = 10 and 3x + 6y = 12.",
          "latexProblem": "2x + 4y = 10, \\quad 3x + 6y = 12",
          "solution": "a1/a2 = 2/3, b1/b2 = 4/6 = 2/3, c1/c2 = 10/12 = 5/6. Since a1/a2 = b1/b2 ≠ c1/c2, the system is inconsistent (parallel lines).",
          "latexSolution": "\\frac{2}{3} = \\frac{2}{3} \\neq \\frac{5}{6}"
        }
      }
    ],
    "derivation": {
      "title": "Derivation of Ratio Criteria from Line Intersections",
      "targetFormula": "\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2} \\iff \\text{Intersecting Lines}",
      "objective": "Prove that the ratio of coefficients determines the geometric relationship of two lines.",
      "startingObservation": "Express both lines in slope-intercept form y = mx + c:",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Find slopes and y-intercepts of both lines:",
          "latex": "y = -\\frac{a_1}{b_1}x - \\frac{c_1}{b_1} \\implies m_1 = -\\frac{a_1}{b_1}, \\quad y = -\\frac{a_2}{b_2}x - \\frac{c_2}{b_2} \\implies m_2 = -\\frac{a_2}{b_2}",
          "justification": "Standard slope-intercept form y = mx + c."
        },
        {
          "stepNumber": 2,
          "statement": "Condition for intersecting lines (unique solution):",
          "latex": "m_1 \\neq m_2 \\iff -\\frac{a_1}{b_1} \\neq -\\frac{a_2}{b_2} \\iff \\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}",
          "justification": "Lines with different slopes intersect at exactly one unique point."
        },
        {
          "stepNumber": 3,
          "statement": "Condition for parallel lines (no solution):",
          "latex": "m_1 = m_2 \\land c_1 \\neq c_2 \\iff \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}",
          "justification": "Identical slopes with different y-intercepts mean parallel non-intersecting lines."
        },
        {
          "stepNumber": 4,
          "statement": "Condition for coincident lines (infinite solutions):",
          "latex": "m_1 = m_2 \\land c_1 = c_2 \\iff \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}",
          "justification": "Identical slopes and identical intercepts mean identical lines."
        }
      ],
      "finalFormulaLatex": "\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2} \\iff \\text{Unique Solution}",
      "conclusion": "The coefficient ratio conditions correspond exactly to the geometric line relationships."
    },
    "memoryLab": [
      {
        "title": "Ratio Snapshot",
        "mnemonic": "Diff Slopes = 1; Same Slopes + Diff C = 0; All Equal = Inf!",
        "meaning": "Ratio of x and y differs => 1 solution. Ratios match but constant differs => 0 solutions. All 3 match => infinite.",
        "boardExamTip": "Always put both equations in the EXACT SAME form before writing ratios (either both constants on RHS, or both on LHS)!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch3-1",
        "title": "Solving by Elimination Method and Finding Parameter m",
        "problemStatement": "Solve 2x + 3y = 11 and 2x - 4y = -24 by elimination, and hence find the value of m for which y = mx + 3.",
        "given": [
          "Eq 1: 2x + 3y = 11",
          "Eq 2: 2x - 4y = -24"
        ],
        "toFind": "Values of x, y, and m",
        "strategy": "Subtract Eq 2 from Eq 1 directly since coefficients of x are already equal (2).",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Subtract Eq 2 from Eq 1",
            "latex": "(2x + 3y) - (2x - 4y) = 11 - (-24) \\implies 7y = 35 \\implies y = 5",
            "explanation": "Eliminates variable x completely."
          },
          {
            "stepNumber": 2,
            "title": "Substitute y = 5 into Eq 1",
            "latex": "2x + 3(5) = 11 \\implies 2x + 15 = 11 \\implies 2x = -4 \\implies x = -2",
            "explanation": "Solves for x."
          },
          {
            "stepNumber": 3,
            "title": "Find parameter m",
            "latex": "y = mx + 3 \\implies 5 = m(-2) + 3 \\implies 2 = -2m \\implies m = -1",
            "explanation": "Substitute x = -2 and y = 5."
          }
        ],
        "commonMistake": "Sign error when subtracting -4y: 3y - (-4y) = 7y, not -y.",
        "sanityCheck": "Substitute x = -2, y = 5 into Eq 2: 2(-2) - 4(5) = -4 - 20 = -24. Verified!"
      },
      {
        "id": "we-c10-ch3-2",
        "title": "Solving by Elimination Method",
        "problemStatement": "Solve the pair of equations: 2x + 3y = 11 and 2x - 4y = -24. Hence find the value of m for which y = mx + 3.",
        "given": [
          "2x + 3y = 11 (eq 1)",
          "2x - 4y = -24 (eq 2)",
          "y = mx + 3"
        ],
        "toFind": "Values of x, y, and m",
        "strategy": "Subtract eq 2 from eq 1 to eliminate x, then substitute y to find x, and lastly substitute into y = mx + 3.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Subtract equations",
            "latex": "(2x + 3y) - (2x - 4y) = 11 - (-24) \\implies 7y = 35 \\implies y = 5",
            "explanation": "Subtracting cancels out 2x."
          },
          {
            "stepNumber": 2,
            "title": "Substitute to find x",
            "latex": "2x + 3(5) = 11 \\implies 2x + 15 = 11 \\implies 2x = -4 \\implies x = -2",
            "explanation": "Substitute y = 5 into eq 1."
          },
          {
            "stepNumber": 3,
            "title": "Calculate m",
            "latex": "y = mx + 3 \\implies 5 = m(-2) + 3 \\implies 2 = -2m \\implies m = -1",
            "explanation": "Substitute x = -2, y = 5 into the linear relation."
          }
        ],
        "commonMistake": "Sign error when subtracting -4y: 3y - (-4y) = 7y, not -y.",
        "sanityCheck": "Check in eq 2: 2(-2) - 4(5) = -4 - 20 = -24. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "If coefficients of one variable are already equal or opposite, use elimination directly.",
      "Check consistency using ratios before spending time attempting to solve an inconsistent system!"
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch3-1",
        "type": "numerical",
        "prompt": "For what value of k will the system of equations 2x + 3y = 5 and 4x + ky = 10 have infinitely many solutions?",
        "correctAnswer": 6,
        "tolerance": 0,
        "hints": [
          "For infinite solutions: a1/a2 = b1/b2 = c1/c2.",
          "2/4 = 3/k => 1/2 = 3/k => k = 6."
        ],
        "explanation": "2/4 = 3/k = 5/10 => 1/2 = 3/k => k = 6.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch3-2",
        "type": "mcq",
        "prompt": "The pair of equations x + 2y + 5 = 0 and -3x - 6y + 1 = 0 has:",
        "options": [
          "A unique solution",
          "Exactly two solutions",
          "Infinitely many solutions",
          "No solution"
        ],
        "correctAnswer": "No solution",
        "hints": [
          "a1/a2 = 1/(-3) = -1/3. b1/b2 = 2/(-6) = -1/3. c1/c2 = 5/1 = 5.",
          "a1/a2 = b1/b2 ≠ c1/c2 means parallel lines with no solution."
        ],
        "explanation": "Since a1/a2 = b1/b2 ≠ c1/c2, the lines are parallel and have no solution.",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c10-ch3-3",
        "type": "numerical",
        "prompt": "If x + y = 10 and x - y = 4, what is the value of x?",
        "correctAnswer": 7,
        "tolerance": 0,
        "hints": [
          "Add both equations: 2x = 14 => x = 7."
        ],
        "explanation": "Adding gives 2x = 14 => x = 7.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Intersecting lines (unique solution): a1/a2 ≠ b1/b2.",
        "Coincident lines (infinitely many solutions): a1/a2 = b1/b2 = c1/c2.",
        "Parallel lines (no solution, inconsistent): a1/a2 = b1/b2 ≠ c1/c2."
      ],
      "commonTraps": [
        "Having one equation with constant on LHS and other on RHS when forming ratios."
      ]
    },
    "labId": "linear-equations",
    "labTitle": "Pair of Linear Equations in Two Variables"
  },
  {
    "id": "c10-s1-quad",
    "classGrade": 10,
    "semester": 1,
    "chapterNumber": 4,
    "title": "Quadratic Equations",
    "shortDescription": "Master standard form ax² + bx + c = 0, solving by factorisation, quadratic formula, and discriminant nature of roots.",
    "whyItMatters": "Quadratic equations model projectile flight trajectories, maximum profit optimisation, optics focal lengths, and signal strength fields.",
    "priorKnowledge": [
      "Solving linear equations",
      "Factoring quadratics by splitting middle term",
      "Square roots and radicals simplification"
    ],
    "vocabulary": [
      {
        "term": "Quadratic Equation",
        "definition": "An equation of the second degree in variable x: ax² + bx + c = 0 where a ≠ 0."
      },
      {
        "term": "Roots of Equation",
        "definition": "Values of x that satisfy ax² + bx + c = 0."
      },
      {
        "term": "Discriminant (D)",
        "definition": "The quantity D = b² - 4ac that determines the nature of the roots."
      },
      {
        "term": "Equal Roots",
        "definition": "When D = 0, the two roots are real and identical: x = -b / (2a)."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-quad-formula",
        "name": "Quadratic Formula (Shreedharacharya's Rule)",
        "latex": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        "description": "Universal analytical solution formula for the roots of any quadratic equation ax² + bx + c = 0.",
        "variables": [
          {
            "symbol": "a",
            "meaning": "Coefficient of x² (a ≠ 0)"
          },
          {
            "symbol": "b",
            "meaning": "Coefficient of x"
          },
          {
            "symbol": "c",
            "meaning": "Constant term"
          }
        ],
        "chapterId": "c10-s1-quad",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "a ≠ 0, and D = b² - 4ac ≥ 0 for real roots.",
        "whenToUse": "When factorisation by inspection is difficult or impossible.",
        "workedExample": {
          "problem": "Solve 2x² - 7x + 3 = 0 using quadratic formula",
          "solution": "D = (-7)² - 4(2)(3) = 49 - 24 = 25. x = (7 ± √25)/(2×2) = (7 ± 5)/4 => x = 3 or x = 1/2."
        },
        "mnemonic": "Negative b, plus or minus root b squared minus 4ac, all over 2a!"
      },
      {
        "id": "f-c10-quad-disc",
        "name": "Discriminant Nature of Roots Classification",
        "latex": "D = b^2 - 4ac: \\quad D > 0 \\implies 2\\text{ distinct real roots}, \\quad D = 0 \\implies 2\\text{ equal real roots}, \\quad D < 0 \\implies \\text{no real roots}",
        "description": "Determines whether roots are distinct real, repeated real, or non-real without solving the equation.",
        "variables": [
          {
            "symbol": "D",
            "meaning": "Discriminant (b² - 4ac)"
          }
        ],
        "chapterId": "c10-s1-quad",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "Coefficients a, b, c are real numbers.",
        "whenToUse": "Finding parameter k for which equation has equal roots (D = 0).",
        "workedExample": {
          "problem": "Find k if 2x² + kx + 3 = 0 has two equal roots",
          "solution": "D = 0 => k² - 4(2)(3) = 0 => k² - 24 = 0 => k = ±√24 = ±2√6."
        }
      },
      {
        "id": "f-c10-quad-roots-rel",
        "name": "Sum and Product of Roots & Equation Formation",
        "latex": "\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a} \\implies x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0",
        "description": "The symmetric relations between roots and coefficients for any quadratic equation ax² + bx + c = 0.",
        "variables": [
          {
            "symbol": "\\alpha, \\beta",
            "meaning": "Roots of quadratic equation"
          },
          {
            "symbol": "a, b, c",
            "meaning": "Real coefficients with a ≠ 0"
          }
        ],
        "chapterId": "c10-s1-quad",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "a ≠ 0.",
        "whenToUse": "Constructing quadratic equations or evaluating symmetric functions of roots.",
        "workedExample": {
          "problem": "Form a quadratic equation whose roots are 3 and -5.",
          "latexProblem": "\\alpha = 3, \\beta = -5",
          "solution": "Sum = 3 + (-5) = -2. Product = 3(-5) = -15. Equation: x² - (-2)x + (-15) = 0 => x² + 2x - 15 = 0.",
          "latexSolution": "x^2 + 2x - 15 = 0"
        }
      }
    ],
    "derivation": {
      "title": "Derivation of Quadratic Formula by Completing the Square",
      "targetFormula": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      "objective": "Derive the quadratic formula from standard equation ax² + bx + c = 0.",
      "startingObservation": "Start with ax² + bx + c = 0 where a ≠ 0.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Divide throughout by coefficient a:",
          "latex": "x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0 \\implies x^2 + \\frac{b}{a}x = -\\frac{c}{a}",
          "justification": "Makes coefficient of x² equal to 1."
        },
        {
          "stepNumber": 2,
          "statement": "Add [b / (2a)]² to both sides to complete the square on LHS:",
          "latex": "x^2 + 2\\left(\\frac{b}{2a}\\right)x + \\left(\\frac{b}{2a}\\right)^2 = -\\frac{c}{a} + \\frac{b^2}{4a^2}",
          "justification": "Completing the square identity (x + p)² = x² + 2px + p²."
        },
        {
          "stepNumber": 3,
          "statement": "Express LHS as a perfect square and simplify RHS:",
          "latex": "\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}",
          "justification": "Common denominator 4a² on RHS."
        },
        {
          "stepNumber": 4,
          "statement": "Take square root of both sides:",
          "latex": "x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}",
          "justification": "Square root introduces both positive and negative roots."
        },
        {
          "stepNumber": 5,
          "statement": "Isolate x:",
          "latex": "x = -\\frac{b}{2a} \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          "justification": "Combine terms over common denominator 2a."
        }
      ],
      "finalFormulaLatex": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      "conclusion": "The quadratic formula is completely derived."
    },
    "memoryLab": [
      {
        "title": "Equal Roots Condition",
        "mnemonic": "Equal Roots? Set D = 0!",
        "meaning": "Whenever a question asks for equal roots, immediately write b² - 4ac = 0 and solve for the unknown.",
        "boardExamTip": "Don’t forget the ± sign when solving k² = 24: k = +2√6 OR -2√6!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-quad-1",
        "title": "Finding Unknown k for Equal Roots",
        "problemStatement": "Find the values of k for which the quadratic equation kx(x - 2) + 6 = 0 has two equal roots.",
        "given": [
          "Equation: kx(x - 2) + 6 = 0"
        ],
        "toFind": "Value of k",
        "strategy": "Expand into standard form ax² + bx + c = 0, then set D = b² - 4ac = 0.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Expand into standard form",
            "latex": "kx^2 - 2kx + 6 = 0",
            "explanation": "Here a = k, b = -2k, c = 6."
          },
          {
            "stepNumber": 2,
            "title": "Compute discriminant",
            "latex": "D = (-2k)^2 - 4(k)(6) = 4k^2 - 24k",
            "explanation": "b² - 4ac calculation."
          },
          {
            "stepNumber": 3,
            "title": "Set D = 0 for equal roots",
            "latex": "4k^2 - 24k = 0 \\implies 4k(k - 6) = 0 \\implies k = 0 \\quad \\text{or} \\quad k = 6",
            "explanation": "Factorise."
          },
          {
            "stepNumber": 4,
            "title": "Discard extraneous root",
            "latex": "k \\neq 0 \\implies k = 6",
            "explanation": "If k = 0, the x² term vanishes and equation is no longer quadratic!"
          }
        ],
        "commonMistake": "Including k = 0 as an answer. If k = 0, it is not a quadratic equation.",
        "sanityCheck": "Substitute k = 6: 6x² - 12x + 6 = 6(x - 1)² = 0 => x = 1 (repeated root). Correct!"
      },
      {
        "id": "we-c10-quad-2",
        "title": "Finding Parameter k for Equal Real Roots",
        "problemStatement": "Find the values of k for which the equation 2x² + kx + 3 = 0 has two equal real roots.",
        "given": [
          "Quadratic equation: 2x² + kx + 3 = 0",
          "Roots are equal real roots"
        ],
        "toFind": "Value(s) of k",
        "strategy": "For two equal real roots, set the discriminant D = b² - 4ac equal to 0.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Identify coefficients",
            "latex": "a = 2, \\quad b = k, \\quad c = 3",
            "explanation": "Standard form ax² + bx + c = 0."
          },
          {
            "stepNumber": 2,
            "title": "Apply condition D = 0",
            "latex": "D = b^2 - 4ac = 0 \\implies k^2 - 4(2)(3) = 0 \\implies k^2 - 24 = 0",
            "explanation": "Discriminant must vanish for equal roots."
          },
          {
            "stepNumber": 3,
            "title": "Solve for k",
            "latex": "k^2 = 24 \\implies k = \\pm \\sqrt{24} = \\pm 2\\sqrt{6}",
            "explanation": "Take both positive and negative square roots."
          }
        ],
        "commonMistake": "Forgetting the negative root and writing only k = 2√6.",
        "sanityCheck": "Substituting k = 2√6: (2√6)² - 24 = 24 - 24 = 0. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "Always simplify equation into ax² + bx + c = 0 before identifying a, b, c.",
      "Check if a = 0 can occur; the coefficient of x² must never be zero."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-quad-1",
        "type": "numerical",
        "prompt": "Find the discriminant of the quadratic equation 2x² - 4x + 3 = 0.",
        "correctAnswer": -8,
        "tolerance": 0,
        "hints": [
          "D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24."
        ],
        "explanation": "D = 16 - 24 = -8.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-quad-2",
        "type": "mcq",
        "prompt": "If the discriminant D > 0, the roots of ax² + bx + c = 0 are:",
        "options": [
          "Real and distinct",
          "Real and equal",
          "Not real",
          "Equal to zero"
        ],
        "correctAnswer": "Real and distinct",
        "hints": [
          "Positive discriminant yields two different real values from the ± sign."
        ],
        "explanation": "When D > 0, there are two distinct real roots.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-quad-3",
        "type": "numerical",
        "prompt": "Find the positive root of x² - 9 = 0.",
        "correctAnswer": 3,
        "tolerance": 0,
        "hints": [
          "x² = 9 => x = ±3. Positive root is 3."
        ],
        "explanation": "x = √9 = 3.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Quadratic formula: x = [-b ± √(b² - 4ac)] / (2a).",
        "D = b² - 4ac: D > 0 distinct real, D = 0 equal real, D < 0 no real roots.",
        "If D = 0, repeated root is x = -b / (2a)."
      ],
      "commonTraps": [
        "Forgetting division by 2a across the ENTIRE numerator (including -b).",
        "Losing negative signs inside (-b) when b itself is negative: -(-7) = +7."
      ]
    },
    "labId": "quadratic-parabola",
    "labTitle": "Quadratic Equations"
  },
  {
    "id": "c10-s1-ap",
    "classGrade": 10,
    "semester": 1,
    "chapterNumber": 5,
    "title": "Arithmetic Progressions",
    "shortDescription": "Master nth term formulas, nth term from the end, sum of first n terms, and sequence problem-solving.",
    "whyItMatters": "Arithmetic progressions calculate compound depreciation, loan repayment schedules, stadium seating layouts, and discrete digital sampling.",
    "priorKnowledge": [
      "Basic patterns and sequences",
      "Solving linear equations in one and two variables",
      "Substitution and evaluation of formulas"
    ],
    "vocabulary": [
      {
        "term": "Arithmetic Progression (AP)",
        "definition": "A sequence of numbers in which each term is obtained by adding a constant common difference d to the preceding term."
      },
      {
        "term": "Common Difference (d)",
        "definition": "The constant difference between any consecutive term and its predecessor: d = a_{k+1} - a_k."
      },
      {
        "term": "Finite AP",
        "definition": "An AP that has a finite number of terms and possesses a well-defined last term l."
      },
      {
        "term": "Arithmetic Mean",
        "definition": "The number (a + b) / 2 between two numbers a and b such that a, AM, b form an AP."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ap-nth",
        "name": "General nth Term Formula",
        "latex": "a_n = a + (n - 1)d",
        "description": "Finds the value of any term in an AP given first term a, common difference d, and term position n.",
        "variables": [
          {
            "symbol": "a",
            "meaning": "First term"
          },
          {
            "symbol": "d",
            "meaning": "Common difference"
          },
          {
            "symbol": "n",
            "meaning": "Position index (n ∈ ℕ)"
          }
        ],
        "chapterId": "c10-s1-ap",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "n must be a positive natural integer (n = 1, 2, 3, ...).",
        "whenToUse": "Finding a specific term, or finding n when the term value is known.",
        "workedExample": {
          "problem": "Find the 30th term of AP: 10, 7, 4, ...",
          "solution": "a = 10, d = 7 - 10 = -3. a₃₀ = 10 + (30 - 1)(-3) = 10 + 29(-3) = 10 - 87 = -77."
        }
      },
      {
        "id": "f-c10-ap-nth-end",
        "name": "nth Term from the End of a Finite AP",
        "latex": "a_n' = l - (n - 1)d",
        "description": "Finds the nth term counting backwards from the final term l.",
        "variables": [
          {
            "symbol": "l",
            "meaning": "Last term of finite AP"
          },
          {
            "symbol": "d",
            "meaning": "Common difference"
          },
          {
            "symbol": "n",
            "meaning": "Position counting backwards from end"
          }
        ],
        "chapterId": "c10-s1-ap",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "AP must be finite with known last term l.",
        "whenToUse": "Finding terms from the end without calculating total term count first.",
        "workedExample": {
          "problem": "Find the 11th term from the end of AP: 10, 7, 4, ..., -62",
          "solution": "l = -62, d = -3. a'₁₁ = l - (11 - 1)d = -62 - 10(-3) = -62 + 30 = -32."
        },
        "mnemonic": "From the start: a + (n-1)d. From the end: l - (n-1)d!"
      },
      {
        "id": "f-c10-ap-sum",
        "name": "Sum of First n Terms Formulas",
        "latex": "S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}[a + l]",
        "description": "Computes the sum of the first n terms of an arithmetic progression.",
        "variables": [
          {
            "symbol": "S_n",
            "meaning": "Sum of first n terms"
          },
          {
            "symbol": "a",
            "meaning": "First term"
          },
          {
            "symbol": "l",
            "meaning": "Last term (a_n)"
          },
          {
            "symbol": "d",
            "meaning": "Common difference"
          }
        ],
        "chapterId": "c10-s1-ap",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "n is a positive integer.",
        "whenToUse": "Summing arithmetic series (use n/2 [a + l] when last term is known).",
        "workedExample": {
          "problem": "Find the sum of first 20 terms of AP: 1, 4, 7, 10, ...",
          "solution": "a = 1, d = 3. S₂₀ = (20/2)[2(1) + (20-1)(3)] = 10[2 + 57] = 10 × 59 = 590."
        }
      },
      {
        "id": "f-c10-ap-term-sum",
        "name": "nth Term from Sum Function",
        "latex": "a_n = S_n - S_{n-1} \\quad (n \\ge 2), \\quad a_1 = S_1",
        "description": "Extracts individual terms directly when the sum formula S_n is given as a quadratic function of n.",
        "variables": [
          {
            "symbol": "S_n",
            "meaning": "Sum formula in terms of n"
          }
        ],
        "chapterId": "c10-s1-ap",
        "classGrade": 10,
        "category": "Algebra",
        "conditions": "n ≥ 2.",
        "whenToUse": "Deducing an AP sequence when S_n = An² + Bn is given."
      }
    ],
    "derivation": {
      "title": "Gauss Pairing Derivation of Sum of n Terms of an AP",
      "targetFormula": "S_n = \\frac{n}{2}[2a + (n - 1)d]",
      "objective": "Prove the sum formula for an arithmetic progression.",
      "startingObservation": "Write sum S_n forwards and backwards:",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Write S_n forwards:",
          "latex": "S_n = a + (a + d) + (a + 2d) + \\dots + [a + (n - 1)d] \\quad \\text{--- (1)}",
          "justification": "Definition of arithmetic series."
        },
        {
          "stepNumber": 2,
          "statement": "Write S_n in reverse order with last term l:",
          "latex": "S_n = l + (l - d) + (l - 2d) + \\dots + a \\quad \\text{--- (2)}",
          "justification": "Reversing order of addition does not change sum."
        },
        {
          "stepNumber": 3,
          "statement": "Add equations (1) and (2) term by term:",
          "latex": "2S_n = (a + l) + (a + l) + (a + l) + \\dots + (a + l) \\quad (n \\text{ times})",
          "justification": "In each pair, (+kd) and (-kd) cancel out completely!"
        },
        {
          "stepNumber": 4,
          "statement": "Evaluate the sum:",
          "latex": "2S_n = n(a + l) \\implies S_n = \\frac{n}{2}(a + l)",
          "justification": "Dividing by 2."
        },
        {
          "stepNumber": 5,
          "statement": "Substitute l = a + (n - 1)d:",
          "latex": "S_n = \\frac{n}{2}[a + a + (n - 1)d] = \\frac{n}{2}[2a + (n - 1)d]",
          "justification": "Substituting general formula for last term l."
        }
      ],
      "finalFormulaLatex": "S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}[a + l]",
      "conclusion": "The Gauss summation formula for an AP is rigorously proved."
    },
    "memoryLab": [
      {
        "title": "Three Terms in AP Trick",
        "mnemonic": "Choose (a - d), a, (a + d)!",
        "meaning": "When the sum of 3 terms in AP is given, choose them as (a - d), a, (a + d). Adding them cancels d immediately: 3a = Sum!",
        "boardExamTip": "For 4 terms, choose (a - 3d), (a - d), (a + d), (a + 3d) with common difference 2d."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ap-1",
        "title": "Finding How Many Terms Must Be Added to Give Sum",
        "problemStatement": "How many terms of the AP: 24, 21, 18, ... must be taken so that their sum is 78?",
        "given": [
          "AP: 24, 21, 18, ...",
          "a = 24",
          "d = 21 - 24 = -3",
          "S_n = 78"
        ],
        "toFind": "Number of terms n",
        "strategy": "Substitute into S_n = n/2 [2a + (n-1)d] and solve the resulting quadratic equation in n.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Set up equation",
            "latex": "78 = \\frac{n}{2}[2(24) + (n - 1)(-3)] = \\frac{n}{2}[48 - 3n + 3] = \\frac{n}{2}[51 - 3n]",
            "explanation": "Formula substitution."
          },
          {
            "stepNumber": 2,
            "title": "Form quadratic equation",
            "latex": "156 = 51n - 3n^2 \\implies 3n^2 - 51n + 156 = 0 \\implies n^2 - 17n + 52 = 0",
            "explanation": "Divide by 3."
          },
          {
            "stepNumber": 3,
            "title": "Factorise quadratic",
            "latex": "(n - 4)(n - 13) = 0 \\implies n = 4 \\quad \\text{or} \\quad n = 13",
            "explanation": "Split 17 into 4 and 13."
          },
          {
            "stepNumber": 4,
            "title": "Explain double answer",
            "latex": "\\text{Both } n = 4 \\text{ and } n = 13 \\text{ are valid because terms from 5th to 13th sum to zero!}",
            "explanation": "Positive and negative terms cancel."
          }
        ],
        "commonMistake": "Discarding n = 13 thinking there can only be one answer.",
        "sanityCheck": "For n = 4: 24 + 21 + 18 + 15 = 78. Verified!"
      },
      {
        "id": "we-c10-ap-2",
        "title": "Finding Number of Terms and Sum from Last Term",
        "problemStatement": "In an AP, the first term is 5, the common difference is 3, and the last term is 50. Find the number of terms n and the sum of the terms S_n.",
        "given": [
          "a = 5",
          "d = 3",
          "a_n = 50"
        ],
        "toFind": "n and S_n",
        "strategy": "Use a_n = a + (n - 1)d to solve for n, then use S_n = n/2 * (a + l).",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find n",
            "latex": "50 = 5 + (n - 1)(3) \\implies 45 = 3(n - 1) \\implies n - 1 = 15 \\implies n = 16",
            "explanation": "Substitute into general term formula."
          },
          {
            "stepNumber": 2,
            "title": "Calculate Sum S_n",
            "latex": "S_{16} = \\frac{16}{2} (a + l) = 8(5 + 50) = 8(55) = 440",
            "explanation": "Use concise first + last term sum formula."
          }
        ],
        "commonMistake": "Not verifying that n is a positive integer (if n is fractional, the given number is not a term).",
        "sanityCheck": "Average of first and last is (5 + 50)/2 = 27.5. Total sum = 16 × 27.5 = 440. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "If given S_n as a formula like 3n² + 5n, find a₁ = S₁ = 8, and S₂ = 3(4) + 10 = 22, so a₂ = S₂ - S₁ = 14, giving d = 14 - 8 = 6.",
      "Check that n is always a positive integer; if n is fractional or negative, that term does not exist in the AP."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ap-1",
        "type": "numerical",
        "prompt": "Find the common difference d of the AP whose nth term is a_n = 3n + 7.",
        "correctAnswer": 3,
        "tolerance": 0,
        "hints": [
          "a_1 = 3(1) + 7 = 10. a_2 = 3(2) + 7 = 13. d = a_2 - a_1 = 13 - 10."
        ],
        "explanation": "d = 13 - 10 = 3 (the coefficient of n is always the common difference d).",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ap-2",
        "type": "numerical",
        "prompt": "Find the sum of the first 10 natural numbers (1 + 2 + ... + 10).",
        "correctAnswer": 55,
        "tolerance": 0,
        "hints": [
          "S_n = n(n + 1)/2 = 10(11)/2 = 55."
        ],
        "explanation": "10 × 11 / 2 = 55.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ap-3",
        "type": "numerical",
        "prompt": "Which term of the AP: 21, 18, 15, ... is 0?",
        "correctAnswer": 8,
        "tolerance": 0,
        "hints": [
          "a = 21, d = -3. a_n = 21 + (n - 1)(-3) = 0 => 21 = 3(n - 1) => 7 = n - 1."
        ],
        "explanation": "n - 1 = 7 => n = 8.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "nth term: a_n = a + (n - 1)d.",
        "nth term from end: l - (n - 1)d.",
        "Sum of n terms: S_n = n/2 [2a + (n - 1)d] = n/2 [a + l].",
        "Term from sum: a_n = S_n - S_{n-1}."
      ],
      "commonTraps": [
        "Taking d as positive when the sequence is decreasing (e.g. 10, 7, 4 has d = -3, NOT +3!)."
      ]
    },
    "labId": "arithmetic-progression",
    "labTitle": "Arithmetic Progressions"
  },
  {
    "id": "c10-s1-ch6",
    "classGrade": 10,
    "semester": 1,
    "chapterNumber": 6,
    "title": "Triangles",
    "shortDescription": "Master Basic Proportionality Theorem (Thales Theorem), its converse, and criteria for similarity of triangles (AAA, SSS, SAS).",
    "whyItMatters": "Triangle similarity enables shadow trigonometry, computer vision scale-invariant feature transforms, and photogrammetry 3D reconstruction.",
    "priorKnowledge": [
      "Concept of ratio and proportion",
      "Area of triangle = 1/2 × base × height",
      "Parallel line theorems"
    ],
    "vocabulary": [
      {
        "term": "Similar Figures",
        "definition": "Two geometric figures having the same shape but not necessarily the same size."
      },
      {
        "term": "Similar Triangles (∼)",
        "definition": "Two triangles are similar if corresponding angles are equal and corresponding sides are in the same ratio."
      },
      {
        "term": "Basic Proportionality Theorem (BPT)",
        "definition": "If a line is drawn parallel to one side of a triangle, it divides the other two sides in the same ratio."
      },
      {
        "term": "Scale Factor",
        "definition": "The constant ratio of corresponding side lengths in similar geometric figures."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch6-bpt",
        "name": "Basic Proportionality Theorem (Thales Theorem)",
        "latex": "DE \\parallel BC \\implies \\frac{AD}{DB} = \\frac{AE}{EC}",
        "description": "A line drawn parallel to one side of a triangle divides the other two sides in equal proportion.",
        "variables": [
          {
            "symbol": "DE \\parallel BC",
            "meaning": "Line parallel to base BC"
          },
          {
            "symbol": "AD, DB, AE, EC",
            "meaning": "Segments into which sides AB and AC are divided"
          }
        ],
        "chapterId": "c10-s1-ch6",
        "classGrade": 10,
        "category": "Geometry",
        "conditions": "DE must be parallel to base BC.",
        "whenToUse": "Finding missing side lengths in triangles with parallel transversal lines.",
        "workedExample": {
          "problem": "In △ABC, DE || BC. If AD = 1.5 cm, DB = 3 cm, and AE = 1 cm, find EC.",
          "solution": "AD/DB = AE/EC => 1.5/3 = 1/EC => 1/2 = 1/EC => EC = 2 cm."
        },
        "mnemonic": "Parallel cut? Left ratio equals Right ratio!"
      },
      {
        "id": "f-c10-ch6-conv-bpt",
        "name": "Converse of Basic Proportionality Theorem",
        "latex": "\\frac{AD}{DB} = \\frac{AE}{EC} \\implies DE \\parallel BC",
        "description": "If a line divides two sides of a triangle in the same ratio, then the line is parallel to the third side.",
        "variables": [
          {
            "symbol": "D, E",
            "meaning": "Points on sides AB and AC"
          }
        ],
        "chapterId": "c10-s1-ch6",
        "classGrade": 10,
        "category": "Geometry",
        "conditions": "Ratios must be strictly equal.",
        "whenToUse": "Proving lines are parallel in triangles."
      },
      {
        "id": "f-c10-ch6-sim-criteria",
        "name": "Triangle Similarity Criteria",
        "latex": "\\triangle ABC \\sim \\triangle DEF \\iff \\text{AAA (or AA), SSS, or SAS}",
        "description": "Sufficient conditions for similarity of two triangles.",
        "variables": [
          {
            "symbol": "AA",
            "meaning": "Two corresponding angles are equal"
          },
          {
            "symbol": "SSS",
            "meaning": "All three pairs of corresponding sides are in the same ratio"
          },
          {
            "symbol": "SAS",
            "meaning": "One angle equal and including sides in the same ratio"
          }
        ],
        "chapterId": "c10-s1-ch6",
        "classGrade": 10,
        "category": "Geometry",
        "conditions": "AA is sufficient because third angle is automatically equal by angle sum.",
        "whenToUse": "Establishing similarity of two geometric triangles."
      },
      {
        "id": "f-c10-ch6-perimeter-ratio",
        "name": "Perimeter Ratio of Similar Triangles",
        "latex": "\\frac{\\text{Perimeter}(\\triangle ABC)}{\\text{Perimeter}(\\triangle DEF)} = \\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{CA}{FD}",
        "description": "The ratio of perimeters of two similar triangles equals the ratio of their corresponding sides.",
        "variables": [
          {
            "symbol": "AB/DE",
            "meaning": "Ratio of corresponding side lengths"
          }
        ],
        "chapterId": "c10-s1-ch6",
        "classGrade": 10,
        "category": "Geometry",
        "conditions": "Triangles must be similar.",
        "whenToUse": "Calculating perimeters of similar triangles."
      }
    ],
    "derivation": {
      "title": "Proof of Basic Proportionality Theorem (Thales Theorem)",
      "targetFormula": "\\frac{AD}{DB} = \\frac{AE}{EC}",
      "objective": "Prove that a line parallel to one side of a triangle divides the other two sides in the same ratio.",
      "startingObservation": "Let ABC be a triangle. Draw line DE parallel to BC. Join BE and CD, and draw perpendiculars DM ⊥ AC and EN ⊥ AB.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Express Area of △ADE with base AD:",
          "latex": "\\text{Area}(\\triangle ADE) = \\frac{1}{2} \\times AD \\times EN",
          "justification": "Area = 1/2 × base × altitude."
        },
        {
          "stepNumber": 2,
          "statement": "Express Area of △BDE with base DB (same altitude EN):",
          "latex": "\\text{Area}(\\triangle BDE) = \\frac{1}{2} \\times DB \\times EN",
          "justification": "EN is the perpendicular from E to line AB."
        },
        {
          "stepNumber": 3,
          "statement": "Take the ratio of these areas:",
          "latex": "\\frac{\\text{Area}(\\triangle ADE)}{\\text{Area}(\\triangle BDE)} = \\frac{\\frac{1}{2} \\times AD \\times EN}{\\frac{1}{2} \\times DB \\times EN} = \\frac{AD}{DB} \\quad \\text{--- (1)}",
          "justification": "Common factors 1/2 and EN cancel."
        },
        {
          "stepNumber": 4,
          "statement": "Similarly with base AE and altitude DM:",
          "latex": "\\frac{\\text{Area}(\\triangle ADE)}{\\text{Area}(\\triangle CDE)} = \\frac{AE}{EC} \\quad \\text{--- (2)}",
          "justification": "Same area ratio calculation on side AC."
        },
        {
          "stepNumber": 5,
          "statement": "Note that △BDE and △CDE share base DE between same parallels DE || BC:",
          "latex": "\\text{Area}(\\triangle BDE) = \\text{Area}(\\triangle CDE)",
          "justification": "Triangles on the same base and between the same parallel lines have equal area."
        },
        {
          "stepNumber": 6,
          "statement": "Equate LHS of (1) and (2):",
          "latex": "\\frac{AD}{DB} = \\frac{AE}{EC}",
          "justification": "Since numerators and denominators are equal, ratios are equal."
        }
      ],
      "finalFormulaLatex": "\\frac{AD}{DB} = \\frac{AE}{EC}",
      "conclusion": "The Basic Proportionality Theorem is rigorously proved."
    },
    "memoryLab": [
      {
        "title": "BPT Corridor Ratios",
        "mnemonic": "Upper/Lower = Upper/Lower, and Upper/Whole = Upper/Whole!",
        "meaning": "AD/DB = AE/EC implies AD/AB = AE/AC = DE/BC.",
        "boardExamTip": "Be careful! DE/BC equals AD/AB (Upper/Whole), NOT AD/DB!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch6-1",
        "title": "BPT Calculation with Algebraic Expressions",
        "problemStatement": "In △ABC, DE || BC. If AD = x, DB = x - 2, AE = x + 2, and EC = x - 1, find the value of x.",
        "given": [
          "DE || BC",
          "AD = x, DB = x - 2, AE = x + 2, EC = x - 1"
        ],
        "toFind": "Value of x",
        "strategy": "Apply BPT: AD/DB = AE/EC and cross-multiply.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Apply BPT",
            "latex": "\\frac{x}{x - 2} = \\frac{x + 2}{x - 1}",
            "explanation": "Basic Proportionality Theorem."
          },
          {
            "stepNumber": 2,
            "title": "Cross multiply",
            "latex": "x(x - 1) = (x - 2)(x + 2) \\implies x^2 - x = x^2 - 4",
            "explanation": "Using (a - b)(a + b) = a² - b²."
          },
          {
            "stepNumber": 3,
            "title": "Solve for x",
            "latex": "-x = -4 \\implies x = 4",
            "explanation": "Cancel x² from both sides."
          }
        ],
        "commonMistake": "Forgetting to check if x yields positive side lengths (here x = 4 gives sides 4, 2, 6, 3, which are all positive).",
        "sanityCheck": "AD/DB = 4/2 = 2. AE/EC = 6/3 = 2. Ratios match perfectly!"
      },
      {
        "id": "we-c10-ch6-2",
        "title": "Solving Segments using Basic Proportionality Theorem",
        "problemStatement": "In triangle ABC, DE is parallel to BC with D on AB and E on AC. If AD = x, DB = x - 2, AE = x + 2, and EC = x - 1, find the value of x.",
        "given": [
          "DE || BC",
          "AD = x, DB = x - 2, AE = x + 2, EC = x - 1"
        ],
        "toFind": "Value of x",
        "strategy": "Apply Thales Theorem: AD/DB = AE/EC and solve the resulting algebraic equation.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Apply BPT",
            "latex": "\\frac{AD}{DB} = \\frac{AE}{EC} \\implies \\frac{x}{x - 2} = \\frac{x + 2}{x - 1}",
            "explanation": "A line parallel to one side divides other two sides proportionally."
          },
          {
            "stepNumber": 2,
            "title": "Cross multiply",
            "latex": "x(x - 1) = (x - 2)(x + 2) \\implies x^2 - x = x^2 - 4",
            "explanation": "Expand both sides; (x-2)(x+2) = x² - 4."
          },
          {
            "stepNumber": 3,
            "title": "Solve for x",
            "latex": "-x = -4 \\implies x = 4",
            "explanation": "x² terms cancel out leaving linear equation."
          }
        ],
        "commonMistake": "Cross multiplying incorrectly or neglecting that side lengths must be positive.",
        "sanityCheck": "AD = 4, DB = 2 (ratio 4/2 = 2); AE = 6, EC = 3 (ratio 6/3 = 2). 2 = 2! Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "In any problem with parallel lines inside a triangle, immediately write down BPT ratios.",
      "To prove two triangles similar, look for vertically opposite angles and alternate interior angles—AA is usually enough."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch6-1",
        "type": "numerical",
        "prompt": "In △ABC, DE || BC. If AD = 2 cm, DB = 6 cm, and AE = 3 cm, find AC in cm.",
        "correctAnswer": 12,
        "tolerance": 0,
        "hints": [
          "AD/DB = AE/EC => 2/6 = 3/EC => 1/3 = 3/EC => EC = 9 cm.",
          "AC = AE + EC = 3 + 9 = 12 cm."
        ],
        "explanation": "EC = 9 cm. AC = 3 + 9 = 12 cm.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch6-2",
        "type": "mcq",
        "prompt": "If △ABC ∼ △PQR, with BC/QR = 1/3, then Perimeter(△ABC) / Perimeter(△PQR) is:",
        "options": [
          "1/9",
          "1/3",
          "1/6",
          "3/1"
        ],
        "correctAnswer": "1/3",
        "hints": [
          "The ratio of perimeters of similar triangles equals the ratio of their corresponding sides."
        ],
        "explanation": "Perimeter ratio = side ratio = 1/3.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch6-3",
        "type": "numerical",
        "prompt": "A vertical pole of length 6 m casts a shadow 4 m long on the ground. At the same time, a tower casts a shadow 28 m long. Find the height of the tower in meters.",
        "correctAnswer": 42,
        "tolerance": 0,
        "hints": [
          "Sun elevation angles are equal => triangles are similar by AA.",
          "Height/Shadow = 6/4 = H/28 => H = 6 × 28 / 4."
        ],
        "explanation": "H = 6 × 7 = 42 m.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "BPT (Thales): DE || BC => AD/DB = AE/EC.",
        "Converse of BPT: AD/DB = AE/EC => DE || BC.",
        "Similarity criteria: AAA (or AA), SSS, SAS.",
        "Perimeter ratio equals side ratio."
      ],
      "commonTraps": [
        "Confusing AD/DB with AD/AB when finding DE/BC: DE/BC = AD/AB!"
      ]
    },
    "labId": "similar-triangles",
    "labTitle": "Triangles"
  },
  {
    "id": "c10-s1-ch7",
    "classGrade": 10,
    "semester": 1,
    "chapterNumber": 7,
    "title": "Coordinate Geometry",
    "shortDescription": "Master distance formula, section formula (internal division), midpoint formula, and centroid of a triangle.",
    "whyItMatters": "Coordinate geometry powers autonomous vehicle path planning, GPS positioning trilateration, and 3D computer graphics transformations.",
    "priorKnowledge": [
      "Plotting points on Cartesian plane",
      "Pythagorean theorem in right triangles",
      "Basic ratio and proportion concepts"
    ],
    "vocabulary": [
      {
        "term": "Distance Formula",
        "definition": "Formula d = √[(x₂ - x₁)² + (y₂ - y₁)²] giving Euclidean distance between two points."
      },
      {
        "term": "Section Formula",
        "definition": "Formula finding coordinates of a point dividing a line segment in a given ratio m₁ : m₂ internally."
      },
      {
        "term": "Collinear Points",
        "definition": "Three or more points that lie on the exact same straight line; AB + BC = AC."
      },
      {
        "term": "Centroid",
        "definition": "The point of concurrence of the three medians of a triangle, dividing each median in ratio 2 : 1."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch7-dist",
        "name": "Distance Formula Between Two Points",
        "latex": "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
        "description": "Computes Euclidean distance between P(x₁, y₁) and Q(x₂, y₂); distance from origin O(0,0) is √(x² + y²).",
        "variables": [
          {
            "symbol": "x_1, y_1",
            "meaning": "Coordinates of first point"
          },
          {
            "symbol": "x_2, y_2",
            "meaning": "Coordinates of second point"
          },
          {
            "symbol": "d",
            "meaning": "Distance (always non-negative d ≥ 0)"
          }
        ],
        "chapterId": "c10-s1-ch7",
        "classGrade": 10,
        "category": "Coordinate Geometry",
        "conditions": "d ≥ 0.",
        "whenToUse": "Finding lengths of sides, diagonals, or verifying collinearity.",
        "workedExample": {
          "problem": "Find distance between (2, 3) and (4, 1)",
          "solution": "d = √[(4 - 2)² + (1 - 3)²] = √[2² + (-2)²] = √[4 + 4] = √8 = 2√2 units."
        }
      },
      {
        "id": "f-c10-ch7-section",
        "name": "Section Formula (Internal Division)",
        "latex": "P(x, y) = \\left( \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2} \\right)",
        "description": "Coordinates of point P dividing line segment joining A(x₁, y₁) and B(x₂, y₂) internally in ratio m₁ : m₂.",
        "variables": [
          {
            "symbol": "m_1 : m_2",
            "meaning": "Internal division ratio"
          }
        ],
        "chapterId": "c10-s1-ch7",
        "classGrade": 10,
        "category": "Coordinate Geometry",
        "conditions": "m₁ + m₂ ≠ 0; for ratio k : 1, P = ((k x₂ + x₁)/(k + 1), (k y₂ + y₁)/(k + 1)).",
        "whenToUse": "Finding coordinates of dividing points or finding ratio when coordinates are known.",
        "mnemonic": "Cross-multiply ratio: m1 goes with x2, m2 goes with x1!"
      },
      {
        "id": "f-c10-ch7-midpoint",
        "name": "Midpoint Formula",
        "latex": "M = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)",
        "description": "Finds the exact midpoint coordinates of segment joining (x₁, y₁) and (x₂, y₂) (special case where m₁ = m₂ = 1).",
        "variables": [
          {
            "symbol": "M",
            "meaning": "Midpoint coordinates"
          }
        ],
        "chapterId": "c10-s1-ch7",
        "classGrade": 10,
        "category": "Coordinate Geometry",
        "conditions": "Equal division ratio 1 : 1.",
        "whenToUse": "Finding centers of circles, diagonals bisecting, midpoints of triangle sides."
      },
      {
        "id": "f-c10-ch7-centroid",
        "name": "Centroid of a Triangle Formula",
        "latex": "G = \\left( \\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3} \\right)",
        "description": "Point of concurrence of the 3 medians of a triangle with vertices (x₁, y₁), (x₂, y₂), (x₃, y₃).",
        "variables": [
          {
            "symbol": "G",
            "meaning": "Centroid of triangle"
          }
        ],
        "chapterId": "c10-s1-ch7",
        "classGrade": 10,
        "category": "Coordinate Geometry",
        "conditions": "Vertices of non-degenerate triangle.",
        "whenToUse": "Center of mass and median intersection problems."
      }
    ],
    "derivation": {
      "title": "Derivation of Distance Formula via Pythagoras Theorem",
      "targetFormula": "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
      "objective": "Prove the Euclidean distance formula using Cartesian coordinates.",
      "startingObservation": "Let P(x₁, y₁) and Q(x₂, y₂) be two points in the Cartesian plane. Draw perpendiculars from P and Q to the x-axis, and draw PR parallel to the x-axis meeting the vertical line through Q at R.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Identify coordinates of right angle vertex R:",
          "latex": "R = (x_2, y_1)",
          "justification": "Same x-coordinate as Q, same y-coordinate as P."
        },
        {
          "stepNumber": 2,
          "statement": "Calculate base leg PR and vertical leg QR:",
          "latex": "PR = x_2 - x_1, \\quad QR = y_2 - y_1",
          "justification": "Distances along horizontal and vertical directions."
        },
        {
          "stepNumber": 3,
          "statement": "Apply Pythagoras Theorem in right triangle △PRQ:",
          "latex": "PQ^2 = PR^2 + QR^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2",
          "justification": "Hypotenuse squared equals sum of squares of perpendicular legs."
        },
        {
          "stepNumber": 4,
          "statement": "Take positive square root:",
          "latex": "PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
          "justification": "Distance is always non-negative."
        }
      ],
      "finalFormulaLatex": "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
      "conclusion": "The distance formula is derived directly from the Pythagorean theorem."
    },
    "memoryLab": [
      {
        "title": "Ratio k : 1 Shortcut",
        "mnemonic": "Let the ratio be k : 1 to solve in 1 variable!",
        "meaning": "Whenever asked \"In what ratio does the axis divide the line segment?\", assume ratio k : 1. If divided by x-axis, set y-coordinate = 0. If divided by y-axis, set x-coordinate = 0.",
        "boardExamTip": "x-axis division => set y = 0. y-axis division => set x = 0!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch7-1",
        "title": "Finding Ratio of Division by Coordinate Axis",
        "problemStatement": "Find the ratio in which the y-axis divides the line segment joining the points (5, -6) and (-1, -4). Also find the point of intersection.",
        "given": [
          "A(5, -6)",
          "B(-1, -4)",
          "Division by y-axis"
        ],
        "toFind": "Ratio k : 1 and coordinates of point P",
        "strategy": "Let ratio be k : 1. On y-axis, x-coordinate is 0. Use section formula for x to solve for k.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Apply section formula for x",
            "latex": "x = \\frac{k(-1) + 1(5)}{k + 1} = \\frac{-k + 5}{k + 1}",
            "explanation": "Section formula on x-coordinates."
          },
          {
            "stepNumber": 2,
            "title": "Set x = 0 (on y-axis)",
            "latex": "\\frac{-k + 5}{k + 1} = 0 \\implies -k + 5 = 0 \\implies k = 5",
            "explanation": "Ratio is 5 : 1."
          },
          {
            "stepNumber": 3,
            "title": "Find y-coordinate",
            "latex": "y = \\frac{5(-4) + 1(-6)}{5 + 1} = \\frac{-20 - 6}{6} = -\\frac{26}{6} = -\\frac{13}{3}",
            "explanation": "Substitute k = 5 into section formula for y."
          },
          {
            "stepNumber": 4,
            "title": "Write point of intersection",
            "latex": "P = \\left(0, -\\frac{13}{3}\\right)",
            "explanation": "Final coordinates."
          }
        ],
        "commonMistake": "Setting y = 0 instead of x = 0 for division by y-axis.",
        "sanityCheck": "k = 5 is positive, confirming internal division. Coordinates verified!"
      },
      {
        "id": "we-c10-ch7-2",
        "title": "Ratio of Division by Coordinate Axes",
        "problemStatement": "Find the ratio in which the y-axis divides the line segment joining the points A(5, -6) and B(-1, -4). Also find the point of intersection.",
        "given": [
          "Points A(5, -6) and B(-1, -4)",
          "Divided by y-axis"
        ],
        "toFind": "Ratio k:1 and intersection point P(0, y)",
        "strategy": "Any point on y-axis has x-coordinate = 0. Set x-coordinate in section formula to 0.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Set ratio k:1 and x-coordinate to 0",
            "latex": "x = \\frac{k(-1) + 1(5)}{k + 1} = 0 \\implies -k + 5 = 0 \\implies k = 5",
            "explanation": "Since point lies on y-axis, x = 0."
          },
          {
            "stepNumber": 2,
            "title": "State ratio",
            "latex": "\\text{Ratio } k : 1 = 5 : 1",
            "explanation": "The y-axis divides AB internally in the ratio 5:1."
          },
          {
            "stepNumber": 3,
            "title": "Find y-coordinate",
            "latex": "y = \\frac{5(-4) + 1(-6)}{5 + 1} = \\frac{-20 - 6}{6} = \\frac{-26}{6} = -\\frac{13}{3}",
            "explanation": "Substitute k = 5 into the y-coordinate formula."
          }
        ],
        "commonMistake": "Confusing x-axis (where y = 0) with y-axis (where x = 0).",
        "sanityCheck": "Point P(0, -13/3) lies on line AB: slope AP = (-13/3 + 6)/(-5) = (5/3)/(-5) = -1/3. Slope AB = (-4 + 6)/(-1 - 5) = 2/(-6) = -1/3. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "To prove 3 points are collinear, show that distance AB + BC = AC.",
      "To prove 4 points form a parallelogram, show that midpoints of both diagonals AC and BD coincide."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch7-1",
        "type": "numerical",
        "prompt": "Find the distance of point P(3, 4) from the origin.",
        "correctAnswer": 5,
        "tolerance": 0,
        "hints": [
          "d = √(x² + y²) = √(3² + 4²) = √(9 + 16) = √25."
        ],
        "explanation": "d = √25 = 5 units.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch7-2",
        "type": "numerical",
        "prompt": "Find the x-coordinate of the midpoint of segment joining (2, 7) and (6, 3).",
        "correctAnswer": 4,
        "tolerance": 0,
        "hints": [
          "Midpoint x = (x₁ + x₂) / 2 = (2 + 6) / 2."
        ],
        "explanation": "(2 + 6) / 2 = 8 / 2 = 4.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch7-3",
        "type": "numerical",
        "prompt": "If the centroid of triangle with vertices (a, 0), (0, b), and (1, 1) is (1, 1), find the value of a + b.",
        "correctAnswer": 4,
        "tolerance": 0,
        "hints": [
          "(a + 0 + 1)/3 = 1 => a + 1 = 3 => a = 2.",
          "(0 + b + 1)/3 = 1 => b + 1 = 3 => b = 2.",
          "a + b = 2 + 2 = 4."
        ],
        "explanation": "a = 2, b = 2. a + b = 4.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²].",
        "Section formula: P = ((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂)).",
        "Midpoint: ((x₁ + x₂)/2, (y₁ + y₂)/2).",
        "Centroid: ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)."
      ],
      "commonTraps": [
        "Swapping m₁ with x₁ instead of x₂ in section formula: m₁ multiplies x₂!"
      ]
    },
    "labId": "coordinate-geometry",
    "labTitle": "Coordinate Geometry"
  },
  {
    "id": "c10-s2-trig",
    "classGrade": 10,
    "semester": 2,
    "chapterNumber": 8,
    "title": "Introduction to Trigonometry",
    "shortDescription": "Master 6 trigonometric ratios, exact table of values (0°, 30°, 45°, 60°, 90°), and fundamental Pythagorean identities.",
    "whyItMatters": "Trigonometry is the mathematical language of wave harmonics, quantum physics, GPS navigation, and 3D computer game graphics rotations.",
    "priorKnowledge": [
      "Right-angled triangles and Pythagoras theorem (hyp² = opp² + adj²)",
      "Basic angle measures in degrees",
      "Ratios and fraction operations"
    ],
    "vocabulary": [
      {
        "term": "Trigonometric Ratio",
        "definition": "The ratio of lengths of two sides of a right-angled triangle with respect to one of its acute angles."
      },
      {
        "term": "Sine (sin)",
        "definition": "Opposite side / Hypotenuse."
      },
      {
        "term": "Cosine (cos)",
        "definition": "Adjacent side / Hypotenuse."
      },
      {
        "term": "Tangent (tan)",
        "definition": "Opposite side / Adjacent side = sin / cos."
      },
      {
        "term": "Pythagorean Identity",
        "definition": "An equation involving trigonometric functions that holds true for every permissible acute angle, derived from Pythagoras theorem."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-trig-ratios",
        "name": "The Six Right Triangle Trigonometric Ratios",
        "latex": "\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}}, \\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}, \\quad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}, \\quad \\csc\\theta = \\frac{1}{\\sin\\theta}, \\quad \\sec\\theta = \\frac{1}{\\cos\\theta}, \\quad \\cot\\theta = \\frac{1}{\\tan\\theta}",
        "description": "Complete definitions of the 6 fundamental trigonometric ratios in a right triangle.",
        "variables": [
          {
            "symbol": "\\theta",
            "meaning": "Acute angle of right triangle"
          },
          {
            "symbol": "\\text{opp, adj, hyp}",
            "meaning": "Opposite side, Adjacent side, Hypotenuse"
          }
        ],
        "chapterId": "c10-s2-trig",
        "classGrade": 10,
        "category": "Trigonometry",
        "conditions": "0° < θ < 90°.",
        "whenToUse": "Relating side lengths and acute angles in right triangles.",
        "workedExample": {
          "problem": "In △ABC right angled at B, AB = 24 cm, BC = 7 cm. Find sin A and cos A.",
          "solution": "AC = √(24² + 7²) = √625 = 25 cm. sin A = opp/hyp = BC/AC = 7/25. cos A = adj/hyp = AB/AC = 24/25."
        },
        "mnemonic": "SOH-CAH-TOA: Sine Opp/Hyp, Cosine Adj/Hyp, Tangent Opp/Adj!"
      },
      {
        "id": "f-c10-trig-identities",
        "name": "Three Fundamental Pythagorean Identities",
        "latex": "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta",
        "description": "Primary trigonometric identities connecting sine, cosine, tangent, secant, cotangent, and cosecant.",
        "variables": [
          {
            "symbol": "\\theta",
            "meaning": "Angle measure in degrees"
          }
        ],
        "chapterId": "c10-s2-trig",
        "classGrade": 10,
        "category": "Trigonometry",
        "conditions": "sec²θ - tan²θ = 1 (θ ≠ 90°), csc²θ - cot²θ = 1 (θ ≠ 0°).",
        "whenToUse": "Proving trigonometric identities and transforming expressions.",
        "workedExample": {
          "problem": "Prove that (sec A - tan A)(sec A + tan A) = 1",
          "solution": "Apply difference of squares: sec² A - tan² A. From identity 1 + tan² A = sec² A => sec² A - tan² A = 1. Proved!"
        }
      },
      {
        "id": "f-c10-trig-table",
        "name": "Standard Angles Exact Table",
        "latex": "\\sin 30^\\circ = \\frac{1}{2}, \\quad \\sin 45^\\circ = \\frac{1}{\\sqrt{2}}, \\quad \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}, \\quad \\tan 45^\\circ = 1",
        "description": "Exact geometric values of trigonometric functions at standard angles 0°, 30°, 45°, 60°, 90°.",
        "variables": [
          {
            "symbol": "30°, 45°, 60°",
            "meaning": "Special geometric angles"
          }
        ],
        "chapterId": "c10-s2-trig",
        "classGrade": 10,
        "category": "Trigonometry",
        "conditions": "Exact radical values.",
        "whenToUse": "Evaluating trigonometric arithmetic expressions."
      },
      {
        "id": "f-c10-trig-quotient",
        "name": "Quotient and Reciprocal Relations",
        "latex": "\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}, \\quad \\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}, \\quad \\tan\\theta \\cdot \\cot\\theta = 1",
        "description": "Expresses tangent and cotangent as quotients of sine and cosine.",
        "variables": [
          {
            "symbol": "\\tan, \\cot",
            "meaning": "Quotient trigonometric functions"
          }
        ],
        "chapterId": "c10-s2-trig",
        "classGrade": 10,
        "category": "Trigonometry",
        "conditions": "cos θ ≠ 0 for tan θ; sin θ ≠ 0 for cot θ.",
        "whenToUse": "Simplifying complex trigonometric proofs by converting everything to sin and cos."
      }
    ],
    "derivation": {
      "title": "Derivation of sin²θ + cos²θ = 1 from Pythagoras Theorem",
      "targetFormula": "\\sin^2\\theta + \\cos^2\\theta = 1",
      "objective": "Prove the fundamental Pythagorean identity using a right triangle.",
      "startingObservation": "Let △ABC be right-angled at B, with acute angle ∠A = θ.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "State Pythagoras Theorem in △ABC:",
          "latex": "AB^2 + BC^2 = AC^2",
          "justification": "Base squared plus perpendicular squared equals hypotenuse squared."
        },
        {
          "stepNumber": 2,
          "statement": "Divide each term by AC²:",
          "latex": "\\frac{AB^2}{AC^2} + \\frac{BC^2}{AC^2} = \\frac{AC^2}{AC^2}",
          "justification": "Dividing equality by non-zero scalar AC²."
        },
        {
          "stepNumber": 3,
          "statement": "Rewrite as squares of side ratios:",
          "latex": "\\left(\\frac{AB}{AC}\\right)^2 + \\left(\\frac{BC}{AC}\\right)^2 = 1",
          "justification": "Law of exponents."
        },
        {
          "stepNumber": 4,
          "statement": "Substitute definitions of cos θ and sin θ:",
          "latex": "(\\cos\\theta)^2 + (\\sin\\theta)^2 = 1 \\implies \\sin^2\\theta + \\cos^2\\theta = 1",
          "justification": "cos θ = AB/AC (adj/hyp) and sin θ = BC/AC (opp/hyp)."
        }
      ],
      "finalFormulaLatex": "\\sin^2\\theta + \\cos^2\\theta = 1",
      "conclusion": "The fundamental trigonometric identity is rigorously proved."
    },
    "memoryLab": [
      {
        "title": "Hand Finger Values Trick",
        "mnemonic": "Root(Fingers) / 2 for Sine!",
        "meaning": "Hold hand with 5 fingers for 0°, 30°, 45°, 60°, 90°. For Sine, count fingers below and take √(fingers)/2: 0 fingers -> √0/2 = 0; 1 finger -> √1/2 = 1/2; 2 fingers -> √2/2 = 1/√2; 3 fingers -> √3/2; 4 fingers -> √4/2 = 1.",
        "boardExamTip": "For Cosine, just count fingers ABOVE and take √(fingers)/2!"
      },
      {
        "title": "Secant and Tangent Partner",
        "mnemonic": "Secant and Tangent Walk Together: sec² - tan² = 1!",
        "meaning": "sec²θ - tan²θ = 1 means (secθ - tanθ)(secθ + tanθ) = 1, so (secθ - tanθ) = 1 / (secθ + tanθ)!",
        "boardExamTip": "Heavily tested shortcut! If secθ + tanθ = p, then secθ - tanθ = 1/p!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-trig-1",
        "title": "Proving Standard Trigonometric Identity",
        "problemStatement": "Prove that: cos A / (1 + sin A) + (1 + sin A) / cos A = 2 sec A.",
        "given": [
          "LHS = cos A / (1 + sin A) + (1 + sin A) / cos A"
        ],
        "toFind": "Proof that LHS = 2 sec A",
        "strategy": "Take common denominator, expand numerator, and use sin² A + cos² A = 1.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Take common denominator",
            "latex": "\\text{LHS} = \\frac{\\cos^2 A + (1 + \\sin A)^2}{(1 + \\sin A)\\cos A}",
            "explanation": "Cross-multiply numerators."
          },
          {
            "stepNumber": 2,
            "title": "Expand (1 + sin A)²",
            "latex": "\\text{LHS} = \\frac{\\cos^2 A + 1 + 2\\sin A + \\sin^2 A}{(1 + \\sin A)\\cos A}",
            "explanation": "Binomial square."
          },
          {
            "stepNumber": 3,
            "title": "Apply sin² A + cos² A = 1",
            "latex": "\\text{LHS} = \\frac{(\\cos^2 A + \\sin^2 A) + 1 + 2\\sin A}{(1 + \\sin A)\\cos A} = \\frac{1 + 1 + 2\\sin A}{(1 + \\sin A)\\cos A} = \\frac{2 + 2\\sin A}{(1 + \\sin A)\\cos A}",
            "explanation": "Pythagorean identity."
          },
          {
            "stepNumber": 4,
            "title": "Factor out 2 and cancel",
            "latex": "\\text{LHS} = \\frac{2(1 + \\sin A)}{(1 + \\sin A)\\cos A} = \\frac{2}{\\cos A} = 2\\sec A = \\text{RHS}",
            "explanation": "Common factor (1 + sin A) cancels."
          }
        ],
        "commonMistake": "Expanding denominator instead of leaving it factored.",
        "sanityCheck": "At A = 0°: cos 0 = 1, sin 0 = 0 => 1/1 + 1/1 = 2 = 2 sec 0. Verified!"
      },
      {
        "id": "we-c10-trig-2",
        "title": "Proving Trigonometric Identities",
        "problemStatement": "Prove the identity: (sin θ - 2 sin³ θ) / (2 cos³ θ - cos θ) = tan θ.",
        "given": [
          "LHS = (sin θ - 2 sin³ θ) / (2 cos³ θ - cos θ)"
        ],
        "toFind": "Proof that LHS = tan θ (RHS)",
        "strategy": "Factor out common terms sin θ from numerator and cos θ from denominator, then simplify the quadratic trigonometric factor using sin² θ + cos² θ = 1.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Factor out common terms",
            "latex": "\\text{LHS} = \\frac{\\sin\\theta (1 - 2\\sin^2\\theta)}{\\cos\\theta (2\\cos^2\\theta - 1)} = \\tan\\theta \\cdot \\frac{1 - 2\\sin^2\\theta}{2\\cos^2\\theta - 1}",
            "explanation": "Factor sin θ from numerator and cos θ from denominator."
          },
          {
            "stepNumber": 2,
            "title": "Replace 1 by sin² θ + cos² θ in numerator",
            "latex": "1 - 2\\sin^2\\theta = (\\sin^2\\theta + \\cos^2\\theta) - 2\\sin^2\\theta = \\cos^2\\theta - \\sin^2\\theta",
            "explanation": "Use fundamental identity 1 = sin² θ + cos² θ."
          },
          {
            "stepNumber": 3,
            "title": "Replace 1 in denominator",
            "latex": "2\\cos^2\\theta - 1 = 2\\cos^2\\theta - (\\sin^2\\theta + \\cos^2\\theta) = \\cos^2\\theta - \\sin^2\\theta",
            "explanation": "Denominator factor is identical to numerator factor."
          },
          {
            "stepNumber": 4,
            "title": "Cancel identical factors",
            "latex": "\\tan\\theta \\cdot \\frac{\\cos^2\\theta - \\sin^2\\theta}{\\cos^2\\theta - \\sin^2\\theta} = \\tan\\theta = \\text{RHS}",
            "explanation": "Both factors cancel out to 1, leaving tan θ."
          }
        ],
        "commonMistake": "Trying to cross-multiply instead of transforming LHS independently.",
        "sanityCheck": "For θ = 30°: tan 30° = 1/√3. Numerator = 1/2 - 2(1/8) = 1/4. Denominator = 2(3√3/8) - √3/2 = √3/4. Ratio = (1/4)/(√3/4) = 1/√3. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "In identity proofs, when stuck, convert all sec, csc, tan, cot terms into sin and cos.",
      "Look for difference of squares: (1 - sin A)(1 + sin A) = 1 - sin² A = cos² A."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-trig-1",
        "type": "numerical",
        "prompt": "Evaluate: 2 tan² 45° + cos² 30° - sin² 60°.",
        "correctAnswer": 2,
        "tolerance": 0,
        "hints": [
          "tan 45° = 1, cos 30° = √3/2, sin 60° = √3/2.",
          "2(1)² + (3/4) - (3/4) = 2."
        ],
        "explanation": "cos² 30° and sin² 60° cancel each other, leaving 2(1)² = 2.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-trig-2",
        "type": "numerical",
        "prompt": "If sin θ = 3/5, what is the value of 5 cos θ?",
        "correctAnswer": 4,
        "tolerance": 0,
        "hints": [
          "In a 3-4-5 right triangle, if opp = 3 and hyp = 5, then adj = 4.",
          "cos θ = 4/5 => 5 cos θ = 4."
        ],
        "explanation": "cos θ = √(1 - 9/25) = 4/5. 5 cos θ = 4.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-trig-3",
        "type": "numerical",
        "prompt": "Evaluate: 9 sec² A - 9 tan² A.",
        "correctAnswer": 9,
        "tolerance": 0,
        "hints": [
          "Factor out 9: 9(sec² A - tan² A).",
          "Use identity sec² A - tan² A = 1."
        ],
        "explanation": "9(sec² A - tan² A) = 9(1) = 9.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "sin = opp/hyp, cos = adj/hyp, tan = opp/adj.",
        "sin²θ + cos²θ = 1.",
        "1 + tan²θ = sec²θ => sec²θ - tan²θ = 1.",
        "1 + cot²θ = csc²θ => csc²θ - cot²θ = 1."
      ],
      "commonTraps": [
        "Writing sec²θ + tan²θ = 1; it is sec²θ MINUS tan²θ = 1."
      ]
    },
    "labId": "trig-triangle",
    "labTitle": "Introduction to Trigonometry"
  },
  {
    "id": "c10-s2-ch9",
    "classGrade": 10,
    "semester": 2,
    "chapterNumber": 9,
    "title": "Some Applications of Trigonometry",
    "shortDescription": "Master heights and distances, line of sight, angle of elevation, angle of depression, and dual-triangle problem solving.",
    "whyItMatters": "Civil engineering building layouts, maritime navigation, aviation flight path approaches, and satellite telemetry rely on height and distance trigonometry.",
    "priorKnowledge": [
      "Trigonometric values of 30°, 45°, 60° (tan 30° = 1/√3, tan 45° = 1, tan 60° = √3)",
      "Parallel line alternate interior angle equality",
      "Right triangle definitions of opposite, adjacent, hypotenuse"
    ],
    "vocabulary": [
      {
        "term": "Line of Sight",
        "definition": "The straight line drawn from the eye of an observer to the point in the object viewed by the observer."
      },
      {
        "term": "Angle of Elevation",
        "definition": "The angle formed by the line of sight with the horizontal when the point viewed is ABOVE the horizontal level."
      },
      {
        "term": "Angle of Depression",
        "definition": "The angle formed by the line of sight with the horizontal when the point viewed is BELOW the horizontal level."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch9-single-h",
        "name": "Single Right Triangle Height Relation",
        "latex": "\\tan\\theta = \\frac{h}{d} \\implies h = d \\tan\\theta",
        "description": "Relates horizontal distance d from base to vertical height h using angle of elevation θ.",
        "variables": [
          {
            "symbol": "h",
            "meaning": "Vertical height"
          },
          {
            "symbol": "d",
            "meaning": "Horizontal distance along ground"
          },
          {
            "symbol": "\\theta",
            "meaning": "Angle of elevation"
          }
        ],
        "chapterId": "c10-s2-ch9",
        "classGrade": 10,
        "category": "Trigonometry",
        "conditions": "Tower is vertical (perpendicular to ground).",
        "whenToUse": "Basic height and distance problems with 1 observer position.",
        "workedExample": {
          "problem": "A tower stands vertically on ground. From a point 15 m away from foot, angle of elevation is 60°. Find height.",
          "solution": "h = d tan 60° = 15 × √3 = 15√3 m."
        }
      },
      {
        "id": "f-c10-ch9-dep-elev",
        "name": "Equality of Angle of Elevation and Depression",
        "latex": "\\angle \\text{Depression from top} = \\angle \\text{Elevation from ground} \\quad (\\text{Alternate Interior Angles})",
        "description": "The angle of depression from a high point to ground equals the angle of elevation from ground to that high point because horizontal lines of sight are parallel.",
        "variables": [
          {
            "symbol": "\\angle \\text{Depression}",
            "meaning": "Angle below horizontal"
          }
        ],
        "chapterId": "c10-s2-ch9",
        "classGrade": 10,
        "category": "Trigonometry",
        "conditions": "Horizontal sightlines are parallel.",
        "whenToUse": "Converting angles of depression into interior base angles of right triangles."
      },
      {
        "id": "f-c10-ch9-two-pt",
        "name": "Two-Point Elevation Difference Formula",
        "latex": "h = \\frac{d}{\\cot\\theta_1 - \\cot\\theta_2} = \\frac{d \\tan\\theta_1 \\tan\\theta_2}{\\tan\\theta_2 - \\tan\\theta_1}",
        "description": "Height of a vertical object observed from two positions along the same horizontal line at distance d apart with elevation angles θ1 and θ2 (θ2 > θ1).",
        "variables": [
          {
            "symbol": "h",
            "meaning": "Height of tower or cliff"
          },
          {
            "symbol": "d",
            "meaning": "Horizontal distance moved between two observations"
          },
          {
            "symbol": "\\theta_1, \\theta_2",
            "meaning": "Angles of elevation from initial and final points"
          }
        ],
        "chapterId": "c10-s2-ch9",
        "classGrade": 10,
        "category": "Trigonometry",
        "conditions": "Both observation points lie in the same vertical plane passing through the object.",
        "whenToUse": "Finding height when observer approaches or retreats from an object without knowing distance to the base.",
        "workedExample": {
          "problem": "Angles of elevation of a tower top from two points 20 m apart on ground are 30° and 60°. Find height.",
          "latexProblem": "d = 20\\text{ m}, \\theta_1 = 30^\\circ, \\theta_2 = 60^\\circ",
          "solution": "h = 20 / (cot 30° - cot 60°) = 20 / (√3 - 1/√3) = 20 / (2/√3) = 10√3 ≈ 17.32 m.",
          "latexSolution": "h = 10\\sqrt{3}\\text{ m} \\approx 17.32\\text{ m}"
        }
      }
    ],
    "derivation": {
      "title": "Deduction of Height Equation for Moving Observer",
      "targetFormula": "h = \\frac{d}{\\cot\\alpha - \\cot\\beta}",
      "objective": "Derive formula for height h observed from two points on ground separated by distance d.",
      "startingObservation": "Let tower height be h. Observer at point A has elevation α; moves distance d towards tower to point B with elevation β.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Express horizontal distance from B to tower base:",
          "latex": "x = \\frac{h}{\\tan\\beta} = h \\cot\\beta",
          "justification": "In right triangle at point B, tan β = h/x."
        },
        {
          "stepNumber": 2,
          "statement": "Express horizontal distance from A to tower base:",
          "latex": "x + d = \\frac{h}{\\tan\\alpha} = h \\cot\\alpha",
          "justification": "In larger right triangle at point A, tan α = h/(x + d)."
        },
        {
          "stepNumber": 3,
          "statement": "Subtract distance equations:",
          "latex": "(x + d) - x = h \\cot\\alpha - h \\cot\\beta \\implies d = h(\\cot\\alpha - \\cot\\beta)",
          "justification": "Eliminating intermediate distance x."
        },
        {
          "stepNumber": 4,
          "statement": "Solve for height h:",
          "latex": "h = \\frac{d}{\\cot\\alpha - \\cot\\beta}",
          "justification": "Dividing by cotangent difference."
        }
      ],
      "finalFormulaLatex": "h = \\frac{d}{\\cot\\alpha - \\cot\\beta}",
      "conclusion": "The dual-elevation height equation is derived."
    },
    "memoryLab": [
      {
        "title": "Observer Height Adjustment",
        "mnemonic": "Don’t forget to ADD observer height!",
        "meaning": "If a 1.5m observer views a chimney, total chimney height = h + 1.5m!",
        "boardExamTip": "Always check if problem mentions \"a person of height 1.5m\" or \"from a point on ground\"."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch9-1",
        "title": "Height of Chimney with Observer Height Included",
        "problemStatement": "An observer 1.5 m tall is 28.5 m away from a chimney. The angle of elevation of the top of the chimney from her eyes is 45°. What is the height of the chimney?",
        "given": [
          "Observer height = 1.5 m",
          "Distance d = 28.5 m",
          "Angle of elevation θ = 45°"
        ],
        "toFind": "Total height of chimney H",
        "strategy": "Draw horizontal from eye level. Find h using tan 45° = h/d, then add observer height.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find height above eye level",
            "latex": "\\tan 45^\\circ = \\frac{h}{28.5} \\implies 1 = \\frac{h}{28.5} \\implies h = 28.5 \\text{ m}",
            "explanation": "tan 45° = 1."
          },
          {
            "stepNumber": 2,
            "title": "Add observer height",
            "latex": "H = h + 1.5 = 28.5 + 1.5 = 30 \\text{ m}",
            "explanation": "Total height from ground."
          }
        ],
        "commonMistake": "Reporting 28.5 m as the final answer, forgetting to add observer height 1.5 m.",
        "sanityCheck": "28.5 + 1.5 = 30 m exactly. Correct!"
      },
      {
        "id": "we-c10-ch9-2",
        "title": "Observer Walking Towards a Building",
        "problemStatement": "A 1.5 m tall boy is standing at some distance from a 30 m tall building. The angle of elevation from his eyes to the top of the building increases from 30° to 60° as he walks towards the building. Find the distance he walked towards the building.",
        "given": [
          "Height of building = 30 m",
          "Height of boy = 1.5 m",
          "Effective height h = 30 - 1.5 = 28.5 m",
          "Initial angle θ1 = 30°, Final angle θ2 = 60°"
        ],
        "toFind": "Distance walked (d)",
        "strategy": "Find distance from initial point x1 = h cot 30°, final distance x2 = h cot 60°, and distance walked d = x1 - x2.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Calculate effective height",
            "latex": "h = 30 - 1.5 = 28.5 = \\frac{57}{2}\\text{ m}",
            "explanation": "Sightline starts from the boy's eye level (1.5 m above ground)."
          },
          {
            "stepNumber": 2,
            "title": "Find initial horizontal distance",
            "latex": "x_1 = h \\cot 30^\\circ = 28.5 \\times \\sqrt{3}\\text{ m}",
            "explanation": "In right triangle with angle 30°, base = height × cot 30°."
          },
          {
            "stepNumber": 3,
            "title": "Find final horizontal distance",
            "latex": "x_2 = h \\cot 60^\\circ = \\frac{28.5}{\\sqrt{3}}\\text{ m}",
            "explanation": "In right triangle with angle 60°, base = height × cot 60°."
          },
          {
            "stepNumber": 4,
            "title": "Calculate distance walked",
            "latex": "d = x_1 - x_2 = 28.5\\left(\\sqrt{3} - \\frac{1}{\\sqrt{3}}\\right) = 28.5 \\times \\frac{2}{\\sqrt{3}} = \\frac{57}{\\sqrt{3}} = 19\\sqrt{3}\\text{ m}",
            "explanation": "Rationalise denominator: 57√3 / 3 = 19√3."
          }
        ],
        "commonMistake": "Forgetting to subtract the boy's height 1.5 m from the building's height.",
        "sanityCheck": "19√3 ≈ 19 × 1.732 = 32.91 m. x2 = 28.5/√3 ≈ 16.45 m. x1 = 49.36 m. 49.36 - 16.45 = 32.91 m. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "Always draw a labelled diagram with horizontal ground line, vertical height line, and line of sight.",
      "Remember exact values: tan 30° = 1/√3 (0.577), tan 45° = 1, tan 60° = √3 (1.732)."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch9-1",
        "type": "numerical",
        "prompt": "If the shadow of a tower is √3 times its height, what is the angle of elevation of the Sun in degrees?",
        "correctAnswer": 30,
        "tolerance": 0,
        "hints": [
          "tan θ = height / shadow = h / (h√3) = 1/√3.",
          "tan 30° = 1/√3."
        ],
        "explanation": "tan θ = 1/√3 => θ = 30°.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch9-2",
        "type": "numerical",
        "prompt": "A kite is flying at a height of 60 m above the ground attached to a string inclined at 60° to the horizontal. Find the length of the string in meters (use √3 = 1.732, round to 1 decimal).",
        "correctAnswer": 69.3,
        "tolerance": 0.5,
        "hints": [
          "sin 60° = opp / hyp = 60 / L => √3 / 2 = 60 / L => L = 120 / √3 = 40√3.",
          "40 × 1.732 = 69.28 ≈ 69.3 m."
        ],
        "explanation": "L = 40√3 ≈ 69.3 m.",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c10-ch9-3",
        "type": "mcq",
        "prompt": "The angle of depression of a car on the road from the top of a 75m high tower is 30°. The distance of the car from the base of the tower is:",
        "options": [
          "75 m",
          "75√3 m",
          "75/√3 m",
          "150 m"
        ],
        "correctAnswer": "75√3 m",
        "hints": [
          "Angle of depression = angle of elevation from car = 30°.",
          "tan 30° = 75 / d => 1/√3 = 75 / d => d = 75√3 m."
        ],
        "explanation": "d = 75 / tan 30° = 75√3 m.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Angle of elevation: looking UP from horizontal.",
        "Angle of depression: looking DOWN from horizontal.",
        "Angle of depression equals angle of elevation by alternate interior angles.",
        "Total height = height from eye level + observer height."
      ],
      "commonTraps": [
        "Measuring angle of depression from the vertical wall instead of horizontal sightline."
      ]
    },
    "labId": "trig-triangle",
    "labTitle": "Some Applications of Trigonometry"
  },
  {
    "id": "c10-s2-ch10",
    "classGrade": 10,
    "semester": 2,
    "chapterNumber": 10,
    "title": "Circles",
    "shortDescription": "Master tangent properties, Theorem 10.1 (perpendicular radius), Theorem 10.2 (equal tangent lengths), and circumscribed polygons.",
    "whyItMatters": "Circle tangents define wheel road contact physics, gear meshing involute curves, optical reflection angles, and circular pulley tension lines.",
    "priorKnowledge": [
      "Basic parts of circle: radius, diameter, chord, secant",
      "Right angles and Pythagoras theorem",
      "Triangle congruence (RHS criterion)"
    ],
    "vocabulary": [
      {
        "term": "Tangent to a Circle",
        "definition": "A straight line that touches the circle at exactly one point."
      },
      {
        "term": "Point of Contact",
        "definition": "The unique single point where a tangent touches the circle."
      },
      {
        "term": "Secant",
        "definition": "A line that intersects a circle at two distinct points."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch10-th1",
        "name": "Theorem 10.1 (Tangent-Radius Perpendicularity)",
        "latex": "OP \\perp AB \\quad (P \\text{ is point of contact})",
        "description": "The tangent at any point of a circle is perpendicular to the radius through the point of contact.",
        "variables": [
          {
            "symbol": "OP",
            "meaning": "Radius drawn to point of contact"
          },
          {
            "symbol": "AB",
            "meaning": "Tangent line"
          }
        ],
        "chapterId": "c10-s2-ch10",
        "classGrade": 10,
        "category": "Geometry",
        "conditions": "P must be the point of contact.",
        "whenToUse": "Forms right angles for Pythagorean calculation in tangent problems.",
        "workedExample": {
          "problem": "A tangent PQ at point P of circle of radius 5 cm meets a line through center O at Q so OQ = 12 cm. Find PQ.",
          "solution": "△OPQ is right angled at P. PQ = √(OQ² - OP²) = √(12² - 5²) = √(144 - 25) = √119 cm."
        }
      },
      {
        "id": "f-c10-ch10-th2",
        "name": "Theorem 10.2 (Equal Tangent Lengths from External Point)",
        "latex": "PA = PB",
        "description": "The lengths of tangents drawn from an external point to a circle are equal.",
        "variables": [
          {
            "symbol": "P",
            "meaning": "External point"
          },
          {
            "symbol": "A, B",
            "meaning": "Points of contact on circle"
          }
        ],
        "chapterId": "c10-s2-ch10",
        "classGrade": 10,
        "category": "Geometry",
        "conditions": "P is strictly outside the circle.",
        "whenToUse": "Equating tangent segments from a common vertex in circumscribed polygons.",
        "mnemonic": "Two tangents from one point? Exactly equal lengths!"
      },
      {
        "id": "f-c10-ch10-supp",
        "name": "Supplementary Angle Subtended by Tangents",
        "latex": "\\angle APB + \\angle AOB = 180^\\circ",
        "description": "The angle between two tangents drawn from an external point is supplementary to the angle subtended by the line segment joining points of contact at the center.",
        "variables": [
          {
            "symbol": "\\angle APB",
            "meaning": "Angle between two tangents"
          },
          {
            "symbol": "\\angle AOB",
            "meaning": "Angle subtended at center by contact points"
          }
        ],
        "chapterId": "c10-s2-ch10",
        "classGrade": 10,
        "category": "Geometry",
        "conditions": "Quadrilateral PAOB has right angles at A and B.",
        "whenToUse": "Finding angle between tangents given central angle, or vice versa."
      },
      {
        "id": "f-c10-ch10-quad-circ",
        "name": "Circumscribed Quadrilateral Opposite Sides Property",
        "latex": "AB + CD = AD + BC",
        "description": "In a quadrilateral ABCD circumscribing a circle, the sum of opposite pairs of sides is equal.",
        "variables": [
          {
            "symbol": "AB, CD",
            "meaning": "One pair of opposite sides"
          },
          {
            "symbol": "AD, BC",
            "meaning": "Other pair of opposite sides"
          }
        ],
        "chapterId": "c10-s2-ch10",
        "classGrade": 10,
        "category": "Geometry",
        "conditions": "Circle is tangent to all 4 sides.",
        "whenToUse": "Finding missing side of circumscribed quadrilateral."
      }
    ],
    "derivation": {
      "title": "Proof of Theorem 10.2: Tangent Lengths from External Point are Equal",
      "targetFormula": "PA = PB",
      "objective": "Prove that tangents drawn from an external point P to a circle with center O are equal.",
      "startingObservation": "Let PA and PB be two tangents from external point P to circle with center O. Join OA, OB, and OP.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Identify right angles by Theorem 10.1:",
          "latex": "\\angle OAP = 90^\\circ \\quad \\text{and} \\quad \\angle OBP = 90^\\circ",
          "justification": "Radius through point of contact is perpendicular to tangent."
        },
        {
          "stepNumber": 2,
          "statement": "Compare right-angled triangles △OPA and △OPB:",
          "latex": "OA = OB \\quad (\\text{Radii of circle}), \\quad OP = OP \\quad (\\text{Common Hypotenuse})",
          "justification": "Both are right triangles sharing common hypotenuse OP."
        },
        {
          "stepNumber": 3,
          "statement": "Apply RHS Congruence Criterion:",
          "latex": "\\triangle OPA \\cong \\triangle OPB \\quad (\\text{by RHS rule})",
          "justification": "Right angle, Hypotenuse, and Side are equal."
        },
        {
          "stepNumber": 4,
          "statement": "Deduce CPCT equality:",
          "latex": "PA = PB",
          "justification": "Corresponding Parts of Congruent Triangles are equal."
        }
      ],
      "finalFormulaLatex": "PA = PB",
      "conclusion": "The lengths of tangents drawn from an external point to a circle are proved equal."
    },
    "memoryLab": [
      {
        "title": "Number of Tangents from Points",
        "mnemonic": "Inside: 0, On: 1, Outside: 2!",
        "meaning": "Point inside circle: 0 tangents. Point on circle: exactly 1 tangent. Point outside circle: exactly 2 tangents.",
        "boardExamTip": "Crucial 1-mark question in AP SSC Board Exams!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch10-1",
        "title": "Circumscribed Quadrilateral Proof Application",
        "problemStatement": "A quadrilateral ABCD is drawn to circumscribe a circle. If AB = 6 cm, BC = 7 cm, and CD = 4 cm, find AD.",
        "given": [
          "AB = 6 cm",
          "BC = 7 cm",
          "CD = 4 cm",
          "ABCD circumscribes a circle"
        ],
        "toFind": "Length of AD",
        "strategy": "Apply AB + CD = AD + BC (Theorem 10.2 consequence).",
        "steps": [
          {
            "stepNumber": 1,
            "title": "State theorem property",
            "latex": "AB + CD = AD + BC",
            "explanation": "Sum of opposite sides of circumscribed quadrilateral is equal."
          },
          {
            "stepNumber": 2,
            "title": "Substitute values",
            "latex": "6 + 4 = AD + 7 \\implies 10 = AD + 7",
            "explanation": "Substitute given lengths."
          },
          {
            "stepNumber": 3,
            "title": "Solve for AD",
            "latex": "AD = 10 - 7 = 3 \\text{ cm}",
            "explanation": "Subtract 7."
          }
        ],
        "commonMistake": "Equating adjacent sides (AB + BC = CD + AD).",
        "sanityCheck": "6 + 4 = 10; 3 + 7 = 10. Equal sums verified!"
      },
      {
        "id": "we-c10-ch10-2",
        "title": "Quadrilateral Circumscribing a Circle Property",
        "problemStatement": "A quadrilateral ABCD is drawn to circumscribe a circle. Prove that AB + CD = AD + BC.",
        "given": [
          "Quadrilateral ABCD circumscribes a circle, touching sides AB, BC, CD, DA at P, Q, R, S respectively."
        ],
        "toFind": "Proof that AB + CD = AD + BC",
        "strategy": "Apply Theorem 10.2: Tangents drawn from an external point to a circle are equal in length.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Apply tangent equality from each vertex",
            "latex": "AP = AS, \\quad BP = BQ, \\quad CR = CQ, \\quad DR = DS",
            "explanation": "From vertices A, B, C, D, pairs of tangents to circle touchpoints are equal."
          },
          {
            "stepNumber": 2,
            "title": "Add all four equations",
            "latex": "(AP + BP) + (CR + DR) = (AS + DS) + (BQ + CQ)",
            "explanation": "Sum LHS and RHS terms grouped into opposite sides."
          },
          {
            "stepNumber": 3,
            "title": "Combine collinear segments",
            "latex": "AB + CD = AD + BC",
            "explanation": "AP + BP = AB, CR + DR = CD, AS + DS = AD, BQ + CQ = BC."
          }
        ],
        "commonMistake": "Grouping terms inconsistently (e.g. putting CQ on LHS and CR on RHS), preventing side recombination.",
        "sanityCheck": "For a square circumscribing circle of diameter d: all 4 sides = d. d + d = d + d = 2d. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "Whenever tangents meet at a point, mark equal tangent segments with identical letters (a, b, c, d) around the polygon.",
      "Remember that quadrilateral formed by two tangents and two radii (PAOB) is cyclic because opposite angles at A and B are 90° each (sum = 180°)."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch10-1",
        "type": "numerical",
        "prompt": "If tangents PA and PB from a point P to a circle with center O are inclined to each other at an angle of 80°, find the measure of ∠POA in degrees.",
        "correctAnswer": 50,
        "tolerance": 0,
        "hints": [
          "∠APB = 80° => ∠AOB = 180° - 80° = 100°.",
          "OP bisects ∠AOB => ∠POA = 100° / 2 = 50°."
        ],
        "explanation": "∠AOB = 180° - 80° = 100°. Line OP bisects ∠AOB, so ∠POA = 50°.",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c10-ch10-2",
        "type": "numerical",
        "prompt": "From a point Q, the length of tangent to a circle is 24 cm and the distance of Q from center is 25 cm. What is the radius of the circle in cm?",
        "correctAnswer": 7,
        "tolerance": 0,
        "hints": [
          "△OPQ is right angled at P. r² = 25² - 24² = 625 - 576 = 49."
        ],
        "explanation": "r = √49 = 7 cm.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch10-3",
        "type": "mcq",
        "prompt": "How many tangents can be drawn to a circle from a point lying strictly inside the circle?",
        "options": [
          "0",
          "1",
          "2",
          "Infinitely many"
        ],
        "correctAnswer": "0",
        "hints": [
          "Any line passing through an interior point intersects the circle at two points (it is a secant, never a tangent)."
        ],
        "explanation": "No tangent can be drawn from an interior point.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Theorem 10.1: Tangent is perpendicular to radius at point of contact.",
        "Theorem 10.2: Tangent lengths from external point are equal (PA = PB).",
        "Angle between tangents and central angle sum to 180°.",
        "Circumscribed quadrilateral: AB + CD = AD + BC."
      ],
      "commonTraps": [
        "Assuming radius and tangent meet at an acute angle; they ALWAYS meet at 90°."
      ]
    },
    "labId": "circle-area",
    "labTitle": "Circles"
  },
  {
    "id": "c10-s2-ch11",
    "classGrade": 10,
    "semester": 2,
    "chapterNumber": 11,
    "title": "Areas Related to Circles",
    "shortDescription": "Master circumference, area of circle, area of sector, arc length, and areas of minor & major segments.",
    "whyItMatters": "Mechanical gear teeth, clock pendulum arcs, agricultural circular pivot irrigation sweeps, and round architectural stained glass require sector and segment areas.",
    "priorKnowledge": [
      "Circumference C = 2πr and Area A = πr²",
      "Fractions and degrees in a complete rotation (360°)",
      "Basic triangle area formulas"
    ],
    "vocabulary": [
      {
        "term": "Sector of Circle",
        "definition": "The portion of the circular region enclosed by two radii and the corresponding arc."
      },
      {
        "term": "Segment of Circle",
        "definition": "The portion of the circular region enclosed between a chord and the corresponding arc."
      },
      {
        "term": "Arc Length (l)",
        "definition": "The linear distance along the curved boundary of a sector: l = (θ / 360°) × 2πr."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch11-sector",
        "name": "Sector Area and Arc Length Formulas",
        "latex": "A_{\\text{sector}} = \\frac{\\theta}{360^\\circ} \\pi r^2, \\quad l = \\frac{\\theta}{360^\\circ} 2\\pi r, \\quad A_{\\text{sector}} = \\frac{1}{2} l r",
        "description": "Calculates the area and curved perimeter of a circular sector of central angle θ in degrees.",
        "variables": [
          {
            "symbol": "\\theta",
            "meaning": "Central angle in degrees"
          },
          {
            "symbol": "r",
            "meaning": "Radius of circle"
          },
          {
            "symbol": "l",
            "meaning": "Arc length"
          }
        ],
        "chapterId": "c10-s2-ch11",
        "classGrade": 10,
        "category": "Mensuration",
        "conditions": "θ in degrees.",
        "whenToUse": "Finding area or arc length of pizza-slice sectors.",
        "workedExample": {
          "problem": "Find area of sector of circle with radius 6 cm and angle 60°",
          "solution": "A = (60/360) × (22/7) × 6² = (1/6) × (22/7) × 36 = 6 × 22/7 = 132/7 = 18.86 cm²."
        }
      },
      {
        "id": "f-c10-ch11-segment",
        "name": "Area of Minor and Major Segment Formula",
        "latex": "A_{\\text{minor segment}} = \\frac{\\theta}{360^\\circ} \\pi r^2 - \\frac{1}{2} r^2 \\sin\\theta, \\quad A_{\\text{major segment}} = \\pi r^2 - A_{\\text{minor segment}}",
        "description": "Segment area equals sector area minus the area of the central triangle 1/2 r² sin θ.",
        "variables": [
          {
            "symbol": "\\theta",
            "meaning": "Central angle of chord"
          },
          {
            "symbol": "r",
            "meaning": "Radius of circle"
          }
        ],
        "chapterId": "c10-s2-ch11",
        "classGrade": 10,
        "category": "Mensuration",
        "conditions": "For θ = 60°, central triangle is equilateral (area = √3/4 r²). For θ = 90°, area = 1/2 r².",
        "whenToUse": "Finding area enclosed between chord and circular arc.",
        "mnemonic": "Segment = Sector minus Triangle!"
      },
      {
        "id": "f-c10-ch11-segment",
        "name": "Area of Minor and Major Segments",
        "latex": "\\text{Area(Minor Segment)} = \\frac{\\theta}{360^\\circ} \\pi r^2 - \\frac{1}{2} r^2 \\sin\\theta",
        "description": "Area of a segment is formed by subtracting the area of the isosceles triangle formed by the radius vectors from the sector area.",
        "variables": [
          {
            "symbol": "r",
            "meaning": "Radius of circle"
          },
          {
            "symbol": "\\theta",
            "meaning": "Angle subtended by chord at centre"
          }
        ],
        "chapterId": "c10-s2-ch11",
        "classGrade": 10,
        "category": "Mensuration",
        "conditions": "0° < θ < 180°.",
        "whenToUse": "Finding the area bounded by a chord and an arc.",
        "workedExample": {
          "problem": "Find area of minor segment of circle radius 14 cm subtending 90° at centre.",
          "latexProblem": "r = 14\\text{ cm}, \\theta = 90^\\circ",
          "solution": "Sector area = (90/360) × (22/7) × 14² = 154 cm². Triangle area = 1/2 × 14 × 14 = 98 cm². Segment area = 154 - 98 = 56 cm².",
          "latexSolution": "\\text{Area} = 154 - 98 = 56\\text{ cm}^2"
        }
      }
    ],
    "derivation": {
      "title": "Derivation of Sector Area Formula by Proportion of Central Angle",
      "targetFormula": "A = \\frac{\\theta}{360^\\circ} \\pi r^2",
      "objective": "Prove the area of a sector formula from first geometric principles.",
      "startingObservation": "A complete circle corresponds to a central angle of 360° and has total area πr².",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Apply unitary method for central angle of 1°:",
          "latex": "\\text{Area for } 1^\\circ = \\frac{\\pi r^2}{360^\\circ}",
          "justification": "Area is uniformly distributed around the center."
        },
        {
          "stepNumber": 2,
          "statement": "Multiply by central angle θ:",
          "latex": "A_{\\text{sector}} = \\theta \\times \\frac{\\pi r^2}{360^\\circ} = \\frac{\\theta}{360^\\circ} \\pi r^2",
          "justification": "Proportional scaling for angle θ."
        },
        {
          "stepNumber": 3,
          "statement": "Express in terms of arc length l:",
          "latex": "l = \\frac{\\theta}{360^\\circ} 2\\pi r \\implies \\frac{\\theta}{360^\\circ} \\pi r = \\frac{1}{2}l \\implies A = \\frac{1}{2}lr",
          "justification": "Analogous to 1/2 × base × height."
        }
      ],
      "finalFormulaLatex": "A = \\frac{\\theta}{360^\\circ} \\pi r^2 = \\frac{1}{2} l r",
      "conclusion": "The sector area formula is rigorously established."
    },
    "memoryLab": [
      {
        "title": "Segment Triangle Area Shortcuts",
        "mnemonic": "At 60°: Equilateral √3/4 r²; At 90°: Half Square 1/2 r²!",
        "meaning": "For central angle 60°, the triangle is equilateral with area (√3/4) r². For 90°, it is a right triangle with area 1/2 r².",
        "boardExamTip": "Almost all AP SSC Board exam questions use θ = 60° or θ = 90°!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch11-1",
        "title": "Finding Minor Segment Area with 90° Central Angle",
        "problemStatement": "A chord of a circle of radius 10 cm subtends a right angle at the center. Find the area of the minor segment (use π = 3.14).",
        "given": [
          "Radius r = 10 cm",
          "Central angle θ = 90°",
          "π = 3.14"
        ],
        "toFind": "Area of minor segment",
        "strategy": "Area of minor segment = Area of sector - Area of right triangle △AOB.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Calculate sector area",
            "latex": "A_{\\text{sector}} = \\frac{90}{360} \\times 3.14 \\times 10^2 = \\frac{1}{4} \\times 314 = 78.5 \\text{ cm}^2",
            "explanation": "Quarter circle area."
          },
          {
            "stepNumber": 2,
            "title": "Calculate triangle area",
            "latex": "A_{\\triangle AOB} = \\frac{1}{2} \\times r \\times r = \\frac{1}{2} \\times 10 \\times 10 = 50 \\text{ cm}^2",
            "explanation": "Right-angled triangle at center O."
          },
          {
            "stepNumber": 3,
            "title": "Subtract to find segment area",
            "latex": "A_{\\text{segment}} = 78.5 - 50 = 28.5 \\text{ cm}^2",
            "explanation": "Sector minus triangle."
          }
        ],
        "commonMistake": "Forgetting to subtract triangle area (reporting sector area 78.5 cm²).",
        "sanityCheck": "28.5 cm² < 78.5 cm². Positive and smaller than sector. Correct!"
      },
      {
        "id": "we-c10-ch11-2",
        "title": "Area of Minor Segment with 60° Central Angle",
        "problemStatement": "A chord of a circle of radius 15 cm subtends an angle of 60° at the centre. Find the areas of the corresponding minor and major segments of the circle. (Use π = 3.14 and √3 = 1.73).",
        "given": [
          "r = 15 cm",
          "θ = 60°",
          "π = 3.14",
          "√3 = 1.73"
        ],
        "toFind": "Areas of minor and major segments",
        "strategy": "Calculate sector area, equilateral triangle area, subtract for minor segment, then subtract minor segment from full circle area for major segment.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Calculate sector area",
            "latex": "\\text{Area of sector} = \\frac{60^\\circ}{360^\\circ} \\times 3.14 \\times 15^2 = \\frac{1}{6} \\times 3.14 \\times 225 = 117.75\\text{ cm}^2",
            "explanation": "Area = (θ/360) × π r²."
          },
          {
            "stepNumber": 2,
            "title": "Calculate equilateral triangle area",
            "latex": "\\text{Area of } \\triangle OAB = \\frac{\\sqrt{3}}{4} \\times 15^2 = \\frac{1.73 \\times 225}{4} = 97.3125\\text{ cm}^2",
            "explanation": "Since OA = OB and angle is 60°, triangle is equilateral."
          },
          {
            "stepNumber": 3,
            "title": "Calculate minor segment area",
            "latex": "\\text{Minor segment} = 117.75 - 97.3125 = 20.4375\\text{ cm}^2 \\approx 20.44\\text{ cm}^2",
            "explanation": "Subtract triangle from sector."
          },
          {
            "stepNumber": 4,
            "title": "Calculate major segment area",
            "latex": "\\text{Circle area} = 3.14 \\times 225 = 706.5\\text{ cm}^2 \\implies \\text{Major segment} = 706.5 - 20.4375 = 686.0625\\text{ cm}^2",
            "explanation": "Major segment = Total circle area - Minor segment area."
          }
        ],
        "commonMistake": "Using right-angled triangle formula (1/2 base × height) instead of equilateral triangle formula for 60°.",
        "sanityCheck": "20.44 + 686.06 = 706.5 = π r². Exact match!"
      }
    ],
    "problemSolvingStrategies": [
      "Always distinguish clearly between minor segment and minor sector.",
      "To find number of revolutions of a wheel: Revolutions = Total Distance / Circumference (2πr)."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch11-1",
        "type": "numerical",
        "prompt": "Find the area of a quadrant of a circle whose circumference is 22 cm in cm² (use π = 22/7).",
        "correctAnswer": 9.625,
        "tolerance": 0.1,
        "hints": [
          "2πr = 22 => r = 3.5 cm (7/2 cm).",
          "Quadrant area = 1/4 πr² = (1/4)(22/7)(49/4) = 77/8 = 9.625 cm²."
        ],
        "explanation": "r = 3.5 cm. Area = 77/8 = 9.625 cm².",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c10-ch11-2",
        "type": "numerical",
        "prompt": "The length of the minute hand of a clock is 14 cm. Find the area swept by the minute hand in 5 minutes in cm² (use π = 22/7).",
        "correctAnswer": 51.33,
        "tolerance": 0.2,
        "hints": [
          "In 60 min, angle = 360° => in 5 min, angle = (360/60) × 5 = 30°.",
          "Area = (30/360) × (22/7) × 14² = (1/12) × (22/7) × 196 = 154/3 ≈ 51.33 cm²."
        ],
        "explanation": "θ = 30°. Area = 154/3 ≈ 51.33 cm².",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c10-ch11-3",
        "type": "mcq",
        "prompt": "If the perimeter and area of a circle are numerically equal, then the radius of the circle is:",
        "options": [
          "2 units",
          "π units",
          "4 units",
          "7 units"
        ],
        "correctAnswer": "2 units",
        "hints": [
          "2πr = πr² => 2 = r."
        ],
        "explanation": "2πr = πr² => r = 2 units.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Sector area: (θ / 360°) πr² = 1/2 lr.",
        "Arc length: (θ / 360°) 2πr.",
        "Minor segment area = Sector area - Triangle area.",
        "Major segment area = Total circle area - Minor segment area."
      ],
      "commonTraps": [
        "Confusing sector (includes two straight radii) with segment (bounded by chord)."
      ]
    },
    "labId": "circle-area",
    "labTitle": "Areas Related to Circles"
  },
  {
    "id": "c10-s2-ch12",
    "classGrade": 10,
    "semester": 2,
    "chapterNumber": 12,
    "title": "Surface Areas and Volumes",
    "shortDescription": "Master surface areas and volumes of combinations of solids (cone on hemisphere, cylinder with hemispherical ends, hollow shapes).",
    "whyItMatters": "Industrial vessel fabrication, civil water towers, capsule pharmacological manufacture, and aerospace payload fairings require combined 3D mensuration.",
    "priorKnowledge": [
      "Formulas for cylinder (CSA = 2πrh, V = πr²h)",
      "Formulas for cone (CSA = πrl, V = 1/3 πr²h)",
      "Formulas for sphere (S = 4πr², V = 4/3 πr³) and hemisphere"
    ],
    "vocabulary": [
      {
        "term": "Combination of Solids",
        "definition": "A 3D object formed by joining two or more basic geometrical solids together at their common faces."
      },
      {
        "term": "Exposed Surface Area",
        "definition": "Only the outer visible surfaces that can be touched or painted; interface contact surfaces are excluded."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch12-comb-sa",
        "name": "Combined Solids Surface Area Principle",
        "latex": "\\text{TSA}_{\\text{combined}} = \\sum \\text{Visible Outer Faces} \\quad (\\text{Internal boundaries excluded!})",
        "description": "When two solids are joined (e.g. cone on hemisphere), overlapping contact faces disappear and are not counted in the total surface area.",
        "variables": [
          {
            "symbol": "\\text{TSA}_{\\text{combined}}",
            "meaning": "Net external surface area"
          }
        ],
        "chapterId": "c10-s2-ch12",
        "classGrade": 10,
        "category": "Mensuration",
        "conditions": "Only externally accessible faces count.",
        "whenToUse": "All combined solid problems (toys, capsules, tents).",
        "mnemonic": "Never add internal bases! Only paint what is visible outside!"
      },
      {
        "id": "f-c10-ch12-comb-vol",
        "name": "Combined Solids Volume Principle",
        "latex": "V_{\\text{total}} = V_1 + V_2",
        "description": "Volume is purely additive regardless of how contact faces join.",
        "variables": [
          {
            "symbol": "V_1, V_2",
            "meaning": "Volumes of component constituent solids"
          }
        ],
        "chapterId": "c10-s2-ch12",
        "classGrade": 10,
        "category": "Mensuration",
        "conditions": "No overlap or hollow exclusion unless specified.",
        "whenToUse": "Finding capacity, weight, or contents of composite solids."
      },
      {
        "id": "f-c10-ch12-toy-model",
        "name": "Toy Model (Cone Mounted on Hemisphere)",
        "latex": "\\text{TSA} = \\pi r l + 2\\pi r^2 = \\pi r(l + 2r), \\quad V = \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3",
        "description": "Formulas for a top or toy formed by mounting a cone onto a hemisphere of common radius r.",
        "variables": [
          {
            "symbol": "r",
            "meaning": "Common radius"
          },
          {
            "symbol": "h",
            "meaning": "Height of cone only"
          },
          {
            "symbol": "l",
            "meaning": "Slant height of cone: √(r² + h²)"
          }
        ],
        "chapterId": "c10-s2-ch12",
        "classGrade": 10,
        "category": "Mensuration",
        "conditions": "Same base radius r.",
        "whenToUse": "Top-frequency 8-mark question in AP SSC Board Exams.",
        "workedExample": {
          "problem": "Find TSA of toy: cone (r = 3.5 cm, l = 12.5 cm) on hemisphere (r = 3.5 cm)",
          "solution": "TSA = π r l + 2π r² = (22/7)(3.5)(12.5 + 2×3.5) = 11 × 19.5 = 214.5 cm²."
        }
      }
    ],
    "derivation": {
      "title": "Deduction of Capsule Surface Area and Volume Equations",
      "targetFormula": "\\text{TSA} = 2\\pi r h + 4\\pi r^2",
      "objective": "Prove surface area formula for a medicine capsule (cylinder with two hemispherical ends).",
      "startingObservation": "A capsule consists of a central cylinder of length h and radius r, capped at each end by a hemisphere of radius r.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Identify exposed surfaces:",
          "latex": "\\text{Curved surface of cylinder} + \\text{Curved surfaces of TWO hemispheres}",
          "justification": "The circular flat ends of the cylinder are sealed inside the capsule."
        },
        {
          "stepNumber": 2,
          "statement": "Combine hemispherical curved surfaces:",
          "latex": "2\\pi r^2 + 2\\pi r^2 = 4\\pi r^2 \\quad (\\text{equivalent to 1 complete sphere})",
          "justification": "Two identical hemispheres form one complete sphere."
        },
        {
          "stepNumber": 3,
          "statement": "Add cylinder CSA:",
          "latex": "\\text{TSA} = 2\\pi r h + 4\\pi r^2 = 2\\pi r(h + 2r)",
          "justification": "Sum of exposed surfaces."
        },
        {
          "stepNumber": 4,
          "statement": "Add volumes:",
          "latex": "V = \\pi r^2 h + \\frac{4}{3}\\pi r^3",
          "justification": "Volume of cylinder plus volume of complete sphere."
        }
      ],
      "finalFormulaLatex": "\\text{TSA} = 2\\pi r(h + 2r), \\quad V = \\pi r^2 \\left(h + \\frac{4}{3}r\\right)",
      "conclusion": "The capsule equations are derived."
    },
    "memoryLab": [
      {
        "title": "Cone Height vs Total Height Trap",
        "mnemonic": "Cone Height = Total Height - Radius!",
        "meaning": "In a toy of total height H = 15.5 cm and radius r = 3.5 cm, the cone height h is 15.5 - 3.5 = 12 cm!",
        "boardExamTip": "Do NOT use 15.5 as the cone height! You must subtract the hemisphere radius 3.5 cm first!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch12-1",
        "title": "Solving Cone on Hemisphere Toy Problem (SSC Board Pattern)",
        "problemStatement": "A toy is in the form of a cone of radius 3.5 cm mounted on a hemisphere of same radius. The total height of the toy is 15.5 cm. Find the total surface area of the toy (use π = 22/7).",
        "given": [
          "Radius r = 3.5 cm = 7/2 cm",
          "Total height H = 15.5 cm",
          "π = 22/7"
        ],
        "toFind": "Total surface area of toy",
        "strategy": "Find cone height h = 15.5 - 3.5 = 12 cm, calculate slant height l, then TSA = πrl + 2πr².",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find cone height h",
            "latex": "h = 15.5 - 3.5 = 12 \\text{ cm}",
            "explanation": "Subtract hemisphere radius from total height."
          },
          {
            "stepNumber": 2,
            "title": "Calculate slant height l",
            "latex": "l = \\sqrt{r^2 + h^2} = \\sqrt{(3.5)^2 + 12^2} = \\sqrt{12.25 + 144} = \\sqrt{156.25} = 12.5 \\text{ cm}",
            "explanation": "Pythagoras theorem on cone."
          },
          {
            "stepNumber": 3,
            "title": "Calculate TSA",
            "latex": "\\text{TSA} = \\pi r l + 2\\pi r^2 = \\pi r(l + 2r) = \\frac{22}{7} \\times \\frac{7}{2} \\times [12.5 + 2(3.5)] = 11 \\times [12.5 + 7] = 11 \\times 19.5 = 214.5 \\text{ cm}^2",
            "explanation": "Substitute values."
          }
        ],
        "commonMistake": "Adding the flat circular base area πr² into the total surface area.",
        "sanityCheck": "214.5 cm² is the verified official answer in the AP SCERT textbook!"
      },
      {
        "id": "we-c10-ch12-2",
        "title": "Volume and Surface Area of a Combined Solid Toy",
        "problemStatement": "A solid toy is in the form of a hemisphere surmounted by a right circular cone. The height of the cone is 2 cm and the diameter of the base is 4 cm. Determine the volume of the toy. (Take π = 3.14).",
        "given": [
          "Diameter of common base = 4 cm => Radius r = 2 cm",
          "Height of cone h = 2 cm",
          "π = 3.14"
        ],
        "toFind": "Total volume of the toy",
        "strategy": "Total volume = Volume of hemisphere + Volume of cone.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Volume of hemisphere",
            "latex": "V_{\\text{hemisphere}} = \\frac{2}{3} \\pi r^3 = \\frac{2}{3} \\times 3.14 \\times 2^3 = \\frac{50.24}{3} \\approx 16.75\\text{ cm}^3",
            "explanation": "Hemisphere volume is (2/3) π r³."
          },
          {
            "stepNumber": 2,
            "title": "Volume of cone",
            "latex": "V_{\\text{cone}} = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 2^2 \\times 2 = \\frac{25.12}{3} \\approx 8.37\\text{ cm}^3",
            "explanation": "Cone volume is (1/3) π r² h."
          },
          {
            "stepNumber": 3,
            "title": "Total volume",
            "latex": "V_{\\text{total}} = \\frac{50.24 + 25.12}{3} = \\frac{75.36}{3} = 25.12\\text{ cm}^3",
            "explanation": "Sum the two partial volumes."
          }
        ],
        "commonMistake": "Using 4 cm as radius instead of halving the diameter to get r = 2 cm.",
        "sanityCheck": "Factoring: (1/3) π r² (2r + h) = (1/3)(3.14)(4)(4 + 2) = (1/3)(12.56)(6) = 25.12 cm³. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "Always draw a composite sketch and write down constituent dimensions before calculating.",
      "Slant height l must be calculated using cone height h, not total solid height."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch12-1",
        "type": "numerical",
        "prompt": "A solid is in the shape of a cone standing on a hemisphere with both their radii being equal to 1 cm and the height of the cone is equal to its radius (1 cm). Find the volume of the solid in terms of π (i.e. find V / π).",
        "correctAnswer": 1,
        "tolerance": 0,
        "hints": [
          "V_cone = 1/3 π r² h = 1/3 π (1)³ = 1/3 π.",
          "V_hemi = 2/3 π r³ = 2/3 π (1)³ = 2/3 π.",
          "Total V = 1/3 π + 2/3 π = 1π."
        ],
        "explanation": "Total Volume = 1/3 π + 2/3 π = 1π. Value is 1.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch12-2",
        "type": "numerical",
        "prompt": "If 2 cubes each of volume 64 cm³ are joined end to end, find the surface area of the resulting cuboid in cm².",
        "correctAnswer": 160,
        "tolerance": 0,
        "hints": [
          "Edge of cube a = ∛64 = 4 cm.",
          "Resulting cuboid has l = 8 cm, b = 4 cm, h = 4 cm.",
          "TSA = 2(lb + bh + hl) = 2(32 + 16 + 32) = 2(80) = 160 cm²."
        ],
        "explanation": "a = 4 cm. Cuboid dimensions: 8 × 4 × 4 cm. TSA = 2(32 + 16 + 32) = 160 cm².",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c10-ch12-3",
        "type": "mcq",
        "prompt": "When a cone is mounted on a hemisphere of identical radius r, the total surface area is:",
        "options": [
          "πrl + 2πr²",
          "πrl + 3πr²",
          "1/3 πr²h + 2/3 πr³",
          "2πrl + πr²"
        ],
        "correctAnswer": "πrl + 2πr²",
        "hints": [
          "Curved surface of cone (πrl) + curved surface of hemisphere (2πr²). The contact base is internal."
        ],
        "explanation": "Only the two curved surfaces are exposed: πrl + 2πr².",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Combined surface area = sum of visible curved/flat outer faces only.",
        "Internal joining faces are excluded from TSA.",
        "Total volume = sum of individual component volumes.",
        "Cone height h = total height - hemisphere radius."
      ],
      "commonTraps": [
        "Including internal contact faces in surface area calculations."
      ]
    },
    "labId": "cylinder-net",
    "labTitle": "Surface Areas and Volumes"
  },
  {
    "id": "c10-s2-ch13",
    "classGrade": 10,
    "semester": 2,
    "chapterNumber": 13,
    "title": "Statistics",
    "shortDescription": "Master grouped mean (Direct, Assumed Mean, Step-Deviation), mode of grouped data, median of grouped data, and empirical relationship.",
    "whyItMatters": "Biostatistics, national census economic demographics, machine learning data normalisation, and actuarial insurance risk models rely on central tendency statistics.",
    "priorKnowledge": [
      "Class intervals, frequencies, and class marks",
      "Cumulative frequency distribution",
      "Basic arithmetic operations and summation notation"
    ],
    "vocabulary": [
      {
        "term": "Modal Class",
        "definition": "The class interval having the highest frequency in a grouped frequency distribution."
      },
      {
        "term": "Median Class",
        "definition": "The class interval whose cumulative frequency is greater than or equal to n/2."
      },
      {
        "term": "Assumed Mean (a)",
        "definition": "A chosen central value of class marks x_i used to reduce arithmetic magnitude in computing the mean."
      },
      {
        "term": "Step-Deviation",
        "definition": "Transformed deviation u_i = (x_i - a) / h dividing deviations by class size h."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-ch13-mean-methods",
        "name": "Three Methods for Mean of Grouped Data",
        "latex": "\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i} = a + \\frac{\\sum f_i d_i}{\\sum f_i} = a + \\left( \\frac{\\sum f_i u_i}{\\sum f_i} \\right) h",
        "description": "Direct Method, Assumed Mean Method (d_i = x_i - a), and Step-Deviation Method (u_i = (x_i - a)/h). All three yield identical answers.",
        "variables": [
          {
            "symbol": "\\bar{x}",
            "meaning": "Arithmetic mean"
          },
          {
            "symbol": "a",
            "meaning": "Assumed mean"
          },
          {
            "symbol": "h",
            "meaning": "Class size (width)"
          },
          {
            "symbol": "f_i, x_i",
            "meaning": "Frequencies and class marks"
          }
        ],
        "chapterId": "c10-s2-ch13",
        "classGrade": 10,
        "category": "Statistics & Probability",
        "conditions": "Step-deviation requires equal class width h.",
        "whenToUse": "Step-deviation significantly simplifies arithmetic when numbers are large.",
        "workedExample": {
          "problem": "Find mean if a = 50, h = 10, ∑f_i = 100, and ∑f_i u_i = 15",
          "solution": "x̄ = 50 + (15/100) × 10 = 50 + 1.5 = 51.5."
        }
      },
      {
        "id": "f-c10-ch13-mode",
        "name": "Mode of Grouped Data Formula",
        "latex": "\\text{Mode} = l + \\left( \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\right) \\times h",
        "description": "Computes mode from the modal class having maximum frequency.",
        "variables": [
          {
            "symbol": "l",
            "meaning": "Lower limit of modal class"
          },
          {
            "symbol": "h",
            "meaning": "Class size"
          },
          {
            "symbol": "f_1",
            "meaning": "Frequency of modal class"
          },
          {
            "symbol": "f_0",
            "meaning": "Frequency of class PRECEDING modal class"
          },
          {
            "symbol": "f_2",
            "meaning": "Frequency of class SUCCEEDING modal class"
          }
        ],
        "chapterId": "c10-s2-ch13",
        "classGrade": 10,
        "category": "Statistics & Probability",
        "conditions": "Modal class must be uniquely identified by max frequency.",
        "whenToUse": "Finding the most frequent value in grouped data.",
        "mnemonic": "10 over 102: (f1 - f0) / (2f1 - f0 - f2)!"
      },
      {
        "id": "f-c10-ch13-median",
        "name": "Median of Grouped Data Formula",
        "latex": "\\text{Median} = l + \\left( \\frac{\\frac{n}{2} - cf}{f} \\right) \\times h",
        "description": "Computes median from the median class whose cumulative frequency exceeds n/2.",
        "variables": [
          {
            "symbol": "l",
            "meaning": "Lower limit of median class"
          },
          {
            "symbol": "n",
            "meaning": "Total frequency: ∑f_i"
          },
          {
            "symbol": "cf",
            "meaning": "Cumulative frequency of class PRECEDING median class"
          },
          {
            "symbol": "f",
            "meaning": "Frequency of median class itself"
          },
          {
            "symbol": "h",
            "meaning": "Class size"
          }
        ],
        "chapterId": "c10-s2-ch13",
        "classGrade": 10,
        "category": "Statistics & Probability",
        "conditions": "Continuous class intervals.",
        "whenToUse": "Finding middle 50% value of grouped frequency distribution.",
        "mnemonic": "Remember: cf is from the PREVIOUS class, f is from the CURRENT class!"
      },
      {
        "id": "f-c10-ch13-empirical",
        "name": "Empirical Relationship of Central Tendency",
        "latex": "3 \\text{ Median} = \\text{Mode} + 2 \\text{ Mean} \\iff \\text{Mode} = 3 \\text{ Median} - 2 \\text{ Mean}",
        "description": "Karl Pearson empirical approximation relating the three measures of central tendency for moderately skewed distributions.",
        "variables": [
          {
            "symbol": "Mean, Median, Mode",
            "meaning": "Measures of central tendency"
          }
        ],
        "chapterId": "c10-s2-ch13",
        "classGrade": 10,
        "category": "Statistics & Probability",
        "conditions": "Moderately skewed unimodal distribution.",
        "whenToUse": "Finding the third measure when any two are known.",
        "workedExample": {
          "problem": "If Mean = 24 and Median = 25, find Mode",
          "solution": "Mode = 3(25) - 2(24) = 75 - 48 = 27."
        },
        "mnemonic": "3 Medians = 1 Mode + 2 Means!"
      }
    ],
    "derivation": {
      "title": "Deduction of Step-Deviation Mean from Direct Mean Formula",
      "targetFormula": "\\bar{x} = a + \\left(\\frac{\\sum f_i u_i}{\\sum f_i}\\right)h",
      "objective": "Prove that the step-deviation formula is algebraically identical to the direct mean formula.",
      "startingObservation": "Let u_i = (x_i - a) / h. Then x_i = a + h u_i.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Substitute x_i into direct mean formula:",
          "latex": "\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i} = \\frac{\\sum f_i (a + h u_i)}{\\sum f_i}",
          "justification": "Substitution of linear transformation."
        },
        {
          "stepNumber": 2,
          "statement": "Distribute summation over addition:",
          "latex": "\\bar{x} = \\frac{\\sum f_i a + \\sum f_i h u_i}{\\sum f_i} = \\frac{a \\sum f_i + h \\sum f_i u_i}{\\sum f_i}",
          "justification": "Constants a and h factor out of summation."
        },
        {
          "stepNumber": 3,
          "statement": "Split the fraction:",
          "latex": "\\bar{x} = \\frac{a \\sum f_i}{\\sum f_i} + \\frac{h \\sum f_i u_i}{\\sum f_i} = a + \\left(\\frac{\\sum f_i u_i}{\\sum f_i}\\right)h",
          "justification": "Sum of f_i cancels in the first term."
        }
      ],
      "finalFormulaLatex": "\\bar{x} = a + \\left(\\frac{\\sum f_i u_i}{\\sum f_i}\\right)h",
      "conclusion": "The step-deviation method yields the exact identical value as the direct mean with vastly simpler arithmetic."
    },
    "memoryLab": [
      {
        "title": "Empirical Formula Mnemonic",
        "mnemonic": "Three Medians minus Two Means gives Mode!",
        "meaning": "Mode = 3 Median - 2 Mean. 3 letters in Med > 2 in Mean!",
        "boardExamTip": "Guaranteed 1-mark question in AP SSC Board Exams!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-ch13-1",
        "title": "Calculating Mode of Grouped Data (Board Exam Pattern)",
        "problemStatement": "The marks distribution of 30 students is: 10-25 (2), 25-40 (3), 40-55 (7), 55-70 (6), 70-85 (6), 85-100 (6). Find the mode of the data.",
        "given": [
          "Interval with max frequency = 40-55 (f = 7)",
          "l = 40, h = 15",
          "f1 = 7, f0 = 3, f2 = 6"
        ],
        "toFind": "Mode",
        "strategy": "Identify modal class 40-55, then substitute into Mode = l + [(f1 - f0) / (2f1 - f0 - f2)] × h.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Identify parameters",
            "latex": "l = 40, \\quad f_1 = 7, \\quad f_0 = 3, \\quad f_2 = 6, \\quad h = 15",
            "explanation": "From frequency table."
          },
          {
            "stepNumber": 2,
            "title": "Substitute into formula",
            "latex": "\\text{Mode} = 40 + \\left(\\frac{7 - 3}{2(7) - 3 - 6}\\right) \\times 15 = 40 + \\left(\\frac{4}{14 - 9}\\right) \\times 15",
            "explanation": "Direct formula substitution."
          },
          {
            "stepNumber": 3,
            "title": "Compute final mode",
            "latex": "\\text{Mode} = 40 + \\left(\\frac{4}{5}\\right) \\times 15 = 40 + 4(3) = 40 + 12 = 52",
            "explanation": "Arithmetic simplification."
          }
        ],
        "commonMistake": "Taking f0 as the frequency of the modal class instead of f1.",
        "sanityCheck": "Mode = 52 lies neatly inside the modal class 40-55. Verified!"
      },
      {
        "id": "we-c10-ch13-2",
        "title": "Finding Missing Frequencies Given Median",
        "problemStatement": "The median of 60 observations is 28.5. The classes are 0-10, 10-20, 20-30, 30-40, 40-50, 50-60 with frequencies 5, x, 20, 15, y, 5. Find the values of x and y.",
        "given": [
          "Total frequency N = 60",
          "Median = 28.5",
          "Frequencies: 5, x, 20, 15, y, 5"
        ],
        "toFind": "Unknown frequencies x and y",
        "strategy": "Sum frequencies to get first equation x + y = 15. Identify median class 20-30 (since median 28.5 lies in it) and use median formula to find x.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "First equation from total frequency",
            "latex": "5 + x + 20 + 15 + y + 5 = 60 \\implies 45 + x + y = 60 \\implies x + y = 15",
            "explanation": "The sum of all frequencies equals N = 60."
          },
          {
            "stepNumber": 2,
            "title": "Identify median class",
            "latex": "\\text{Median } 28.5 \\in [20, 30] \\implies l = 20, \\quad h = 10, \\quad f = 20, \\quad cf = 5 + x",
            "explanation": "Median class parameters."
          },
          {
            "stepNumber": 3,
            "title": "Apply median formula to solve for x",
            "latex": "28.5 = 20 + \\left(\\frac{30 - (5 + x)}{20}\\right) \\times 10 \\implies 8.5 = \\frac{25 - x}{2} \\implies 17 = 25 - x \\implies x = 8",
            "explanation": "Solve linear equation for x."
          },
          {
            "stepNumber": 4,
            "title": "Calculate y",
            "latex": "x + y = 15 \\implies 8 + y = 15 \\implies y = 7",
            "explanation": "Substitute x = 8 into equation 1."
          }
        ],
        "commonMistake": "Selecting median class by N/2 = 30 instead of checking which interval contains the given median value 28.5.",
        "sanityCheck": "Total = 5 + 8 + 20 + 15 + 7 + 5 = 60. Check median: 20 + ((30 - 13)/20) * 10 = 20 + 8.5 = 28.5. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "In median calculations, always construct the cumulative frequency (cf) column first.",
      "Check that the calculated median and mode lie strictly inside the boundaries of the median class and modal class respectively."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-ch13-1",
        "type": "numerical",
        "prompt": "If the mean of a data is 28 and the median is 30, find the mode using the empirical relationship.",
        "correctAnswer": 34,
        "tolerance": 0,
        "hints": [
          "Mode = 3 Median - 2 Mean = 3(30) - 2(28) = 90 - 56."
        ],
        "explanation": "Mode = 90 - 56 = 34.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch13-2",
        "type": "mcq",
        "prompt": "Which measure of central tendency can be determined graphically from cumulative frequency curves (ogives)?",
        "options": [
          "Mean",
          "Median",
          "Mode",
          "Geometric Mean"
        ],
        "correctAnswer": "Median",
        "hints": [
          "The x-coordinate of intersection of less-than and more-than ogives gives the median."
        ],
        "explanation": "Median is obtained graphically from the ogive curves at n/2.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-ch13-3",
        "type": "numerical",
        "prompt": "In a frequency distribution, if modal class is 60-80 with l = 60, f1 = 12, f0 = 10, f2 = 6, and h = 20, find the mode.",
        "correctAnswer": 65,
        "tolerance": 0.1,
        "hints": [
          "Mode = 60 + [(12 - 10) / (24 - 10 - 6)] × 20 = 60 + [2 / 8] × 20 = 60 + 5."
        ],
        "explanation": "Mode = 60 + 5 = 65.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Mean: Step-deviation x̄ = a + [(∑f_i u_i)/(∑f_i)] h.",
        "Mode = l + [(f1 - f0)/(2f1 - f0 - f2)] × h.",
        "Median = l + [(n/2 - cf)/f] × h.",
        "Empirical relation: 3 Median = Mode + 2 Mean."
      ],
      "commonTraps": [
        "Taking cf from the median class instead of the PRECEDING class.",
        "Subtracting limits in reverse when computing class size h."
      ]
    },
    "labId": "statistics-lab",
    "labTitle": "Statistics"
  },
  {
    "id": "c10-s2-prob",
    "classGrade": 10,
    "semester": 2,
    "chapterNumber": 14,
    "title": "Probability",
    "shortDescription": "Master classical probability P(E) = n(E)/n(S), impossible & sure events, complementary events, and playing card sample spaces.",
    "whyItMatters": "Probability underpins weather forecast predictions, AI neural network classification loss, insurance actuarial underwriting, and quantum mechanics.",
    "priorKnowledge": [
      "Basic fractions, percentages, and proportions",
      "Equally likely outcomes concept",
      "Sample space of a coin and a die"
    ],
    "vocabulary": [
      {
        "term": "Theoretical Probability",
        "definition": "P(E) = (Number of outcomes favorable to E) / (Number of all possible outcomes of the experiment)."
      },
      {
        "term": "Elementary Event",
        "definition": "An event having only one single outcome of the experiment."
      },
      {
        "term": "Complementary Event",
        "definition": "The event \"not E\", denoted by Ē; P(Ē) = 1 - P(E)."
      },
      {
        "term": "Sure / Certain Event",
        "definition": "An event that is guaranteed to occur; its probability is strictly 1."
      },
      {
        "term": "Impossible Event",
        "definition": "An event that cannot possibly occur; its probability is strictly 0."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c10-prob-def",
        "name": "Theoretical Classical Probability Definition",
        "latex": "P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{Number of outcomes favorable to } E}{\\text{Total number of all possible outcomes}}",
        "description": "Classical probability formula assuming all outcomes in sample space S are equally likely.",
        "variables": [
          {
            "symbol": "n(E)",
            "meaning": "Count of favorable outcomes"
          },
          {
            "symbol": "n(S)",
            "meaning": "Total sample space size"
          }
        ],
        "chapterId": "c10-s2-prob",
        "classGrade": 10,
        "category": "Statistics & Probability",
        "conditions": "All outcomes must be equally likely; 0 ≤ P(E) ≤ 1.",
        "whenToUse": "All basic probability calculations.",
        "workedExample": {
          "problem": "Find probability of getting a prime number on throwing a die",
          "solution": "S = {1, 2, 3, 4, 5, 6} => n(S) = 6. Primes E = {2, 3, 5} => n(E) = 3. P(E) = 3/6 = 1/2."
        }
      },
      {
        "id": "f-c10-prob-comp",
        "name": "Complementary Event Rule",
        "latex": "P(\\bar{E}) = 1 - P(E) \\iff P(E) + P(\\bar{E}) = 1",
        "description": "The probability of an event NOT happening is 1 minus the probability of it happening.",
        "variables": [
          {
            "symbol": "P(\\bar{E})",
            "meaning": "Probability of complement (not E)"
          }
        ],
        "chapterId": "c10-s2-prob",
        "classGrade": 10,
        "category": "Statistics & Probability",
        "conditions": "E and Ē partition the entire sample space.",
        "whenToUse": "When \"not E\" is easier to compute than E directly.",
        "workedExample": {
          "problem": "If P(E) = 0.05, find P(not E)",
          "solution": "P(not E) = 1 - 0.05 = 0.95."
        },
        "mnemonic": "P(Yes) + P(No) = 1!"
      },
      {
        "id": "f-c10-prob-bounds",
        "name": "Probability Bounds and Certainty",
        "latex": "0 \\le P(E) \\le 1, \\quad P(\\emptyset) = 0, \\quad P(S) = 1",
        "description": "Probability is strictly bounded between 0 and 1 inclusive; cannot be negative or > 1.",
        "variables": [
          {
            "symbol": "P(E)",
            "meaning": "Probability of any event"
          }
        ],
        "chapterId": "c10-s2-prob",
        "classGrade": 10,
        "category": "Statistics & Probability",
        "conditions": "True for every probability measure.",
        "whenToUse": "Sanity checking answers."
      },
      {
        "id": "f-c10-prob-cards",
        "name": "Standard 52-Card Deck Sample Space Breakdown",
        "latex": "n(S) = 52: \\quad 26 \\text{ Red } (13 \\heartsuit, 13 \\diamondsuit), \\quad 26 \\text{ Black } (13 \\spadesuit, 13 \\clubsuit), \\quad 12 \\text{ Face Cards (4J, 4Q, 4K)}",
        "description": "Authoritative distribution of standard 52 playing cards: 4 suits of 13 cards each, 12 face cards, 4 aces.",
        "variables": [
          {
            "symbol": "52",
            "meaning": "Total deck size"
          },
          {
            "symbol": "12",
            "meaning": "Total face cards (Jacks, Queens, Kings)"
          },
          {
            "symbol": "4",
            "meaning": "Total Aces (Aces are NOT face cards!)"
          }
        ],
        "chapterId": "c10-s2-prob",
        "classGrade": 10,
        "category": "Statistics & Probability",
        "conditions": "Full well-shuffled standard pack.",
        "whenToUse": "All playing card probability questions in Board exams."
      }
    ],
    "derivation": {
      "title": "Proof that the Sum of Probabilities of All Elementary Events is 1",
      "targetFormula": "\\sum_{i=1}^k P(E_i) = 1",
      "objective": "Prove that summing probabilities over all mutually exclusive elementary outcomes equals unity.",
      "startingObservation": "Let sample space S consist of k mutually exclusive elementary outcomes: S = {e₁, e₂, ..., e_k}.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Express probability of each elementary event:",
          "latex": "P(E_i) = \\frac{1}{k} \\quad (\\text{for each } i = 1, 2, \\dots, k)",
          "justification": "By definition of equally likely outcomes."
        },
        {
          "stepNumber": 2,
          "statement": "Sum all k probabilities:",
          "latex": "\\sum_{i=1}^k P(E_i) = P(E_1) + P(E_2) + \\dots + P(E_k) = \\frac{1}{k} + \\frac{1}{k} + \\dots + \\frac{1}{k} \\quad (k \\text{ times})",
          "justification": "Addition of k identical terms."
        },
        {
          "stepNumber": 3,
          "statement": "Evaluate the sum:",
          "latex": "\\sum_{i=1}^k P(E_i) = k \\times \\frac{1}{k} = 1",
          "justification": "Multiplication by reciprocal."
        }
      ],
      "finalFormulaLatex": "\\sum_{i=1}^k P(E_i) = 1",
      "conclusion": "The total probability of the entire sample space is strictly 1."
    },
    "memoryLab": [
      {
        "title": "Ace is NOT a Face Card Trap",
        "mnemonic": "Faces have Eyes: J, Q, K only! Aces have NO face!",
        "meaning": "There are only 12 face cards in a deck (4 Jacks, 4 Queens, 4 Kings). Aces are NOT face cards.",
        "boardExamTip": "P(Face card) = 12/52 = 3/13. P(Ace) = 4/52 = 1/13."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c10-prob-1",
        "title": "Comprehensive Playing Cards Probability",
        "problemStatement": "One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting: (i) a king of red colour, (ii) a face card, (iii) a spade.",
        "given": [
          "Total cards n(S) = 52"
        ],
        "toFind": "Probabilities of (i), (ii), and (iii)",
        "strategy": "Count favorable outcomes for each and divide by 52.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "King of red colour",
            "latex": "n(E_1) = 2 \\quad (\\text{King of Hearts, King of Diamonds}) \\implies P(E_1) = \\frac{2}{52} = \\frac{1}{26}",
            "explanation": "2 red kings in deck."
          },
          {
            "stepNumber": 2,
            "title": "A face card",
            "latex": "n(E_2) = 12 \\quad (4J + 4Q + 4K) \\implies P(E_2) = \\frac{12}{52} = \\frac{3}{13}",
            "explanation": "12 face cards in total."
          },
          {
            "stepNumber": 3,
            "title": "A spade",
            "latex": "n(E_3) = 13 \\quad (\\text{all 13 spade cards}) \\implies P(E_3) = \\frac{13}{52} = \\frac{1}{4}",
            "explanation": "13 cards per suit."
          }
        ],
        "commonMistake": "Counting Aces as face cards (which would give 16/52).",
        "sanityCheck": "All probabilities lie strictly between 0 and 1. Verified!"
      },
      {
        "id": "we-c10-prob-2",
        "title": "Playing Cards Probability (Face Cards, Honors, Non-Face)",
        "problemStatement": "One card is drawn from a well-shuffled deck of 52 playing cards. Find the probability of getting: (i) a king of red color, (ii) a face card, (iii) neither a king nor a queen.",
        "given": [
          "Standard deck of 52 cards"
        ],
        "toFind": "Probabilities of events (i), (ii), and (iii)",
        "strategy": "Apply P(E) = n(E) / n(S) where total sample space n(S) = 52.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "King of red color",
            "latex": "n(\\text{Red Kings}) = 2 \\implies P = \\frac{2}{52} = \\frac{1}{26}",
            "explanation": "Red suits are Hearts and Diamonds, each having 1 king."
          },
          {
            "stepNumber": 2,
            "title": "Face card",
            "latex": "n(\\text{Face cards}) = 4 \\times 3 = 12 \\implies P = \\frac{12}{52} = \\frac{3}{13}",
            "explanation": "Each of the 4 suits has 3 face cards (Jack, Queen, King). Note: Aces are NOT face cards!"
          },
          {
            "stepNumber": 3,
            "title": "Neither a king nor a queen",
            "latex": "n(\\text{Kings + Queens}) = 4 + 4 = 8 \\implies n(\\text{Neither}) = 52 - 8 = 44 \\implies P = \\frac{44}{52} = \\frac{11}{13}",
            "explanation": "Subtract the 8 kings and queens from 52."
          }
        ],
        "commonMistake": "Counting Aces as face cards (Aces are honor cards, not face cards; only J, Q, K have pictures/faces).",
        "sanityCheck": "Sum of P(Kings or Queens = 8/52 = 2/13) + P(Neither = 11/13) = 13/13 = 1. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "For 2 dice problems, always visualise the 6 × 6 = 36 outcome grid (1,1) through (6,6).",
      "For 2 coins, S = {HH, HT, TH, TT} (4 outcomes). For 3 coins, S has 2³ = 8 outcomes."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c10-prob-1",
        "type": "numerical",
        "prompt": "If P(E) = 0.05, what is the probability of \"not E\"?",
        "correctAnswer": 0.95,
        "tolerance": 0,
        "hints": [
          "P(not E) = 1 - P(E) = 1 - 0.05."
        ],
        "explanation": "1 - 0.05 = 0.95.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-prob-2",
        "type": "mcq",
        "prompt": "Which of the following CANNOT be the probability of an event?",
        "options": [
          "2/3",
          "-1.5",
          "15%",
          "0.7"
        ],
        "correctAnswer": "-1.5",
        "hints": [
          "Probability of an event can never be negative (0 ≤ P ≤ 1)."
        ],
        "explanation": "Probability cannot be negative (-1.5).",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c10-prob-3",
        "type": "numerical",
        "prompt": "Two dice are thrown together. What is the probability of getting a doublet (both dice showing the same number)? (Express as a decimal rounded to 2 places).",
        "correctAnswer": 0.17,
        "tolerance": 0.02,
        "hints": [
          "Doublets are (1,1), (2,2), (3,3), (4,4), (5,5), (6,6) => 6 outcomes.",
          "Total outcomes = 36. P = 6/36 = 1/6 ≈ 0.167."
        ],
        "explanation": "6 / 36 = 1/6 ≈ 0.17.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "P(E) = favorable / total.",
        "0 ≤ P(E) ≤ 1.",
        "P(E) + P(not E) = 1.",
        "52 cards: 26 red, 26 black, 12 face cards, 4 aces."
      ],
      "commonTraps": [
        "Counting ace as a face card.",
        "Writing probability greater than 1 or negative."
      ]
    },
    "labId": "probability-sim",
    "labTitle": "Probability"
  }
];
