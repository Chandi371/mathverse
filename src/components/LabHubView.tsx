import React, { useState } from 'react';
import { InteractiveLabDispatcher } from './InteractiveLab/InteractiveLabDispatcher';
import { Sparkles } from 'lucide-react';

interface LabHubViewProps {
  initialLabId?: string;
}

export const LabHubView: React.FC<LabHubViewProps> = ({ initialLabId = 'area-model' }) => {
  const [activeLabId, setActiveLabId] = useState<string>(initialLabId);

  const labList = [
    {
      id: 'area-model',
      title: 'Geometric Area Model',
      grade: 'Class 9',
      topic: 'Algebra',
      formula: '(a + b)² = a² + 2ab + b²',
      description: 'Partition a square into 4 distinct regions to discover why middle term 2ab exists.',
    },
    {
      id: 'trig-triangle',
      title: 'Right Triangle & SOH-CAH-TOA',
      grade: 'Class 10',
      topic: 'Trigonometry',
      formula: 'sin²θ + cos²θ = 1',
      description: 'Change angle θ and watch Opposite, Adjacent, and Hypotenuse recalculate live.',
    },
    {
      id: 'arithmetic-progression',
      title: 'AP & Gauss Pairing Model',
      grade: 'Class 10',
      topic: 'Sequences',
      formula: 'Sₙ = (n/2)[2a + (n-1)d]',
      description: 'Adjust first term, difference, and terms count. See the inverted staircase pairing!',
    },
    {
      id: 'herons-formula',
      title: "Heron's Formula & Triangle Inequality",
      grade: 'Class 9',
      topic: 'Mensuration',
      formula: 'Area = √[s(s-a)(s-b)(s-c)]',
      description: 'Tweak 3 side lengths and verify triangle inequality validity without needing altitude.',
    },
    {
      id: 'coordinate-geometry',
      title: 'Cartesian Distance via Pythagoras',
      grade: 'Class 10',
      topic: 'Coordinate Geometry',
      formula: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
      description: 'Manipulate points A and B on a grid to watch horizontal and vertical legs form hypotenuse.',
    },
    {
      id: 'quadratic-parabola',
      title: 'Parabolas & Discriminant (D = b² - 4ac)',
      grade: 'Class 10',
      topic: 'Algebra',
      formula: 'D = b² - 4ac',
      description: 'Observe curve shifts, vertices, and the visual geometric nature of real roots.',
    },
    {
      id: 'probability-sim',
      title: 'Monte Carlo Probability Simulator',
      grade: 'Class 10',
      topic: 'Probability',
      formula: 'P(E) = n(E) / n(S)',
      description: 'Run up to 500 coin or dice rolls to observe the Law of Large Numbers convergence in real time.',
    },
    {
      id: 'circle-area',
      title: 'Sector Rearrangement Proof of πr²',
      grade: 'Class 9 & 10',
      topic: 'Circles',
      formula: 'Area = πr²',
      description: 'Slice circles into 8, 16, 32, or 64 sectors and unroll them into an approximate rectangle.',
    },
    {
      id: 'cylinder-net',
      title: 'Cylinder 2D Net Unfolding',
      grade: 'Class 9 & 10',
      topic: 'Mensuration',
      formula: 'CSA = 2πrh, TSA = 2πr(r+h)',
      description: 'Unroll curved 3D surfaces into flat 2D rectangles to understand surface area formulas.',
    },
    {
      id: 'linear-equations',
      title: 'Pair of Linear Equations & Intersections',
      grade: 'Class 10',
      topic: 'Algebra',
      formula: 'a₁x + b₁y = c₁, a₂x + b₂y = c₂',
      description: 'Explore unique intersection, parallel, and coincident lines with ratio consistency checks.',
    },
    {
      id: 'similar-triangles',
      title: 'Thales Theorem (BPT) & Similar Triangles',
      grade: 'Class 10',
      topic: 'Geometry',
      formula: 'AD/DB = AE/EC',
      description: 'Slide parallel segment DE ∥ BC and watch side ratios and triangle similarity hold invariant.',
    },
    {
      id: 'statistics-lab',
      title: 'Central Tendency & Outlier Impact',
      grade: 'Class 9 & 10',
      topic: 'Statistics',
      formula: 'Mean vs Median',
      description: 'Inject extreme values into datasets to visually see Mean shift while Median stays robust.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300">
          The Cause-and-Effect Principle
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Interactive Mathematics Lab Hub
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Directly manipulate mathematical entities. Every interaction demonstrates what changed, why it changed, and the formal rule explaining it.
        </p>
      </div>

      {/* Lab Selector Horizontal Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {labList.map((lab) => {
          const isActive = activeLabId === lab.id;
          return (
            <button
              key={lab.id}
              onClick={() => setActiveLabId(lab.id)}
              className={`text-left p-3 rounded-2xl border min-w-[220px] max-w-[240px] shrink-0 transition flex flex-col justify-between ${
                isActive
                  ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                  <span className="text-indigo-600 dark:text-indigo-400 uppercase">{lab.grade}</span>
                  <span className="text-slate-400">{lab.topic}</span>
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {lab.title}
                </div>
                <div className="font-mono text-[11px] text-slate-500 mt-0.5 truncate">
                  {lab.formula}
                </div>
              </div>
              {isActive && (
                <div className="mt-2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Active Simulator
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Lab Container */}
      <div className="pt-2">
        <InteractiveLabDispatcher labId={activeLabId} />
      </div>
    </div>
  );
};
