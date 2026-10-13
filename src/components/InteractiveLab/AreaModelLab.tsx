import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw, Eye, Sparkles } from 'lucide-react';
import { expandBinomialSquare, expandBinomialDiff, diffOfSquares } from '../../utils/mathUtils';

type IdentityMode = 'sum-square' | 'diff-square' | 'diff-squares';

export const AreaModelLab: React.FC = () => {
  const [mode, setMode] = useState<IdentityMode>('sum-square');
  const [a, setA] = useState<number>(5);
  const [b, setB] = useState<number>(3);
  const [showValues, setShowValues] = useState<boolean>(true);

  // Guard against invalid b >= a for difference identities
  const safeB = mode !== 'sum-square' && b >= a ? Math.max(1, a - 1) : b;

  const resetValues = () => {
    setA(5);
    setB(3);
  };

  // Calculations
  const sumRes = expandBinomialSquare(a, safeB);
  const diffRes = expandBinomialDiff(a, safeB);
  const diffSqRes = diffOfSquares(a, safeB);

  // SVG parameters
  const svgSize = 340;
  const padding = 24;
  const drawWidth = svgSize - 2 * padding;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Interactive Mathematics Lab
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Geometric Area Models for Algebraic Identities
          </h3>
        </div>
        <button
          onClick={resetValues}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
          title="Reset sliders to default"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Switcher Tabs - Compact on Mobile */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <button
          onClick={() => setMode('sum-square')}
          className={`py-1.5 sm:py-2 px-1 text-center rounded-xl text-xs font-semibold transition border ${
            mode === 'sum-square'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <span className="sm:hidden">(a + b)²</span>
          <span className="hidden sm:inline">1. (a + b)² = a² + 2ab + b²</span>
        </button>
        <button
          onClick={() => setMode('diff-square')}
          className={`py-1.5 sm:py-2 px-1 text-center rounded-xl text-xs font-semibold transition border ${
            mode === 'diff-square'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <span className="sm:hidden">(a - b)²</span>
          <span className="hidden sm:inline">2. (a - b)² = a² - 2ab + b²</span>
        </button>
        <button
          onClick={() => setMode('diff-squares')}
          className={`py-1.5 sm:py-2 px-1 text-center rounded-xl text-xs font-semibold transition border ${
            mode === 'diff-squares'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <span className="sm:hidden">a² - b²</span>
          <span className="hidden sm:inline">3. a² - b² = (a - b)(a + b)</span>
        </button>
      </div>

      {/* Main Grid: Visual Canvas first on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:grid md:grid-cols-12 gap-3.5 sm:gap-6 items-center pt-1">
        {/* Controls Column (order-2 on mobile, order-1 on desktop) */}
        <div className="w-full order-2 md:order-1 md:col-span-5 space-y-3.5 sm:space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                  Side length <span className="font-mono text-blue-600 dark:text-blue-400">a</span>
                </span>
                <span className="font-mono text-base font-bold text-blue-600 dark:text-blue-400">{a}</span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                step="1"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  Length <span className="font-mono text-emerald-600 dark:text-emerald-400">b</span>
                </span>
                <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">{safeB}</span>
              </div>
              <input
                type="range"
                min="1"
                max={mode === 'sum-square' ? 6 : Math.max(1, a - 1)}
                step="1"
                value={safeB}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              {mode !== 'sum-square' && (
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Constraint: b &lt; a (so length a - b = {a - safeB} remains positive)
                </span>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <label className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showValues}
                  onChange={(e) => setShowValues(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                Show numerical values
              </label>
              <span className="text-xs text-slate-500 font-mono">
                {mode === 'sum-square' ? `Side = ${a + safeB}` : `a - b = ${a - safeB}`}
              </span>
            </div>
          </div>

          {/* Mathematical Feedback Box */}
          <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Mathematical Verification:
            </div>

            {mode === 'sum-square' && (
              <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900 text-center text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  <MathView math={`(a + b)^2 = (${a} + ${safeB})^2 = ${a + safeB}^2 = ${sumRes.directSquare}`} />
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Square a²:</span>
                  <span className="font-mono">{a} × {a} = {sumRes.squareA}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Two Rectangles 2ab:</span>
                  <span className="font-mono">2 × ({a} × {safeB}) = {sumRes.crossTerm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Square b²:</span>
                  <span className="font-mono">{safeB} × {safeB} = {sumRes.squareB}</span>
                </div>
                <div className="border-t border-indigo-200 dark:border-indigo-800 pt-1 flex justify-between font-bold text-indigo-900 dark:text-indigo-200">
                  <span>Sum of 4 regions:</span>
                  <span className="font-mono">{sumRes.squareA} + {sumRes.crossTerm} + {sumRes.squareB} = {sumRes.sumOfRegions}</span>
                </div>
              </div>
            )}

            {mode === 'diff-square' && (
              <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900 text-center text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  <MathView math={`(a - b)^2 = (${a} - ${safeB})^2 = ${a - safeB}^2 = ${diffRes.directSquare}`} />
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Original Square a²:</span>
                  <span className="font-mono">{a}² = {diffRes.squareA}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Subtract 2 strips (2ab):</span>
                  <span className="font-mono">-2 × ({a} × {safeB}) = -{diffRes.crossTerm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-600 dark:text-rose-400 font-medium">Add back double-subtracted b²:</span>
                  <span className="font-mono">+{safeB}² = +{diffRes.squareB}</span>
                </div>
                <div className="border-t border-indigo-200 dark:border-indigo-800 pt-1 flex justify-between font-bold text-indigo-900 dark:text-indigo-200">
                  <span>Net Interior Area:</span>
                  <span className="font-mono">{diffRes.squareA} - {diffRes.crossTerm} + {diffRes.squareB} = {diffRes.computed}</span>
                </div>
              </div>
            )}

            {mode === 'diff-squares' && (
              <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900 text-center text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  <MathView math={`a^2 - b^2 = ${a}^2 - ${safeB}^2 = ${diffSqRes.squareA} - ${diffSqRes.squareB} = ${diffSqRes.diff}`} />
                </div>
                <div className="flex justify-between">
                  <span>Factor (a - b):</span>
                  <span className="font-mono font-bold text-blue-600">{a} - {safeB} = {a - safeB}</span>
                </div>
                <div className="flex justify-between">
                  <span>Factor (a + b):</span>
                  <span className="font-mono font-bold text-emerald-600">{a} + {safeB} = {a + safeB}</span>
                </div>
                <div className="border-t border-indigo-200 dark:border-indigo-800 pt-1 flex justify-between font-bold text-indigo-900 dark:text-indigo-200">
                  <span>Rearranged Rectangle Area:</span>
                  <span className="font-mono">({a - safeB}) × ({a + safeB}) = {diffSqRes.factored}</span>
                </div>
              </div>
            )}

            {/* Educational Takeaway */}
            <div className="pt-1.5 border-t border-indigo-200 dark:border-indigo-800 text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              {mode === 'sum-square' && (
                <span><strong>Core Takeaway:</strong> Square of side (a+b) naturally splits into 4 regions: 1 blue square (a²), 2 identical orange rectangles (2ab), and 1 green square (b²).</span>
              )}
              {mode === 'diff-square' && (
                <span><strong>Core Takeaway:</strong> Subtracting 2 strips of (a×b) removes the corner square (b²) twice, which is why +b² must be added back!</span>
              )}
              {mode === 'diff-squares' && (
                <span><strong>Core Takeaway:</strong> Cutting corner b² from a² leaves an L-shape that seamlessly rearranges into a single rectangle of (a - b) × (a + b).</span>
              )}
            </div>
          </div>
        </div>

        {/* Visual SVG Canvas Column (order-1 on mobile, order-2 on desktop) */}
        <div className="w-full order-1 md:order-2 md:col-span-7 flex flex-col items-center justify-center">
          <div className="relative bg-slate-100/70 dark:bg-slate-800/50 p-2 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center w-full max-w-[280px] sm:max-w-md">
            {/* SVG 1: (a + b)² Mode */}
            {mode === 'sum-square' && (() => {
              const totalSide = a + safeB;
              const scale = drawWidth / totalSide;
              const aPx = a * scale;
              const bPx = safeB * scale;

              return (
                <svg
                  width={svgSize}
                  height={svgSize}
                  viewBox={`0 0 ${svgSize} ${svgSize}`}
                  className="max-w-full h-auto select-none overflow-visible"
                >
                  {/* Outer border */}
                  <rect
                    x={padding}
                    y={padding}
                    width={drawWidth}
                    height={drawWidth}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-300 dark:text-slate-700"
                  />

                  {/* Region 1: a x a (Blue) */}
                  <rect
                    x={padding}
                    y={padding}
                    width={aPx}
                    height={aPx}
                    className="fill-blue-500/20 stroke-blue-500 hover:fill-blue-500/30 transition-colors"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + aPx / 2}
                    y={padding + aPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-blue-700 dark:fill-blue-300 font-bold text-xs sm:text-sm select-none"
                  >
                    a² {showValues && `(${a * a})`}
                  </text>

                  {/* Region 2: a x b (Top-Right Amber) */}
                  <rect
                    x={padding + aPx}
                    y={padding}
                    width={bPx}
                    height={aPx}
                    className="fill-amber-500/20 stroke-amber-500 hover:fill-amber-500/30 transition-colors"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + aPx + bPx / 2}
                    y={padding + aPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-amber-700 dark:fill-amber-300 font-semibold text-xs select-none"
                  >
                    ab {showValues && `(${a * safeB})`}
                  </text>

                  {/* Region 3: b x a (Bottom-Left Amber) */}
                  <rect
                    x={padding}
                    y={padding + aPx}
                    width={aPx}
                    height={bPx}
                    className="fill-amber-500/20 stroke-amber-500 hover:fill-amber-500/30 transition-colors"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + aPx / 2}
                    y={padding + aPx + bPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-amber-700 dark:fill-amber-300 font-semibold text-xs select-none"
                  >
                    ab {showValues && `(${a * safeB})`}
                  </text>

                  {/* Region 4: b x b (Bottom-Right Emerald) */}
                  <rect
                    x={padding + aPx}
                    y={padding + aPx}
                    width={bPx}
                    height={bPx}
                    className="fill-emerald-500/20 stroke-emerald-500 hover:fill-emerald-500/30 transition-colors"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + aPx + bPx / 2}
                    y={padding + aPx + bPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-emerald-700 dark:fill-emerald-300 font-bold text-xs select-none"
                  >
                    b² {showValues && `(${safeB * safeB})`}
                  </text>

                  {/* Labels on top */}
                  <text
                    x={padding + aPx / 2}
                    y={padding - 6}
                    textAnchor="middle"
                    className="fill-blue-600 dark:fill-blue-400 font-mono text-xs font-semibold"
                  >
                    a = {a}
                  </text>
                  <text
                    x={padding + aPx + bPx / 2}
                    y={padding - 6}
                    textAnchor="middle"
                    className="fill-emerald-600 dark:fill-emerald-400 font-mono text-xs font-semibold"
                  >
                    b = {safeB}
                  </text>

                  {/* Labels on left */}
                  <text
                    x={padding - 6}
                    y={padding + aPx / 2}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="fill-blue-600 dark:fill-blue-400 font-mono text-xs font-semibold"
                  >
                    a
                  </text>
                  <text
                    x={padding - 6}
                    y={padding + aPx + bPx / 2}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="fill-emerald-600 dark:fill-emerald-400 font-mono text-xs font-semibold"
                  >
                    b
                  </text>
                </svg>
              );
            })()}

            {/* SVG 2: (a - b)² Mode */}
            {mode === 'diff-square' && (() => {
              const scale = drawWidth / a;
              const aMinusBPx = (a - safeB) * scale;
              const bPx = safeB * scale;

              return (
                <svg
                  width={svgSize}
                  height={svgSize}
                  viewBox={`0 0 ${svgSize} ${svgSize}`}
                  className="max-w-full h-auto select-none overflow-visible"
                >
                  {/* Full Square of side a */}
                  <rect
                    x={padding}
                    y={padding}
                    width={drawWidth}
                    height={drawWidth}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-400 dark:text-slate-600"
                  />

                  {/* (a - b)² Target Region (Indigo Solid) */}
                  <rect
                    x={padding}
                    y={padding}
                    width={aMinusBPx}
                    height={aMinusBPx}
                    className="fill-indigo-600/30 stroke-indigo-600"
                    strokeWidth="2.5"
                  />
                  <text
                    x={padding + aMinusBPx / 2}
                    y={padding + aMinusBPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-indigo-800 dark:fill-indigo-200 font-bold text-xs sm:text-sm select-none"
                  >
                    (a - b)² {showValues && `(${(a - safeB) ** 2})`}
                  </text>

                  {/* Right Subtracted Strip: (a - b) x b (Strip 1) */}
                  <rect
                    x={padding + aMinusBPx}
                    y={padding}
                    width={bPx}
                    height={aMinusBPx}
                    className="fill-rose-500/20 stroke-rose-400 stroke-dasharray-2"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={padding + aMinusBPx + bPx / 2}
                    y={padding + aMinusBPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-rose-700 dark:fill-rose-300 font-semibold text-[10px] select-none"
                  >
                    -Strip 1
                  </text>

                  {/* Bottom Subtracted Strip: b x (a - b) (Strip 2) */}
                  <rect
                    x={padding}
                    y={padding + aMinusBPx}
                    width={aMinusBPx}
                    height={bPx}
                    className="fill-rose-500/20 stroke-rose-400 stroke-dasharray-2"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={padding + aMinusBPx / 2}
                    y={padding + aMinusBPx + bPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-rose-700 dark:fill-rose-300 font-semibold text-[10px] select-none"
                  >
                    -Strip 2
                  </text>

                  {/* Overlap Corner: b x b (Subtracted twice, added back!) */}
                  <rect
                    x={padding + aMinusBPx}
                    y={padding + aMinusBPx}
                    width={bPx}
                    height={bPx}
                    className="fill-emerald-500/30 stroke-emerald-500"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + aMinusBPx + bPx / 2}
                    y={padding + aMinusBPx + bPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-emerald-800 dark:fill-emerald-200 font-bold text-[10px] select-none"
                  >
                    +b²
                  </text>

                  {/* Dimension labels */}
                  <text
                    x={padding + aMinusBPx / 2}
                    y={padding - 6}
                    textAnchor="middle"
                    className="fill-indigo-600 dark:fill-indigo-400 font-mono text-xs font-semibold"
                  >
                    a - b = {a - safeB}
                  </text>
                  <text
                    x={padding + aMinusBPx + bPx / 2}
                    y={padding - 6}
                    textAnchor="middle"
                    className="fill-emerald-600 dark:fill-emerald-400 font-mono text-xs font-semibold"
                  >
                    b = {safeB}
                  </text>

                  <text
                    x={padding - 6}
                    y={padding + aMinusBPx / 2}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="fill-indigo-600 dark:fill-indigo-400 font-mono text-xs font-semibold"
                  >
                    a - b
                  </text>
                  <text
                    x={padding - 6}
                    y={padding + aMinusBPx + bPx / 2}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="fill-emerald-600 dark:fill-emerald-400 font-mono text-xs font-semibold"
                  >
                    b
                  </text>
                </svg>
              );
            })()}

            {/* SVG 3: a² - b² Difference of Squares Mode */}
            {mode === 'diff-squares' && (() => {
              const scale = drawWidth / (a + safeB);
              const aPx = a * scale;
              const aMinusBPx = (a - safeB) * scale;
              const bPx = safeB * scale;

              return (
                <svg
                  width={svgSize}
                  height={svgSize}
                  viewBox={`0 0 ${svgSize} ${svgSize}`}
                  className="max-w-full h-auto select-none overflow-visible"
                >
                  {/* Part 1: Top rectangle (a - b) x a */}
                  <rect
                    x={padding}
                    y={padding}
                    width={aPx}
                    height={aMinusBPx}
                    className="fill-blue-500/25 stroke-blue-500"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + aPx / 2}
                    y={padding + aMinusBPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-blue-800 dark:fill-blue-200 font-bold text-xs select-none"
                  >
                    Part 1: (a - b) × a
                  </text>

                  {/* Part 2: Bottom-left rectangle (a - b) x b */}
                  <rect
                    x={padding}
                    y={padding + aMinusBPx}
                    width={aMinusBPx}
                    height={bPx}
                    className="fill-emerald-500/25 stroke-emerald-500"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + aMinusBPx / 2}
                    y={padding + aMinusBPx + bPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-emerald-800 dark:fill-emerald-200 font-bold text-[10px] select-none"
                  >
                    Part 2
                  </text>

                  {/* Cutout: b x b in bottom-right corner */}
                  <rect
                    x={padding + aMinusBPx}
                    y={padding + aMinusBPx}
                    width={bPx}
                    height={bPx}
                    className="fill-rose-500/10 stroke-rose-400"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={padding + aMinusBPx + bPx / 2}
                    y={padding + aMinusBPx + bPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-rose-600 dark:fill-rose-400 font-mono text-[10px] select-none"
                  >
                    Cutout b²
                  </text>

                  {/* Rearranged Arrow Indicator */}
                  <path
                    d={`M ${padding + aMinusBPx / 2} ${padding + aMinusBPx + bPx + 15} Q ${padding + aPx + 20} ${padding + aMinusBPx + bPx + 20} ${padding + aPx + 15} ${padding + aMinusBPx / 2}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-indigo-400 stroke-dasharray-2"
                  />

                  {/* Rearranged Part 2 flipped beside Part 1 */}
                  <rect
                    x={padding + aPx}
                    y={padding}
                    width={bPx}
                    height={aMinusBPx}
                    className="fill-emerald-500/25 stroke-emerald-500 stroke-dasharray-2"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={padding + aPx + bPx / 2}
                    y={padding + aMinusBPx / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-emerald-800 dark:fill-emerald-200 font-bold text-[9px] select-none"
                  >
                    Rotated Part 2
                  </text>

                  {/* Total combined width label */}
                  <text
                    x={padding + (aPx + bPx) / 2}
                    y={padding - 6}
                    textAnchor="middle"
                    className="fill-indigo-700 dark:fill-indigo-300 font-mono text-xs font-bold"
                  >
                    Combined Width = a + b ({a + safeB})
                  </text>
                  <text
                    x={padding - 6}
                    y={padding + aMinusBPx / 2}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="fill-blue-700 dark:fill-blue-300 font-mono text-xs font-bold"
                  >
                    Height = a - b ({a - safeB})
                  </text>
                </svg>
              );
            })()}
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
            <Eye className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>
              <strong>Visual Reasoning:</strong> Geometric areas never lie. Moving shapes proves the algebraic expansion without blind memorization.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
