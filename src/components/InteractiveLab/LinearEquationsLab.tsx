import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw } from 'lucide-react';
import { solveLinearSystem } from '../../utils/mathUtils';

export const LinearEquationsLab: React.FC = () => {
  // Line 1: a1*x + b1*y = c1
  const [a1, setA1] = useState<number>(1);
  const [b1, setB1] = useState<number>(1);
  const [c1, setC1] = useState<number>(5);

  // Line 2: a2*x + b2*y = c2
  const [a2, setA2] = useState<number>(2);
  const [b2, setB2] = useState<number>(-1);
  const [c2, setC2] = useState<number>(4);

  const applyPreset = (
    na1: number,
    nb1: number,
    nc1: number,
    na2: number,
    nb2: number,
    nc2: number
  ) => {
    setA1(na1);
    setB1(nb1);
    setC1(nc1);
    setA2(na2);
    setB2(nb2);
    setC2(nc2);
  };

  const solution = solveLinearSystem(a1, b1, c1, a2, b2, c2);

  // Ratio calculations
  const rA = a2 !== 0 ? (a1 / a2).toFixed(2) : 'Undefined';
  const rB = b2 !== 0 ? (b1 / b2).toFixed(2) : 'Undefined';
  const rC = c2 !== 0 ? (c1 / c2).toFixed(2) : 'Undefined';

  // Coordinate plot setup
  const svgSize = 320;
  const minCoord = -5;
  const maxCoord = 10;
  const coordRange = maxCoord - minCoord;
  const scale = svgSize / coordRange;

  const toPxX = (x: number) => (x - minCoord) * scale;
  const toPxY = (y: number) => svgSize - (y - minCoord) * scale;

  // Compute endpoints for Line 1 across x = -5 to 10 (if b1 != 0, else vertical line)
  const getLinePoints = (a: number, b: number, c: number) => {
    if (Math.abs(b) > 1e-6) {
      const xA = minCoord;
      const yA = (c - a * xA) / b;
      const xB = maxCoord;
      const yB = (c - a * xB) / b;
      return { x1: toPxX(xA), y1: toPxY(yA), x2: toPxX(xB), y2: toPxY(yB) };
    } else if (Math.abs(a) > 1e-6) {
      const xVal = c / a;
      return { x1: toPxX(xVal), y1: 0, x2: toPxX(xVal), y2: svgSize };
    }
    return null;
  };

  const pL1 = getLinePoints(a1, b1, c1);
  const pL2 = getLinePoints(a2, b2, c2);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            Interactive Algebra Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Pair of Linear Equations in Two Variables
          </h3>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">Presets:</span>
          <button
            onClick={() => applyPreset(1, 1, 5, 2, -1, 4)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold"
          >
            Intersecting (1 Sol)
          </button>
          <button
            onClick={() => applyPreset(2, 4, 8, 2, 4, 16)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold"
          >
            Parallel (No Sol)
          </button>
          <button
            onClick={() => applyPreset(1, 2, 4, 2, 4, 8)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold"
          >
            Coincident (∞ Sol)
          </button>
          <button
            onClick={() => applyPreset(1, 1, 5, 2, -1, 4)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        Adjust coefficients to explore graphical solutions. Observe how comparing coefficient ratios{' '}
        <span className="font-mono font-bold text-blue-600">a₁/a₂</span>,{' '}
        <span className="font-mono font-bold text-emerald-600">b₁/b₂</span>, and{' '}
        <span className="font-mono font-bold text-purple-600">c₁/c₂</span> determines consistency!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            {/* Line 1 Inputs */}
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                Line 1: {a1}x + {b1}y = {c1}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">a₁: {a1}</label>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    value={a1}
                    onChange={(e) => setA1(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">b₁: {b1}</label>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    value={b1}
                    onChange={(e) => setB1(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">c₁: {c1}</label>
                  <input
                    type="range"
                    min="-6"
                    max="10"
                    value={c1}
                    onChange={(e) => setC1(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Line 2 Inputs */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                Line 2: {a2}x + {b2}y = {c2}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">a₂: {a2}</label>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    value={a2}
                    onChange={(e) => setA2(Number(e.target.value))}
                    className="w-full accent-amber-600 h-1.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">b₂: {b2}</label>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    value={b2}
                    onChange={(e) => setB2(Number(e.target.value))}
                    className="w-full accent-amber-600 h-1.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">c₂: {c2}</label>
                  <input
                    type="range"
                    min="-6"
                    max="10"
                    value={c2}
                    onChange={(e) => setC2(Number(e.target.value))}
                    className="w-full accent-amber-600 h-1.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Consistency & Solution Card */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300">System Verdict:</span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  solution.type === 'intersecting'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : solution.type === 'parallel'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                }`}
              >
                {solution.type.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 py-1 text-center font-mono text-[11px]">
              <div className="bg-white dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-slate-700">
                a₁/a₂ = {rA}
              </div>
              <div className="bg-white dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-slate-700">
                b₁/b₂ = {rB}
              </div>
              <div className="bg-white dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-slate-700">
                c₁/c₂ = {rC}
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              <strong>Condition:</strong> {solution.ratioComparison} → {solution.consistency}.
            </p>

            {solution.type === 'intersecting' && solution.x !== null && solution.y !== null && (
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between font-mono">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">Point of Intersection:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  ({solution.x.toFixed(2)}, {solution.y.toFixed(2)})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Visual Graph Column */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
            <svg
              width={svgSize}
              height={svgSize}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              className="max-w-full h-auto select-none bg-white dark:bg-slate-900 rounded-xl"
            >
              {/* Axes */}
              <line
                x1={0}
                y1={toPxY(0)}
                x2={svgSize}
                y2={toPxY(0)}
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-400 dark:text-slate-600"
              />
              <line
                x1={toPxX(0)}
                y1={0}
                x2={toPxX(0)}
                y2={svgSize}
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-400 dark:text-slate-600"
              />

              {/* Grid ticks */}
              {[-4, -2, 2, 4, 6, 8].map((t) => (
                <g key={t}>
                  <text
                    x={toPxX(t)}
                    y={toPxY(0) + 12}
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] font-mono"
                  >
                    {t}
                  </text>
                  <text
                    x={toPxX(0) - 5}
                    y={toPxY(t) + 3}
                    textAnchor="end"
                    className="fill-slate-400 text-[8px] font-mono"
                  >
                    {t}
                  </text>
                </g>
              ))}

              {/* Line 1 (Blue) */}
              {pL1 && (
                <line
                  x1={pL1.x1}
                  y1={pL1.y1}
                  x2={pL1.x2}
                  y2={pL1.y2}
                  stroke="#2563eb"
                  strokeWidth="2.5"
                />
              )}

              {/* Line 2 (Amber) */}
              {pL2 && (
                <line
                  x1={pL2.x1}
                  y1={pL2.y1}
                  x2={pL2.x2}
                  y2={pL2.y2}
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeDasharray={solution.type === 'coincident' ? '6 3' : undefined}
                />
              )}

              {/* Intersection Point */}
              {solution.type === 'intersecting' && solution.x !== null && solution.y !== null && (
                <g>
                  <circle
                    cx={toPxX(solution.x)}
                    cy={toPxY(solution.y)}
                    r="6"
                    className="fill-emerald-500 stroke-white stroke-2"
                  />
                  <text
                    x={toPxX(solution.x) + 8}
                    y={toPxY(solution.y) - 8}
                    className="fill-emerald-700 dark:fill-emerald-300 font-mono text-[10px] font-bold"
                  >
                    ({solution.x.toFixed(1)}, {solution.y.toFixed(1)})
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="mt-3 text-center">
            <MathView math="\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}" />
          </div>
        </div>
      </div>
    </div>
  );
};
