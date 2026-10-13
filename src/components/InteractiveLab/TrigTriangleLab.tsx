import React, { useState } from 'react';
import { Sparkles, Info, RefreshCw } from 'lucide-react';

export const TrigTriangleLab: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState<number>(30);
  const [hypotenuse] = useState<number>(10);

  const angleRad = (angleDeg * Math.PI) / 180;
  const opp = hypotenuse * Math.sin(angleRad);
  const adj = hypotenuse * Math.cos(angleRad);

  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);
  const tanVal = Math.tan(angleRad);
  const pythagorasSum = sinVal * sinVal + cosVal * cosVal;

  // SVG dimensions
  const svgW = 340;
  const svgH = 260;
  const originX = 40;
  const originY = 220;
  const maxPixelBase = 250;
  const pixelScale = maxPixelBase / hypotenuse;

  const adjPx = adj * pixelScale;
  const oppPx = opp * pixelScale;
  const cornerX = originX + adjPx;
  const topY = originY - oppPx;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            Interactive Trigonometry Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Right Triangle &amp; SOH-CAH-TOA Explorer
          </h3>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">Snap:</span>
          {[30, 45, 60].map((deg) => (
            <button
              key={deg}
              onClick={() => setAngleDeg(deg)}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition ${
                angleDeg === deg
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {deg}°
            </button>
          ))}
          <button
            onClick={() => setAngleDeg(30)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        Slide angle <span className="font-serif italic font-bold text-emerald-600">θ</span>. Watch how the lengths of Opposite and Adjacent sides respond, while the Pythagorean identity <span className="font-serif font-bold">sin²θ + cos²θ = 1</span> remains perfectly invariant!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-800 dark:text-slate-200">
                <span>Angle θ (Theta)</span>
                <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
                  {angleDeg}°
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="1"
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>10°</span>
                <span>45°</span>
                <span>80°</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-center">
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Adjacent</span>
                <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                  {adj.toFixed(2)}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Opposite</span>
                <span className="font-mono text-sm font-bold text-rose-600 dark:text-rose-400">
                  {opp.toFixed(2)}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Hypotenuse</span>
                <span className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400">
                  {hypotenuse.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* SOH CAH TOA Cards */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/40">
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 block">SOH (sin)</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 block font-serif">Opp / Hyp</span>
              <span className="font-mono font-bold text-sm text-rose-700 dark:text-rose-300 mt-1 block">
                {sinVal.toFixed(3)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 block">CAH (cos)</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 block font-serif">Adj / Hyp</span>
              <span className="font-mono font-bold text-sm text-blue-700 dark:text-blue-300 mt-1 block">
                {cosVal.toFixed(3)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/40">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 block">TOA (tan)</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 block font-serif">Opp / Adj</span>
              <span className="font-mono font-bold text-sm text-amber-700 dark:text-amber-300 mt-1 block">
                {tanVal.toFixed(3)}
              </span>
            </div>
          </div>

          {/* Pythagorean Identity Box */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 p-3 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold text-emerald-900 dark:text-emerald-200">Fundamental Identity:</span>
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  sin²({angleDeg}°) + cos²({angleDeg}°) = {pythagorasSum.toFixed(4)}
                </div>
              </div>
            </div>
            <span className="px-2 py-1 bg-emerald-600 text-white font-bold rounded-md font-mono text-xs">
              = 1
            </span>
          </div>
        </div>

        {/* Visual SVG Column */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center w-full max-w-sm sm:max-w-md">
            <svg
              width={svgW}
              height={svgH}
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="max-w-full h-auto select-none"
            >
              {/* Triangle Fill */}
              <polygon
                points={`${originX},${originY} ${cornerX},${originY} ${cornerX},${topY}`}
                className="fill-emerald-500/10 stroke-none"
              />

              {/* Adjacent Base (Blue) */}
              <line
                x1={originX}
                y1={originY}
                x2={cornerX}
                y2={originY}
                stroke="#2563eb"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Opposite Height (Rose) */}
              <line
                x1={cornerX}
                y1={originY}
                x2={cornerX}
                y2={topY}
                stroke="#e11d48"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Hypotenuse (Purple) */}
              <line
                x1={originX}
                y1={originY}
                x2={cornerX}
                y2={topY}
                stroke="#9333ea"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Right Angle Symbol at (cornerX, originY) */}
              <path
                d={`M ${cornerX - 16} ${originY} L ${cornerX - 16} ${originY - 16} L ${cornerX} ${originY - 16}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-400"
              />
              <circle cx={cornerX - 8} cy={originY - 8} r="1.5" fill="currentColor" className="text-slate-400" />

              {/* Angle Arc at originX, originY */}
              <path
                d={`M ${originX + 35} ${originY} A 35 35 0 0 0 ${originX + 35 * Math.cos(angleRad)} ${originY - 35 * Math.sin(angleRad)}`}
                fill="none"
                stroke="#059669"
                strokeWidth="2"
              />
              <text
                x={originX + 44 * Math.cos(angleRad / 2)}
                y={originY - 44 * Math.sin(angleRad / 2)}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-emerald-600 dark:fill-emerald-400 font-bold text-xs"
              >
                θ
              </text>

              {/* Labels */}
              {/* Adjacent label below */}
              <text
                x={(originX + cornerX) / 2}
                y={originY + 18}
                textAnchor="middle"
                className="fill-blue-600 dark:fill-blue-400 font-semibold text-xs"
              >
                Adjacent ({adj.toFixed(1)})
              </text>

              {/* Opposite label right */}
              <text
                x={cornerX + 10}
                y={(originY + topY) / 2}
                textAnchor="start"
                dominantBaseline="central"
                className="fill-rose-600 dark:fill-rose-400 font-semibold text-xs"
              >
                Opposite ({opp.toFixed(1)})
              </text>

              {/* Hypotenuse label along hypotenuse */}
              <text
                x={(originX + cornerX) / 2 - 12}
                y={(originY + topY) / 2 - 12}
                textAnchor="middle"
                className="fill-purple-600 dark:fill-purple-400 font-bold text-xs"
              >
                Hypotenuse = 10
              </text>
            </svg>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
            <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              As θ grows toward 90°, Opposite expands toward the Hypotenuse, so sin θ approaches 1 while cos θ approaches 0!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
