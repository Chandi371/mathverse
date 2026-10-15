import type { Chapter } from '../../types/curriculum';

export const class9Chapters: Chapter[] = [
  {
    "id": "c9-s1-ch1",
    "classGrade": 9,
    "semester": 1,
    "chapterNumber": 1,
    "title": "Number Systems",
    "shortDescription": "Explore real numbers, irrational numbers, decimal expansions, surds, and laws of integral & rational exponents.",
    "whyItMatters": "Every measurement in engineering, science, and computer graphics relies on the real number continuum and exact decimal vs fractional representations.",
    "priorKnowledge": [
      "Natural numbers, whole numbers, and integers",
      "Basic fractions, numerator/denominator concepts",
      "Prime factorisation of composite integers",
      "Basic laws of integral exponents"
    ],
    "vocabulary": [
      {
        "term": "Rational Number (ℚ)",
        "definition": "A number that can be expressed as p/q where p and q are integers and q ≠ 0."
      },
      {
        "term": "Irrational Number",
        "definition": "A real number that cannot be expressed as p/q; its decimal expansion is non-terminating and non-recurring (e.g. √2, π)."
      },
      {
        "term": "Terminating Decimal",
        "definition": "A decimal expansion whose fractional part ends in finite digits, occurring if and only if prime factors of denominator in simplest form are only 2 and/or 5."
      },
      {
        "term": "Non-terminating Recurring Decimal",
        "definition": "A decimal where a digit or block of digits repeats infinitely, always representing a rational number."
      },
      {
        "term": "Rationalising Factor",
        "definition": "An expression multiplied with an irrational surd to make the product rational (e.g. (a - √b) rationalises (a + √b))."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch1-exp-prod",
        "name": "Laws of Exponents: Product Rule",
        "latex": "a^m \\cdot a^n = a^{m+n}",
        "description": "Multiplying identical non-zero bases adds their exponent powers.",
        "variables": [
          {
            "symbol": "a",
            "meaning": "Base (real number, a > 0)"
          },
          {
            "symbol": "m, n",
            "meaning": "Rational powers"
          }
        ],
        "chapterId": "c9-s1-ch1",
        "classGrade": 9,
        "category": "Number Systems",
        "conditions": "Base a > 0; for integral exponents, a ≠ 0.",
        "whenToUse": "Multiplying two terms that share the exact same base.",
        "workedExample": {
          "problem": "Simplify 2^{2/3} · 2^{1/3}",
          "solution": "Apply product rule: 2^{2/3 + 1/3} = 2^{3/3} = 2^1 = 2."
        },
        "mnemonic": "Same base multiplying? Just add the exponents together!"
      },
      {
        "id": "f-c9-ch1-exp-quot",
        "name": "Laws of Exponents: Quotient Rule",
        "latex": "\\frac{a^m}{a^n} = a^{m-n}",
        "description": "Dividing identical bases subtracts the denominator exponent from the numerator exponent.",
        "variables": [
          {
            "symbol": "a",
            "meaning": "Base (real number, a > 0)"
          },
          {
            "symbol": "m, n",
            "meaning": "Rational powers"
          }
        ],
        "chapterId": "c9-s1-ch1",
        "classGrade": 9,
        "category": "Number Systems",
        "conditions": "Base a > 0.",
        "whenToUse": "Dividing powers with identical bases.",
        "workedExample": {
          "problem": "Simplify 7^{1/2} / 7^{1/4}",
          "solution": "Subtract exponents: 7^{1/2 - 1/4} = 7^{2/4 - 1/4} = 7^{1/4}."
        }
      },
      {
        "id": "f-c9-ch1-exp-power",
        "name": "Laws of Exponents: Power of a Power",
        "latex": "(a^m)^n = a^{mn}",
        "description": "Raising an exponential term to another power multiplies the exponents.",
        "variables": [
          {
            "symbol": "a",
            "meaning": "Base (real number, a > 0)"
          },
          {
            "symbol": "m, n",
            "meaning": "Exponents"
          }
        ],
        "chapterId": "c9-s1-ch1",
        "classGrade": 9,
        "category": "Number Systems",
        "conditions": "Base a > 0.",
        "whenToUse": "Expressions nested within multiple brackets with powers.",
        "workedExample": {
          "problem": "Simplify (3^{1/3})^4",
          "solution": "Multiply powers: 3^{(1/3) × 4} = 3^{4/3}."
        }
      },
      {
        "id": "f-c9-ch1-diff-sq-surd",
        "name": "Conjugate Surd Rationalisation Identity",
        "latex": "(\\sqrt{a} + \\sqrt{b})(\\sqrt{a} - \\sqrt{b}) = a - b",
        "description": "Eliminates square root surds in denominators by the difference of two squares identity.",
        "variables": [
          {
            "symbol": "a, b",
            "meaning": "Non-negative real numbers (a, b ≥ 0)"
          }
        ],
        "chapterId": "c9-s1-ch1",
        "classGrade": 9,
        "category": "Number Systems",
        "conditions": "a ≥ 0, b ≥ 0, a ≠ b.",
        "whenToUse": "Rationalising two-term radical surds in denominators.",
        "workedExample": {
          "problem": "Evaluate (√5 + √2)(√5 - √2)",
          "solution": "(√5)² - (√2)² = 5 - 2 = 3."
        },
        "labId": "area-model"
      },
      {
        "id": "f-c9-ch1-rec-decimal",
        "name": "Pure Recurring Decimal Fraction Conversion",
        "latex": "0.\\bar{p} = \\frac{p}{9}, \\quad 0.\\overline{pq} = \\frac{pq}{99}",
        "description": "Converts infinite repeating decimal periods into equivalent fractional rational p/q representations.",
        "variables": [
          {
            "symbol": "p, q",
            "meaning": "Repeating decimal digits (0 to 9)"
          }
        ],
        "chapterId": "c9-s1-ch1",
        "classGrade": 9,
        "category": "Number Systems",
        "conditions": "Denominator consists of as many 9s as there are repeating digits in the recurring period.",
        "whenToUse": "Converting repeating non-terminating decimals into p/q form.",
        "workedExample": {
          "problem": "Express 0.444... in p/q form",
          "solution": "Repeating period is 4 (one digit). Hence 0.444... = 4/9."
        }
      }
    ],
    "derivation": {
      "title": "Irrationality Proof of √2 by Contradiction",
      "targetFormula": "\\sqrt{2} \\notin \\mathbb{Q}",
      "objective": "Prove that √2 cannot be expressed as a ratio of two co-prime integers p/q.",
      "startingObservation": "Assume the opposite: suppose √2 is rational, so √2 = p/q in lowest terms where gcd(p, q) = 1.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Square both sides of √2 = p/q:",
          "latex": "2 = \\frac{p^2}{q^2} \\implies p^2 = 2q^2",
          "justification": "Squaring equality preserves balance."
        },
        {
          "stepNumber": 2,
          "statement": "Deduce that p is even:",
          "latex": "2 \\mid p^2 \\implies 2 \\mid p \\implies p = 2k",
          "justification": "If the square of an integer is even, the integer itself must be even."
        },
        {
          "stepNumber": 3,
          "statement": "Substitute p = 2k back into the equation:",
          "latex": "(2k)^2 = 2q^2 \\implies 4k^2 = 2q^2 \\implies q^2 = 2k^2",
          "justification": "Algebraic substitution and division by 2."
        },
        {
          "stepNumber": 4,
          "statement": "Deduce that q is also even:",
          "latex": "2 \\mid q^2 \\implies 2 \\mid q",
          "justification": "Same lemma: square is even implies q is even."
        },
        {
          "stepNumber": 5,
          "statement": "Identify the contradiction:",
          "latex": "\\text{gcd}(p, q) \\ge 2 \\quad (\\text{contradicting } \\text{gcd}(p, q) = 1)",
          "justification": "Both p and q share common factor 2, which contradicts that p/q was in lowest terms."
        }
      ],
      "finalFormulaLatex": "\\sqrt{2} \\text{ is Irrational}",
      "conclusion": "The original assumption that √2 is rational must be false. Therefore, √2 is irrational."
    },
    "memoryLab": [
      {
        "title": "Terminating Denominator Test",
        "mnemonic": "Only 2s and 5s in Prime Denominator!",
        "meaning": "A rational number p/q in simplest form terminates if and only if prime factors of q are 2^m · 5^n.",
        "boardExamTip": "Check if fraction is simplified first! 6/15 reduces to 2/5 (denominator is 5, so terminates as 0.4)."
      },
      {
        "title": "Conjugate Sign Flip",
        "mnemonic": "Flip the middle sign to rationalise!",
        "meaning": "The rationalising factor of (a + √b) is (a - √b) because (a+√b)(a-√b) = a² - b removes all radicals.",
        "boardExamTip": "Always multiply BOTH numerator and denominator by the exact conjugate."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch1-1",
        "title": "Rationalising the Denominator",
        "problemStatement": "Rationalise the denominator of 1 / (3 + √2).",
        "given": [
          "Fraction 1 / (3 + √2)"
        ],
        "toFind": "Equivalent fraction with rational denominator",
        "strategy": "Multiply numerator and denominator by conjugate (3 - √2).",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Form conjugate multiplier",
            "explanation": "The conjugate of 3 + √2 is 3 - √2."
          },
          {
            "stepNumber": 2,
            "title": "Multiply top and bottom",
            "latex": "\\frac{1}{3 + \\sqrt{2}} \\times \\frac{3 - \\sqrt{2}}{3 - \\sqrt{2}} = \\frac{3 - \\sqrt{2}}{(3)^2 - (\\sqrt{2})^2}",
            "explanation": "Apply (a + b)(a - b) = a² - b² in denominator."
          },
          {
            "stepNumber": 3,
            "title": "Simplify denominator",
            "latex": "\\frac{3 - \\sqrt{2}}{9 - 2} = \\frac{3 - \\sqrt{2}}{7}",
            "explanation": "9 - 2 = 7, which is rational."
          }
        ],
        "commonMistake": "Multiplying by 3 + √2 instead of conjugate 3 - √2.",
        "sanityCheck": "Denominator is now 7 (integer). Correct!"
      },
      {
        "id": "we-c9-ch1-2",
        "title": "Converting Mixed Repeating Decimal to Fraction",
        "problemStatement": "Express 0.2333... (or 0.23̄) in the form p/q where p and q are integers and q ≠ 0.",
        "given": [
          "Decimal x = 0.2333... where only digit 3 recurs"
        ],
        "toFind": "Rational fraction p/q in lowest terms",
        "strategy": "Multiply by 10 to shift non-repeating digit, then by 100 to shift one repeating period, and subtract.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Set equation",
            "latex": "x = 0.2333\\dots \\quad \\text{--- (1)}",
            "explanation": "Let x be the given repeating decimal."
          },
          {
            "stepNumber": 2,
            "title": "Multiply by 10",
            "latex": "10x = 2.333\\dots \\quad \\text{--- (2)}",
            "explanation": "Shifts non-repeating digit 2 left of decimal point."
          },
          {
            "stepNumber": 3,
            "title": "Multiply by 100",
            "latex": "100x = 23.333\\dots \\quad \\text{--- (3)}",
            "explanation": "Shifts one recurring block left of decimal point."
          },
          {
            "stepNumber": 4,
            "title": "Subtract equation (2) from (3)",
            "latex": "100x - 10x = 23.333\\dots - 2.333\\dots \\implies 90x = 21",
            "explanation": "The infinite repeating decimals cancel out completely."
          },
          {
            "stepNumber": 5,
            "title": "Simplify fraction",
            "latex": "x = \\frac{21}{90} = \\frac{7}{30}",
            "explanation": "Dividing numerator and denominator by common factor 3."
          }
        ],
        "commonMistake": "Subtracting (1) from (2) directly, leaving an incomplete cancelation: 9x = 2.1.",
        "sanityCheck": "7 ÷ 30 = 0.23333... Matches the original decimal exactly!"
      }
    ],
    "problemSolvingStrategies": [
      "Always reduce p/q to lowest terms before checking 2^m · 5^n denominator condition.",
      "To represent recurring decimal as fraction, set x = decimal, multiply by suitable powers of 10 to align repeating parts, and subtract.",
      "When simplifying nested powers, evaluate indices using standard order of operations or power of power rule (a^m)^n = a^(mn)."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch1-1",
        "type": "mcq",
        "prompt": "Which of the following numbers is irrational?",
        "options": [
          "√4",
          "3.14",
          "√7",
          "22/7"
        ],
        "correctAnswer": "√7",
        "hints": [
          "√4 = 2 (rational). 3.14 is a terminating decimal. 22/7 is a p/q ratio.",
          "7 is a prime number; square root of any non-square integer is irrational."
        ],
        "explanation": "√7 cannot be expressed as p/q with integers p and q. Hence it is irrational.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch1-2",
        "type": "numerical",
        "prompt": "Evaluate (√5 + √2)(√5 - √2).",
        "correctAnswer": 3,
        "tolerance": 0,
        "hints": [
          "Use algebraic identity (a + b)(a - b) = a² - b².",
          "(√5)² = 5 and (√2)² = 2."
        ],
        "explanation": "(√5)² - (√2)² = 5 - 2 = 3.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch1-3",
        "type": "numerical",
        "prompt": "Evaluate 64^(1/2) · 2^(-3).",
        "correctAnswer": 1,
        "tolerance": 0,
        "hints": [
          "64^(1/2) = √64 = 8.",
          "2^(-3) = 1/(2^3) = 1/8.",
          "Multiply 8 by 1/8."
        ],
        "explanation": "64^(1/2) = 8. 2^(-3) = 1/8. 8 · (1/8) = 1.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Real numbers ℝ = Rationals ℚ ∪ Irrationals.",
        "Decimal of rational is either terminating or non-terminating repeating.",
        "Decimal of irrational is non-terminating and non-repeating.",
        "Conjugate of (a + √b) is (a - √b) and (a + √b)(a - √b) = a² - b."
      ],
      "commonTraps": [
        "Assuming π equals 22/7 exactly; 22/7 is only an approximation. π is irrational, while 22/7 is rational.",
        "Forgetting to simplify fractions before checking terminating denominator condition."
      ]
    },
    "labId": "area-model",
    "labTitle": "Number Systems"
  },
  {
    "id": "c9-s1-poly",
    "classGrade": 9,
    "semester": 1,
    "chapterNumber": 2,
    "title": "Polynomials & Algebraic Identities",
    "shortDescription": "Master polynomial degrees, zeroes, remainder theorem, factor theorem, and the 8 standard algebraic identities.",
    "whyItMatters": "Polynomials form the foundation of higher mathematics, curve fitting in machine learning, and trajectory physics.",
    "priorKnowledge": [
      "Basic algebraic terms, coefficients, and exponents",
      "Addition and subtraction of algebraic expressions",
      "Distributive property a(b + c) = ab + ac"
    ],
    "vocabulary": [
      {
        "term": "Polynomial in one variable",
        "definition": "An algebraic expression of the form a_n x^n + ... + a_1 x + a_0 where exponents of x are whole numbers."
      },
      {
        "term": "Degree of Polynomial",
        "definition": "The highest exponent power of the variable x in a non-zero polynomial."
      },
      {
        "term": "Zero of Polynomial",
        "definition": "A real number k such that p(k) = 0."
      },
      {
        "term": "Remainder Theorem",
        "definition": "If polynomial p(x) of degree ≥ 1 is divided by (x - a), the remainder is p(a)."
      },
      {
        "term": "Factor Theorem",
        "definition": "(x - a) is a factor of p(x) if and only if p(a) = 0."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-poly-rem",
        "name": "Polynomial Remainder Theorem",
        "latex": "p(x) = (x - a) q(x) + r \\implies r = p(a)",
        "description": "Evaluating p(x) at x = a yields the exact remainder when p(x) is divided by linear divisor (x - a).",
        "variables": [
          {
            "symbol": "p(x)",
            "meaning": "Polynomial dividend of degree ≥ 1"
          },
          {
            "symbol": "x - a",
            "meaning": "Linear divisor"
          },
          {
            "symbol": "r",
            "meaning": "Constant remainder"
          }
        ],
        "chapterId": "c9-s1-poly",
        "classGrade": 9,
        "category": "Algebra",
        "conditions": "Divisor must be linear of form (x - a).",
        "whenToUse": "Finding remainders without performing long polynomial division.",
        "workedExample": {
          "problem": "Find remainder when x^3 + 1 is divided by x - 1",
          "solution": "Here a = 1. Remainder = p(1) = 1^3 + 1 = 2."
        }
      },
      {
        "id": "f-c9-poly-fac",
        "name": "Polynomial Factor Theorem",
        "latex": "p(a) = 0 \\iff (x - a) \\text{ is a factor of } p(x)",
        "description": "A linear binomial (x - a) evenly divides p(x) without remainder if and only if a is a zero of p(x).",
        "variables": [
          {
            "symbol": "p(x)",
            "meaning": "Polynomial of degree ≥ 1"
          },
          {
            "symbol": "a",
            "meaning": "Real number root"
          }
        ],
        "chapterId": "c9-s1-poly",
        "classGrade": 9,
        "category": "Algebra",
        "conditions": "p(x) is a polynomial of degree n ≥ 1.",
        "whenToUse": "Testing candidate factors and factorising cubic or higher polynomials.",
        "workedExample": {
          "problem": "Check if (x - 2) is a factor of x^3 - 4x",
          "solution": "p(2) = 2^3 - 4(2) = 8 - 8 = 0. Therefore, (x - 2) is a factor."
        }
      },
      {
        "id": "f-c9-poly-id5",
        "name": "Square of a Trinomial Identity",
        "latex": "(x + y + z)^2 = x^2 + y^2 + z^2 + 2xy + 2yz + 2zx",
        "description": "Expands the square of three algebraic terms into sum of their squares plus twice each pairwise product.",
        "variables": [
          {
            "symbol": "x, y, z",
            "meaning": "Algebraic terms or real numbers"
          }
        ],
        "chapterId": "c9-s1-poly",
        "classGrade": 9,
        "category": "Algebra",
        "conditions": "Holds universally for all real numbers.",
        "whenToUse": "Expanding expressions with three additive terms squared.",
        "workedExample": {
          "problem": "Expand (a + 2b + 3c)²",
          "solution": "a² + (2b)² + (3c)² + 2(a)(2b) + 2(2b)(3c) + 2(3c)(a) = a² + 4b² + 9c² + 4ab + 12bc + 6ca."
        }
      },
      {
        "id": "f-c9-poly-id6",
        "name": "Cube of a Binomial Identity (Sum & Difference)",
        "latex": "(x \\pm y)^3 = x^3 \\pm y^3 \\pm 3xy(x \\pm y)",
        "description": "Expands the cube of binomial sum or difference into four cubic terms.",
        "variables": [
          {
            "symbol": "x, y",
            "meaning": "Real numbers or variables"
          }
        ],
        "chapterId": "c9-s1-poly",
        "classGrade": 9,
        "category": "Algebra",
        "conditions": "Valid for all real x and y.",
        "whenToUse": "Expanding (x + y)³ or (x - y)³ and computing numeric powers like 102³.",
        "workedExample": {
          "problem": "Evaluate 102³ using algebraic identity",
          "solution": "(100 + 2)³ = 100³ + 2³ + 3(100)(2)(100 + 2) = 1,000,000 + 8 + 600(102) = 1,061,208."
        }
      },
      {
        "id": "f-c9-poly-id8",
        "name": "Sum of Three Cubes Identity & Conditional Corollary",
        "latex": "x^3 + y^3 + z^3 - 3xyz = (x + y + z)(x^2 + y^2 + z^2 - xy - yz - zx)",
        "description": "Core 8th identity. If x + y + z = 0, then x³ + y³ + z³ = 3xyz.",
        "variables": [
          {
            "symbol": "x, y, z",
            "meaning": "Real numbers or expressions"
          }
        ],
        "chapterId": "c9-s1-poly",
        "classGrade": 9,
        "category": "Algebra",
        "conditions": "Conditional corollary requires x + y + z = 0.",
        "whenToUse": "Calculating sum of cubes when the bases sum to zero.",
        "workedExample": {
          "problem": "Evaluate (-12)³ + 7³ + 5³ without calculating cubes",
          "solution": "Here x = -12, y = 7, z = 5. x + y + z = -12 + 7 + 5 = 0. Hence x³ + y³ + z³ = 3xyz = 3(-12)(7)(5) = -1260."
        },
        "mnemonic": "Sum is zero? The three cubes equal 3 times their product!"
      }
    ],
    "derivation": {
      "title": "Derivation of Difference of Squares via Area Models",
      "targetFormula": "(a + b)(a - b) = a^2 - b^2",
      "objective": "Prove geometrically and algebraically that (a + b)(a - b) = a² - b².",
      "startingObservation": "Start with a large square of side length a (area = a²), and cut out a small square of side b from its corner (area = b²).",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Remaining area after removing b²:",
          "latex": "\\text{Remaining Area} = a^2 - b^2",
          "justification": "Total square area minus corner square area."
        },
        {
          "stepNumber": 2,
          "statement": "Split remaining L-shaped region into two rectangular strips:",
          "latex": "R_1 = a \\times (a - b), \\quad R_2 = b \\times (a - b)",
          "justification": "Decomposing non-convex polygon into two rectangles."
        },
        {
          "stepNumber": 3,
          "statement": "Factor out the common width (a - b):",
          "latex": "R_1 + R_2 = (a - b)(a + b)",
          "justification": "Distributive property of multiplication."
        },
        {
          "stepNumber": 4,
          "statement": "Equate algebraic and geometric expressions:",
          "latex": "a^2 - b^2 = (a + b)(a - b)",
          "justification": "Both expressions represent the exact same physical area."
        }
      ],
      "finalFormulaLatex": "(a + b)(a - b) = a^2 - b^2",
      "conclusion": "The difference of two squares identity is verified both algebraically and geometrically."
    },
    "memoryLab": [
      {
        "title": "Trinomial Square Pattern",
        "mnemonic": "Three Squares + Three Doubled Pairs!",
        "meaning": "(x + y + z)² = x² + y² + z² + 2xy + 2yz + 2zx.",
        "boardExamTip": "Watch minus signs carefully! If y is negative (-y), then +2xy and +2yz become -2xy and -2yz, while (-y)² remains +y²."
      },
      {
        "title": "Zero Sum Cubes Trick",
        "mnemonic": "If x + y + z = 0, Cubes = 3xyz!",
        "meaning": "Whenever three terms sum to zero, the sum of their cubes is simply 3 times their product.",
        "boardExamTip": "Check if (-a) + b + c = 0 before spending time manually calculating large cubes!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-poly-1",
        "title": "Factorising Cubic Polynomial Using Factor Theorem",
        "problemStatement": "Factorise p(x) = x³ - 23x² + 142x - 120.",
        "given": [
          "p(x) = x³ - 23x² + 142x - 120",
          "Constant term = -120"
        ],
        "toFind": "Complete linear factors of p(x)",
        "strategy": "Test factors of 120 (±1, ±2, ...) to find a zero, then divide p(x) by (x - a) to get quadratic quotient.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Test x = 1",
            "latex": "p(1) = 1^3 - 23(1)^2 + 142(1) - 120 = 1 - 23 + 142 - 120 = 0",
            "explanation": "Since p(1) = 0, (x - 1) is a factor by Factor Theorem."
          },
          {
            "stepNumber": 2,
            "title": "Divide p(x) by (x - 1)",
            "latex": "x^3 - 23x^2 + 142x - 120 = (x - 1)(x^2 - 22x + 120)",
            "explanation": "Using polynomial synthetic or long division."
          },
          {
            "stepNumber": 3,
            "title": "Factorise quadratic quotient",
            "latex": "x^2 - 22x + 120 = x^2 - 12x - 10x + 120 = (x - 12)(x - 10)",
            "explanation": "Split middle term: -12 and -10 sum to -22 and multiply to +120."
          },
          {
            "stepNumber": 4,
            "title": "Write complete factors",
            "latex": "p(x) = (x - 1)(x - 10)(x - 12)",
            "explanation": "Product of three linear factors."
          }
        ],
        "commonMistake": "Stopping after finding only the first factor (x - 1).",
        "sanityCheck": "At x = 0, (-1)(-10)(-12) = -120 = p(0). Verified!"
      },
      {
        "id": "we-c9-poly-2",
        "title": "Evaluating Sum of Cubes Using Conditional Identity",
        "problemStatement": "Without actually calculating cubes, evaluate (28)³ + (-15)³ + (-13)³.",
        "given": [
          "x = 28",
          "y = -15",
          "z = -13"
        ],
        "toFind": "Value of x³ + y³ + z³",
        "strategy": "Check if x + y + z = 0. If yes, apply x³ + y³ + z³ = 3xyz.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Sum the bases",
            "latex": "x + y + z = 28 + (-15) + (-13) = 28 - 28 = 0",
            "explanation": "Sum of bases is zero."
          },
          {
            "stepNumber": 2,
            "title": "Apply conditional identity",
            "latex": "x^3 + y^3 + z^3 = 3xyz",
            "explanation": "Since x + y + z = 0, the RHS becomes 3xyz."
          },
          {
            "stepNumber": 3,
            "title": "Compute 3xyz",
            "latex": "3 \\times 28 \\times (-15) \\times (-13) = 84 \\times 195 = 16380",
            "explanation": "Direct product computation."
          }
        ],
        "commonMistake": "Manually computing 28³ = 21952, which is prone to arithmetic error.",
        "sanityCheck": "28³ is ~22000, 15³ is 3375, 13³ is 2197; 22000 - 5500 ≈ 16500. Matches 16380!"
      }
    ],
    "problemSolvingStrategies": [
      "To factorise a cubic polynomial, always test factors of the constant term (±1, ±2, etc.) to locate the first root.",
      "Check if the sum of terms equals zero before computing cubic sums: if a + b + c = 0, then a³ + b³ + c³ = 3abc.",
      "Keep track of minus signs when squaring trinomials: (-y)² is always positive, but cross-terms with -y are negative."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-poly-1",
        "type": "numerical",
        "prompt": "Find the remainder when p(x) = x³ - 3x² + 4x + 50 is divided by (x + 3).",
        "correctAnswer": -16,
        "tolerance": 0,
        "hints": [
          "By Remainder Theorem, substitute x = -3 into p(x).",
          "(-3)³ = -27, -3(-3)² = -27, 4(-3) = -12."
        ],
        "explanation": "p(-3) = (-3)³ - 3(-3)² + 4(-3) + 50 = -27 - 27 - 12 + 50 = -66 + 50 = -16.",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c9-poly-2",
        "type": "mcq",
        "prompt": "If x + y + z = 0, what is the value of (x³ + y³ + z³) / (xyz)?",
        "options": [
          "1",
          "3",
          "0",
          "-3"
        ],
        "correctAnswer": "3",
        "hints": [
          "Use the identity x³ + y³ + z³ - 3xyz = (x+y+z)(x²+y²+z²-xy-yz-zx).",
          "When x+y+z=0, x³+y³+z³ = 3xyz."
        ],
        "explanation": "Since x + y + z = 0, x³ + y³ + z³ = 3xyz. Dividing by xyz gives 3.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-poly-3",
        "type": "numerical",
        "prompt": "If (x + 1/x) = 5, find the value of (x² + 1/x²).",
        "correctAnswer": 23,
        "tolerance": 0,
        "hints": [
          "Square both sides of (x + 1/x) = 5.",
          "(x + 1/x)² = x² + 2(x)(1/x) + 1/x² = x² + 2 + 1/x²."
        ],
        "explanation": "(x + 1/x)² = 25 => x² + 2 + 1/x² = 25 => x² + 1/x² = 23.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "A polynomial of degree n can have at most n real zeroes.",
        "Zero of the zero polynomial is any real number; its degree is undefined.",
        "Remainder Theorem: Remainder of p(x) divided by (x - a) is p(a).",
        "Factor Theorem: (x - a) is a factor of p(x) if and only if p(a) = 0.",
        "All 8 standard identities must be memorised forward (expansion) and backward (factorisation)."
      ],
      "commonTraps": [
        "Confusing dividing by (x + a) with substituting +a; for (x + a), substitute x = -a into p(x).",
        "Forgetting cross-term 2xy when squaring binomials: (x + y)² ≠ x² + y²."
      ]
    },
    "labId": "area-model",
    "labTitle": "Polynomials & Algebraic Identities"
  },
  {
    "id": "c9-s1-ch3",
    "classGrade": 9,
    "semester": 1,
    "chapterNumber": 3,
    "title": "Coordinate Geometry",
    "shortDescription": "Master the Cartesian plane, quadrants, abscissa, ordinate, and plotting ordered pairs.",
    "whyItMatters": "Coordinate geometry bridges algebra and geometry, enabling GPS satellite tracking, computer graphics displays, and robotics navigation.",
    "priorKnowledge": [
      "Number line representations of positive and negative numbers",
      "Perpendicular lines and right angles",
      "Basic ordered pairs (x, y)"
    ],
    "vocabulary": [
      {
        "term": "Cartesian Plane",
        "definition": "A plane defined by two mutually perpendicular real number lines intersecting at origin O."
      },
      {
        "term": "Abscissa",
        "definition": "The x-coordinate of a point, representing its perpendicular distance from the y-axis."
      },
      {
        "term": "Ordinate",
        "definition": "The y-coordinate of a point, representing its perpendicular distance from the x-axis."
      },
      {
        "term": "Quadrant",
        "definition": "One of the four regions into which the coordinate axes divide the plane (numbered I, II, III, IV counterclockwise)."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch3-signs",
        "name": "Quadrant Coordinate Sign Convention",
        "latex": "Q_1(+,+), \\quad Q_2(-,+), \\quad Q_3(-,-), \\quad Q_4(+,-)",
        "description": "Signs of abscissa (x) and ordinate (y) uniquely identify the quadrant containing the point.",
        "variables": [
          {
            "symbol": "Q_1, Q_2, Q_3, Q_4",
            "meaning": "Quadrants I, II, III, IV"
          }
        ],
        "chapterId": "c9-s1-ch3",
        "classGrade": 9,
        "category": "Coordinate Geometry",
        "conditions": "Points lying on the axes do not belong to any quadrant.",
        "whenToUse": "Identifying which quadrant contains an ordered pair (x, y).",
        "workedExample": {
          "problem": "In which quadrant does (-3, 5) lie?",
          "solution": "Abscissa is negative (-3), ordinate is positive (+5). Hence (-3, 5) lies in Quadrant II."
        }
      },
      {
        "id": "f-c9-ch3-axes-dist",
        "name": "Perpendicular Distance from Coordinate Axes",
        "latex": "d_y = |x|, \\quad d_x = |y|",
        "description": "The perpendicular distance of P(x, y) from y-axis is |x|; from x-axis is |y|.",
        "variables": [
          {
            "symbol": "d_y",
            "meaning": "Perpendicular distance from y-axis"
          },
          {
            "symbol": "d_x",
            "meaning": "Perpendicular distance from x-axis"
          }
        ],
        "chapterId": "c9-s1-ch3",
        "classGrade": 9,
        "category": "Coordinate Geometry",
        "conditions": "Distance is always a non-negative scalar quantity.",
        "whenToUse": "Finding how far a point lies from the x or y axis.",
        "workedExample": {
          "problem": "Find distance of (-4, -7) from the x-axis",
          "solution": "Distance from x-axis is |y| = |-7| = 7 units."
        }
      },
      {
        "id": "f-c9-ch3-axes-eq",
        "name": "Equations of the Coordinate Axes",
        "latex": "\\text{x-axis: } y = 0, \\quad \\text{y-axis: } x = 0",
        "description": "Every point on the x-axis has ordinate y = 0; every point on the y-axis has abscissa x = 0.",
        "variables": [
          {
            "symbol": "y = 0",
            "meaning": "Equation of horizontal x-axis"
          },
          {
            "symbol": "x = 0",
            "meaning": "Equation of vertical y-axis"
          }
        ],
        "chapterId": "c9-s1-ch3",
        "classGrade": 9,
        "category": "Coordinate Geometry",
        "conditions": "Origin O(0,0) lies on both axes simultaneously.",
        "whenToUse": "Finding intercepts and locus points on axes."
      }
    ],
    "derivation": {
      "title": "Cartesian Quadrant Architecture and Sign Deductions",
      "targetFormula": "(x > 0, y > 0) \\implies Q_1, \\quad (x < 0, y > 0) \\implies Q_2",
      "objective": "Deduce quadrant sign conventions from intersecting orthogonal number lines.",
      "startingObservation": "Let the horizontal axis X-prime O X have positive direction rightwards and negative leftwards. Let vertical axis Y-prime O Y have positive direction upwards and negative downwards.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Identify Quadrant I (XOY):",
          "latex": "x > 0, y > 0 \\implies Q_1(+, +)",
          "justification": "Right of origin and above origin."
        },
        {
          "stepNumber": 2,
          "statement": "Identify Quadrant II (X-prime O Y):",
          "latex": "x < 0, y > 0 \\implies Q_2(-, +)",
          "justification": "Left of origin and above origin."
        },
        {
          "stepNumber": 3,
          "statement": "Identify Quadrant III (X-prime O Y-prime):",
          "latex": "x < 0, y < 0 \\implies Q_3(-, -)",
          "justification": "Left of origin and below origin."
        },
        {
          "stepNumber": 4,
          "statement": "Identify Quadrant IV (X O Y-prime):",
          "latex": "x > 0, y < 0 \\implies Q_4(+, -)",
          "justification": "Right of origin and below origin."
        }
      ],
      "finalFormulaLatex": "Q_1(+,+), Q_2(-,+), Q_3(-,-), Q_4(+,-)",
      "conclusion": "Every point in the plane not on an axis belongs uniquely to one of the four quadrants."
    },
    "memoryLab": [
      {
        "title": "Abscissa vs Ordinate",
        "mnemonic": "A comes before O, X comes before Y!",
        "meaning": "Abscissa = x-coordinate; Ordinate = y-coordinate. Alphabetical order matches!",
        "boardExamTip": "Distance from y-axis is the X-coordinate (abscissa)! Students frequently confuse which axis corresponds to which distance."
      },
      {
        "title": "Quadrant Rotation",
        "mnemonic": "Counter-Clockwise C from Top-Right!",
        "meaning": "Start at (+, +) in Top-Right as Q1, move counter-clockwise: Q2 (Top-Left), Q3 (Bottom-Left), Q4 (Bottom-Right).",
        "boardExamTip": "Points with 0 (e.g. (5, 0) or (0, -3)) lie ON axes, NOT inside any quadrant."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch3-1",
        "title": "Identifying Quadrants and Axis Locations",
        "problemStatement": "State the quadrant or axis on which each of the following points lies: A(3, -5), B(-2, 4), C(0, -7), D(-4, -6), E(6, 0).",
        "given": [
          "Points A, B, C, D, E"
        ],
        "toFind": "Location of each point",
        "strategy": "Examine signs of x and y coordinates and check for zero.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Point A(3, -5)",
            "explanation": "x > 0, y < 0: lies in Quadrant IV."
          },
          {
            "stepNumber": 2,
            "title": "Point B(-2, 4)",
            "explanation": "x < 0, y > 0: lies in Quadrant II."
          },
          {
            "stepNumber": 3,
            "title": "Point C(0, -7)",
            "explanation": "x = 0, y ≠ 0: lies on the negative y-axis."
          },
          {
            "stepNumber": 4,
            "title": "Point D(-4, -6)",
            "explanation": "x < 0, y < 0: lies in Quadrant III."
          },
          {
            "stepNumber": 5,
            "title": "Point E(6, 0)",
            "explanation": "x ≠ 0, y = 0: lies on the positive x-axis."
          }
        ],
        "commonMistake": "Claiming (0, -7) lies in Quadrant IV.",
        "sanityCheck": "All 5 points correctly classified."
      },
      {
        "id": "we-c9-ch3-2",
        "title": "Perpendicular Distances from Axes",
        "problemStatement": "Find the perpendicular distance of the point P(-5, 8) from (i) the x-axis, and (ii) the y-axis.",
        "given": [
          "Point P(-5, 8) with x = -5, y = 8"
        ],
        "toFind": "Distances d_x and d_y",
        "strategy": "Distance from x-axis is |y|; distance from y-axis is |x|.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Distance from x-axis",
            "latex": "d_x = |y| = |8| = 8 \\text{ units}",
            "explanation": "Vertical height from x-axis."
          },
          {
            "stepNumber": 2,
            "title": "Distance from y-axis",
            "latex": "d_y = |x| = |-5| = 5 \\text{ units}",
            "explanation": "Horizontal displacement from y-axis."
          }
        ],
        "commonMistake": "Writing distance as -5. Distance is always non-negative!",
        "sanityCheck": "Both distances are positive numbers: 8 and 5."
      }
    ],
    "problemSolvingStrategies": [
      "To plot (x, y), always start at origin O(0,0), move x units horizontally (right if positive, left if negative), then y units vertically (up if positive, down if negative).",
      "Points of the form (x, 0) lie on the x-axis; points of the form (0, y) lie on the y-axis."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch3-1",
        "type": "mcq",
        "prompt": "The point (-4, -7) lies in which quadrant?",
        "options": [
          "Quadrant I",
          "Quadrant II",
          "Quadrant III",
          "Quadrant IV"
        ],
        "correctAnswer": "Quadrant III",
        "hints": [
          "Check signs of both coordinates: x = -4 is negative, y = -7 is negative.",
          "(-, -) corresponds to Quadrant III."
        ],
        "explanation": "Both coordinates are negative, so (-4, -7) lies in Quadrant III.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch3-2",
        "type": "numerical",
        "prompt": "What is the perpendicular distance of point (-6, 9) from the y-axis?",
        "correctAnswer": 6,
        "tolerance": 0,
        "hints": [
          "Distance from y-axis is given by |x| (the absolute value of abscissa).",
          "|-6| = 6."
        ],
        "explanation": "Distance from y-axis is |x| = |-6| = 6 units.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch3-3",
        "type": "mcq",
        "prompt": "Which point lies on the y-axis?",
        "options": [
          "(3, 0)",
          "(0, -5)",
          "(-5, 0)",
          "(2, 2)"
        ],
        "correctAnswer": "(0, -5)",
        "hints": [
          "A point on the y-axis always has x-coordinate equal to 0."
        ],
        "explanation": "(0, -5) has x = 0, so it lies on the y-axis.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Cartesian plane is formed by two perpendicular axes intersecting at O(0,0).",
        "Abscissa is x-coordinate; Ordinate is y-coordinate.",
        "Distance from y-axis is |x|; distance from x-axis is |y|.",
        "Equation of x-axis is y = 0; equation of y-axis is x = 0."
      ],
      "commonTraps": [
        "Writing negative distance from axes: distance is always positive magnitude.",
        "Assigning boundary points on axes to quadrants; axis points do not belong to any quadrant."
      ]
    },
    "labId": "coordinate-geometry",
    "labTitle": "Coordinate Geometry"
  },
  {
    "id": "c9-s1-ch4",
    "classGrade": 9,
    "semester": 1,
    "chapterNumber": 4,
    "title": "Linear Equations in Two Variables",
    "shortDescription": "Explore linear equations ax + by + c = 0, infinite solutions, graphing straight lines, and lines parallel to axes.",
    "whyItMatters": "Linear equations model real-world relationships such as cost calculations, motion at constant speed, and budget balancing.",
    "priorKnowledge": [
      "Linear equations in one variable and solving for x",
      "Plotting points on the Cartesian coordinate plane",
      "Basic substitution of numerical values into expressions"
    ],
    "vocabulary": [
      {
        "term": "Linear Equation in Two Variables",
        "definition": "An equation that can be written in the form ax + by + c = 0 where a, b, c are real numbers and a, b are not both zero."
      },
      {
        "term": "Solution of Linear Equation",
        "definition": "An ordered pair (x, y) that satisfies ax + by + c = 0 and makes LHS = RHS."
      },
      {
        "term": "Graph of Linear Equation",
        "definition": "A geometric straight line consisting of all points (x, y) that satisfy the equation."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch4-std",
        "name": "Standard Form of Linear Equation",
        "latex": "ax + by + c = 0 \\quad (a^2 + b^2 \\neq 0)",
        "description": "General algebraic representation of a straight line in the 2D Cartesian plane.",
        "variables": [
          {
            "symbol": "a, b",
            "meaning": "Coefficients of x and y (not both zero)"
          },
          {
            "symbol": "c",
            "meaning": "Constant real term"
          }
        ],
        "chapterId": "c9-s1-ch4",
        "classGrade": 9,
        "category": "Algebra",
        "conditions": "a and b cannot be simultaneously 0.",
        "whenToUse": "Expressing any linear relation in standard canonical form.",
        "workedExample": {
          "problem": "Express 2x = -5y + 7 in standard form ax + by + c = 0",
          "solution": "Rearrange all terms to LHS: 2x + 5y - 7 = 0. Here a = 2, b = 5, c = -7."
        }
      },
      {
        "id": "f-c9-ch4-parallel",
        "name": "Equations of Lines Parallel to Axes",
        "latex": "x = k \\quad (\\parallel y\\text{-axis}), \\quad y = c \\quad (\\parallel x\\text{-axis})",
        "description": "Vertical lines parallel to the y-axis have equation x = k; horizontal lines parallel to the x-axis have equation y = c.",
        "variables": [
          {
            "symbol": "k",
            "meaning": "Constant x-intercept"
          },
          {
            "symbol": "c",
            "meaning": "Constant y-intercept"
          }
        ],
        "chapterId": "c9-s1-ch4",
        "classGrade": 9,
        "category": "Algebra",
        "conditions": "x = k has undefined slope; y = c has slope 0.",
        "whenToUse": "Graphing or identifying lines parallel to coordinate axes."
      },
      {
        "id": "f-c9-ch4-origin",
        "name": "Lines Passing Through Origin",
        "latex": "y = mx \\iff ax + by = 0 \\quad (c = 0)",
        "description": "When the constant term c = 0, the line passes directly through the origin (0, 0).",
        "variables": [
          {
            "symbol": "m",
            "meaning": "Slope of line (-a/b)"
          }
        ],
        "chapterId": "c9-s1-ch4",
        "classGrade": 9,
        "category": "Algebra",
        "conditions": "c = 0.",
        "whenToUse": "Recognising proportional relationships passing through origin."
      }
    ],
    "derivation": {
      "title": "Infinitude of Solutions for ax + by + c = 0",
      "targetFormula": "y = -\\frac{a}{b}x - \\frac{c}{b} \\implies \\infty \\text{ Solutions}",
      "objective": "Prove that a linear equation in two variables has infinitely many distinct solutions.",
      "startingObservation": "Given ax + by + c = 0 with b ≠ 0.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Express y explicitly in terms of x:",
          "latex": "by = -ax - c \\implies y = -\\frac{a}{b}x - \\frac{c}{b}",
          "justification": "Isolating dependent variable y."
        },
        {
          "stepNumber": 2,
          "statement": "Choose any real value for x:",
          "latex": "x = x_0 \\in \\mathbb{R}",
          "justification": "x can take any real value from negative infinity to positive infinity."
        },
        {
          "stepNumber": 3,
          "statement": "Evaluate the corresponding y:",
          "latex": "y_0 = -\\frac{a}{b}x_0 - \\frac{c}{b}",
          "justification": "Unique real value of y obtained for each chosen x_0."
        }
      ],
      "finalFormulaLatex": "\\{(x, y) \\mid ax + by + c = 0\\} \\text{ is Infinite}",
      "conclusion": "Since there are infinitely many real values for x, there are infinitely many ordered pairs (x, y) that satisfy the equation."
    },
    "memoryLab": [
      {
        "title": "Single Linear Equation Solution Count",
        "mnemonic": "One Line = Infinite Points!",
        "meaning": "A single linear equation in two variables ALWAYS has infinitely many solutions.",
        "boardExamTip": "Do not confuse a single linear equation (infinitely many solutions) with a pair of linear equations (which can have 0, 1, or infinite solutions)."
      },
      {
        "title": "Parallel Line Equations",
        "mnemonic": "x = number cuts X, runs parallel to Y!",
        "meaning": "x = k is vertical (parallel to y-axis); y = c is horizontal (parallel to x-axis).",
        "boardExamTip": "x = 0 is the y-axis itself! y = 0 is the x-axis itself!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch4-1",
        "title": "Finding Multiple Solutions of Linear Equation",
        "problemStatement": "Find four different solutions of the equation 2x + y = 7.",
        "given": [
          "Equation: 2x + y = 7"
        ],
        "toFind": "Four distinct solutions (x, y)",
        "strategy": "Express y = 7 - 2x and substitute x = 0, 1, 2, 3.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Rearrange for y",
            "latex": "y = 7 - 2x",
            "explanation": "Makes substitution direct."
          },
          {
            "stepNumber": 2,
            "title": "Let x = 0",
            "latex": "y = 7 - 2(0) = 7 \\implies (0, 7)",
            "explanation": "First solution (y-intercept)."
          },
          {
            "stepNumber": 3,
            "title": "Let x = 1",
            "latex": "y = 7 - 2(1) = 5 \\implies (1, 5)",
            "explanation": "Second solution."
          },
          {
            "stepNumber": 4,
            "title": "Let x = 2",
            "latex": "y = 7 - 2(2) = 3 \\implies (2, 3)",
            "explanation": "Third solution."
          },
          {
            "stepNumber": 5,
            "title": "Let x = 3",
            "latex": "y = 7 - 2(3) = 1 \\implies (3, 1)",
            "explanation": "Fourth solution."
          }
        ],
        "commonMistake": "Writing solution as a single number instead of ordered pair (x, y).",
        "sanityCheck": "Substitute (2, 3): 2(2) + 3 = 4 + 3 = 7. Verified!"
      },
      {
        "id": "we-c9-ch4-2",
        "title": "Finding Unknown Parameter k from Solution",
        "problemStatement": "If (2, 1) is a solution of the equation 2x + 3y = k, find the value of k.",
        "given": [
          "Solution (x, y) = (2, 1)",
          "Equation: 2x + 3y = k"
        ],
        "toFind": "Value of constant k",
        "strategy": "Substitute x = 2 and y = 1 directly into the equation.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Substitute coordinates",
            "latex": "2(2) + 3(1) = k",
            "explanation": "Replace x with 2 and y with 1."
          },
          {
            "stepNumber": 2,
            "title": "Evaluate LHS",
            "latex": "4 + 3 = k \\implies k = 7",
            "explanation": "Arithmetic addition."
          }
        ],
        "commonMistake": "Swapping x and y (substituting x = 1 and y = 2).",
        "sanityCheck": "2(2) + 3(1) = 4 + 3 = 7 = k. Correct!"
      }
    ],
    "problemSolvingStrategies": [
      "To draw graph of ax + by + c = 0, find at least 2 (preferably 3) points by setting x = 0 to get y-intercept, and y = 0 to get x-intercept.",
      "Check linearity: plot the 3 points on graph paper; they must all lie on a single collinear straight line."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch4-1",
        "type": "numerical",
        "prompt": "If (4, 19) is a solution of y = ax + 3, what is the value of a?",
        "correctAnswer": 4,
        "tolerance": 0,
        "hints": [
          "Substitute x = 4 and y = 19 into the equation.",
          "19 = 4a + 3 => 4a = 16."
        ],
        "explanation": "19 = 4a + 3 => 4a = 16 => a = 4.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch4-2",
        "type": "mcq",
        "prompt": "How many solutions does the linear equation 3x + 5y = 15 have?",
        "options": [
          "Unique solution",
          "Two solutions",
          "Infinitely many solutions",
          "No solution"
        ],
        "correctAnswer": "Infinitely many solutions",
        "hints": [
          "A single linear equation in two variables represents a straight line with infinitely many points."
        ],
        "explanation": "A single linear equation in two variables has infinitely many solutions.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch4-3",
        "type": "mcq",
        "prompt": "The equation of the line parallel to the y-axis at a distance of 4 units to the left of origin is:",
        "options": [
          "x = 4",
          "x = -4",
          "y = 4",
          "y = -4"
        ],
        "correctAnswer": "x = -4",
        "hints": [
          "Lines parallel to y-axis have equation x = constant.",
          "Left of origin means x is negative."
        ],
        "explanation": "Line parallel to y-axis is x = k; left of origin by 4 units means x = -4.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Standard form is ax + by + c = 0 with a² + b² ≠ 0.",
        "A linear equation in two variables has infinitely many solutions.",
        "The graph of every linear equation in two variables is a straight line.",
        "x = k is parallel to y-axis; y = c is parallel to x-axis."
      ],
      "commonTraps": [
        "Thinking a linear equation has only 1 solution (true only for 1 variable equations).",
        "Confusing the equation of x-axis (y = 0) with y-axis (x = 0)."
      ]
    },
    "labId": "linear-equations",
    "labTitle": "Linear Equations in Two Variables"
  },
  {
    "id": "c9-s1-ch5",
    "classGrade": 9,
    "semester": 1,
    "chapterNumber": 5,
    "title": "Introduction to Euclid's Geometry",
    "shortDescription": "Understand Euclid's definitions, the 7 common axioms, the 5 geometric postulates, and Playfair's axiom.",
    "whyItMatters": "Euclid's Elements established the rigorous axiomatic method: building complex theorems from a minimal set of unproved self-evident truths.",
    "priorKnowledge": [
      "Basic geometric concepts of point, line, ray, and line segment",
      "Right angles and parallel lines"
    ],
    "vocabulary": [
      {
        "term": "Axiom",
        "definition": "A self-evident universal truth assumed without proof, applied throughout all mathematics."
      },
      {
        "term": "Postulate",
        "definition": "A self-evident assumption specific to the domain of geometry."
      },
      {
        "term": "Theorem",
        "definition": "A mathematical statement established as true through logical deductive proof from axioms."
      },
      {
        "term": "Playfair's Axiom",
        "definition": "Through a point not on a given line, exactly one line can be drawn parallel to the given line."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch5-axioms",
        "name": "Euclid's Core Axioms (Common Notions)",
        "latex": "A = B \\land B = C \\implies A = C, \\quad A = B \\implies A + C = B + C",
        "description": "Things equal to the same thing are equal; if equals are added/subtracted to equals, the wholes/remainders are equal; the whole is greater than the part.",
        "variables": [
          {
            "symbol": "A, B, C",
            "meaning": "Geometric magnitudes or mathematical quantities"
          }
        ],
        "chapterId": "c9-s1-ch5",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Magnitudes of the same kind.",
        "whenToUse": "Deductive geometric and algebraic proofs."
      },
      {
        "id": "f-c9-ch5-post5",
        "name": "Euclid's Fifth Postulate (Parallel Postulate)",
        "latex": "\\angle 1 + \\angle 2 < 180^\\circ \\implies \\text{Lines meet on that side}",
        "description": "If a transversal falls on two straight lines making interior angles on the same side sum to < 180°, the lines produced indefinitely meet on that side.",
        "variables": [
          {
            "symbol": "\\angle 1, \\angle 2",
            "meaning": "Consecutive interior angles on the same side of transversal"
          }
        ],
        "chapterId": "c9-s1-ch5",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Interior angle sum strictly less than two right angles (180°).",
        "whenToUse": "Determining convergence/parallelism of lines in Euclidean geometry."
      },
      {
        "id": "f-c9-ch5-unique-line",
        "name": "Uniqueness of Line Intersections Theorem",
        "latex": "l_1 \\neq l_2 \\implies |l_1 \\cap l_2| \\le 1",
        "description": "Two distinct lines cannot have more than one point in common.",
        "variables": [
          {
            "symbol": "l_1, l_2",
            "meaning": "Two distinct straight lines"
          }
        ],
        "chapterId": "c9-s1-ch5",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "l_1 and l_2 are distinct lines.",
        "whenToUse": "Proving uniqueness of intersection points."
      }
    ],
    "derivation": {
      "title": "Proof: Two Distinct Lines Cannot Have More Than One Common Point",
      "targetFormula": "|l_1 \\cap l_2| \\le 1",
      "objective": "Prove by contradiction that two distinct lines intersect at most at a single point.",
      "startingObservation": "Suppose two distinct lines l and m intersect at two distinct points P and Q.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Identify the common points:",
          "latex": "P \\in l, Q \\in l \\quad \\text{and} \\quad P \\in m, Q \\in m",
          "justification": "Assumption that both P and Q lie on both lines."
        },
        {
          "stepNumber": 2,
          "statement": "Recall Euclid’s Postulate 1 / Axiom 5.1:",
          "latex": "\\text{Given two distinct points, there is a unique line passing through them.}",
          "justification": "Axiom: Only one straight line can pass through two given points P and Q."
        },
        {
          "stepNumber": 3,
          "statement": "Deduce contradiction:",
          "latex": "l = m \\quad (\\text{contradicting that } l \\text{ and } m \\text{ are distinct})",
          "justification": "Both lines pass through P and Q, so they must be the identical line."
        }
      ],
      "finalFormulaLatex": "|l \\cap m| \\le 1",
      "conclusion": "Our assumption was false. Two distinct lines cannot have more than one point in common."
    },
    "memoryLab": [
      {
        "title": "Axiom vs Postulate",
        "mnemonic": "Axioms = All Math; Postulates = Pure Geometry!",
        "meaning": "Axioms apply across all mathematical branches; postulates are specific to geometry.",
        "boardExamTip": "Postulate 5 is the Parallel Postulate; Playfair’s Axiom is its equivalent modern statement."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch5-1",
        "title": "Proving Midpoint Equality Using Euclid’s Axioms",
        "problemStatement": "If a point C lies between two points A and B such that AC = BC, prove that AC = 1/2 AB.",
        "given": [
          "C lies on AB",
          "AC = BC"
        ],
        "toFind": "Proof that AC = 1/2 AB",
        "strategy": "Use Euclid’s axiom: \"If equals are added to equals, the wholes are equal\".",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Given equality",
            "latex": "AC = BC",
            "explanation": "Given premise."
          },
          {
            "stepNumber": 2,
            "title": "Add AC to both sides",
            "latex": "AC + AC = BC + AC",
            "explanation": "Euclid Axiom 2: Adding equals to equals."
          },
          {
            "stepNumber": 3,
            "title": "Substitute whole line AB",
            "latex": "2AC = AB",
            "explanation": "Since C lies between A and B, AC + BC coincides with AB."
          },
          {
            "stepNumber": 4,
            "title": "Divide by 2",
            "latex": "AC = \\frac{1}{2} AB",
            "explanation": "Euclid Axiom 7: Halves of the same things are equal."
          }
        ],
        "commonMistake": "Asserting AC = 1/2 AB without stating which axioms justify each step.",
        "sanityCheck": "AC = BC and AC + BC = AB implies 2AC = AB. Correct!"
      },
      {
        "id": "we-c9-ch5-2",
        "title": "Uniqueness of the Midpoint of a Line Segment",
        "problemStatement": "Prove that every line segment has one and only one midpoint.",
        "given": [
          "Line segment AB"
        ],
        "toFind": "Proof that midpoint of AB is unique",
        "strategy": "Proof by contradiction: Assume there are two distinct midpoints C and D on AB and apply Euclid’s Axioms.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Assume two distinct midpoints",
            "latex": "AC = \\frac{1}{2}AB \\quad \\text{and} \\quad AD = \\frac{1}{2}AB",
            "explanation": "By definition of midpoint, each divides AB into two equal halves."
          },
          {
            "stepNumber": 2,
            "title": "Apply Euclid’s Axiom 1",
            "latex": "AC = AD",
            "explanation": "Things which are equal to the same thing are equal to one another."
          },
          {
            "stepNumber": 3,
            "title": "Conclude coincidence",
            "latex": "AC = AD \\implies C \\text{ must coincide with } D",
            "explanation": "This is possible only if C and D are the same point (Axiom 4: Things which coincide with one another are equal)."
          }
        ],
        "commonMistake": "Assuming uniqueness without invoking Euclid’s axioms.",
        "sanityCheck": "A point cannot simultaneously divide a 10 cm segment into 5 cm and another different length. Uniqueness verified!"
      }
    ],
    "problemSolvingStrategies": [
      "In Euclidean geometry proofs, explicitly cite the relevant axiom or postulate for every deduction."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch5-1",
        "type": "mcq",
        "prompt": "How many straight lines can pass through two distinct points?",
        "options": [
          "Only one",
          "Two",
          "Infinitely many",
          "Zero"
        ],
        "correctAnswer": "Only one",
        "hints": [
          "Euclid’s Postulate 1 states that a unique straight line passes through any two points."
        ],
        "explanation": "Given two distinct points, there is a unique straight line passing through them.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch5-2",
        "type": "mcq",
        "prompt": "\"The whole is greater than the part\" is Euclid’s:",
        "options": [
          "Axiom 5",
          "Postulate 1",
          "Postulate 5",
          "Definition 1"
        ],
        "correctAnswer": "Axiom 5",
        "hints": [
          "It is a Common Notion (Axiom), not a postulate."
        ],
        "explanation": "Axiom 5 of Euclid states that the whole is greater than the part.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch5-3",
        "type": "numerical",
        "prompt": "According to Euclid’s 5th postulate, two lines intersect on the side where the interior angles sum to less than how many right angles?",
        "correctAnswer": 2,
        "tolerance": 0,
        "hints": [
          "Two right angles = 180°."
        ],
        "explanation": "The lines meet on that side on which the sum of angles is less than two right angles (180°).",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Axioms are universal mathematical truths; postulates are geometry-specific assumptions.",
        "Postulate 1: Unique line passes through two points.",
        "Postulate 5: Parallel postulate governing convergence of lines.",
        "Playfair’s axiom is equivalent to Postulate 5."
      ],
      "commonTraps": [
        "Confusing Euclid’s axioms with theorems (theorems require proof; axioms do not)."
      ]
    },
    "labId": "linear-equations",
    "labTitle": "Introduction to Euclid's Geometry"
  },
  {
    "id": "c9-s1-ch6",
    "classGrade": 9,
    "semester": 1,
    "chapterNumber": 6,
    "title": "Lines and Angles",
    "shortDescription": "Master linear pairs, vertically opposite angles, transversal theorems with parallel lines, and the triangle angle sum theorem.",
    "whyItMatters": "Lines and angles govern architectural framing, bridge trusses, computer vision edge detection, and astronomical triangulation.",
    "priorKnowledge": [
      "Types of angles: acute, right, obtuse, straight, and reflex",
      "Complementary (sum 90°) and supplementary (sum 180°) angle pairs"
    ],
    "vocabulary": [
      {
        "term": "Linear Pair",
        "definition": "A pair of adjacent angles whose non-common arms form a straight line (sum = 180°)."
      },
      {
        "term": "Vertically Opposite Angles",
        "definition": "Two non-adjacent angles formed by two intersecting lines; they are always equal."
      },
      {
        "term": "Transversal",
        "definition": "A line that intersects two or more lines at distinct points."
      },
      {
        "term": "Alternate Interior Angles",
        "definition": "Angles on opposite sides of transversal between the two parallel lines (e.g. ∠3 and ∠5)."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch6-linear-pair",
        "name": "Linear Pair Axiom",
        "latex": "\\angle 1 + \\angle 2 = 180^\\circ",
        "description": "If a ray stands on a straight line, the sum of two adjacent angles formed is 180°.",
        "variables": [
          {
            "symbol": "\\angle 1, \\angle 2",
            "meaning": "Adjacent angles forming a straight line"
          }
        ],
        "chapterId": "c9-s1-ch6",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Non-common arms form an exact straight line.",
        "whenToUse": "Finding unknown adjacent angles on a straight line.",
        "workedExample": {
          "problem": "Angles in a linear pair are in ratio 2 : 3. Find the angles.",
          "solution": "Let angles be 2x and 3x. 2x + 3x = 180° => 5x = 180° => x = 36°. Angles are 72° and 108°."
        }
      },
      {
        "id": "f-c9-ch6-vert-opp",
        "name": "Vertically Opposite Angles Theorem",
        "latex": "\\angle 1 = \\angle 3, \\quad \\angle 2 = \\angle 4",
        "description": "When two straight lines intersect, opposite angles formed are equal.",
        "variables": [
          {
            "symbol": "\\angle 1, \\angle 3",
            "meaning": "Vertically opposite pair"
          }
        ],
        "chapterId": "c9-s1-ch6",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Formed by two intersecting straight lines.",
        "whenToUse": "Equating opposite angles at an intersection point."
      },
      {
        "id": "f-c9-ch6-transversal",
        "name": "Parallel Lines Transversal Theorems",
        "latex": "l \\parallel m \\implies \\angle 3 = \\angle 5 \\quad (\\text{Alt. Int.}), \\quad \\angle 4 + \\angle 5 = 180^\\circ \\quad (\\text{Co-Int.})",
        "description": "Transversal intersecting parallel lines produces equal alternate interior angles and supplementary consecutive interior angles.",
        "variables": [
          {
            "symbol": "l, m",
            "meaning": "Parallel lines"
          }
        ],
        "chapterId": "c9-s1-ch6",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Lines must be strictly parallel.",
        "whenToUse": "Finding angles between parallel lines crossed by transversal."
      },
      {
        "id": "f-c9-ch6-tri-sum",
        "name": "Triangle Angle Sum Theorem",
        "latex": "\\angle A + \\angle B + \\angle C = 180^\\circ",
        "description": "The sum of all three interior angles of a triangle in Euclidean plane is always 180°.",
        "variables": [
          {
            "symbol": "\\angle A, \\angle B, \\angle C",
            "meaning": "Interior angles of triangle"
          }
        ],
        "chapterId": "c9-s1-ch6",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Euclidean flat geometry.",
        "whenToUse": "Finding third angle of triangle when two are known."
      },
      {
        "id": "f-c9-ch6-ext-angle",
        "name": "Exterior Angle Theorem of Triangle",
        "latex": "\\angle \\text{ext} = \\angle A + \\angle B",
        "description": "An exterior angle of a triangle equals the sum of its two interior opposite angles.",
        "variables": [
          {
            "symbol": "\\angle \\text{ext}",
            "meaning": "Exterior angle formed by extending a side"
          },
          {
            "symbol": "\\angle A, \\angle B",
            "meaning": "Two opposite interior angles"
          }
        ],
        "chapterId": "c9-s1-ch6",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Side extended in a straight line.",
        "whenToUse": "Relating external angles to interior opposite angles."
      }
    ],
    "derivation": {
      "title": "Proof: Triangle Angle Sum is 180°",
      "targetFormula": "\\angle A + \\angle B + \\angle C = 180^\\circ",
      "objective": "Prove that the interior angles of any triangle sum to 180°.",
      "startingObservation": "Let ABC be a triangle. Through vertex A, draw line XAY parallel to base BC.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Angle sum on straight line XAY at vertex A:",
          "latex": "\\angle XAB + \\angle BAC + \\angle YAC = 180^\\circ",
          "justification": "Angles forming a straight line sum to 180°."
        },
        {
          "stepNumber": 2,
          "statement": "Identify alternate interior angles (XAY || BC):",
          "latex": "\\angle XAB = \\angle B \\quad \\text{and} \\quad \\angle YAC = \\angle C",
          "justification": "Transversal lines AB and AC cross parallel lines XAY and BC."
        },
        {
          "stepNumber": 3,
          "statement": "Substitute alternate angles into step 1:",
          "latex": "\\angle B + \\angle BAC + \\angle C = 180^\\circ",
          "justification": "Substitution of equal angle values."
        }
      ],
      "finalFormulaLatex": "\\angle A + \\angle B + \\angle C = 180^\\circ",
      "conclusion": "The sum of the three angles of a triangle is 180°."
    },
    "memoryLab": [
      {
        "title": "Z-Angles and C-Angles",
        "mnemonic": "Z for Alternate (Equal), C for Co-Interior (180°)!",
        "meaning": "Lines forming a Z shape have equal alternate interior angles. Lines forming a C or U shape have co-interior angles summing to 180°.",
        "boardExamTip": "Always check that the lines forming the Z are PARALLEL before equating them!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch6-1",
        "title": "Finding Angles with Parallel Lines and Transversal",
        "problemStatement": "In the figure, AB || CD and transversal t intersects them. If ∠1 = 120°, find all other angles.",
        "given": [
          "AB || CD",
          "∠1 = 120°"
        ],
        "toFind": "All angles ∠2 through ∠8",
        "strategy": "Use vertically opposite, linear pair, and corresponding angles.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Linear pair for ∠2",
            "latex": "\\angle 2 = 180^\\circ - 120^\\circ = 60^\\circ",
            "explanation": "∠1 and ∠2 form a linear pair."
          },
          {
            "stepNumber": 2,
            "title": "Vertically opposite angles",
            "latex": "\\angle 3 = \\angle 1 = 120^\\circ, \\quad \\angle 4 = \\angle 2 = 60^\\circ",
            "explanation": "Vertically opposite angles are equal."
          },
          {
            "stepNumber": 3,
            "title": "Corresponding angles on CD",
            "latex": "\\angle 5 = \\angle 1 = 120^\\circ, \\quad \\angle 6 = \\angle 2 = 60^\\circ",
            "explanation": "Corresponding angles are equal for parallel lines."
          },
          {
            "stepNumber": 4,
            "title": "Remaining angles on CD",
            "latex": "\\angle 7 = 120^\\circ, \\quad \\angle 8 = 60^\\circ",
            "explanation": "Vertically opposite to ∠5 and ∠6."
          }
        ],
        "commonMistake": "Claiming ∠1 + ∠5 = 180° (they are corresponding, so they are equal!).",
        "sanityCheck": "All obtuse angles are 120°; all acute angles are 60°. Sum of any adjacent pair is 180°. Verified!"
      },
      {
        "id": "we-c9-ch6-2",
        "title": "Exterior Angle Calculation",
        "problemStatement": "An exterior angle of a triangle is 110°, and one of the interior opposite angles is 40°. Find the other interior opposite angle and the third angle.",
        "given": [
          "Exterior angle = 110°",
          "Interior opposite angle ∠A = 40°"
        ],
        "toFind": "Interior opposite angle ∠B and third angle ∠C",
        "strategy": "Exterior angle = ∠A + ∠B; third angle is linear pair with exterior angle.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Apply Exterior Angle Theorem",
            "latex": "110^\\circ = 40^\\circ + \\angle B \\implies \\angle B = 70^\\circ",
            "explanation": "Exterior angle equals sum of interior opposite angles."
          },
          {
            "stepNumber": 2,
            "title": "Find third angle ∠C",
            "latex": "\\angle C = 180^\\circ - 110^\\circ = 70^\\circ",
            "explanation": "Linear pair with exterior angle."
          }
        ],
        "commonMistake": "Subtracting 40° from 180° instead of 110°.",
        "sanityCheck": "Interior angles: 40° + 70° + 70° = 180°. Perfect!"
      }
    ],
    "problemSolvingStrategies": [
      "Look for parallel lines: immediately identify corresponding (F-shape), alternate interior (Z-shape), or co-interior (C-shape) angles.",
      "If given angle ratios (e.g. 3 : 5), express them as 3x and 5x and use linear pair sum 180° to solve for x."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch6-1",
        "type": "numerical",
        "prompt": "If two adjacent angles forming a linear pair are in ratio 4 : 5, find the measure of the smaller angle in degrees.",
        "correctAnswer": 80,
        "tolerance": 0,
        "hints": [
          "4x + 5x = 180° => 9x = 180° => x = 20°.",
          "Smaller angle = 4x = 4(20°)."
        ],
        "explanation": "9x = 180° => x = 20°. Smaller angle = 4(20°) = 80°.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch6-2",
        "type": "numerical",
        "prompt": "In a triangle ABC, ∠A = 55° and ∠B = 65°. What is the measure of exterior angle at vertex C?",
        "correctAnswer": 120,
        "tolerance": 0,
        "hints": [
          "Exterior angle at C = ∠A + ∠B."
        ],
        "explanation": "Exterior angle = 55° + 65° = 120°.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch6-3",
        "type": "mcq",
        "prompt": "If l || m and a transversal cuts them, the bisectors of any pair of alternate interior angles are:",
        "options": [
          "Parallel to each other",
          "Perpendicular to each other",
          "Intersecting at 45°",
          "Coincident"
        ],
        "correctAnswer": "Parallel to each other",
        "hints": [
          "Each half of alternate interior angles is equal, forming alternate interior angles for the bisectors."
        ],
        "explanation": "The bisectors form equal alternate angles with the transversal, so they are parallel.",
        "difficulty": "Advanced"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Linear pair angles sum to 180°.",
        "Vertically opposite angles are always equal.",
        "If lines are parallel: corresponding angles are equal, alternate interior angles are equal, co-interior angles sum to 180°.",
        "Triangle angle sum is 180°; exterior angle = sum of interior opposite angles."
      ],
      "commonTraps": [
        "Assuming alternate angles are equal when lines are NOT given as parallel."
      ]
    },
    "labId": "similar-triangles",
    "labTitle": "Lines and Angles"
  },
  {
    "id": "c9-s2-ch7",
    "classGrade": 9,
    "semester": 2,
    "chapterNumber": 7,
    "title": "Triangles",
    "shortDescription": "Master congruence criteria (SAS, ASA, AAS, SSS, RHS), CPCT, and properties of isosceles & equilateral triangles.",
    "whyItMatters": "Triangles are the rigid building blocks of structural engineering, truss bridges, architectural geodesic domes, and 3D computer graphics meshes.",
    "priorKnowledge": [
      "Types of triangles classified by sides (equilateral, isosceles, scalene) and angles (acute, right, obtuse)",
      "Triangle angle sum property (180°)",
      "Basic concept of geometric congruence (exact superimposition)"
    ],
    "vocabulary": [
      {
        "term": "Congruent Figures",
        "definition": "Two geometric figures that have the exact same shape and the exact same size; one superimposes exactly onto the other."
      },
      {
        "term": "CPCT",
        "definition": "Corresponding Parts of Congruent Triangles; corresponding sides and angles of congruent triangles are always equal."
      },
      {
        "term": "Included Angle",
        "definition": "The angle formed between two specific specified sides of a polygon (e.g. ∠B between sides AB and BC)."
      },
      {
        "term": "Isosceles Triangle",
        "definition": "A triangle with at least two equal sides and equal base angles."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch7-criteria",
        "name": "The 5 Congruence Criteria",
        "latex": "\\triangle ABC \\cong \\triangle DEF \\iff \\text{SAS, ASA, AAS, SSS, or RHS}",
        "description": "Five sufficient conditions under which two triangles are guaranteed to be congruent.",
        "variables": [
          {
            "symbol": "SAS",
            "meaning": "Two sides and the included angle"
          },
          {
            "symbol": "ASA",
            "meaning": "Two angles and the included side"
          },
          {
            "symbol": "AAS",
            "meaning": "Two angles and any corresponding side"
          },
          {
            "symbol": "SSS",
            "meaning": "All three corresponding sides"
          },
          {
            "symbol": "RHS",
            "meaning": "Right angle, Hypotenuse, and one corresponding Side"
          }
        ],
        "chapterId": "c9-s2-ch7",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "AAA and SSA (ASS) do NOT guarantee congruence!",
        "whenToUse": "Proving two triangles congruent in geometric deductions.",
        "mnemonic": "Remember: AAA only proves similarity, not congruence!"
      },
      {
        "id": "f-c9-ch7-isosceles",
        "name": "Isosceles Triangle Base Angles Theorem & Converse",
        "latex": "AB = AC \\iff \\angle B = \\angle C",
        "description": "Angles opposite to equal sides of an isosceles triangle are equal, and sides opposite to equal angles are equal.",
        "variables": [
          {
            "symbol": "AB, AC",
            "meaning": "Equal sides of isosceles triangle"
          },
          {
            "symbol": "\\angle B, \\angle C",
            "meaning": "Equal base angles"
          }
        ],
        "chapterId": "c9-s2-ch7",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Holds in both forward and converse directions.",
        "whenToUse": "Deducing angle equality from side equality or vice versa in triangles.",
        "workedExample": {
          "problem": "In isosceles triangle ABC with AB = AC, vertex angle ∠A = 40°. Find base angles ∠B and ∠C.",
          "solution": "∠B = ∠C. ∠A + ∠B + ∠C = 180° => 40° + 2∠B = 180° => 2∠B = 140° => ∠B = ∠C = 70°."
        }
      },
      {
        "id": "f-c9-ch7-equilateral",
        "name": "Equilateral Triangle Equal Angles Property",
        "latex": "AB = BC = CA \\implies \\angle A = \\angle B = \\angle C = 60^\\circ",
        "description": "In an equilateral triangle, all three sides are equal and each interior angle measures exactly 60°.",
        "variables": [
          {
            "symbol": "AB, BC, CA",
            "meaning": "Equal sides of equilateral triangle"
          }
        ],
        "chapterId": "c9-s2-ch7",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "All three sides must be of equal length.",
        "whenToUse": "Analyzing equilateral geometric figures."
      },
      {
        "id": "f-c9-ch7-rhs",
        "name": "RHS Congruence Theorem",
        "latex": "\\angle B = \\angle E = 90^\\circ \\land AC = DF \\land AB = DE \\implies \\triangle ABC \\cong \\triangle DEF",
        "description": "If the hypotenuse and one side of a right triangle are equal to the hypotenuse and one side of another right triangle, the triangles are congruent.",
        "variables": [
          {
            "symbol": "AC, DF",
            "meaning": "Hypotenuses"
          },
          {
            "symbol": "AB, DE",
            "meaning": "Legs"
          }
        ],
        "chapterId": "c9-s2-ch7",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Must be right-angled triangles with matching hypotenuse.",
        "whenToUse": "Proving right-angled triangles congruent."
      }
    ],
    "derivation": {
      "title": "Proof: Angles Opposite Equal Sides of an Isosceles Triangle are Equal",
      "targetFormula": "AB = AC \\implies \\angle B = \\angle C",
      "objective": "Prove that if two sides of a triangle are equal, the angles opposite to them are equal.",
      "startingObservation": "Let ABC be a triangle where AB = AC. Draw the angle bisector AD of ∠A, meeting base BC at point D.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Compare triangles ABD and ACD:",
          "latex": "AB = AC \\quad (\\text{Given})",
          "justification": "Sides of the isosceles triangle are given equal."
        },
        {
          "stepNumber": 2,
          "statement": "Identify the bisected angles:",
          "latex": "\\angle BAD = \\angle CAD",
          "justification": "By construction, AD is the angle bisector of ∠A."
        },
        {
          "stepNumber": 3,
          "statement": "Identify the common side:",
          "latex": "AD = AD \\quad (\\text{Common Side})",
          "justification": "Shared arm in both triangles."
        },
        {
          "stepNumber": 4,
          "statement": "Apply SAS Congruence Rule:",
          "latex": "\\triangle ABD \\cong \\triangle ACD \\quad (\\text{by SAS})",
          "justification": "Two sides and the included angle match identically."
        },
        {
          "stepNumber": 5,
          "statement": "Deduce corresponding angles (CPCT):",
          "latex": "\\angle B = \\angle C",
          "justification": "Corresponding Parts of Congruent Triangles are equal."
        }
      ],
      "finalFormulaLatex": "\\angle B = \\angle C",
      "conclusion": "Hence, angles opposite to equal sides of an isosceles triangle are proved equal."
    },
    "memoryLab": [
      {
        "title": "CPCT Superpower",
        "mnemonic": "Prove Congruence First, get 6 Equalities Free!",
        "meaning": "Once two triangles are congruent by SAS/ASA/SSS/RHS, all 3 corresponding sides and all 3 corresponding angles become equal automatically.",
        "boardExamTip": "Always write triangle vertices in corresponding order (e.g. △ABC ≅ △DEF means A matches D, B matches E, C matches F)."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch7-1",
        "title": "Proving Congruence Using SAS Rule",
        "problemStatement": "In quadrilateral ACBD, AC = AD and AB bisects ∠A. Prove that △ABC ≅ △ABD. What can you say about BC and BD?",
        "given": [
          "AC = AD",
          "AB bisects ∠A (∠CAB = ∠DAB)"
        ],
        "toFind": "Proof that △ABC ≅ △ABD, and relation between BC and BD",
        "strategy": "Compare △ABC and △ABD using SAS criterion.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "List matching elements",
            "latex": "AC = AD \\quad (\\text{Given}), \\quad \\angle CAB = \\angle DAB \\quad (\\text{AB bisects } \\angle A), \\quad AB = AB \\quad (\\text{Common})",
            "explanation": "Two sides and the included angle."
          },
          {
            "stepNumber": 2,
            "title": "Conclude congruence",
            "latex": "\\triangle ABC \\cong \\triangle ABD \\quad (\\text{by SAS rule})",
            "explanation": "SAS congruence criterion is satisfied."
          },
          {
            "stepNumber": 3,
            "title": "Deduce relation between BC and BD",
            "latex": "BC = BD \\quad (\\text{by CPCT})",
            "explanation": "Corresponding parts of congruent triangles are equal."
          }
        ],
        "commonMistake": "Writing △ABC ≅ △ADB with wrong vertex correspondence.",
        "sanityCheck": "All 3 conditions satisfied. BC = BD confirmed by CPCT."
      },
      {
        "id": "we-c9-ch7-2",
        "title": "Isosceles Triangle Base Angle Calculation",
        "problemStatement": "In △ABC, AB = AC. The bisectors of ∠B and ∠C intersect at O. If ∠A = 50°, find ∠BOC.",
        "given": [
          "AB = AC in △ABC",
          "∠A = 50°",
          "BO and CO are angle bisectors"
        ],
        "toFind": "Measure of ∠BOC",
        "strategy": "Find base angles ∠B and ∠C, take their halves in △OBC, then apply angle sum.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find base angles",
            "latex": "\\angle B = \\angle C = \\frac{180^\\circ - 50^\\circ}{2} = 65^\\circ",
            "explanation": "Isosceles triangle base angles are equal."
          },
          {
            "stepNumber": 2,
            "title": "Find half-angles in △OBC",
            "latex": "\\angle OBC = \\frac{65^\\circ}{2} = 32.5^\\circ, \\quad \\angle OCB = 32.5^\\circ",
            "explanation": "BO and CO bisect ∠B and ∠C."
          },
          {
            "stepNumber": 3,
            "title": "Angle sum in △OBC",
            "latex": "\\angle BOC = 180^\\circ - (32.5^\\circ + 32.5^\\circ) = 180^\\circ - 65^\\circ = 115^\\circ",
            "explanation": "Sum of angles in △OBC is 180°."
          }
        ],
        "commonMistake": "Assuming O is the center of a circle and applying 2 × ∠A (that applies to circumcenters, not angle bisectors/incenters!).",
        "sanityCheck": "∠BOC = 90° + ∠A/2 = 90° + 25° = 115°. Formula verified!"
      }
    ],
    "problemSolvingStrategies": [
      "Always draw a clear diagram and mark equal sides with tick marks and equal angles with arcs.",
      "Check if a side or angle is shared (common) between the two triangles—this provides one condition for free."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch7-1",
        "type": "mcq",
        "prompt": "Which of the following is NOT a criterion for congruence of triangles?",
        "options": [
          "SAS",
          "ASA",
          "AAA",
          "SSS"
        ],
        "correctAnswer": "AAA",
        "hints": [
          "AAA only ensures that the triangles have the same shape, not necessarily the same size (they are similar, not congruent)."
        ],
        "explanation": "AAA is a criterion for similarity, not congruence.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch7-2",
        "type": "numerical",
        "prompt": "In △PQR, PQ = PR and ∠P = 70°. Find the measure of ∠Q in degrees.",
        "correctAnswer": 55,
        "tolerance": 0,
        "hints": [
          "Since PQ = PR, ∠Q = ∠R.",
          "70° + 2∠Q = 180° => 2∠Q = 110°."
        ],
        "explanation": "∠Q = (180° - 70°) / 2 = 110° / 2 = 55°.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch7-3",
        "type": "mcq",
        "prompt": "In △ABC and △PQR, AB = PQ, BC = QR, and ∠B = ∠Q. The triangles are congruent by which rule?",
        "options": [
          "SAS",
          "ASA",
          "AAS",
          "RHS"
        ],
        "correctAnswer": "SAS",
        "hints": [
          "∠B is between AB and BC; ∠Q is between PQ and QR (included angles)."
        ],
        "explanation": "Two sides and the included angle match, which is the SAS criterion.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "5 Congruence rules: SAS, ASA, AAS, SSS, RHS.",
        "AAA and SSA do not guarantee congruence.",
        "In an isosceles triangle, angles opposite equal sides are equal.",
        "In an equilateral triangle, each angle is 60°."
      ],
      "commonTraps": [
        "Assuming SSA (two sides and a non-included angle) is a valid congruence test."
      ]
    },
    "labId": "similar-triangles",
    "labTitle": "Triangles"
  },
  {
    "id": "c9-s2-ch8",
    "classGrade": 9,
    "semester": 2,
    "chapterNumber": 8,
    "title": "Quadrilaterals",
    "shortDescription": "Explore parallelogram properties, rectangles, rhombuses, squares, and the powerful Mid-Point Theorem.",
    "whyItMatters": "Parallelogram linkages drive windshield wipers, robotic arms, vehicle suspensions, and structural quadrilateral frameworks.",
    "priorKnowledge": [
      "Basic definition of quadrilateral (4 sides, 4 vertices, 4 angles)",
      "Triangle congruence rules (SAS, SSS, ASA)",
      "Parallel line transversal angle theorems"
    ],
    "vocabulary": [
      {
        "term": "Parallelogram",
        "definition": "A quadrilateral whose opposite sides are parallel and equal."
      },
      {
        "term": "Rhombus",
        "definition": "A parallelogram with all four sides equal; its diagonals bisect each other at right angles (90°)."
      },
      {
        "term": "Rectangle",
        "definition": "A parallelogram with all four angles equal to 90°; its diagonals are equal."
      },
      {
        "term": "Mid-Point Theorem",
        "definition": "The line segment joining the mid-points of two sides of a triangle is parallel to the third side and half of it."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch8-angle-sum",
        "name": "Quadrilateral Angle Sum Property",
        "latex": "\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ",
        "description": "The sum of all four interior angles of any plane quadrilateral is 360°.",
        "variables": [
          {
            "symbol": "\\angle A, \\angle B, \\angle C, \\angle D",
            "meaning": "Four interior angles of quadrilateral"
          }
        ],
        "chapterId": "c9-s2-ch8",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Simple closed polygon with 4 straight sides.",
        "whenToUse": "Finding missing angle in any quadrilateral.",
        "workedExample": {
          "problem": "Angles of a quadrilateral are in ratio 3 : 5 : 9 : 13. Find all angles.",
          "solution": "3x + 5x + 9x + 13x = 360° => 30x = 360° => x = 12°. Angles are 36°, 60°, 108°, 156°."
        }
      },
      {
        "id": "f-c9-ch8-midpoint",
        "name": "The Mid-Point Theorem",
        "latex": "DE \\parallel BC \\quad \\text{and} \\quad DE = \\frac{1}{2} BC",
        "description": "The line segment joining the midpoints of two sides of a triangle is parallel to the third side and equal to half its length.",
        "variables": [
          {
            "symbol": "D, E",
            "meaning": "Midpoints of sides AB and AC"
          },
          {
            "symbol": "BC",
            "meaning": "Third base side of triangle"
          }
        ],
        "chapterId": "c9-s2-ch8",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "D and E must be exact midpoints of the two sides.",
        "whenToUse": "Finding lengths and proving parallelism in triangles and quadrilaterals.",
        "mnemonic": "Midpoints joined? Half the base and parallel!"
      },
      {
        "id": "f-c9-ch8-conv-midpoint",
        "name": "Converse of Mid-Point Theorem",
        "latex": "D \\text{ is midpoint of } AB \\land DE \\parallel BC \\implies E \\text{ is midpoint of } AC",
        "description": "The line drawn through the midpoint of one side of a triangle parallel to another side bisects the third side.",
        "variables": [
          {
            "symbol": "D",
            "meaning": "Midpoint of AB"
          },
          {
            "symbol": "DE \\parallel BC",
            "meaning": "Line parallel to base BC"
          }
        ],
        "chapterId": "c9-s2-ch8",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "One midpoint and one parallel line given.",
        "whenToUse": "Proving that a line bisects the third side of a triangle."
      },
      {
        "id": "f-c9-ch8-parallelogram",
        "name": "Parallelogram Diagonal Bisector Property",
        "latex": "OA = OC \\quad \\text{and} \\quad OB = OD",
        "description": "The diagonals of a parallelogram bisect each other; in a rhombus they bisect perpendicularly at 90°.",
        "variables": [
          {
            "symbol": "O",
            "meaning": "Point of intersection of diagonals AC and BD"
          }
        ],
        "chapterId": "c9-s2-ch8",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Opposite sides parallel.",
        "whenToUse": "Finding diagonal segments and proving figures are parallelograms."
      }
    ],
    "derivation": {
      "title": "Proof of the Mid-Point Theorem",
      "targetFormula": "DE \\parallel BC \\land DE = \\frac{1}{2} BC",
      "objective": "Prove that the segment joining midpoints of two sides of △ABC is parallel to BC and half of it.",
      "startingObservation": "Let D and E be midpoints of AB and AC. Extend DE to F such that EF = DE, and join CF.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Compare △ADE and △CFE:",
          "latex": "AE = CE \\quad (\\text{E is midpoint}), \\quad \\angle AED = \\angle CEF \\quad (\\text{Vert. Opp.}), \\quad DE = EF \\quad (\\text{Construction})",
          "justification": "By SAS congruence rule, △ADE ≅ △CFE."
        },
        {
          "stepNumber": 2,
          "statement": "Deduce CPCT equalities:",
          "latex": "AD = CF \\quad \\text{and} \\quad \\angle ADE = \\angle CFE",
          "justification": "Corresponding parts of congruent triangles."
        },
        {
          "stepNumber": 3,
          "statement": "Deduce parallelism and side equality of BCFD:",
          "latex": "AD \\parallel CF \\implies BD \\parallel CF \\quad \\text{and} \\quad BD = CF \\quad (\\text{since } BD = AD)",
          "justification": "A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram."
        },
        {
          "stepNumber": 4,
          "statement": "Conclude properties of DFBC:",
          "latex": "DF \\parallel BC \\implies DE \\parallel BC, \\quad DF = BC \\implies 2DE = BC \\implies DE = \\frac{1}{2} BC",
          "justification": "Opposite sides of parallelogram BCFD are equal and parallel."
        }
      ],
      "finalFormulaLatex": "DE \\parallel BC \\quad \\text{and} \\quad DE = \\frac{1}{2} BC",
      "conclusion": "The Mid-Point Theorem is completely proved."
    },
    "memoryLab": [
      {
        "title": "Special Parallelogram Hierarchy",
        "mnemonic": "All Rhombuses and Rectangles are Parallelograms; Squares are Both!",
        "meaning": "Rhombus has equal sides; Rectangle has 90° angles; Square has equal sides AND 90° angles.",
        "boardExamTip": "Diagonals of a rhombus are NOT necessarily equal; they bisect at 90°. Diagonals of a rectangle ARE equal."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch8-1",
        "title": "Mid-Point Theorem Perimeter Application",
        "problemStatement": "In △ABC, AB = 6 cm, BC = 8 cm, and AC = 10 cm. If D, E, F are the midpoints of AB, BC, and CA respectively, find the perimeter of △DEF.",
        "given": [
          "Sides of △ABC: 6 cm, 8 cm, 10 cm",
          "D, E, F are midpoints"
        ],
        "toFind": "Perimeter of △DEF",
        "strategy": "Apply Mid-Point Theorem to each side: DE = 1/2 AC, EF = 1/2 AB, FD = 1/2 BC.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find DE",
            "latex": "DE = \\frac{1}{2} AC = \\frac{1}{2}(10) = 5 \\text{ cm}",
            "explanation": "Mid-Point Theorem on side AC."
          },
          {
            "stepNumber": 2,
            "title": "Find EF",
            "latex": "EF = \\frac{1}{2} AB = \\frac{1}{2}(6) = 3 \\text{ cm}",
            "explanation": "Mid-Point Theorem on side AB."
          },
          {
            "stepNumber": 3,
            "title": "Find FD",
            "latex": "FD = \\frac{1}{2} BC = \\frac{1}{2}(8) = 4 \\text{ cm}",
            "explanation": "Mid-Point Theorem on side BC."
          },
          {
            "stepNumber": 4,
            "title": "Sum perimeter",
            "latex": "\\text{Perimeter} = 5 + 3 + 4 = 12 \\text{ cm}",
            "explanation": "Add the three sides."
          }
        ],
        "commonMistake": "Forgetting that perimeter of medial triangle is exactly half the perimeter of original triangle: (6 + 8 + 10)/2 = 12 cm.",
        "sanityCheck": "Total perimeter of △ABC = 24 cm. 24 / 2 = 12 cm. Perfect!"
      },
      {
        "id": "we-c9-ch8-2",
        "title": "Applying Midpoint Theorem to Quadrilateral Diagonals",
        "problemStatement": "Show that the line segments joining the midpoints of the opposite sides of any quadrilateral bisect each other.",
        "given": [
          "Quadrilateral ABCD with P, Q, R, S as midpoints of AB, BC, CD, DA respectively"
        ],
        "toFind": "Proof that PR and QS bisect each other",
        "strategy": "Join AC. Show that PQRS is a parallelogram using the Midpoint Theorem on triangles ABC and ADC. The diagonals of a parallelogram bisect each other.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Apply Midpoint Theorem to triangle ABC",
            "latex": "PQ \\parallel AC \\quad \\text{and} \\quad PQ = \\frac{1}{2}AC",
            "explanation": "P and Q are midpoints of AB and BC."
          },
          {
            "stepNumber": 2,
            "title": "Apply Midpoint Theorem to triangle ADC",
            "latex": "SR \\parallel AC \\quad \\text{and} \\quad SR = \\frac{1}{2}AC",
            "explanation": "S and R are midpoints of DA and CD."
          },
          {
            "stepNumber": 3,
            "title": "Prove PQRS is a parallelogram",
            "latex": "PQ \\parallel SR \\quad \\text{and} \\quad PQ = SR \\implies PQRS \\text{ is a parallelogram}",
            "explanation": "A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram."
          },
          {
            "stepNumber": 4,
            "title": "Conclude bisection",
            "latex": "PR \\text{ and } QS \\text{ bisect each other}",
            "explanation": "Diagonals of parallelogram PQRS are PR and QS, which bisect each other."
          }
        ],
        "commonMistake": "Forgetting that PR and QS are the diagonals of the inner quadrilateral PQRS.",
        "sanityCheck": "Holds for squares, rectangles, rhombuses, and irregular quadrilaterals universally. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "Whenever you see midpoints of sides in a triangle, immediately suspect the Mid-Point Theorem.",
      "To prove a quadrilateral is a parallelogram, show either: (1) both pairs of opposite sides are parallel, or (2) one pair of opposite sides is both equal and parallel."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch8-1",
        "type": "numerical",
        "prompt": "Three angles of a quadrilateral are 75°, 90°, and 75°. Find the fourth angle in degrees.",
        "correctAnswer": 120,
        "tolerance": 0,
        "hints": [
          "Sum of angles in quadrilateral = 360°.",
          "75° + 90° + 75° = 240°. Fourth angle = 360° - 240°."
        ],
        "explanation": "Fourth angle = 360° - (75° + 90° + 75°) = 360° - 240° = 120°.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch8-2",
        "type": "numerical",
        "prompt": "In △ABC, D and E are midpoints of AB and AC. If BC = 14 cm, what is the length of DE in cm?",
        "correctAnswer": 7,
        "tolerance": 0,
        "hints": [
          "By Mid-Point Theorem, DE = 1/2 BC."
        ],
        "explanation": "DE = 1/2 (14) = 7 cm.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch8-3",
        "type": "mcq",
        "prompt": "The diagonals of a rhombus:",
        "options": [
          "Are equal in length",
          "Bisect each other at right angles",
          "Are parallel",
          "Do not bisect each other"
        ],
        "correctAnswer": "Bisect each other at right angles",
        "hints": [
          "In a rhombus, all sides are equal, which forces the diagonals to meet orthogonally at 90°."
        ],
        "explanation": "Diagonals of a rhombus bisect each other perpendicularly at 90°.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Sum of angles of a quadrilateral is 360°.",
        "A diagonal divides a parallelogram into two congruent triangles.",
        "Diagonals of a parallelogram bisect each other.",
        "The Mid-Point Theorem: Segment joining midpoints is parallel to base and half its length."
      ],
      "commonTraps": [
        "Assuming diagonals of every parallelogram are equal (only true for rectangles and squares)."
      ]
    },
    "labId": "similar-triangles",
    "labTitle": "Quadrilaterals"
  },
  {
    "id": "c9-s2-ch9",
    "classGrade": 9,
    "semester": 2,
    "chapterNumber": 9,
    "title": "Circles",
    "shortDescription": "Master chord properties, angles subtended by arcs, angle in a semicircle, and cyclic quadrilaterals.",
    "whyItMatters": "Circles define rotational mechanics, orbits of planets and satellites, gears, bearings, and circular radar sweeps.",
    "priorKnowledge": [
      "Basic parts of circle: radius, diameter, chord, arc, segment, sector",
      "Right angles and Pythagoras theorem"
    ],
    "vocabulary": [
      {
        "term": "Chord",
        "definition": "A line segment joining any two points on the circumference of a circle."
      },
      {
        "term": "Arc",
        "definition": "A continuous piece of the circle between two points (minor arc or major arc)."
      },
      {
        "term": "Cyclic Quadrilateral",
        "definition": "A quadrilateral whose all four vertices lie on the circumference of a circle."
      },
      {
        "term": "Subtended Angle",
        "definition": "The angle formed by rays from the endpoints of an arc to a specific point."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch9-angle-center",
        "name": "Angle Subtended by Arc at Center Theorem",
        "latex": "\\angle AOB = 2 \\angle APB",
        "description": "The angle subtended by an arc at the center of a circle is double the angle subtended by it at any point on the remaining part of the circle.",
        "variables": [
          {
            "symbol": "\\angle AOB",
            "meaning": "Central angle subtended by arc AB"
          },
          {
            "symbol": "\\angle APB",
            "meaning": "Inscribed angle on circumference"
          }
        ],
        "chapterId": "c9-s2-ch9",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "P lies on the remaining part of the circle.",
        "whenToUse": "Relating central angles to angles at the circumference.",
        "workedExample": {
          "problem": "If ∠AOB = 110°, find ∠APB on the circumference.",
          "solution": "∠APB = 1/2 ∠AOB = 110° / 2 = 55°."
        }
      },
      {
        "id": "f-c9-ch9-semicircle",
        "name": "Angle in a Semicircle Theorem",
        "latex": "\\angle APB = 90^\\circ \\quad (AB \\text{ is diameter})",
        "description": "The angle inscribed in a semicircle is always a right angle (90°).",
        "variables": [
          {
            "symbol": "AB",
            "meaning": "Diameter passing through circle center O"
          }
        ],
        "chapterId": "c9-s2-ch9",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "AB must be a diameter passing through the center.",
        "whenToUse": "Finding right triangles inscribed inside circles."
      },
      {
        "id": "f-c9-ch9-same-segment",
        "name": "Angles in the Same Segment Theorem",
        "latex": "\\angle APB = \\angle AQB",
        "description": "Angles subtended by the same chord or arc in the same segment of a circle are equal.",
        "variables": [
          {
            "symbol": "P, Q",
            "meaning": "Points on the same circular arc"
          }
        ],
        "chapterId": "c9-s2-ch9",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "Points must lie in the same segment (major or minor).",
        "whenToUse": "Equating inscribed angles sharing the same base chord."
      },
      {
        "id": "f-c9-ch9-cyclic-quad",
        "name": "Cyclic Quadrilateral Opposite Angles Theorem",
        "latex": "\\angle A + \\angle C = 180^\\circ, \\quad \\angle B + \\angle D = 180^\\circ",
        "description": "The sum of either pair of opposite angles of a cyclic quadrilateral is 180° (supplementary).",
        "variables": [
          {
            "symbol": "\\angle A, \\angle C",
            "meaning": "Opposite angles of cyclic quadrilateral"
          }
        ],
        "chapterId": "c9-s2-ch9",
        "classGrade": 9,
        "category": "Geometry",
        "conditions": "All 4 vertices must lie on the circle.",
        "whenToUse": "Finding unknown angles in cyclic quadrilaterals.",
        "workedExample": {
          "problem": "In cyclic quadrilateral ABCD, ∠A = 2x + 4 and ∠C = x + 10. Find x.",
          "solution": "∠A + ∠C = 180° => 3x + 14 = 180° => 3x = 166 => standard formulation."
        },
        "mnemonic": "Cyclic quad? Opposite angles always add to 180°!"
      }
    ],
    "derivation": {
      "title": "Proof: Angle at Center is Double the Angle at Circumference",
      "targetFormula": "\\angle AOB = 2 \\angle APB",
      "objective": "Prove that the central angle ∠AOB is twice the inscribed angle ∠APB.",
      "startingObservation": "Let arc AB subtend ∠AOB at center O and ∠APB at point P on the circle. Draw line PO and extend it to Q.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Examine △OPA:",
          "latex": "OP = OA = r \\implies \\angle OPA = \\angle OAP",
          "justification": "Radii of the circle are equal, making △OPA an isosceles triangle."
        },
        {
          "stepNumber": 2,
          "statement": "Apply exterior angle property to △OPA:",
          "latex": "\\angle AOQ = \\angle OPA + \\angle OAP = 2 \\angle OPA",
          "justification": "Exterior angle of a triangle equals the sum of interior opposite angles."
        },
        {
          "stepNumber": 3,
          "statement": "Similarly for △OPB:",
          "latex": "\\angle BOQ = \\angle OPB + \\angle OBP = 2 \\angle OPB",
          "justification": "Same exterior angle property on isosceles △OPB."
        },
        {
          "stepNumber": 4,
          "statement": "Add both angle equations:",
          "latex": "\\angle AOQ + \\angle BOQ = 2(\\angle OPA + \\angle OPB) \\implies \\angle AOB = 2 \\angle APB",
          "justification": "Sum of adjacent angles."
        }
      ],
      "finalFormulaLatex": "\\angle AOB = 2 \\angle APB",
      "conclusion": "The angle subtended by an arc at the center is double the angle subtended at the circumference."
    },
    "memoryLab": [
      {
        "title": "Center is Double",
        "mnemonic": "Center is 2x, Circumference is 1x!",
        "meaning": "The central angle is twice as large as the inscribed angle for the same arc.",
        "boardExamTip": "For reflex angles at the center (arc > semicircle), the reflex central angle is 2 times the inscribed angle!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch9-1",
        "title": "Central Angle and Inscribed Angle Calculation",
        "problemStatement": "In the figure, A, B, and C are three points on a circle with center O such that ∠BOC = 30° and ∠AOB = 60°. If D is a point on the circle other than arc ABC, find ∠ADC.",
        "given": [
          "∠BOC = 30°",
          "∠AOB = 60°",
          "D is on circumference"
        ],
        "toFind": "Measure of ∠ADC",
        "strategy": "Find total central angle ∠AOC, then divide by 2.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find central angle ∠AOC",
            "latex": "\\angle AOC = \\angle AOB + \\angle BOC = 60^\\circ + 30^\\circ = 90^\\circ",
            "explanation": "Add adjacent central angles."
          },
          {
            "stepNumber": 2,
            "title": "Apply Theorem",
            "latex": "\\angle ADC = \\frac{1}{2} \\angle AOC = \\frac{1}{2}(90^\\circ) = 45^\\circ",
            "explanation": "Angle at circumference is half the central angle."
          }
        ],
        "commonMistake": "Multiplying by 2 instead of dividing by 2.",
        "sanityCheck": "Central angle = 90°; angle at circumference = 45°. Exactly half. Correct!"
      },
      {
        "id": "we-c9-ch9-2",
        "title": "Central Angle and Angle at Remaining Circumference",
        "problemStatement": "In a circle with centre O, an arc subtends an angle of 100° at the centre. Find the angle subtended by this arc at any point P on the major arc, and find the angle subtended on the minor arc.",
        "given": [
          "Central angle ∠AOB = 100°"
        ],
        "toFind": "Angle ∠APB on major arc and angle ∠AQB on minor arc",
        "strategy": "Apply the Inscribed Angle Theorem: angle at centre is twice angle at circumference. Then use cyclic quadrilateral property for opposite arc point.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find angle on major arc",
            "latex": "\\angle APB = \\frac{1}{2} \\angle AOB = \\frac{1}{2} \\times 100^\\circ = 50^\\circ",
            "explanation": "The angle subtended by an arc at the centre is double the angle at any point on the circle."
          },
          {
            "stepNumber": 2,
            "title": "Find angle on minor arc using cyclic property",
            "latex": "\\angle AQB = 180^\\circ - \\angle APB = 180^\\circ - 50^\\circ = 130^\\circ",
            "explanation": "Opposite angles of cyclic quadrilateral APBQ sum to 180°."
          }
        ],
        "commonMistake": "Confusing major arc angle (acute: 50°) with minor arc angle (obtuse: 130°).",
        "sanityCheck": "Reflex central angle = 360° - 100° = 260°. Minor arc angle = 260° / 2 = 130°. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "If diameter is mentioned, immediately look for inscribed angles subtended by it—they are 90° right angles.",
      "In any 4-sided figure inscribed in a circle, opposite angles add to 180° without exception."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch9-1",
        "type": "numerical",
        "prompt": "If an arc subtends an angle of 84° at the center of a circle, what angle does it subtend at the circumference in degrees?",
        "correctAnswer": 42,
        "tolerance": 0,
        "hints": [
          "Angle at circumference = 1/2 of angle at center."
        ],
        "explanation": "84° / 2 = 42°.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch9-2",
        "type": "numerical",
        "prompt": "In cyclic quadrilateral ABCD, ∠B = 105°. Find the measure of opposite angle ∠D in degrees.",
        "correctAnswer": 75,
        "tolerance": 0,
        "hints": [
          "Opposite angles of cyclic quadrilateral sum to 180°."
        ],
        "explanation": "∠D = 180° - 105° = 75°.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch9-3",
        "type": "numerical",
        "prompt": "AB is a diameter of a circle. C is any point on the circumference. What is the value of ∠ACB in degrees?",
        "correctAnswer": 90,
        "tolerance": 0,
        "hints": [
          "Angle in a semicircle is always a right angle."
        ],
        "explanation": "The angle subtended by a diameter at any point on the circle is 90°.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Equal chords subtend equal angles at the center.",
        "Perpendicular from center to chord bisects the chord.",
        "Angle subtended by arc at center is double angle at circumference.",
        "Angle in a semicircle is 90°.",
        "Opposite angles of a cyclic quadrilateral are supplementary (sum = 180°)."
      ],
      "commonTraps": [
        "Forgetting that angles in the same segment must be on the SAME side of the chord."
      ]
    },
    "labId": "circle-area",
    "labTitle": "Circles"
  },
  {
    "id": "c9-s2-heron",
    "classGrade": 9,
    "semester": 2,
    "chapterNumber": 10,
    "title": "Heron's Formula",
    "shortDescription": "Calculate exact triangle areas using semi-perimeter when all three side lengths are given without altitude.",
    "whyItMatters": "Civil engineers, land surveyors, and GPS mapping systems calculate parcel land areas by triangulating boundary lengths using Heron’s formula.",
    "priorKnowledge": [
      "Basic triangle area formula: Area = 1/2 × base × height",
      "Perimeter of a triangle (a + b + c)",
      "Simplifying square root radical numbers"
    ],
    "vocabulary": [
      {
        "term": "Semi-perimeter (s)",
        "definition": "Half of the total perimeter of a triangle: s = (a + b + c) / 2."
      },
      {
        "term": "Heron's Formula",
        "definition": "Area = √[s(s - a)(s - b)(s - c)], named after Heron of Alexandria."
      },
      {
        "term": "Scalene Triangle",
        "definition": "A triangle where all three sides have different lengths."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-heron-main",
        "name": "Heron's Formula for Triangle Area",
        "latex": "A = \\sqrt{s(s - a)(s - b)(s - c)}, \\quad s = \\frac{a + b + c}{2}",
        "description": "Computes exact area of any triangle directly from its three side lengths a, b, c without needing the altitude.",
        "variables": [
          {
            "symbol": "a, b, c",
            "meaning": "Side lengths of triangle"
          },
          {
            "symbol": "s",
            "meaning": "Semi-perimeter"
          }
        ],
        "chapterId": "c9-s2-heron",
        "classGrade": 9,
        "category": "Mensuration",
        "conditions": "Triangle inequality: a + b > c, b + c > a, c + a > b implies s > a, b, c.",
        "whenToUse": "When all 3 side lengths are known but no height is provided.",
        "workedExample": {
          "problem": "Find area of triangle with sides 13 cm, 14 cm, and 15 cm",
          "solution": "s = (13+14+15)/2 = 21 cm. A = √[21(21-13)(21-14)(21-15)] = √[21 × 8 × 7 × 6] = √7056 = 84 cm²."
        }
      },
      {
        "id": "f-c9-heron-equi",
        "name": "Area of Equilateral Triangle Formula",
        "latex": "A = \\frac{\\sqrt{3}}{4} a^2, \\quad h = \\frac{\\sqrt{3}}{2} a",
        "description": "Direct formula for equilateral triangle area and altitude of side length a.",
        "variables": [
          {
            "symbol": "a",
            "meaning": "Side length of equilateral triangle"
          }
        ],
        "chapterId": "c9-s2-heron",
        "classGrade": 9,
        "category": "Mensuration",
        "conditions": "All 3 sides equal to a.",
        "whenToUse": "Finding area or height of equilateral triangle directly.",
        "workedExample": {
          "problem": "Find area of equilateral triangle of side 8 cm",
          "solution": "A = (√3 / 4) × 8² = (√3 / 4) × 64 = 16√3 cm²."
        }
      },
      {
        "id": "f-c9-heron-iso",
        "name": "Area of Isosceles Triangle Formula",
        "latex": "A = \\frac{b}{4} \\sqrt{4a^2 - b^2}",
        "description": "Area of isosceles triangle with two equal sides a and base b.",
        "variables": [
          {
            "symbol": "a",
            "meaning": "Length of each equal side"
          },
          {
            "symbol": "b",
            "meaning": "Base side length"
          }
        ],
        "chapterId": "c9-s2-heron",
        "classGrade": 9,
        "category": "Mensuration",
        "conditions": "2a > b for valid triangle.",
        "whenToUse": "Isosceles triangles with known equal sides and base."
      }
    ],
    "derivation": {
      "title": "Derivation of Equilateral Triangle Area from Heron’s Formula",
      "targetFormula": "A = \\frac{\\sqrt{3}}{4} a^2",
      "objective": "Deduce the equilateral triangle area formula using Heron’s formula.",
      "startingObservation": "Let an equilateral triangle have side lengths a, a, a.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Calculate semi-perimeter s:",
          "latex": "s = \\frac{a + a + a}{2} = \\frac{3a}{2}",
          "justification": "Sum of three sides divided by 2."
        },
        {
          "stepNumber": 2,
          "statement": "Evaluate the differences (s - a):",
          "latex": "s - a = \\frac{3a}{2} - a = \\frac{a}{2}",
          "justification": "All three differences (s - a), (s - b), (s - c) are identical and equal to a/2."
        },
        {
          "stepNumber": 3,
          "statement": "Substitute into Heron’s formula:",
          "latex": "A = \\sqrt{\\frac{3a}{2} \\times \\frac{a}{2} \\times \\frac{a}{2} \\times \\frac{a}{2}} = \\sqrt{\\frac{3a^4}{16}}",
          "justification": "Multiplying the four terms inside radical."
        },
        {
          "stepNumber": 4,
          "statement": "Extract terms from square root:",
          "latex": "A = \\frac{\\sqrt{3}}{4} a^2",
          "justification": "Taking square root of a^4 and 16."
        }
      ],
      "finalFormulaLatex": "A = \\frac{\\sqrt{3}}{4} a^2",
      "conclusion": "The equilateral triangle area formula is cleanly derived from Heron’s formula."
    },
    "memoryLab": [
      {
        "title": "Heron Radical Factoring Trick",
        "mnemonic": "Don’t multiply large numbers! Factor inside the square root!",
        "meaning": "Break s, (s-a), (s-b), (s-c) into prime factors and pull out matching pairs.",
        "boardExamTip": "Multiplying 21 × 8 × 7 × 6 = 7056 is risky. Instead: (7 × 3) × (2 × 4) × 7 × (2 × 3) = 7² × 3² × 4² = 7 × 3 × 4 = 84! Zero long multiplication needed!"
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-heron-1",
        "title": "Finding Area of Scalene Triangle",
        "problemStatement": "Find the area of a triangle two sides of which are 18 cm and 10 cm and the perimeter is 42 cm.",
        "given": [
          "a = 18 cm",
          "b = 10 cm",
          "Perimeter = 42 cm"
        ],
        "toFind": "Third side c and Area",
        "strategy": "Find third side c = 42 - (18 + 10), then apply Heron’s formula.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find side c",
            "latex": "c = 42 - (18 + 10) = 42 - 28 = 14 \\text{ cm}",
            "explanation": "Third side length."
          },
          {
            "stepNumber": 2,
            "title": "Find semi-perimeter s",
            "latex": "s = \\frac{42}{2} = 21 \\text{ cm}",
            "explanation": "Half the perimeter."
          },
          {
            "stepNumber": 3,
            "title": "Calculate differences",
            "latex": "s - a = 21 - 18 = 3, \\quad s - b = 21 - 10 = 11, \\quad s - c = 21 - 14 = 7",
            "explanation": "Subtract each side from s."
          },
          {
            "stepNumber": 4,
            "title": "Apply Heron formula",
            "latex": "A = \\sqrt{21 \\times 3 \\times 11 \\times 7} = \\sqrt{(7 \\times 3) \\times 3 \\times 11 \\times 7} = 7 \\times 3 \\sqrt{11} = 21\\sqrt{11} \\text{ cm}^2",
            "explanation": "Pull out pairs 7 and 3."
          }
        ],
        "commonMistake": "Using s = 42 instead of semi-perimeter s = 21.",
        "sanityCheck": "21√11 ≈ 21 × 3.316 = 69.6 cm². Valid positive area."
      },
      {
        "id": "we-c9-heron-2",
        "title": "Triangle Area Given Sides Ratio and Perimeter",
        "problemStatement": "The sides of a triangular field are in the ratio 12 : 17 : 25 and its perimeter is 540 m. Find its area using Heron’s formula.",
        "given": [
          "Sides ratio = 12 : 17 : 25",
          "Perimeter = 540 m"
        ],
        "toFind": "Area of the triangular field",
        "strategy": "Let sides be 12x, 17x, 25x. Solve for x, determine sides a, b, c, semi-perimeter s, and evaluate Heron’s formula.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Find individual sides",
            "latex": "12x + 17x + 25x = 540 \\implies 54x = 540 \\implies x = 10",
            "explanation": "Sum of sides equals perimeter."
          },
          {
            "stepNumber": 2,
            "title": "Calculate side lengths and semi-perimeter",
            "latex": "a = 120\\text{ m}, \\quad b = 170\\text{ m}, \\quad c = 250\\text{ m}, \\quad s = \\frac{540}{2} = 270\\text{ m}",
            "explanation": "Multiply x by each ratio part."
          },
          {
            "stepNumber": 3,
            "title": "Compute differences",
            "latex": "s - a = 150, \\quad s - b = 100, \\quad s - c = 20",
            "explanation": "Subtract each side from s."
          },
          {
            "stepNumber": 4,
            "title": "Apply Heron’s formula",
            "latex": "\\text{Area} = \\sqrt{270 \\times 150 \\times 100 \\times 20} = \\sqrt{81000000} = 9000\\text{ m}^2",
            "explanation": "270 × 150 × 100 × 20 = (9 × 30) × (5 × 30) × 100 × 20 = 81 × 10⁶."
          }
        ],
        "commonMistake": "Multiplying large numbers directly without factoring out powers of 10 and perfect squares.",
        "sanityCheck": "Area = 9000 m². Verified cleanly through prime power extraction!"
      }
    ],
    "problemSolvingStrategies": [
      "Factorise under the root into primes rather than multiplying huge products.",
      "Check units: if sides are in meters, area is in m²; if in cm, area is in cm²."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-heron-1",
        "type": "numerical",
        "prompt": "Find the semi-perimeter of a triangle whose sides are 5 cm, 12 cm, and 13 cm.",
        "correctAnswer": 15,
        "tolerance": 0,
        "hints": [
          "s = (a + b + c) / 2 = (5 + 12 + 13) / 2."
        ],
        "explanation": "s = 30 / 2 = 15 cm.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-heron-2",
        "type": "numerical",
        "prompt": "Find the area of a right triangle with sides 6 cm, 8 cm, and 10 cm in cm².",
        "correctAnswer": 24,
        "tolerance": 0,
        "hints": [
          "Area = 1/2 × base × height = 1/2 × 6 × 8, or use Heron’s formula with s = 12."
        ],
        "explanation": "1/2 × 6 × 8 = 24 cm².",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-heron-3",
        "type": "numerical",
        "prompt": "If the area of an equilateral triangle is 16√3 cm², what is the side length a in cm?",
        "correctAnswer": 8,
        "tolerance": 0,
        "hints": [
          "(√3 / 4) a² = 16√3 => a² / 4 = 16 => a² = 64."
        ],
        "explanation": "a² = 64 => a = 8 cm.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Semi-perimeter s = (a + b + c)/2.",
        "Heron formula: A = √[s(s - a)(s - b)(s - c)].",
        "Equilateral triangle area: (√3/4) a²."
      ],
      "commonTraps": [
        "Forgetting to take square root at the final step."
      ]
    },
    "labId": "herons-formula",
    "labTitle": "Heron's Formula"
  },
  {
    "id": "c9-s2-ch11",
    "classGrade": 9,
    "semester": 2,
    "chapterNumber": 11,
    "title": "Surface Areas and Volumes",
    "shortDescription": "Master slant height, curved surface area, total surface area, and volumes of cones, spheres, and hemispheres.",
    "whyItMatters": "Packaging design, civil water reservoirs, silos, fuel tanks, and architectural domes depend directly on 3D mensuration geometry.",
    "priorKnowledge": [
      "Area of circles (πr²) and perimeter (2πr)",
      "Pythagorean theorem in 3D right triangles",
      "Cube and cuboid surface areas and volumes"
    ],
    "vocabulary": [
      {
        "term": "Curved Surface Area (CSA)",
        "definition": "The area of the curved surface only, excluding flat circular bases."
      },
      {
        "term": "Total Surface Area (TSA)",
        "definition": "The sum of all external surfaces, including both curved surfaces and flat circular ends."
      },
      {
        "term": "Slant Height (l)",
        "definition": "The diagonal length from the apex of a cone to any point on its circular base circumference: l = √(r² + h²)."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch11-cone",
        "name": "Right Circular Cone Mensuration Formulas",
        "latex": "l = \\sqrt{r^2 + h^2}, \\quad \\text{CSA} = \\pi r l, \\quad \\text{TSA} = \\pi r(l + r), \\quad V = \\frac{1}{3} \\pi r^2 h",
        "description": "Slant height l, curved surface area, total surface area, and volume of a right circular cone.",
        "variables": [
          {
            "symbol": "r",
            "meaning": "Base radius"
          },
          {
            "symbol": "h",
            "meaning": "Vertical altitude"
          },
          {
            "symbol": "l",
            "meaning": "Slant height"
          }
        ],
        "chapterId": "c9-s2-ch11",
        "classGrade": 9,
        "category": "Mensuration",
        "conditions": "r > 0, h > 0.",
        "whenToUse": "All cone problems; remember to calculate slant height l before CSA!",
        "workedExample": {
          "problem": "Find slant height and CSA of cone with r = 7 cm and h = 24 cm",
          "solution": "l = √(7² + 24²) = √(49 + 576) = √625 = 25 cm. CSA = π r l = (22/7) × 7 × 25 = 550 cm²."
        }
      },
      {
        "id": "f-c9-ch11-sphere",
        "name": "Sphere Surface Area and Volume Formulas",
        "latex": "S = 4 \\pi r^2, \\quad V = \\frac{4}{3} \\pi r^3",
        "description": "Complete surface area equals 4 great circles; volume of solid sphere.",
        "variables": [
          {
            "symbol": "r",
            "meaning": "Radius of sphere"
          }
        ],
        "chapterId": "c9-s2-ch11",
        "classGrade": 9,
        "category": "Mensuration",
        "conditions": "r > 0.",
        "whenToUse": "Spherical objects like balls, planets, bubbles."
      },
      {
        "id": "f-c9-ch11-hemisphere",
        "name": "Hemisphere Mensuration Formulas",
        "latex": "\\text{CSA} = 2\\pi r^2, \\quad \\text{TSA} = 3\\pi r^2, \\quad V = \\frac{2}{3}\\pi r^3",
        "description": "Curved surface area, total surface area (including circular base), and volume of hemisphere.",
        "variables": [
          {
            "symbol": "r",
            "meaning": "Radius of hemisphere"
          }
        ],
        "chapterId": "c9-s2-ch11",
        "classGrade": 9,
        "category": "Mensuration",
        "conditions": "TSA includes flat circular face: 2πr² + πr² = 3πr².",
        "whenToUse": "Domes, bowls, hemispherical tanks.",
        "mnemonic": "Hemisphere TSA has THREE πr² (2 curved + 1 flat base)!"
      }
    ],
    "derivation": {
      "title": "Cone Slant Height Relation via Pythagoras Theorem",
      "targetFormula": "l^2 = r^2 + h^2 \\implies l = \\sqrt{r^2 + h^2}",
      "objective": "Prove that slant height l, vertical height h, and base radius r satisfy Pythagoras theorem.",
      "startingObservation": "In a right circular cone, the apex V, center of circular base O, and any point A on circumference form △VOA.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Identify the angle at center O:",
          "latex": "\\angle VOA = 90^\\circ",
          "justification": "The vertical axis of a right circular cone is perpendicular to its base plane."
        },
        {
          "stepNumber": 2,
          "statement": "Identify the sides of right triangle △VOA:",
          "latex": "VO = h \\quad (\\text{Height}), \\quad OA = r \\quad (\\text{Radius}), \\quad VA = l \\quad (\\text{Slant Height})",
          "justification": "Geometric definitions in a right circular cone."
        },
        {
          "stepNumber": 3,
          "statement": "Apply Pythagoras Theorem:",
          "latex": "VA^2 = VO^2 + OA^2 \\implies l^2 = h^2 + r^2",
          "justification": "Hypotenuse squared equals sum of squares of perpendicular legs."
        }
      ],
      "finalFormulaLatex": "l = \\sqrt{r^2 + h^2}",
      "conclusion": "The slant height formula is verified by the Pythagorean theorem."
    },
    "memoryLab": [
      {
        "title": "Cone Volume Fraction",
        "mnemonic": "3 Cones Fill 1 Cylinder!",
        "meaning": "Volume of cone is exactly ONE-THIRD of cylinder with same r and h: V = 1/3 πr²h.",
        "boardExamTip": "Never use vertical height h in CSA = πrl! You must use SLANT height l."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch11-1",
        "title": "Hemisphere Volume and Surface Area Calculation",
        "problemStatement": "Find the curved surface area, total surface area, and volume of a hemispherical bowl of radius 3.5 cm (use π = 22/7).",
        "given": [
          "r = 3.5 cm = 7/2 cm",
          "π = 22/7"
        ],
        "toFind": "CSA, TSA, and Volume",
        "strategy": "Apply CSA = 2πr², TSA = 3πr², and V = 2/3 πr³.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Calculate CSA",
            "latex": "\\text{CSA} = 2 \\times \\frac{22}{7} \\times \\left(\\frac{7}{2}\\right)^2 = 2 \\times \\frac{22}{7} \\times \\frac{49}{4} = 77 \\text{ cm}^2",
            "explanation": "2πr² calculation."
          },
          {
            "stepNumber": 2,
            "title": "Calculate TSA",
            "latex": "\\text{TSA} = 3 \\times \\frac{22}{7} \\times \\frac{49}{4} = \\frac{231}{2} = 115.5 \\text{ cm}^2",
            "explanation": "3πr² includes base."
          },
          {
            "stepNumber": 3,
            "title": "Calculate Volume",
            "latex": "V = \\frac{2}{3} \\times \\frac{22}{7} \\times \\left(\\frac{7}{2}\\right)^3 = \\frac{2}{3} \\times \\frac{22}{7} \\times \\frac{343}{8} = \\frac{539}{6} \\approx 89.83 \\text{ cm}^3",
            "explanation": "2/3 πr³ calculation."
          }
        ],
        "commonMistake": "Using TSA = 2πr² (forgetting the flat circular top face πr²).",
        "sanityCheck": "TSA is 1.5 times CSA: 77 × 1.5 = 115.5 cm². Perfectly consistent!"
      },
      {
        "id": "we-c9-ch11-2",
        "title": "Curved and Total Surface Area of a Right Circular Cone",
        "problemStatement": "The diameter of the base of a right circular cone is 10.5 cm and its slant height is 10 cm. Find its curved surface area and total surface area. (Take π = 22/7).",
        "given": [
          "Diameter d = 10.5 cm => Radius r = 5.25 cm = 21/4 cm",
          "Slant height l = 10 cm",
          "π = 22/7"
        ],
        "toFind": "Curved Surface Area (CSA) and Total Surface Area (TSA)",
        "strategy": "Use CSA = π r l and TSA = π r (l + r).",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Calculate CSA",
            "latex": "\\text{CSA} = \\pi r l = \\frac{22}{7} \\times \\frac{21}{4} \\times 10 = \\frac{22 \\times 3 \\times 10}{4} = \\frac{660}{4} = 165\\text{ cm}^2",
            "explanation": "Substitute r = 21/4 and l = 10."
          },
          {
            "stepNumber": 2,
            "title": "Calculate base area",
            "latex": "\\text{Base Area} = \\pi r^2 = \\frac{22}{7} \\times \\frac{21}{4} \\times \\frac{21}{4} = \\frac{66 \\times 21}{16} = 86.625\\text{ cm}^2",
            "explanation": "Area of circular base."
          },
          {
            "stepNumber": 3,
            "title": "Calculate TSA",
            "latex": "\\text{TSA} = \\text{CSA} + \\text{Base Area} = 165 + 86.625 = 251.625\\text{ cm}^2",
            "explanation": "Total surface area is CSA plus base area."
          }
        ],
        "commonMistake": "Confusing slant height l with vertical height h.",
        "sanityCheck": "Factored: π r (l + r) = (22/7)(21/4)(10 + 5.25) = (33/2)(15.25) = 251.625 cm². Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "Always express decimals like 3.5 as fractions (7/2) to simplify with π = 22/7 easily.",
      "Check whether the shape is open (CSA) or closed (TSA)."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch11-1",
        "type": "numerical",
        "prompt": "Find the slant height l of a cone with radius 5 cm and height 12 cm in cm.",
        "correctAnswer": 13,
        "tolerance": 0,
        "hints": [
          "l = √(r² + h²) = √(5² + 12²) = √(25 + 144) = √169."
        ],
        "explanation": "l = √169 = 13 cm.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch11-2",
        "type": "numerical",
        "prompt": "If the radius of a sphere is doubled, by what factor does its surface area increase?",
        "correctAnswer": 4,
        "tolerance": 0,
        "hints": [
          "Surface area S = 4πr². When r -> 2r, S' = 4π(2r)² = 4(4πr²)."
        ],
        "explanation": "Surface area scales with the square of the radius: 2² = 4.",
        "difficulty": "Standard"
      },
      {
        "id": "pq-c9-ch11-3",
        "type": "numerical",
        "prompt": "Find the volume of a sphere of radius 3 cm in terms of π (i.e. find V / π).",
        "correctAnswer": 36,
        "tolerance": 0,
        "hints": [
          "V = (4/3) π r³ = (4/3) π (27) = 36π."
        ],
        "explanation": "V = (4/3) × 27 × π = 36π. Value is 36.",
        "difficulty": "Standard"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Cone: l = √(r² + h²), CSA = πrl, TSA = πr(l + r), V = 1/3 πr²h.",
        "Sphere: S = 4πr², V = 4/3 πr³.",
        "Hemisphere: CSA = 2πr², TSA = 3πr², V = 2/3 πr³."
      ],
      "commonTraps": [
        "Using vertical height h instead of slant height l in cone CSA.",
        "Forgetting that hemisphere TSA is 3πr², not 2πr²."
      ]
    },
    "labId": "cylinder-net",
    "labTitle": "Surface Areas and Volumes"
  },
  {
    "id": "c9-s2-ch12",
    "classGrade": 9,
    "semester": 2,
    "chapterNumber": 12,
    "title": "Statistics",
    "shortDescription": "Master graphical representation of data, bar graphs, histograms with varying base widths, and frequency polygons.",
    "whyItMatters": "Data science, public health analytics, economics, and meteorological forecasting rely on accurate graphical distributions of continuous data.",
    "priorKnowledge": [
      "Basic tally marks and frequency tables",
      "Class intervals, upper and lower limits",
      "Plotting points on graph paper"
    ],
    "vocabulary": [
      {
        "term": "Class Mark",
        "definition": "The midpoint of a class interval: (Upper Limit + Lower Limit) / 2."
      },
      {
        "term": "Histogram",
        "definition": "A graphical representation of continuous frequency distribution where rectangles touch with areas proportional to frequencies."
      },
      {
        "term": "Adjusted Frequency",
        "definition": "Modified rectangle height for histograms with unequal class widths: (Frequency / Width) × Minimum Width."
      },
      {
        "term": "Frequency Polygon",
        "definition": "A line graph drawn by joining the midpoints (class marks) of consecutive class intervals."
      }
    ],
    "keyFormulas": [
      {
        "id": "f-c9-ch12-class-mark",
        "name": "Class Mark of Interval Formula",
        "latex": "x_i = \\frac{\\text{Upper Limit} + \\text{Lower Limit}}{2}",
        "description": "Calculates the central representative midpoint of each class interval for plotting frequency polygons.",
        "variables": [
          {
            "symbol": "x_i",
            "meaning": "Class mark of ith interval"
          }
        ],
        "chapterId": "c9-s2-ch12",
        "classGrade": 9,
        "category": "Statistics & Probability",
        "conditions": "Continuous class intervals.",
        "whenToUse": "Finding midpoints to plot frequency polygons.",
        "workedExample": {
          "problem": "Find the class mark of interval 20 - 30",
          "solution": "x = (20 + 30) / 2 = 50 / 2 = 25."
        }
      },
      {
        "id": "f-c9-ch12-adj-freq",
        "name": "Adjusted Frequency for Variable Width Histograms",
        "latex": "\\text{Adjusted Frequency} = \\frac{\\text{Frequency of Class}}{\\text{Width of Class}} \\times (\\text{Minimum Class Width})",
        "description": "Scales the height of histogram bars when intervals have unequal widths so that bar areas remain proportional to frequencies.",
        "variables": [
          {
            "symbol": "\\text{Width}",
            "meaning": "Upper limit minus lower limit of the class"
          },
          {
            "symbol": "\\text{Minimum Width}",
            "meaning": "The smallest class width occurring in the dataset"
          }
        ],
        "chapterId": "c9-s2-ch12",
        "classGrade": 9,
        "category": "Statistics & Probability",
        "conditions": "Applied whenever class intervals in a histogram are unequal.",
        "whenToUse": "Constructing accurate histograms with varying interval sizes."
      },
      {
        "id": "f-c9-ch12-mean-raw",
        "name": "Mean of Ungrouped Raw Data",
        "latex": "\\bar{x} = \\frac{\\sum x_i}{n}",
        "description": "The arithmetic average of n raw observations.",
        "variables": [
          {
            "symbol": "\\sum x_i",
            "meaning": "Sum of all observations"
          },
          {
            "symbol": "n",
            "meaning": "Total number of observations"
          }
        ],
        "chapterId": "c9-s2-ch12",
        "classGrade": 9,
        "category": "Statistics & Probability",
        "conditions": "n > 0.",
        "whenToUse": "Finding mean of ungrouped datasets."
      }
    ],
    "derivation": {
      "title": "Principle of Area Proportionality in Histograms",
      "targetFormula": "\\text{Area of Bar} \\propto \\text{Frequency}",
      "objective": "Prove that bar heights must be adjusted when class widths are unequal.",
      "startingObservation": "In a histogram, the area of each rectangular bar must represent its corresponding frequency, not merely its height.",
      "steps": [
        {
          "stepNumber": 1,
          "statement": "Express area of a rectangle:",
          "latex": "\\text{Area} = \\text{Width} \\times \\text{Height}",
          "justification": "Formula for area of a rectangle."
        },
        {
          "stepNumber": 2,
          "statement": "Set Area proportional to Frequency f:",
          "latex": "w \\times h = k \\cdot f \\implies h = k \\cdot \\frac{f}{w}",
          "justification": "To ensure area represents frequency accurately."
        },
        {
          "stepNumber": 3,
          "statement": "Choose scale constant k as the minimum class width w_min:",
          "latex": "h = \\frac{f}{w} \\times w_{\\text{min}}",
          "justification": "Standardises height so that the narrowest class interval maintains its original frequency height."
        }
      ],
      "finalFormulaLatex": "\\text{Height} = \\frac{\\text{Frequency}}{\\text{Class Width}} \\times w_{\\text{min}}",
      "conclusion": "Adjusted frequency preserves visual and statistical fidelity in variable-width histograms."
    },
    "memoryLab": [
      {
        "title": "Histogram vs Bar Graph",
        "mnemonic": "Bars Touch in Histograms; Gaps in Bar Graphs!",
        "meaning": "Histograms represent continuous quantitative data (no gaps between bars); bar graphs represent discrete categorical data (uniform gaps).",
        "boardExamTip": "To close a frequency polygon, connect to the midpoints of imaginary zero-frequency intervals at both ends."
      }
    ],
    "workedExamples": [
      {
        "id": "we-c9-ch12-1",
        "title": "Calculating Adjusted Frequency for Unequal Intervals",
        "problemStatement": "A class interval 10 - 20 has frequency 12. If the minimum class width in the table is 5, find its adjusted frequency.",
        "given": [
          "Interval: 10 - 20",
          "Frequency = 12",
          "Class width = 20 - 10 = 10",
          "Minimum class width = 5"
        ],
        "toFind": "Adjusted frequency (height of bar)",
        "strategy": "Apply Adjusted Frequency = (Frequency / Width) × Minimum Width.",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Compute width",
            "latex": "w = 20 - 10 = 10",
            "explanation": "Upper limit minus lower limit."
          },
          {
            "stepNumber": 2,
            "title": "Apply formula",
            "latex": "\\text{Adjusted Frequency} = \\frac{12}{10} \\times 5 = 6",
            "explanation": "Substitute values."
          }
        ],
        "commonMistake": "Plotting height as 12 directly, which doubles its perceived visual weight!",
        "sanityCheck": "Since width 10 is twice the base width 5, height is halved from 12 to 6 so area remains proportional (10 × 6 = 60). Correct!"
      },
      {
        "id": "we-c9-ch12-2",
        "title": "Finding Unknown Value Given Arithmetic Mean",
        "problemStatement": "The mean of the numbers 10, 15, 20, p, and 25 is 18. Find the value of p. Hence find the median of the resulting data set.",
        "given": [
          "Observations: 10, 15, 20, p, 25",
          "Number of observations n = 5",
          "Mean = 18"
        ],
        "toFind": "Value of p and Median",
        "strategy": "Use Mean = (Sum of observations) / n to solve for p. Arrange the 5 numbers in ascending order to find the middle term (median).",
        "steps": [
          {
            "stepNumber": 1,
            "title": "Set up mean equation",
            "latex": "18 = \\frac{10 + 15 + 20 + p + 25}{5} \\implies 18 = \\frac{70 + p}{5}",
            "explanation": "Sum divided by count."
          },
          {
            "stepNumber": 2,
            "title": "Solve for p",
            "latex": "70 + p = 90 \\implies p = 20",
            "explanation": "Multiply both sides by 5."
          },
          {
            "stepNumber": 3,
            "title": "Arrange in ascending order and find median",
            "latex": "\\text{Data: } 10, 15, 20, 20, 25 \\implies \\text{Median} = \\left(\\frac{5+1}{2}\\right)^{\\text{th}} \\text{ term} = 20",
            "explanation": "Middle value is the 3rd term = 20."
          }
        ],
        "commonMistake": "Forgetting to arrange observations in ascending order before taking the median.",
        "sanityCheck": "Sum = 10 + 15 + 20 + 20 + 25 = 90. Mean = 90 / 5 = 18. Median = 20. Verified!"
      }
    ],
    "problemSolvingStrategies": [
      "Before plotting histograms, check if class widths are equal. If not, compute adjusted frequencies first.",
      "For frequency polygons, plot points at (Class Mark, Frequency), and join with straight line segments."
    ],
    "practiceQuestions": [
      {
        "id": "pq-c9-ch12-1",
        "type": "numerical",
        "prompt": "Find the class mark of the interval 35 - 45.",
        "correctAnswer": 40,
        "tolerance": 0,
        "hints": [
          "Class mark = (35 + 45) / 2 = 80 / 2."
        ],
        "explanation": "(35 + 45) / 2 = 40.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch12-2",
        "type": "numerical",
        "prompt": "Find the mean of the first 5 prime numbers (2, 3, 5, 7, 11).",
        "correctAnswer": 5.6,
        "tolerance": 0.1,
        "hints": [
          "Sum = 2 + 3 + 5 + 7 + 11 = 28. Divide by 5."
        ],
        "explanation": "28 / 5 = 5.6.",
        "difficulty": "Foundation"
      },
      {
        "id": "pq-c9-ch12-3",
        "type": "mcq",
        "prompt": "In a histogram, the area of each rectangle is proportional to:",
        "options": [
          "Class mark",
          "Class width only",
          "Frequency of the corresponding class",
          "Cumulative frequency"
        ],
        "correctAnswer": "Frequency of the corresponding class",
        "hints": [
          "The fundamental defining property of a histogram is that area represents frequency."
        ],
        "explanation": "In a histogram, rectangle areas are directly proportional to class frequencies.",
        "difficulty": "Foundation"
      }
    ],
    "revisionSummary": {
      "corePoints": [
        "Histograms are for continuous data with touching bars.",
        "When class widths are unequal, height = (frequency / width) × minimum width.",
        "Frequency polygons connect class mark midpoints."
      ],
      "commonTraps": [
        "Leaving gaps between bars in a continuous histogram."
      ]
    },
    "labId": "statistics-lab",
    "labTitle": "Statistics"
  }
];
