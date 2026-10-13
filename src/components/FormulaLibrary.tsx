import React, { useState } from 'react';
import { MathView } from './MathView';
import { allFormulasData } from '../data/formulasData';
import { Bookmark, BookmarkCheck, Copy, Check, FlaskConical, Search } from 'lucide-react';

interface FormulaLibraryProps {
  onOpenLab: (labId: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (formulaId: string) => void;
}

export const FormulaLibrary: React.FC<FormulaLibraryProps> = ({
  onOpenLab,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<'All' | 9 | 10>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Algebra',
    'Trigonometry',
    'Coordinate Geometry',
    'Mensuration',
    'Statistics & Probability',
  ];

  const handleCopy = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filtered = allFormulasData.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesGrade = selectedGrade === 'All' || f.classGrade === selectedGrade;
    const matchesSearch =
      !searchQuery ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.latex.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesGrade && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
            Formula Origins &amp; Explorer
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Mathematics Formula Repository
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Explore core identities and theorems prescribed for Andhra Pradesh SSC Board. Inspect variable meanings, derivation rationales, and launch interactive visual models.
          </p>
        </div>

        {/* Grade filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
          {(['All', 9, 10] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedGrade === grade
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {grade === 'All' ? 'All Classes' : `Class ${grade}`}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Category Chips */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search formulas (e.g. Gauss, Heron, Quadratic, SOH-CAH-TOA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:border-emerald-500 transition shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((formula) => {
          const isBookmarked = bookmarkedIds.includes(formula.id);
          return (
            <div
              key={formula.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                        Class {formula.classGrade} · {formula.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {formula.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(formula.latex, formula.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Copy formula"
                    >
                      {copiedId === formula.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => onToggleBookmark(formula.id)}
                      className={`p-1.5 rounded-lg transition ${
                        isBookmarked
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                          : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title="Bookmark formula for revision"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* KaTeX Formula Box */}
                <div className="my-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-855 border border-slate-200/80 dark:border-slate-800 text-center overflow-x-auto">
                  <MathView math={formula.latex} block />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  {formula.description}
                </p>

                {/* Variable Breakdown */}
                {formula.variables.length > 0 && (
                  <div className="mb-3 space-y-1 bg-slate-50/70 dark:bg-slate-800/40 p-2.5 rounded-lg text-[11px] border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Variable Symbols:
                    </span>
                    {formula.variables.map((v, i) => (
                      <div key={i} className="flex items-baseline gap-2">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                          {v.symbol}:
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">{v.meaning}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-2">
                {formula.labId ? (
                  <button
                    onClick={() => onOpenLab(formula.labId!)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
                  >
                    <FlaskConical className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    Launch Interactive Lab
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400">Standard AP SSC Formula</span>
                )}
                <span className="text-[10px] text-slate-400 font-mono">
                  ID: {formula.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p>No formulas found matching your filter criteria.</p>
        </div>
      )}
    </div>
  );
};
