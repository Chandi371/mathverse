# MATHVERSE — An Interactive, Mobile-First Mathematics Learning Platform

> Serving Andhra Pradesh State Board (SSC) Students in Classes 9 and 10.
> **Philosophy:** Understand → Explore → Predict → Experiment → Derive → Practise → Reflect → Master.

---

## 🌟 Overview

**MATHVERSE** transforms secondary school mathematics from passive textbook memorisation into an active, visual, and exploratory experience. Designed with a **mobile-phones-first** UX ethos, it empowers students and educators with:

1. **The Interactive Mathematics Lab**: Direct cause-and-effect simulations with touch-friendly sliders, draggable coordinate points, dynamic geometry, and Monte Carlo probability trials.
2. **Formula Origins**: Rigorous, step-by-step mathematical derivations with conceptual proofs and justifications.
3. **Memory Lab**: Cognitive mnemonics, visual recall hooks (e.g., SOH-CAH-TOA, Gauss head-and-tail pairing), and specific AP SSC examination trap alerts.
4. **Interactive Practice Studio**: Progressive problem-solving with hints, error diagnosis, numerical tolerance verification, and streak celebrations.
5. **Local Progress Tracking**: Privacy-first client-side progress persistence (`localStorage`) without mandatory account registration.
6. **Formula Library & Instant Search**: Global search (`⌘K` / `Ctrl+K`) across all 26 chapters, topics, formulas, and concepts.

---

## 📚 Curriculum Scope (AP SSC Board)

### Class 9
- **Semester 1**: Number Systems, Polynomials, Coordinate Geometry, Linear Equations in Two Variables, Introduction to Euclid's Geometry, Lines and Angles.
- **Semester 2**: Triangles, Quadrilaterals, Circles, Heron's Formula, Surface Areas and Volumes, Statistics.

### Class 10
- **Semester 1**: Real Numbers, Polynomials, Pair of Linear Equations in Two Variables, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry.
- **Semester 2**: Introduction to Trigonometry, Some Applications of Trigonometry, Circles, Areas Related to Circles, Surface Areas and Volumes, Statistics, Probability.

---

## 🧪 Interactive Mathematics Labs

| Lab | Mathematical Relationship | Educational Discovery |
|---|---|---|
| **Area Model** | $(a + b)^2 = a^2 + 2ab + b^2$ | Dissects a square into 4 regions, proving why the $2ab$ cross-term must exist. |
| **Right Triangle** | $\sin^2\theta + \cos^2\theta = 1$ | Live SOH-CAH-TOA recalculation proving the fundamental Pythagorean identity. |
| **Arithmetic Progression** | $S_n = \frac{n}{2}[2a + (n-1)d]$ | Bar visualizer & Gauss pairing showing that reverse sum pairs are constant. |
| **Heron's Formula** | $\text{Area} = \sqrt{s(s-a)(s-b)(s-c)}$ | Side length adjusters with Triangle Inequality validation ($a+b>c$). |
| **Coordinate Geometry** | $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$ | Draggable points on Cartesian plane connecting distance formula to Pythagoras. |
| **Parabola & Discriminant** | $D = b^2 - 4ac$ | Live curve plotting linking discriminant sign to real root intersections ($D > 0, D = 0, D < 0$). |
| **Probability Simulator** | $P(E) = n(E) / n(S)$ | Monte Carlo coin and dice trials demonstrating the Law of Large Numbers. |
| **Circle Sector Unfolding** | $\text{Area} = \pi r^2$ | Slices a circle into $N$ wedges rearranged into an approximate rectangle of $\pi r \times r$. |
| **Cylinder 2D Net** | $\text{CSA} = 2\pi rh, \text{TSA} = 2\pi r(r+h)$ | Unrolls 3D cylinder into flat rectangle of length $2\pi r$ and height $h$. |

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Mobile-first responsive architecture
- **Formula Typesetting**: KaTeX (clean LaTeX rendering without heavy MathJax overhead)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Testing**: Vitest automated mathematical test suite

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd mathverse

# Install dependencies
npm install

# Start development server
npm run dev
```

### Run Automated Tests
```bash
npm test
```

### Production Build
```bash
npm run build
```

---

## 📱 Mobile-First Best Practices Applied
- Touch targets strictly $\ge 44 \times 44\text{px}$.
- `touch-action: none` on interactive math canvases for smooth sliding.
- Zero accidental horizontal overflow (`overflow-x: hidden`).
- Dynamic viewport height (`min-h-dvh`) preventing layout breaks from mobile address bars.
- Clean sticky top header with quick grade switcher and bottom navigation bar for one-thumb smartphone navigation.
