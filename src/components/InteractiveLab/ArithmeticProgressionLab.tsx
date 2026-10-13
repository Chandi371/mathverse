import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Layers, RefreshCw, Lightbulb } from 'lucide-react';

export const ArithmeticProgressionLab: React.FC = () => {
  const [a, setA] = useState<number>(2);
  const [d, setD] = useState<number>(3);
  const [n, setN] = useState<number>(6);
  const [showPairing, setShowPairing] = useState<boolean>(true);

  // Generate AP terms
  const terms = Array.from({ length: n }, (_, i) => a + i * d);
  const lastTerm = a + (n - 1) * d;
  const sumSn = (n / 2) * (2 * a + (n - 1) * d);
  const pairSum = a + lastTerm;

  // Max term for scaling bars
  const maxAbsTerm = Math.max(...terms.map((t) => Math.abs(t)), 1);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
            Interactive Sequence Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Arithmetic Progression &amp; Gauss Summation Lab
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPairing(!showPairing)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition font-medium ${
              showPairing
                ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'
            }`}
          >
            {showPairing ? 'Hide Gauss Pairing' : 'Show Gauss Pairing'}
          </button>
          <button
            onClick={() => { setA(2); setD(3); setN(6); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        Tweak first term <span className="font-mono font-bold text-cyan-600">a</span>, common difference <span className="font-mono font-bold text-blue-600">d</span>, and total terms <span className="font-mono font-bold text-purple-600">n</span>. Observe the linear progression and discover why Gauss's sum formula works!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Sliders & Values */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>First Term (a)</span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{a}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Common Difference (d)</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {d > 0 ? `+${d}` : d}
                </span>
              </div>
              <input
                type="range"
                min="-2"
                max="6"
                step="1"
                value={d}
                onChange={(e) => setD(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Number of Terms (n)</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{n}</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>
          </div>

          {/* Formulas Output Box */}
          <div className="space-y-2">
            <div className="bg-cyan-50/70 dark:bg-cyan-950/40 p-3 rounded-xl border border-cyan-200 dark:border-cyan-900/60">
              <span className="text-[11px] font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider block">
                nth Term Formula (aₙ)
              </span>
              <div className="mt-1 font-mono text-sm">
                <MathView math={`a_{${n}} = a + (${n}-1)d = ${a} + (${n-1})(${d}) = \\mathbf{${lastTerm}}`} />
              </div>
            </div>

            <div className="bg-purple-50/70 dark:bg-purple-950/40 p-3 rounded-xl border border-purple-200 dark:border-purple-900/60">
              <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider block">
                Sum of First n Terms (Sₙ)
              </span>
              <div className="mt-1 font-mono text-sm">
                <MathView math={`S_{${n}} = \\frac{${n}}{2}[2(${a}) + (${n}-1)(${d})] = \\mathbf{${sumSn}}`} />
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Also expressed as <MathView math={`S_n = \\frac{n}{2}(a + l) = \\frac{${n}}{2}(${a} + ${lastTerm}) = ${sumSn}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Visual Bar & Sequence Column */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Visual Bar Representation of Terms:
            </div>
            <div className="flex items-end gap-1.5 sm:gap-2 h-36 px-2 pb-2 pt-4 border-b border-slate-300 dark:border-slate-700">
              {terms.map((val, idx) => {
                const heightPct = Math.max(10, Math.round((Math.abs(val) / maxAbsTerm) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-200 mb-1">
                      {val}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-md transition-all duration-200 ${
                        idx === 0
                          ? 'bg-cyan-500'
                          : idx === terms.length - 1
                          ? 'bg-purple-500'
                          : 'bg-indigo-400 dark:bg-indigo-500'
                      }`}
                    />
                    <span className="text-[9px] text-slate-400 font-mono mt-1">
                      a{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gauss Pairing Demonstration */}
          {showPairing && (
            <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                  The Carl Friedrich Gauss Pairing Method:
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono bg-white dark:bg-slate-900 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Forwards:</span>
                  <span>{terms.join('  +  ')} = S_{n}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Backwards:</span>
                  <span>{[...terms].reverse().join('  +  ')} = S_{n}</span>
                </div>
                <div className="border-t border-indigo-200 dark:border-indigo-800 pt-1.5 flex justify-between items-center font-bold text-indigo-700 dark:text-indigo-300">
                  <span>Sum of Pairs:</span>
                  <span>{Array.from({ length: n }).fill(pairSum).join(' + ')} = 2·S_{n}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Notice: exactly <span className="font-bold">{n} pairs</span>, each summing to <span className="font-mono font-bold text-indigo-600">{pairSum}</span>. Hence, <span className="font-mono font-bold">2·Sₙ = {n} × {pairSum}</span>, so <span className="font-mono font-bold">Sₙ = ({n} × {pairSum}) / 2 = {sumSn}</span>!
              </p>
            </div>
          )}

          <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Key Exam Tip:</strong> When common difference d is constant, the terms form a straight line with slope d. Any term aₙ can be found without computing the entire list!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
