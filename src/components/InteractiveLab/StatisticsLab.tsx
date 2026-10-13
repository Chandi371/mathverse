import React, { useState } from 'react';
import { MathView } from '../MathView';
import { RefreshCw, BarChart2, AlertCircle } from 'lucide-react';
import { calculateStatistics } from '../../utils/mathUtils';

export const StatisticsLab: React.FC = () => {
  const defaultDataset = [12, 14, 15, 16, 18, 20, 22];
  const [outlierValue, setOutlierValue] = useState<number>(22);
  const [hasOutlier, setHasOutlier] = useState<boolean>(false);

  // When outlier is active, replace the last element with outlierValue
  const currentDataset = hasOutlier
    ? [...defaultDataset.slice(0, -1), outlierValue]
    : defaultDataset;

  const stats = calculateStatistics(currentDataset);

  // Plot setup: values from 10 to 90
  const minVal = 10;
  const maxVal = 90;
  const plotW = 300;
  const toPxX = (v: number) => ((v - minVal) / (maxVal - minVal)) * plotW;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
            Interactive Statistics Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Measures of Central Tendency &amp; Outlier Impact Simulator
          </h3>
        </div>
        <button
          onClick={() => {
            setHasOutlier(false);
            setOutlierValue(22);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          title="Reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        Discover how the <span className="font-bold text-blue-600">Mean</span> and{' '}
        <span className="font-bold text-emerald-600">Median</span> respond to data values. Toggle an extreme outlier to visually witness why the mean gets heavily distorted while the median remains stable!
      </p>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-5 md:gap-6 items-center">
        {/* Controls Column (order-2 on mobile, order-1 on desktop) */}
        <div className="w-full order-2 md:order-1 md:col-span-5 space-y-3.5 sm:space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Simulate Outlier Experiment
              </span>
              <button
                onClick={() => setHasOutlier(!hasOutlier)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition ${
                  hasOutlier
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300'
                    : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'
                }`}
              >
                {hasOutlier ? 'Outlier Active: ON' : 'Inject Outlier: OFF'}
              </button>
            </div>

            {hasOutlier && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Outlier Data Value:</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    {outlierValue}
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  step="5"
                  value={outlierValue}
                  onChange={(e) => setOutlierValue(Number(e.target.value))}
                  className="w-full accent-rose-600 h-2 cursor-pointer bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block">
                  Drag right to increase the extreme value and observe the mean shift.
                </span>
              </div>
            )}

            {/* Current Dataset Preview */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Active Dataset (n = {stats.n}):
              </span>
              <div className="flex flex-wrap gap-1 font-mono text-xs">
                {currentDataset.map((val, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded ${
                      hasOutlier && idx === currentDataset.length - 1
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold border border-rose-300'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Comparison Grid */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-blue-950/40">
              <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 block">
                Arithmetic Mean (x̄)
              </span>
              <span className="font-mono text-lg font-extrabold text-blue-800 dark:text-blue-200 block mt-0.5">
                {stats.mean.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500">
                Sum = {stats.sum} ÷ {stats.n}
              </span>
            </div>

            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/40">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 block">
                Median (M)
              </span>
              <span className="font-mono text-lg font-extrabold text-emerald-800 dark:text-emerald-200 block mt-0.5">
                {stats.median.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-500">Middle Position (Robust)</span>
            </div>
          </div>

          {hasOutlier && (
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Notice:</strong> The extreme outlier dragged the Mean from 16.71 to {stats.mean.toFixed(2)}, but the Median remained at {stats.median.toFixed(1)}!
              </span>
            </div>
          )}
        </div>

        {/* Visual Dot Plot & Indicator Lines (order-1 on mobile, order-2 on desktop) */}
        <div className="w-full order-1 md:order-2 md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm sm:max-w-md space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-violet-600" />
                Distribution on Number Line (10 to 90)
              </span>
            </div>

            <svg width="300" height="150" viewBox="0 0 300 150" className="w-full h-auto select-none overflow-visible">
              {/* Number Line Axis */}
              <line x1="0" y1="100" x2="300" y2="100" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-600" />

              {/* Ticks */}
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((t) => (
                <g key={t}>
                  <line x1={toPxX(t)} y1="95" x2={toPxX(t)} y2="105" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" />
                  <text x={toPxX(t)} y="120" textAnchor="middle" className="fill-slate-400 text-[9px] font-mono">
                    {t}
                  </text>
                </g>
              ))}

              {/* Data Dots */}
              {currentDataset.map((val, idx) => {
                const isOutlierPt = hasOutlier && idx === currentDataset.length - 1;
                return (
                  <circle
                    key={idx}
                    cx={toPxX(val)}
                    cy={80}
                    r="5"
                    className={
                      isOutlierPt
                        ? 'fill-rose-500 stroke-white stroke-2'
                        : 'fill-indigo-600 stroke-white stroke-1.5'
                    }
                  />
                );
              })}

              {/* Mean Indicator Line (Blue) */}
              <line
                x1={toPxX(stats.mean)}
                y1="25"
                x2={toPxX(stats.mean)}
                y2="98"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              <text
                x={toPxX(stats.mean)}
                y="18"
                textAnchor="middle"
                className="fill-blue-700 dark:fill-blue-300 font-mono text-[9px] font-bold"
              >
                Mean: {stats.mean.toFixed(1)}
              </text>

              {/* Median Indicator Line (Emerald) */}
              <line
                x1={toPxX(stats.median)}
                y1="40"
                x2={toPxX(stats.median)}
                y2="98"
                stroke="#059669"
                strokeWidth="2.5"
              />
              <text
                x={toPxX(stats.median)}
                y="36"
                textAnchor="middle"
                className="fill-emerald-700 dark:fill-emerald-300 font-mono text-[9px] font-bold"
              >
                Median: {stats.median.toFixed(1)}
              </text>
            </svg>
          </div>

          <div className="mt-3 text-center">
            <MathView math="\\text{Mean} = \\frac{\\sum f_i x_i}{\\sum f_i} \\quad \\text{vs} \\quad \\text{Median} = l + \\left(\\frac{\\frac{n}{2} - cf}{f}\\right)h" />
          </div>
        </div>
      </div>
    </div>
  );
};
