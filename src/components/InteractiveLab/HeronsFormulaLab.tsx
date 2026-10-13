import React, { useState } from 'react';
import { MathView } from '../MathView';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export const HeronsFormulaLab: React.FC = () => {
  const [a, setA] = useState<number>(6);
  const [b, setB] = useState<number>(5);
  const [c, setC] = useState<number>(5);

  // Check triangle inequality theorem
  const isValidTriangle = a + b > c && b + c > a && c + a > b;

  const s = (a + b + c) / 2;
  const termA = s - a;
  const termB = s - b;
  const termC = s - c;
  const product = s * termA * termB * termC;
  const area = isValidTriangle && product > 0 ? Math.sqrt(product) : 0;

  // Preset triangles
  const applyPreset = (sideA: number, sideB: number, sideC: number) => {
    setA(sideA);
    setB(sideB);
    setC(sideC);
  };

  // SVG triangle coordinate calculation
  // Let A be at (0, 0), B at (a, 0).
  // Using Law of Cosines: c^2 = a^2 + b^2 - 2 a b cos(C)...
  // Let vertex 1 = (0, 0), vertex 2 = (c, 0). Side c is the base.
  // Then side b is between (0, 0) and (x3, y3), side a is between (c, 0) and (x3, y3).
  // b^2 = x3^2 + y3^2
  // a^2 = (c - x3)^2 + y3^2 = c^2 - 2c*x3 + x3^2 + y3^2 = c^2 - 2c*x3 + b^2
  // => 2c*x3 = c^2 + b^2 - a^2 => x3 = (b^2 + c^2 - a^2) / (2c)
  // y3 = sqrt(b^2 - x3^2)

  const svgW = 320;
  const svgH = 220;
  const pad = 35;

  let p1x = pad;
  let p1y = svgH - pad;
  let p2x = svgW - pad;
  let p2y = svgH - pad;
  let p3x = svgW / 2;
  let p3y = pad;

  if (isValidTriangle) {
    const baseLen = c;
    const x3_math = (b * b + c * c - a * a) / (2 * c);
    const y3_sq = b * b - x3_math * x3_math;
    const y3_math = y3_sq > 0 ? Math.sqrt(y3_sq) : 0;

    const scale = (svgW - 2 * pad) / Math.max(c, 1);
    p1x = pad;
    p1y = svgH - pad;
    p2x = pad + baseLen * scale;
    p2y = svgH - pad;
    p3x = pad + x3_math * scale;
    p3y = svgH - pad - y3_math * scale;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Interactive Mensuration Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Heron's Formula &amp; Triangle Inequality Explorer
          </h3>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">Presets:</span>
          <button
            onClick={() => applyPreset(3, 4, 5)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium"
          >
            3-4-5
          </button>
          <button
            onClick={() => applyPreset(6, 6, 6)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium"
          >
            Equilateral
          </button>
          <button
            onClick={() => applyPreset(5, 5, 6)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium"
          >
            Isosceles
          </button>
          <button
            onClick={() => applyPreset(6, 5, 5)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        Change triangle side lengths <span className="font-mono font-bold text-blue-600">a</span>, <span className="font-mono font-bold text-emerald-600">b</span>, and <span className="font-mono font-bold text-amber-600">c</span>. Notice how Heron's formula computes area without needing an altitude!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Side a</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{a} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Side b</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{b} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Side c (Base)</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{c} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={c}
                onChange={(e) => setC(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>
          </div>

          {/* Validation Status */}
          {!isValidTriangle ? (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Triangle Inequality Violated!</strong>
                Sides ({a}, {b}, {c}) cannot close into a triangle because the sum of any two sides must strictly exceed the third.
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Valid triangle: {a} + {b} &gt; {c}, {b} + {c} &gt; {a}, and {c} + {a} &gt; {b}.</span>
            </div>
          )}

          {/* Real-time Heron Calculations */}
          <div className="bg-amber-50/70 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Semiperimeter (s):</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                ({a} + {b} + {c}) / 2 = {s} cm
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 py-1 text-center font-mono">
              <div className="bg-white dark:bg-slate-900 p-1.5 rounded border border-amber-200 dark:border-amber-900">
                s - a = {termA}
              </div>
              <div className="bg-white dark:bg-slate-900 p-1.5 rounded border border-amber-200 dark:border-amber-900">
                s - b = {termB}
              </div>
              <div className="bg-white dark:bg-slate-900 p-1.5 rounded border border-amber-200 dark:border-amber-900">
                s - c = {termC}
              </div>
            </div>
            <div className="pt-2 border-t border-amber-200 dark:border-amber-800 flex justify-between items-center">
              <span className="font-bold text-amber-900 dark:text-amber-200">Area:</span>
              <span className="font-mono text-base font-bold text-amber-700 dark:text-amber-300">
                {isValidTriangle ? `${area.toFixed(2)} cm²` : 'Undefined'}
              </span>
            </div>
          </div>
        </div>

        {/* Visual SVG Column */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center w-full max-w-sm sm:max-w-md">
            {isValidTriangle ? (
              <svg
                width={svgW}
                height={svgH}
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="max-w-full h-auto select-none"
              >
                {/* Polygon */}
                <polygon
                  points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`}
                  className="fill-amber-500/15 stroke-amber-500"
                  strokeWidth="2.5"
                />

                {/* Vertex points */}
                <circle cx={p1x} cy={p1y} r="4" className="fill-blue-600" />
                <circle cx={p2x} cy={p2y} r="4" className="fill-blue-600" />
                <circle cx={p3x} cy={p3y} r="4" className="fill-blue-600" />

                {/* Side Labels */}
                {/* Side c (Base) */}
                <text
                  x={(p1x + p2x) / 2}
                  y={p1y + 18}
                  textAnchor="middle"
                  className="fill-amber-700 dark:fill-amber-300 font-mono text-xs font-semibold"
                >
                  c = {c} cm
                </text>

                {/* Side b (p1 to p3) */}
                <text
                  x={(p1x + p3x) / 2 - 14}
                  y={(p1y + p3y) / 2}
                  textAnchor="middle"
                  className="fill-emerald-700 dark:fill-emerald-300 font-mono text-xs font-semibold"
                >
                  b = {b}
                </text>

                {/* Side a (p2 to p3) */}
                <text
                  x={(p2x + p3x) / 2 + 14}
                  y={(p2y + p3y) / 2}
                  textAnchor="middle"
                  className="fill-blue-700 dark:fill-blue-300 font-mono text-xs font-semibold"
                >
                  a = {a}
                </text>

                {/* Area center text */}
                <text
                  x={(p1x + p2x + p3x) / 3}
                  y={(p1y + p2y + p3y) / 3}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-amber-900 dark:fill-amber-100 font-bold text-xs"
                >
                  Area = {area.toFixed(1)} cm²
                </text>
              </svg>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <AlertTriangle className="w-10 h-10 text-rose-400 mb-2" />
                <p className="text-xs">Adjust sliders so the sides can touch and form a closed polygon.</p>
              </div>
            )}
          </div>

          <div className="mt-3 text-center">
            <MathView math="\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}" block />
          </div>
        </div>
      </div>
    </div>
  );
};
