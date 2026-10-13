import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw, Sparkles } from 'lucide-react';

export const CircleAreaLab: React.FC = () => {
  const [radius, setRadius] = useState<number>(7);
  const [sectors, setSectors] = useState<number>(16);

  const circumference = 2 * Math.PI * radius;
  const halfCircumference = Math.PI * radius;
  const exactArea = Math.PI * radius * radius;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
            Interactive Geometry Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Why Circle Area is πr²: The Sector Rearrangement Model
          </h3>
        </div>
        <button
          onClick={() => { setRadius(7); setSectors(16); }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
          title="Reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        Divide a circle of radius <span className="font-mono font-bold text-teal-600">r</span> into sectors and rearrange them head-to-tail. As the number of slices increases, the shape transforms into a perfect rectangle with width <span className="font-mono font-bold text-teal-600">πr</span> and height <span className="font-mono font-bold text-teal-600">r</span>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Radius (r)</span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{radius} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                step="1"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-teal-600 h-2 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Number of Sectors</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{sectors} slices</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[8, 16, 32, 64].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setSectors(cnt)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                      sectors === cnt
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Derivation Steps Box */}
          <div className="bg-teal-50/70 dark:bg-teal-950/40 p-4 rounded-xl border border-teal-200 dark:border-teal-900/60 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-teal-900 dark:text-teal-200 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-4 h-4 text-teal-600" />
              The Geometric Equivalence:
            </div>
            <div className="space-y-1 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Circumference (2πr):</span>
                <span className="font-mono">{circumference.toFixed(2)} cm</span>
              </div>
              <div className="flex justify-between">
                <span>Half Circumference (Base of rectangle = πr):</span>
                <span className="font-mono text-teal-700 dark:text-teal-300 font-bold">{halfCircumference.toFixed(2)} cm</span>
              </div>
              <div className="flex justify-between">
                <span>Height of rectangle (Radius = r):</span>
                <span className="font-mono text-teal-700 dark:text-teal-300 font-bold">{radius} cm</span>
              </div>
              <div className="border-t border-teal-200 dark:border-teal-800 pt-1.5 flex justify-between font-bold text-teal-900 dark:text-teal-200">
                <span>Rearranged Rectangle Area:</span>
                <span className="font-mono text-sm">base × height = πr × r = πr²</span>
              </div>
              <div className="text-right font-mono font-bold text-teal-600 dark:text-teal-400">
                = {exactArea.toFixed(2)} cm²
              </div>
            </div>
          </div>
        </div>

        {/* Visual Illustration */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center w-full max-w-sm sm:max-w-md">
            {/* SVG Circle with sector slices */}
            <svg width="240" height="140" viewBox="0 0 240 140" className="max-w-full h-auto select-none">
              {/* Circle on Left */}
              <g transform="translate(60, 70)">
                {Array.from({ length: sectors }).map((_, i) => {
                  const angle1 = (i * 2 * Math.PI) / sectors;
                  const angle2 = ((i + 1) * 2 * Math.PI) / sectors;
                  const rPx = 45;
                  const x1 = rPx * Math.cos(angle1);
                  const y1 = rPx * Math.sin(angle1);
                  const x2 = rPx * Math.cos(angle2);
                  const y2 = rPx * Math.sin(angle2);
                  const isEven = i % 2 === 0;
                  return (
                    <path
                      key={i}
                      d={`M 0 0 L ${x1} ${y1} A ${rPx} ${rPx} 0 0 1 ${x2} ${y2} Z`}
                      fill={isEven ? '#0d9488' : '#14b8a6'}
                      stroke="#ffffff"
                      strokeWidth="0.75"
                      opacity={isEven ? 0.9 : 0.65}
                    />
                  );
                })}
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text x="0" y="58" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold">
                  Circle of radius r
                </text>
              </g>

              {/* Rearranged Parallelogram/Rectangle on Right */}
              <g transform="translate(130, 45)">
                <rect
                  x="0"
                  y="0"
                  width="95"
                  height="45"
                  className="fill-teal-500/20 stroke-teal-600 stroke-2"
                  rx="2"
                />
                <text x="47.5" y="-6" textAnchor="middle" className="fill-teal-700 dark:fill-teal-300 font-mono text-[10px] font-bold">
                  Top Base ≈ πr
                </text>
                <text x="47.5" y="27" textAnchor="middle" className="fill-teal-900 dark:fill-teal-100 font-bold text-xs">
                  Area ≈ πr × r
                </text>
                <text x="105" y="25" textAnchor="start" className="fill-teal-700 dark:fill-teal-300 font-mono text-[10px] font-bold">
                  r
                </text>
                <text x="47.5" y="70" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold">
                  Rearranged Wedges
                </text>
              </g>
            </svg>
          </div>

          <div className="mt-3 text-center">
            <MathView math="\\text{Area of Circle} = \\lim_{N \\to \\infty} (\\text{Base} \\times \\text{Height}) = \\pi r \\times r = \\pi r^2" />
          </div>
        </div>
      </div>
    </div>
  );
};
