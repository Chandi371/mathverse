import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export const QuadraticParabolaLab: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-4);
  const [c, setC] = useState<number>(3);

  const disc = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  let root1: number | null = null;
  let root2: number | null = null;
  if (disc > 0) {
    root1 = (-b + Math.sqrt(disc)) / (2 * a);
    root2 = (-b - Math.sqrt(disc)) / (2 * a);
  } else if (disc === 0) {
    root1 = -b / (2 * a);
    root2 = root1;
  }

  // Presets
  const applyPreset = (pa: number, pb: number, pc: number) => {
    setA(pa);
    setB(pb);
    setC(pc);
  };

  // Plot setup: x from -5 to 5, y from -8 to 12
  const svgW = 320;
  const svgH = 240;
  const xMin = -5;
  const xMax = 5;
  const yMin = -6;
  const yMax = 10;

  const toPxX = (x: number) => ((x - xMin) / (xMax - xMin)) * svgW;
  const toPxY = (y: number) => svgH - ((y - yMin) / (yMax - yMin)) * svgH;

  // Generate path points
  const points: string[] = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = a * x * x + b * x + c;
    if (y >= yMin - 5 && y <= yMax + 5) {
      points.push(`${toPxX(x)},${toPxY(y)}`);
    }
  }
  const pathD = points.length > 1 ? `M ${points.join(' L ')}` : '';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            Interactive Algebra Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Parabola Curves &amp; Discriminant (D = b² - 4ac)
          </h3>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">Presets:</span>
          <button
            onClick={() => applyPreset(1, -4, 3)}
            className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium"
          >
            2 Roots
          </button>
          <button
            onClick={() => applyPreset(1, -4, 4)}
            className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium"
          >
            Equal Roots
          </button>
          <button
            onClick={() => applyPreset(1, 0, 2)}
            className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium"
          >
            No Real Roots
          </button>
          <button
            onClick={() => applyPreset(1, -4, 3)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        Vary coefficients <span className="font-mono font-bold text-blue-600">a</span>, <span className="font-mono font-bold text-emerald-600">b</span>, and <span className="font-mono font-bold text-purple-600">c</span>. The sign of the discriminant determines the number of times the parabola intersects the x-axis!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Leading coefficient (a ≠ 0)</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{a}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="1"
                value={a === 0 ? 1 : a}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setA(val === 0 ? (val > a ? 1 : -1) : val);
                }}
                className="w-full accent-blue-600 h-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Linear coefficient (b)</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{b}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Constant term (c)</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{c}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="6"
                step="1"
                value={c}
                onChange={(e) => setC(Number(e.target.value))}
                className="w-full accent-purple-600 h-1.5"
              />
            </div>
          </div>

          {/* Discriminant Result Card */}
          <div className="space-y-2">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Discriminant D:</span>
                <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
                  {b}² - 4({a})({c}) = <span className="text-rose-600 dark:text-rose-400">{disc}</span>
                </span>
              </div>

              {/* Status Badge */}
              <div className="mt-2.5">
                {disc > 0 && (
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>D &gt; 0: Two Distinct Real Roots</strong>
                      <div className="font-mono mt-0.5">
                        x₁ = {root1?.toFixed(2)}, x₂ = {root2?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}
                {disc === 0 && (
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>D = 0: Two Equal Real Roots (Tangent to x-axis)</strong>
                      <div className="font-mono mt-0.5">x = {root1?.toFixed(2)}</div>
                    </div>
                  </div>
                )}
                {disc < 0 && (
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>D &lt; 0: No Real Roots</strong>
                      <div>Parabola lies entirely on one side of the x-axis.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Parabola SVG Column */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
            <svg
              width={svgW}
              height={svgH}
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="max-w-full h-auto select-none"
            >
              {/* Axes */}
              {/* X Axis */}
              <line
                x1={0}
                y1={toPxY(0)}
                x2={svgW}
                y2={toPxY(0)}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <text x={svgW - 14} y={toPxY(0) - 6} className="fill-slate-500 text-[10px] font-bold">x</text>

              {/* Y Axis */}
              <line
                x1={toPxX(0)}
                y1={0}
                x2={toPxX(0)}
                y2={svgH}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <text x={toPxX(0) + 6} y={12} className="fill-slate-500 text-[10px] font-bold">y</text>

              {/* Parabola Curve */}
              <path
                d={pathD}
                fill="none"
                stroke="#e11d48"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Vertex Dot */}
              {vertexX >= xMin && vertexX <= xMax && vertexY >= yMin && vertexY <= yMax && (
                <circle
                  cx={toPxX(vertexX)}
                  cy={toPxY(vertexY)}
                  r="5"
                  className="fill-blue-600 stroke-white stroke-2"
                />
              )}

              {/* Real roots markers on X Axis */}
              {root1 !== null && root1 >= xMin && root1 <= xMax && (
                <circle
                  cx={toPxX(root1)}
                  cy={toPxY(0)}
                  r="5"
                  className="fill-emerald-500 stroke-white stroke-2"
                />
              )}
              {root2 !== null && root2 !== root1 && root2 >= xMin && root2 <= xMax && (
                <circle
                  cx={toPxX(root2)}
                  cy={toPxY(0)}
                  r="5"
                  className="fill-emerald-500 stroke-white stroke-2"
                />
              )}
            </svg>
          </div>

          <div className="mt-3 text-center">
            <MathView math={`y = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
