import fs from 'fs';
import path from 'path';
import { class9Chapters } from '../src/data/chapters/class9';

const additions: Record<string, { workedExamples: any[] }> = {
  'c9-s1-ch5': {
    workedExamples: [
      {
        id: 'we-c9-ch5-2',
        title: 'Uniqueness of the Midpoint of a Line Segment',
        problemStatement: 'Prove that every line segment has one and only one midpoint.',
        given: ['Line segment AB'],
        toFind: 'Proof that midpoint of AB is unique',
        strategy: 'Proof by contradiction: Assume there are two distinct midpoints C and D on AB and apply Euclid’s Axioms.',
        steps: [
          { stepNumber: 1, title: 'Assume two distinct midpoints', latex: 'AC = \\frac{1}{2}AB \\quad \\text{and} \\quad AD = \\frac{1}{2}AB', explanation: 'By definition of midpoint, each divides AB into two equal halves.' },
          { stepNumber: 2, title: 'Apply Euclid’s Axiom 1', latex: 'AC = AD', explanation: 'Things which are equal to the same thing are equal to one another.' },
          { stepNumber: 3, title: 'Conclude coincidence', latex: 'AC = AD \\implies C \\text{ must coincide with } D', explanation: 'This is possible only if C and D are the same point (Axiom 4: Things which coincide with one another are equal).' },
        ],
        commonMistake: 'Assuming uniqueness without invoking Euclid’s axioms.',
        sanityCheck: 'A point cannot simultaneously divide a 10 cm segment into 5 cm and another different length. Uniqueness verified!',
      },
    ],
  },

  'c9-s2-ch8': {
    workedExamples: [
      {
        id: 'we-c9-ch8-2',
        title: 'Applying Midpoint Theorem to Quadrilateral Diagonals',
        problemStatement: 'Show that the line segments joining the midpoints of the opposite sides of any quadrilateral bisect each other.',
        given: ['Quadrilateral ABCD with P, Q, R, S as midpoints of AB, BC, CD, DA respectively'],
        toFind: 'Proof that PR and QS bisect each other',
        strategy: 'Join AC. Show that PQRS is a parallelogram using the Midpoint Theorem on triangles ABC and ADC. The diagonals of a parallelogram bisect each other.',
        steps: [
          { stepNumber: 1, title: 'Apply Midpoint Theorem to triangle ABC', latex: 'PQ \\parallel AC \\quad \\text{and} \\quad PQ = \\frac{1}{2}AC', explanation: 'P and Q are midpoints of AB and BC.' },
          { stepNumber: 2, title: 'Apply Midpoint Theorem to triangle ADC', latex: 'SR \\parallel AC \\quad \\text{and} \\quad SR = \\frac{1}{2}AC', explanation: 'S and R are midpoints of DA and CD.' },
          { stepNumber: 3, title: 'Prove PQRS is a parallelogram', latex: 'PQ \\parallel SR \\quad \\text{and} \\quad PQ = SR \\implies PQRS \\text{ is a parallelogram}', explanation: 'A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram.' },
          { stepNumber: 4, title: 'Conclude bisection', latex: 'PR \\text{ and } QS \\text{ bisect each other}', explanation: 'Diagonals of parallelogram PQRS are PR and QS, which bisect each other.' },
        ],
        commonMistake: 'Forgetting that PR and QS are the diagonals of the inner quadrilateral PQRS.',
        sanityCheck: 'Holds for squares, rectangles, rhombuses, and irregular quadrilaterals universally. Verified!',
      },
    ],
  },

  'c9-s2-ch9': {
    workedExamples: [
      {
        id: 'we-c9-ch9-2',
        title: 'Central Angle and Angle at Remaining Circumference',
        problemStatement: 'In a circle with centre O, an arc subtends an angle of 100° at the centre. Find the angle subtended by this arc at any point P on the major arc, and find the angle subtended on the minor arc.',
        given: ['Central angle ∠AOB = 100°'],
        toFind: 'Angle ∠APB on major arc and angle ∠AQB on minor arc',
        strategy: 'Apply the Inscribed Angle Theorem: angle at centre is twice angle at circumference. Then use cyclic quadrilateral property for opposite arc point.',
        steps: [
          { stepNumber: 1, title: 'Find angle on major arc', latex: '\\angle APB = \\frac{1}{2} \\angle AOB = \\frac{1}{2} \\times 100^\\circ = 50^\\circ', explanation: 'The angle subtended by an arc at the centre is double the angle at any point on the circle.' },
          { stepNumber: 2, title: 'Find angle on minor arc using cyclic property', latex: '\\angle AQB = 180^\\circ - \\angle APB = 180^\\circ - 50^\\circ = 130^\\circ', explanation: 'Opposite angles of cyclic quadrilateral APBQ sum to 180°.' },
        ],
        commonMistake: 'Confusing major arc angle (acute: 50°) with minor arc angle (obtuse: 130°).',
        sanityCheck: 'Reflex central angle = 360° - 100° = 260°. Minor arc angle = 260° / 2 = 130°. Verified!',
      },
    ],
  },

  'c9-s2-heron': {
    workedExamples: [
      {
        id: 'we-c9-heron-2',
        title: 'Triangle Area Given Sides Ratio and Perimeter',
        problemStatement: 'The sides of a triangular field are in the ratio 12 : 17 : 25 and its perimeter is 540 m. Find its area using Heron’s formula.',
        given: ['Sides ratio = 12 : 17 : 25', 'Perimeter = 540 m'],
        toFind: 'Area of the triangular field',
        strategy: 'Let sides be 12x, 17x, 25x. Solve for x, determine sides a, b, c, semi-perimeter s, and evaluate Heron’s formula.',
        steps: [
          { stepNumber: 1, title: 'Find individual sides', latex: '12x + 17x + 25x = 540 \\implies 54x = 540 \\implies x = 10', explanation: 'Sum of sides equals perimeter.' },
          { stepNumber: 2, title: 'Calculate side lengths and semi-perimeter', latex: 'a = 120\\text{ m}, \\quad b = 170\\text{ m}, \\quad c = 250\\text{ m}, \\quad s = \\frac{540}{2} = 270\\text{ m}', explanation: 'Multiply x by each ratio part.' },
          { stepNumber: 3, title: 'Compute differences', latex: 's - a = 150, \\quad s - b = 100, \\quad s - c = 20', explanation: 'Subtract each side from s.' },
          { stepNumber: 4, title: 'Apply Heron’s formula', latex: '\\text{Area} = \\sqrt{270 \\times 150 \\times 100 \\times 20} = \\sqrt{81000000} = 9000\\text{ m}^2', explanation: '270 × 150 × 100 × 20 = (9 × 30) × (5 × 30) × 100 × 20 = 81 × 10⁶.' },
        ],
        commonMistake: 'Multiplying large numbers directly without factoring out powers of 10 and perfect squares.',
        sanityCheck: 'Area = 9000 m². Verified cleanly through prime power extraction!',
      },
    ],
  },

  'c9-s2-ch11': {
    workedExamples: [
      {
        id: 'we-c9-ch11-2',
        title: 'Curved and Total Surface Area of a Right Circular Cone',
        problemStatement: 'The diameter of the base of a right circular cone is 10.5 cm and its slant height is 10 cm. Find its curved surface area and total surface area. (Take π = 22/7).',
        given: ['Diameter d = 10.5 cm => Radius r = 5.25 cm = 21/4 cm', 'Slant height l = 10 cm', 'π = 22/7'],
        toFind: 'Curved Surface Area (CSA) and Total Surface Area (TSA)',
        strategy: 'Use CSA = π r l and TSA = π r (l + r).',
        steps: [
          { stepNumber: 1, title: 'Calculate CSA', latex: '\\text{CSA} = \\pi r l = \\frac{22}{7} \\times \\frac{21}{4} \\times 10 = \\frac{22 \\times 3 \\times 10}{4} = \\frac{660}{4} = 165\\text{ cm}^2', explanation: 'Substitute r = 21/4 and l = 10.' },
          { stepNumber: 2, title: 'Calculate base area', latex: '\\text{Base Area} = \\pi r^2 = \\frac{22}{7} \\times \\frac{21}{4} \\times \\frac{21}{4} = \\frac{66 \\times 21}{16} = 86.625\\text{ cm}^2', explanation: 'Area of circular base.' },
          { stepNumber: 3, title: 'Calculate TSA', latex: '\\text{TSA} = \\text{CSA} + \\text{Base Area} = 165 + 86.625 = 251.625\\text{ cm}^2', explanation: 'Total surface area is CSA plus base area.' },
        ],
        commonMistake: 'Confusing slant height l with vertical height h.',
        sanityCheck: 'Factored: π r (l + r) = (22/7)(21/4)(10 + 5.25) = (33/2)(15.25) = 251.625 cm². Verified!',
      },
    ],
  },

  'c9-s2-ch12': {
    workedExamples: [
      {
        id: 'we-c9-ch12-2',
        title: 'Finding Unknown Value Given Arithmetic Mean',
        problemStatement: 'The mean of the numbers 10, 15, 20, p, and 25 is 18. Find the value of p. Hence find the median of the resulting data set.',
        given: ['Observations: 10, 15, 20, p, 25', 'Number of observations n = 5', 'Mean = 18'],
        toFind: 'Value of p and Median',
        strategy: 'Use Mean = (Sum of observations) / n to solve for p. Arrange the 5 numbers in ascending order to find the middle term (median).',
        steps: [
          { stepNumber: 1, title: 'Set up mean equation', latex: '18 = \\frac{10 + 15 + 20 + p + 25}{5} \\implies 18 = \\frac{70 + p}{5}', explanation: 'Sum divided by count.' },
          { stepNumber: 2, title: 'Solve for p', latex: '70 + p = 90 \\implies p = 20', explanation: 'Multiply both sides by 5.' },
          { stepNumber: 3, title: 'Arrange in ascending order and find median', latex: '\\text{Data: } 10, 15, 20, 20, 25 \\implies \\text{Median} = \\left(\\frac{5+1}{2}\\right)^{\\text{th}} \\text{ term} = 20', explanation: 'Middle value is the 3rd term = 20.' },
        ],
        commonMistake: 'Forgetting to arrange observations in ascending order before taking the median.',
        sanityCheck: 'Sum = 10 + 15 + 20 + 20 + 25 = 90. Mean = 90 / 5 = 18. Median = 20. Verified!',
      },
    ],
  },
};

for (const ch of class9Chapters) {
  const add = additions[ch.id];
  if (add && add.workedExamples) {
    ch.workedExamples = [...ch.workedExamples, ...add.workedExamples];
  }
}

const fileHeader = `import type { Chapter } from '../../types/curriculum';

export const class9Chapters: Chapter[] = `;
const fileContent = fileHeader + JSON.stringify(class9Chapters, null, 2) + ';\n';
fs.writeFileSync(path.resolve('src/data/chapters/class9.ts'), fileContent);
console.log('Successfully enriched and updated src/data/chapters/class9.ts!');
