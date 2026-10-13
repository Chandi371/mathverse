import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import { thalesTheorem } from '../../utils/mathUtils';

export const SimilarTrianglesLab: React.FC = () => {
  // Slider for splitting ratio along side AB (fraction between 0.2 and 0.8)
  const [splitFraction, setSplitFraction] = useState<number>(0.4);
  const [baseBC] = useState<number>(10);

  // Triangle side lengths for demonstration: AB = 8 cm, AC = 10 cm
  const totalAB = 8;
  const totalAC = 10;

  const ad = totalAB * splitFraction;
  const db = totalAB * (1 - splitFraction);
  const ae = totalAC * splitFraction;

  const result = thalesTheorem(ad, db, ae);
  const de = baseBC * splitFraction;

  // SVG coordinates for triangle ABC
  const svgW = 320;
  const svgH = 240;
  const pad = 24;

  const Ax = svgW / 2;
  const Ay = pad + 15;
  const Bx = pad;
  const By = svgH - pad;
  const Cx = svgW - pad;
  const Cy = svgH - pad;

  // Point D on AB and Point E on AC
  const Dx = Ax + (Bx - Ax) * splitFraction;
  const Dy = Ay + (By - Ay) * splitFraction;
  const Ex = Ax + (Cx - Ax) * splitFraction;
  const Ey = Ay + (Cy - Ay) * splitFraction;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            Interactive Geometry Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Basic Proportionality Theorem (Thales Theorem)
          </h3>
        </div>
        <button
          onClick={() => setSplitFraction(0.4)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          title="Reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        Drag the parallel line <span className="font-mono font-bold text-indigo-600">DE ∥ BC</span> up and down. Notice how the ratio of divided segments{' '}
        <span className="font-mono font-bold text-blue-600">AD/DB</span> always equals{' '}
        <span className="font-mono font-bold text-emerald-600">AE/EC</span>, and the top triangle{' '}
        <span className="font-bold">△ADE</span> stays strictly similar to <span className="font-bold">△ABC</span>!
      </p>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-5 md:gap-6 items-center">
        {/* Controls Column (order-2 on mobile, order-1 on desktop) */}
        <div className="w-full order-2 md:order-1 md:col-span-5 space-y-3.5 sm:space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Position of Parallel Line DE</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {(splitFraction * 100).toFixed(0)}% from Apex A
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="0.8"
                step="0.05"
                value={splitFraction}
                onChange={(e) => setSplitFraction(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 cursor-pointer bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>Near A (20%)</span>
                <span>Midpoint (50%)</span>
                <span>Near Base (80%)</span>
              </div>
            </div>

            {/* Segment Lengths Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-mono">
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block text-[10px]">AD =</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{ad.toFixed(2)} cm</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block text-[10px]">DB =</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{db.toFixed(2)} cm</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block text-[10px]">AE =</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{ae.toFixed(2)} cm</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block text-[10px]">EC =</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{result.ec.toFixed(2)} cm</span>
              </div>
            </div>
          </div>

          {/* Ratio Comparison Box */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Thales Equality Ratio Check:
            </div>
            <div className="space-y-1 text-slate-700 dark:text-slate-300 font-mono">
              <div className="flex justify-between">
                <span>Left Side Ratio (AD / DB):</span>
                <span className="font-bold text-blue-600">{ad.toFixed(2)} / {db.toFixed(2)} = {result.ratioLeft.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Right Side Ratio (AE / EC):</span>
                <span className="font-bold text-emerald-600">{ae.toFixed(2)} / {result.ec.toFixed(2)} = {result.ratioRight.toFixed(3)}</span>
              </div>
              <div className="border-t border-emerald-200 dark:border-emerald-800 pt-1.5 flex items-center justify-between font-bold text-emerald-950 dark:text-emerald-200">
                <span>Theorem Status:</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  AD / DB === AE / EC
                </span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Similarity Scale Factor k = AD/AB = DE/BC = {result.similarityScale.toFixed(2)} (DE = {de.toFixed(2)} cm, BC = {baseBC} cm)
              </div>
            </div>
          </div>
        </div>

        {/* Visual Triangle SVG (order-1 on mobile, order-2 on desktop) */}
        <div className="w-full order-1 md:order-2 md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center w-full max-w-[280px] sm:max-w-md">
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full h-auto select-none bg-white dark:bg-slate-900 rounded-xl"
            >
              {/* Main Triangle ABC (Base outline) */}
              <polygon
                points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
                className="fill-slate-100 dark:fill-slate-800/40 stroke-slate-400 dark:stroke-slate-600"
                strokeWidth="2"
              />

              {/* Top Similar Triangle ADE (Shaded indigo) */}
              <polygon
                points={`${Ax},${Ay} ${Dx},${Dy} ${Ex},${Ey}`}
                className="fill-indigo-500/20 stroke-indigo-600"
                strokeWidth="2.5"
              />

              {/* Parallel Line DE */}
              <line
                x1={Dx}
                y1={Dy}
                x2={Ex}
                y2={Ey}
                stroke="#4f46e5"
                strokeWidth="2.5"
              />

              {/* Parallel arrows indicators on DE and BC */}
              <text x={(Dx + Ex) / 2} y={Dy - 4} textAnchor="middle" className="fill-indigo-600 font-bold text-xs select-none">
                ▶▶
              </text>
              <text x={(Bx + Cx) / 2} y={By - 4} textAnchor="middle" className="fill-slate-500 font-bold text-xs select-none">
                ▶▶
              </text>

              {/* Vertices circles */}
              <circle cx={Ax} cy={Ay} r="4" className="fill-indigo-600" />
              <circle cx={Bx} cy={By} r="4" className="fill-blue-600" />
              <circle cx={Cx} cy={Cy} r="4" className="fill-emerald-600" />
              <circle cx={Dx} cy={Dy} r="4" className="fill-indigo-600" />
              <circle cx={Ex} cy={Ey} r="4" className="fill-indigo-600" />

              {/* Labels */}
              <text x={Ax} y={Ay - 6} textAnchor="middle" className="fill-slate-900 dark:fill-white font-bold text-xs">
                A
              </text>
              <text x={Bx - 8} y={By + 4} textAnchor="end" className="fill-slate-900 dark:fill-white font-bold text-xs">
                B
              </text>
              <text x={Cx + 8} y={Cy + 4} textAnchor="start" className="fill-slate-900 dark:fill-white font-bold text-xs">
                C
              </text>
              <text x={Dx - 8} y={Dy + 2} textAnchor="end" className="fill-indigo-600 font-bold text-xs">
                D
              </text>
              <text x={Ex + 8} y={Ey + 2} textAnchor="start" className="fill-indigo-600 font-bold text-xs">
                E
              </text>
            </svg>
          </div>

          <div className="mt-3 text-center">
            <MathView math="DE \\parallel BC \\implies \\frac{AD}{DB} = \\frac{AE}{EC} \\quad \\text{and} \\quad \\triangle ADE \\sim \\triangle ABC" />
          </div>
        </div>
      </div>
    </div>
  );
};
