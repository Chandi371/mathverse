import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Sparkles, Calendar, CheckCircle2, Award, BookOpen } from 'lucide-react';
import {
  generateRamanujanMagicSquare,
  taxicab1729Metrics,
  evaluateRamanujanRadical,
} from '../../utils/mathUtils';

type LabTab = 'magic-square' | 'taxicab-1729' | 'nested-radical';
type HighlightMode = 'all' | 'rows' | 'cols' | 'diagonals' | 'corners' | 'center' | 'quadrants';

export const RamanujanLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('magic-square');

  // Magic Square State (Defaults to Ramanujan's Birthdate: 22 Dec 1887)
  const [day, setDay] = useState<number>(22);
  const [month, setMonth] = useState<number>(12);
  const [century, setCentury] = useState<number>(18);
  const [year, setYear] = useState<number>(87);
  const [highlight, setHighlight] = useState<HighlightMode>('all');

  // Radical Depth State
  const [radicalDepth, setRadicalDepth] = useState<number>(5);

  const magicSquare = generateRamanujanMagicSquare(day, month, century, year);
  const taxicab = taxicab1729Metrics();
  const radical = evaluateRamanujanRadical(radicalDepth);

  const setPresetDate = (d: number, m: number, c: number, y: number) => {
    setDay(d);
    setMonth(m);
    setCentury(c);
    setYear(y);
  };

  // Helper to determine cell highlight styling
  const isCellHighlighted = (r: number, c: number): boolean => {
    if (highlight === 'all') return true;
    if (highlight === 'rows') return true;
    if (highlight === 'cols') return true;
    if (highlight === 'diagonals') return r === c || r + c === 3;
    if (highlight === 'corners') return (r === 0 || r === 3) && (c === 0 || c === 3);
    if (highlight === 'center') return (r === 1 || r === 2) && (c === 1 || c === 2);
    if (highlight === 'quadrants') return true;
    return false;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
      {/* Memorial Tribute Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              National Mathematics Day • 22 December Special
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
            Srinivasa Ramanujan Memorial Lab
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">
            "An equation for me has no meaning unless it expresses a thought of God." — S. Ramanujan (1887–1920)
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('magic-square')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'magic-square'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Magic Square
          </button>
          <button
            onClick={() => setActiveTab('taxicab-1729')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'taxicab-1729'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Hardy 1729
          </button>
          <button
            onClick={() => setActiveTab('nested-radical')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'nested-radical'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Nested Radical = 3
          </button>
        </div>
      </div>

      {/* TAB 1: RAMANUJAN BIRTHDAY MAGIC SQUARE */}
      {activeTab === 'magic-square' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-800/60">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-300">
                Interactive Birthday Matrix
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                Ramanujan created a 4×4 magic square where Row 1 is his exact birthdate (22 / 12 / 18 / 87). Every row, column, diagonal, corner, and 2×2 block sums to the same constant!
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-500">Presets:</span>
              <button
                onClick={() => setPresetDate(22, 12, 18, 87)}
                className="px-2 py-1 text-[11px] font-bold rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
              >
                Ramanujan (22/12/1887)
              </button>
              <button
                onClick={() => setPresetDate(15, 8, 19, 47)}
                className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                15/08/1947
              </button>
              <button
                onClick={() => setPresetDate(26, 1, 19, 50)}
                className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                26/01/1950
              </button>
            </div>
          </div>

          {/* Interactive Date Inputs */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Enter Any Date (Create Your Personal Birthday Magic Square!):</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400">Day (DD = A)</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value) || 1)}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400">Month (MM = B)</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value) || 1)}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400">Century (CC = C)</label>
                <input
                  type="number"
                  min="10"
                  max="99"
                  value={century}
                  onChange={(e) => setCentury(Number(e.target.value) || 19)}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400">Year (YY = D)</label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value) || 0)}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Matrix & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* 4x4 Magic Square Grid Display */}
            <div className="md:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-sm aspect-square bg-slate-900 dark:bg-slate-950 p-2 sm:p-3 rounded-2xl shadow-md border-2 border-amber-500/30 grid grid-cols-4 gap-1.5 sm:gap-2">
                {magicSquare.grid.map((row, r) =>
                  row.map((val, c) => {
                    const isTopRow = r === 0;
                    const highlighted = isCellHighlighted(r, c);
                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`flex flex-col items-center justify-center rounded-xl transition-all select-none ${
                          highlighted
                            ? isTopRow
                              ? 'bg-gradient-to-tr from-amber-600 to-amber-500 text-white font-black ring-2 ring-amber-300'
                              : 'bg-indigo-600/90 text-white font-extrabold ring-1 ring-indigo-400'
                            : 'bg-slate-800 text-slate-500 opacity-40'
                        }`}
                      >
                        <span className="text-base sm:text-2xl font-mono">{val}</span>
                        {isTopRow && (
                          <span className="text-[9px] uppercase tracking-widest text-amber-100 font-sans">
                            {c === 0 ? 'Day' : c === 1 ? 'Month' : c === 2 ? 'Cent' : 'Year'}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Magic Constant Sum Pill */}
              <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  Universal Magic Sum (A + B + C + D) ={' '}
                  <strong className="font-mono text-base">{magicSquare.magicConstant}</strong>
                </span>
              </div>
            </div>

            {/* Invariant Visual Inspector Controls */}
            <div className="md:col-span-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Visualise Sum Invariants:
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => setHighlight('all')}
                  className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                    highlight === 'all'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ✨ Show All Grid
                </button>
                <button
                  onClick={() => setHighlight('rows')}
                  className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                    highlight === 'rows'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ↔ All 4 Rows (= {magicSquare.magicConstant})
                </button>
                <button
                  onClick={() => setHighlight('cols')}
                  className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                    highlight === 'cols'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ↕ All 4 Columns (= {magicSquare.magicConstant})
                </button>
                <button
                  onClick={() => setHighlight('diagonals')}
                  className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                    highlight === 'diagonals'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ✕ Both Diagonals (= {magicSquare.magicConstant})
                </button>
                <button
                  onClick={() => setHighlight('corners')}
                  className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                    highlight === 'corners'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ⛶ Four Corners (= {magicSquare.magicConstant})
                </button>
                <button
                  onClick={() => setHighlight('center')}
                  className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                    highlight === 'center'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ▫ Center 2×2 Block (= {magicSquare.magicConstant})
                </button>
              </div>

              {/* Ramanujan's Mathematical Construction Formula */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Ramanujan's Algebraic Matrix Formulation:
                </span>
                <p>
                  Row 1: <code className="font-mono text-amber-600 dark:text-amber-400">A, B, C, D</code><br />
                  Row 2: <code className="font-mono">D+1, C-1, B-3, A+3</code><br />
                  Row 3: <code className="font-mono">B-2, A+2, D+2, C-2</code><br />
                  Row 4: <code className="font-mono">C+1, D-1, A+1, B-1</code>
                </p>
                <p className="text-[10px] text-slate-400 pt-1">
                  Because every row, column, and pair adds and subtracts matching integer offsets, the sum is strictly invariant to $A + B + C + D$.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HARDY-RAMANUJAN TAXICAB 1729 */}
      {activeTab === 'taxicab-1729' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/30 text-white space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              The Famous Putney Hospital Story
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              When English mathematician G.H. Hardy came to visit Ramanujan, he noted he had ridden in taxi-cab number <strong>1729</strong>, observing that it seemed rather dull. Ramanujan immediately replied:
            </p>
            <blockquote className="border-l-2 border-amber-400 pl-3 py-1 text-xs sm:text-sm font-semibold text-amber-200 italic">
              "No, Hardy! It is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways!"
            </blockquote>
          </div>

          {/* Dual Cube Decomposition Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Decomposition A */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
                  Decomposition A
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  1³ + 12³
                </span>
              </div>
              <div className="text-center py-2">
                <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                  1 + 1,728 = <span className="text-indigo-600 dark:text-indigo-400">1,729</span>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  1³ = {taxicab.pair1.cubeA} &nbsp;•&nbsp; 12³ = {taxicab.pair1.cubeB.toLocaleString()}
                </div>
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full flex overflow-hidden">
                <div style={{ width: '0.1%' }} className="bg-amber-500" title="1³ = 1" />
                <div style={{ width: '99.9%' }} className="bg-indigo-600" title="12³ = 1,728" />
              </div>
              <p className="text-[11px] text-slate-500">
                A minuscule unit cube combined with a massive 12×12×12 volume.
              </p>
            </div>

            {/* Decomposition B */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-purple-600 dark:text-purple-400">
                  Decomposition B
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  9³ + 10³
                </span>
              </div>
              <div className="text-center py-2">
                <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                  729 + 1,000 = <span className="text-purple-600 dark:text-purple-400">1,729</span>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  9³ = {taxicab.pair2.cubeA} &nbsp;•&nbsp; 10³ = {taxicab.pair2.cubeB.toLocaleString()}
                </div>
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full flex overflow-hidden">
                <div style={{ width: '42.2%' }} className="bg-amber-500" title="9³ = 729" />
                <div style={{ width: '57.8%' }} className="bg-purple-600" title="10³ = 1,000" />
              </div>
              <p className="text-[11px] text-slate-500">
                Two balanced, comparable cubes: 9×9×9 and 10×10×10.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Taxicab Invariant:</strong> 1729 is the smallest positive integer $Ta(2)$ with this dual-cube property. The next number with this property is 4,104 ($2^3 + 16^3 = 9^3 + 15^3$).
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: RAMANUJAN INFINITE NESTED RADICAL */}
      {activeTab === 'nested-radical' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              Journal of the Indian Mathematical Society (1911)
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Ramanujan's Legendary Nested Radical:
            </h4>
            <div className="py-2 text-center overflow-x-auto font-mono text-base sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">
              <MathView math="\sqrt{1 + 2\sqrt{1 + 3\sqrt{1 + 4\sqrt{1 + \dots}}}} = 3" block />
            </div>
          </div>

          {/* Interactive Depth Slider */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">
                Nested Evaluation Depth: <strong className="text-indigo-600 text-sm font-mono">{radicalDepth} levels</strong>
              </span>
              <span className="text-slate-400 text-[11px] font-mono">
                Computed Value: <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{radical.value.toFixed(6)}</strong>
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={radicalDepth}
              onChange={(e) => setRadicalDepth(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Depth 1 (≈ 1.732)</span>
              <span>Depth 5 (≈ 2.998)</span>
              <span>Depth 10 (≈ 3.000)</span>
            </div>

            {/* Convergence Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Convergence to Target (3.0):</span>
                <span className="font-mono font-bold text-indigo-600">
                  {((radical.value / 3) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.min(100, (radical.value / 3) * 100)}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 rounded-full transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Proof Explanation */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              How Ramanujan Discovered This Identity:
            </span>
            <p className="leading-relaxed">
              Start with the simple identity: <code className="font-mono font-bold text-slate-800 dark:text-slate-200">(x + 1)² = x² + 2x + 1 = 1 + x(x + 2)</code>.
            </p>
            <p className="leading-relaxed">
              Taking the square root: <code className="font-mono text-indigo-600 dark:text-indigo-400">x + 1 = √(1 + x(x + 2))</code>.
            </p>
            <p className="leading-relaxed">
              Applying the formula iteratively to <code className="font-mono">x + 2</code>, <code className="font-mono">x + 3</code>, etc., and substituting <code className="font-mono font-bold">x = 2</code>:
              <br />
              <span className="font-mono font-bold text-slate-900 dark:text-white block pt-1">
                2 + 1 = 3 = √(1 + 2√(1 + 3√(1 + 4...)))
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
