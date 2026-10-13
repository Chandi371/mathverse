import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Play, RotateCcw, BarChart3, TrendingUp } from 'lucide-react';

export const ProbabilitySimulatorLab: React.FC = () => {
  const [simType, setSimType] = useState<'coin' | 'dice'>('coin');
  const [trials, setTrials] = useState<number>(0);

  // Coin counts
  const [heads, setHeads] = useState<number>(0);
  const [tails, setTails] = useState<number>(0);

  // Dice counts: 1 to 6
  const [diceCounts, setDiceCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Run simulation trials
  const runTrials = (count: number) => {
    if (simType === 'coin') {
      let newHeads = 0;
      let newTails = 0;
      for (let i = 0; i < count; i++) {
        if (Math.random() < 0.5) newHeads++;
        else newTails++;
      }
      setHeads((prev) => prev + newHeads);
      setTails((prev) => prev + newTails);
      setTrials((prev) => prev + count);
    } else {
      const added = [0, 0, 0, 0, 0, 0];
      for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * 6);
        added[roll]++;
      }
      setDiceCounts((prev) => prev.map((val, idx) => val + added[idx]));
      setTrials((prev) => prev + count);
    }
  };

  const resetSim = () => {
    setTrials(0);
    setHeads(0);
    setTails(0);
    setDiceCounts([0, 0, 0, 0, 0, 0]);
  };

  const coinHeadsFreq = trials > 0 ? heads / trials : 0;
  const coinTailsFreq = trials > 0 ? tails / trials : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            Interactive Probability Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Law of Large Numbers &amp; Monte Carlo Simulator
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setSimType(simType === 'coin' ? 'dice' : 'coin'); resetSim(); }}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition"
          >
            Switch to: {simType === 'coin' ? '6-Sided Die' : 'Coin Toss'}
          </button>
          <button
            onClick={resetSim}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 my-3">
        Run trials and watch empirical frequencies converge toward theoretical probabilities <span className="font-semibold">P(E) = n(E) / n(S)</span>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Trials Conducted:
              </span>
              <span className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {trials.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => runTrials(1)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold hover:border-indigo-400 active:scale-95 transition"
              >
                <Play className="w-3.5 h-3.5 text-indigo-500" />
                +1 Trial
              </button>
              <button
                onClick={() => runTrials(10)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold hover:border-indigo-400 active:scale-95 transition"
              >
                +10 Trials
              </button>
              <button
                onClick={() => runTrials(100)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 active:scale-95 transition shadow-sm"
              >
                +100 Trials
              </button>
              <button
                onClick={() => runTrials(500)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-700 text-white rounded-lg text-xs font-semibold hover:bg-indigo-800 active:scale-95 transition shadow-sm"
              >
                +500 Trials
              </button>
            </div>
          </div>

          {/* Theoretical vs Experimental Box */}
          <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-indigo-900 dark:text-indigo-200 font-bold uppercase tracking-wider text-[11px]">
              <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Theoretical Expectation:
            </div>
            {simType === 'coin' ? (
              <div className="space-y-1">
                <div>Sample Space: <span className="font-mono">S = {'{Heads, Tails}'}</span>, n(S) = 2</div>
                <div>Theoretical: <MathView math="P(\text{Heads}) = \frac{1}{2} = 0.500" /></div>
              </div>
            ) : (
              <div className="space-y-1">
                <div>Sample Space: <span className="font-mono">S = {'{1, 2, 3, 4, 5, 6}'}</span>, n(S) = 6</div>
                <div>Theoretical: <MathView math="P(\text{any face}) = \frac{1}{6} \approx 0.1667" /></div>
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart & Comparison Column */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                Empirical Frequency Distribution
              </span>
              <span className="text-[11px] text-slate-400">Dashed line = Theoretical</span>
            </div>

            {simType === 'coin' ? (
              <div className="space-y-4">
                {/* Heads Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-amber-600 dark:text-amber-400">Heads: {heads}</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {trials > 0 ? (coinHeadsFreq * 100).toFixed(1) : '0.0'}% (Freq: {coinHeadsFreq.toFixed(3)})
                    </span>
                  </div>
                  <div className="relative h-6 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                    <div
                      style={{ width: `${coinHeadsFreq * 100}%` }}
                      className="h-full bg-amber-500 transition-all duration-300 rounded-lg"
                    />
                    {/* Theoretical line at 50% */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-r-2 border-dashed border-slate-900 dark:border-white opacity-60" />
                  </div>
                </div>

                {/* Tails Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-blue-600 dark:text-blue-400">Tails: {tails}</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {trials > 0 ? (coinTailsFreq * 100).toFixed(1) : '0.0'}% (Freq: {coinTailsFreq.toFixed(3)})
                    </span>
                  </div>
                  <div className="relative h-6 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                    <div
                      style={{ width: `${coinTailsFreq * 100}%` }}
                      className="h-full bg-blue-500 transition-all duration-300 rounded-lg"
                    />
                    {/* Theoretical line at 50% */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-r-2 border-dashed border-slate-900 dark:border-white opacity-60" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-2 text-center pt-2">
                {diceCounts.map((count, idx) => {
                  const freq = trials > 0 ? count / trials : 0;
                  const heightPct = trials > 0 ? Math.min(100, Math.round((freq / 0.35) * 100)) : 0;
                  return (
                    <div key={idx} className="flex flex-col items-center justify-end h-32">
                      <span className="text-[10px] font-mono text-slate-500 mb-1">
                        {count}
                      </span>
                      <div className="w-full h-24 bg-slate-200 dark:bg-slate-700 rounded-md flex items-end overflow-hidden relative">
                        <div
                          style={{ height: `${heightPct}%` }}
                          className="w-full bg-indigo-500 transition-all duration-200 rounded-t-md"
                        />
                        {/* 1/6 theoretical line: (1/6) / 0.35 ~ 47.6% */}
                        <div className="absolute bottom-[47.6%] left-0 right-0 border-b border-dashed border-amber-400 z-10" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1.5">
                        Face {idx + 1}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {(freq * 100).toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <strong>Key Educational Principle:</strong> For a small number of trials (e.g., 5 tosses), results fluctuate widely due to chance. As trials approach 500+, the empirical frequency stabilizes remarkably close to the theoretical value 0.500!
          </div>
        </div>
      </div>
    </div>
  );
};
