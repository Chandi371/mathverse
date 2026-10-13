import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw, Eye } from 'lucide-react';

export const AreaModelLab: React.FC = () => {
  const [a, setA] = useState<number>(4);
  const [b, setB] = useState<number>(3);
  const [mode, setMode] = useState<'plus' | 'diff'>('plus');
  const [showValues, setShowValues] = useState<boolean>(true);

  const totalSide = a + b;
  const areaA2 = a * a;
  const areaAB = a * b;
  const areaB2 = b * b;
  const totalArea = totalSide * totalSide;

  // Viewbox calculation
  const svgSize = 320;
  const padding = 20;
  const drawWidth = svgSize - 2 * padding;
  const scale = drawWidth / totalSide;

  const aPx = a * scale;
  const bPx = b * scale;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Interactive Mathematics Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Geometric Area Model for Algebraic Identities
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(mode === 'plus' ? 'diff' : 'plus')}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Switch: {mode === 'plus' ? '(a + b)²' : '(a - b)²'}
          </button>
          <button
            onClick={() => { setA(4); setB(3); }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Reset sliders"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        {mode === 'plus'
          ? 'Adjust lengths a and b. Notice how the large square of side (a + b) splits naturally into four rectangular regions!'
          : 'Observe how subtracting b on each side reveals why (a - b)² = a² - 2ab + b².'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-4">
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
                min="2"
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
                  Side length <span className="font-mono text-emerald-600 dark:text-emerald-400">b</span>
                </span>
                <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">{b}</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
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
                Total Side = {a + b}
              </span>
            </div>
          </div>

          {/* Real-time Math Feedback */}
          <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60">
            <div className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mb-1.5">
              Symbolic &amp; Numerical Balance
            </div>
            {mode === 'plus' ? (
              <div className="space-y-2 text-sm">
                <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900 text-center">
                  <MathView math={`(a + b)^2 = (${a} + ${b})^2 = ${totalSide}^2 = \\mathbf{${totalArea}}`} />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Square a²:</span>
                    <span className="font-mono">{a} × {a} = {areaA2}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-amber-600 dark:text-amber-400 font-medium">Rectangle 1 (ab):</span>
                    <span className="font-mono">{a} × {b} = {areaAB}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-amber-600 dark:text-amber-400 font-medium">Rectangle 2 (ab):</span>
                    <span className="font-mono">{b} × {a} = {areaAB}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Square b²:</span>
                    <span className="font-mono">{b} × {b} = {areaB2}</span>
                  </div>
                  <div className="border-t border-indigo-200 dark:border-indigo-800 pt-1 font-bold flex justify-between text-indigo-700 dark:text-indigo-300">
                    <span>Sum of 4 regions:</span>
                    <span className="font-mono">{areaA2} + 2({areaAB}) + {areaB2} = {totalArea}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900 text-center">
                  <MathView math={`(a - b)^2 = (${a} - ${b})^2 = ${Math.max(0, a - b)}^2 = \\mathbf{${Math.max(0, a - b) ** 2}}`} />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <MathView math={`a^2 - 2ab + b^2 = ${a * a} - ${2 * a * b} + ${b * b} = ${a * a - 2 * a * b + b * b}`} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Canvas Column */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="relative bg-slate-100/70 dark:bg-slate-800/50 p-2 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center">
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
                className="fill-blue-700 dark:fill-blue-300 font-bold text-sm select-none"
              >
                a² {showValues && `(${areaA2})`}
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
                ab {showValues && `(${areaAB})`}
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
                ab {showValues && `(${areaAB})`}
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
                b² {showValues && `(${areaB2})`}
              </text>

              {/* Dimension brackets and labels */}
              {/* Top dimension: a + b */}
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
                b = {b}
              </text>

              {/* Left dimension: a + b */}
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
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
            <Eye className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>
              <strong>Visual insight:</strong> The square is literally partitioned into 1 blue square, 2 identical orange rectangles, and 1 green square.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
