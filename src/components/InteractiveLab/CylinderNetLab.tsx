import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw, Layers } from 'lucide-react';

export const CylinderNetLab: React.FC = () => {
  const [radius, setRadius] = useState<number>(3);
  const [height, setHeight] = useState<number>(7);

  const baseArea = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  const csa = 2 * Math.PI * radius * height;
  const tsa = 2 * Math.PI * radius * (radius + height);
  const volume = Math.PI * radius * radius * height;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
            Interactive Mensuration Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Cylinder 2D Net Unfolding &amp; Surface Formulas
          </h3>
        </div>
        <button
          onClick={() => { setRadius(3); setHeight(7); }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
          title="Reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        See how unrolling a cylinder transforms its curved surface into a flat rectangle of length <span className="font-mono font-bold text-orange-600">2πr</span> and height <span className="font-mono font-bold text-orange-600">h</span>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Radius (r)</span>
                <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{radius} cm</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-orange-600 h-2 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Height (h)</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{height} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="1"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-orange-50/70 dark:bg-orange-950/40 p-4 rounded-xl border border-orange-200 dark:border-orange-900/60 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-orange-900 dark:text-orange-200 uppercase tracking-wider text-[11px]">
              <Layers className="w-4 h-4 text-orange-600" />
              Formula Decompositions:
            </div>
            <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between items-center">
                <span>Curved Surface Area (CSA = 2πrh):</span>
                <span className="font-mono font-bold text-orange-700 dark:text-orange-300">{csa.toFixed(2)} cm²</span>
              </div>
              <div className="flex justify-between items-center">
                <span>2 Circular Bases (2 × πr²):</span>
                <span className="font-mono">{ (2 * baseArea).toFixed(2) } cm²</span>
              </div>
              <div className="border-t border-orange-200 dark:border-orange-800 pt-1 flex justify-between items-center font-bold text-orange-950 dark:text-orange-100">
                <span>Total Surface Area (TSA):</span>
                <span className="font-mono">{tsa.toFixed(2)} cm²</span>
              </div>
              <div className="border-t border-orange-200 dark:border-orange-800 pt-1 flex justify-between items-center font-bold text-blue-900 dark:text-blue-200">
                <span>Volume (V = πr²h):</span>
                <span className="font-mono">{volume.toFixed(2)} cm³</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Net SVG */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center w-full max-w-sm sm:max-w-md">
            <svg width="280" height="200" viewBox="0 0 280 200" className="max-w-full h-auto select-none">
              {/* Unfolded Net */}
              {/* Top circle */}
              <circle
                cx="140"
                cy="28"
                r={16}
                className="fill-orange-400/25 stroke-orange-500 stroke-2"
              />
              <text x="140" y="29" textAnchor="middle" dominantBaseline="central" className="fill-orange-700 dark:fill-orange-300 text-[9px] font-bold">
                πr²
              </text>

              {/* Unrolled Rectangle (Width = 2πr, Height = h) */}
              <rect
                x="40"
                y="52"
                width="200"
                height="75"
                className="fill-orange-500/20 stroke-orange-600 stroke-2"
                rx="3"
              />
              <text x="140" y="44" textAnchor="middle" className="fill-orange-700 dark:fill-orange-300 font-mono text-[10px] font-bold">
                Length = Circumference = 2πr ({circumference.toFixed(1)} cm)
              </text>
              <text x="140" y="90" textAnchor="middle" dominantBaseline="central" className="fill-orange-950 dark:fill-orange-100 font-bold text-xs">
                Curved Surface (CSA) = 2πrh
              </text>
              <text x="248" y="90" textAnchor="start" dominantBaseline="central" className="fill-blue-600 dark:fill-blue-400 font-mono text-[10px] font-bold">
                h ({height} cm)
              </text>

              {/* Bottom circle */}
              <circle
                cx="140"
                cy="152"
                r={16}
                className="fill-orange-400/25 stroke-orange-500 stroke-2"
              />
              <text x="140" y="153" textAnchor="middle" dominantBaseline="central" className="fill-orange-700 dark:fill-orange-300 text-[9px] font-bold">
                πr²
              </text>
            </svg>
          </div>

          <div className="mt-3 text-center">
            <MathView math="\\text{TSA} = \\text{CSA} + 2(\\text{Base Area}) = 2\\pi rh + 2\\pi r^2 = 2\\pi r(r + h)" />
          </div>
        </div>
      </div>
    </div>
  );
};
