import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw } from 'lucide-react';

export const CoordinateGeometryLab: React.FC = () => {
  const [x1, setX1] = useState<number>(1);
  const [y1, setY1] = useState<number>(2);
  const [x2, setX2] = useState<number>(5);
  const [y2, setY2] = useState<number>(6);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const distSq = dx * dx + dy * dy;
  const distance = Math.sqrt(distSq);

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Grid bounds: -2 to 8
  const minG = -1;
  const maxG = 8;
  const range = maxG - minG;
  const svgSize = 320;
  const pad = 24;
  const usable = svgSize - 2 * pad;
  const scale = usable / range;

  const toPxX = (val: number) => pad + (val - minG) * scale;
  const toPxY = (val: number) => svgSize - pad - (val - minG) * scale;

  const pAx = toPxX(x1);
  const pAy = toPxY(y1);
  const pBx = toPxX(x2);
  const pBy = toPxY(y2);
  const pCx = toPxX(x2);
  const pCy = toPxY(y1);
  const pMx = toPxX(midX);
  const pMy = toPxY(midY);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
            Interactive Coordinate Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Distance Formula &amp; Midpoint on Cartesian Grid
          </h3>
        </div>
        <button
          onClick={() => { setX1(1); setY1(2); setX2(5); setY2(6); }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          title="Reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        Move Point <span className="font-bold text-blue-600">A</span> and Point <span className="font-bold text-rose-600">B</span>. Notice how the distance formula is simply the Pythagorean theorem applied to the horizontal step (Δx) and vertical step (Δy)!
      </p>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-5 md:gap-6 items-center">
        {/* Coordinates Inputs (order-2 on mobile, order-1 on desktop) */}
        <div className="w-full order-2 md:order-1 md:col-span-5 space-y-3.5 sm:space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            {/* Point A */}
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                Point A (x₁, y₁) = ({x1}, {y1})
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500">x₁: {x1}</label>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={x1}
                    onChange={(e) => setX1(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500">y₁: {y1}</label>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={y1}
                    onChange={(e) => setY1(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Point B */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                Point B (x₂, y₂) = ({x2}, {y2})
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500">x₂: {x2}</label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={x2}
                    onChange={(e) => setX2(Number(e.target.value))}
                    className="w-full accent-rose-600 h-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500">y₂: {y2}</label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={y2}
                    onChange={(e) => setY2(Number(e.target.value))}
                    className="w-full accent-rose-600 h-1.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pythagoras Derivation Box */}
          <div className="bg-violet-50/70 dark:bg-violet-950/40 p-4 rounded-xl border border-violet-200 dark:border-violet-900/60 space-y-2 text-xs">
            <span className="font-bold text-violet-900 dark:text-violet-300 uppercase tracking-wider block text-[11px]">
              Distance via Pythagorean Theorem:
            </span>
            <div className="font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-violet-200 dark:border-violet-800 space-y-1">
              <div>Δx = |x₂ - x₁| = |{x2} - {x1}| = {Math.abs(dx)}</div>
              <div>Δy = |y₂ - y₁| = |{y2} - {y1}| = {Math.abs(dy)}</div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-1 font-bold text-violet-700 dark:text-violet-300">
                d = √({Math.abs(dx)}² + {Math.abs(dy)}²) = √({dx * dx} + {dy * dy}) = √{distSq} ≈ {distance.toFixed(2)}
              </div>
            </div>

            <div className="flex justify-between items-center pt-1 text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Midpoint M:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ({midX.toFixed(1)}, {midY.toFixed(1)})
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Coordinate SVG (order-1 on mobile, order-2 on desktop) */}
        <div className="w-full order-1 md:order-2 md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center w-full max-w-[280px] sm:max-w-md">
            <svg
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              className="w-full max-w-[260px] sm:max-w-[320px] aspect-square select-none"
            >
              {/* Grid Lines */}
              {Array.from({ length: range + 1 }).map((_, i) => {
                const gVal = minG + i;
                const px = toPxX(gVal);
                const py = toPxY(gVal);
                const isAxis = gVal === 0;
                return (
                  <React.Fragment key={i}>
                    <line
                      x1={px}
                      y1={pad}
                      x2={px}
                      y2={svgSize - pad}
                      stroke={isAxis ? '#64748b' : '#cbd5e1'}
                      strokeWidth={isAxis ? 1.5 : 0.75}
                      className="dark:stroke-slate-700"
                    />
                    <line
                      x1={pad}
                      y1={py}
                      x2={svgSize - pad}
                      y2={py}
                      stroke={isAxis ? '#64748b' : '#cbd5e1'}
                      strokeWidth={isAxis ? 1.5 : 0.75}
                      className="dark:stroke-slate-700"
                    />
                    {gVal >= 0 && gVal <= 7 && (
                      <>
                        <text
                          x={px}
                          y={toPxY(0) + 12}
                          textAnchor="middle"
                          className="fill-slate-400 text-[9px] font-mono"
                        >
                          {gVal}
                        </text>
                        <text
                          x={toPxX(0) - 8}
                          y={py}
                          dominantBaseline="central"
                          textAnchor="end"
                          className="fill-slate-400 text-[9px] font-mono"
                        >
                          {gVal}
                        </text>
                      </>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Right Triangle Legs */}
              {/* Horizontal leg: (x1, y1) to (x2, y1) */}
              <line
                x1={pAx}
                y1={pAy}
                x2={pCx}
                y2={pCy}
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />

              {/* Vertical leg: (x2, y1) to (x2, y2) */}
              <line
                x1={pCx}
                y1={pCy}
                x2={pBx}
                y2={pBy}
                stroke="#e11d48"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />

              {/* Hypotenuse (AB) */}
              <line
                x1={pAx}
                y1={pAy}
                x2={pBx}
                y2={pBy}
                stroke="#8b5cf6"
                strokeWidth="3.5"
              />

              {/* Point A */}
              <circle cx={pAx} cy={pAy} r="6" className="fill-blue-600 stroke-white stroke-2 shadow" />
              <text x={pAx - 8} y={pAy - 8} className="fill-blue-700 dark:fill-blue-300 font-bold text-xs">
                A({x1}, {y1})
              </text>

              {/* Point B */}
              <circle cx={pBx} cy={pBy} r="6" className="fill-rose-600 stroke-white stroke-2 shadow" />
              <text x={pBx + 8} y={pBy - 8} className="fill-rose-700 dark:fill-rose-300 font-bold text-xs">
                B({x2}, {y2})
              </text>

              {/* Midpoint M */}
              <circle cx={pMx} cy={pMy} r="4" className="fill-emerald-500 stroke-white stroke-1" />
              <text x={pMx + 6} y={pMy + 12} className="fill-emerald-700 dark:fill-emerald-300 font-semibold text-[10px]">
                M({midX.toFixed(1)}, {midY.toFixed(1)})
              </text>
            </svg>
          </div>

          <div className="mt-2 text-center">
            <MathView math="d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
          </div>
        </div>
      </div>
    </div>
  );
};
