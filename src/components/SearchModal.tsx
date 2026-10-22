import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Sigma, FlaskConical, ArrowRight, Library } from 'lucide-react';
import { allCurriculumChapters } from '../data/curriculumData';
import { allFormulasData } from '../data/formulasData';
import { officialTextbooks, class10BoardExamResources } from '../data/textbooksData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectFormula: (formulaId: string) => void;
  onSelectLab: (labId: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  onSelectFormula,
  onSelectLab,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredChapters = cleanQuery
    ? allCurriculumChapters.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQuery) ||
          c.description.toLowerCase().includes(cleanQuery) ||
          c.topicCategory.toLowerCase().includes(cleanQuery) ||
          `class ${c.classGrade}`.includes(cleanQuery)
      )
    : allCurriculumChapters.slice(0, 3);

  const filteredFormulas = cleanQuery
    ? allFormulasData.filter(
        (f) =>
          f.name.toLowerCase().includes(cleanQuery) ||
          f.description.toLowerCase().includes(cleanQuery) ||
          f.latex.toLowerCase().includes(cleanQuery) ||
          f.category.toLowerCase().includes(cleanQuery)
      )
    : allFormulasData.slice(0, 3);

  const allDocs = [...officialTextbooks, ...class10BoardExamResources];
  const filteredDocs = cleanQuery
    ? allDocs.filter(
        (d) =>
          d.title.toLowerCase().includes(cleanQuery) ||
          d.subtitle.toLowerCase().includes(cleanQuery) ||
          ('chapters' in d && d.chapters.some((ch: string) => ch.toLowerCase().includes(cleanQuery)))
      )
    : [];

  const registeredLabs = [
    {
      id: 'ramanujan-lab',
      title: 'Srinivasa Ramanujan Memorial Lab',
      subtitle: 'Birthday Magic Square Generator, 1729 Taxicab Cubes, & Nested Radical = 3',
      badge: 'Dec 22 Special',
    },
    {
      id: 'area-model',
      title: 'Geometric Area Model',
      subtitle: 'Visual proof of (a + b)², (a - b)², and a² - b²',
      badge: 'Algebra',
    },
    {
      id: 'trig-triangle',
      title: 'Right Triangle & SOH-CAH-TOA',
      subtitle: 'Trigonometric ratios & Pythagorean identity',
      badge: 'Trigonometry',
    },
    {
      id: 'arithmetic-progression',
      title: 'Arithmetic Progression Lab',
      subtitle: 'Gauss pairing model & AP sum derivations',
      badge: 'Sequences',
    },
    {
      id: 'herons-formula',
      title: "Heron's Formula & Triangle Inequality",
      subtitle: 'Triangle area and side length constraints',
      badge: 'Mensuration',
    },
    {
      id: 'coordinate-geometry',
      title: 'Cartesian Distance & Midpoint Lab',
      subtitle: 'Pythagorean distance between 2 points',
      badge: 'Geometry',
    },
    {
      id: 'quadratic-parabola',
      title: 'Quadratic Parabola & Discriminant Lab',
      subtitle: 'Roots behavior based on D = b² - 4ac',
      badge: 'Algebra',
    },
    {
      id: 'probability-sim',
      title: 'Monte Carlo Probability Simulator',
      subtitle: 'Coin flips, dice rolls & Law of Large Numbers',
      badge: 'Probability',
    },
  ];

  const filteredLabs = cleanQuery
    ? registeredLabs.filter(
        (l) =>
          l.title.toLowerCase().includes(cleanQuery) ||
          l.subtitle.toLowerCase().includes(cleanQuery) ||
          l.badge.toLowerCase().includes(cleanQuery) ||
          cleanQuery.includes('ramanujan') ||
          cleanQuery.includes('magic') ||
          cleanQuery.includes('1729')
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, formulas, concepts, or terms..."
            className="w-full bg-transparent text-sm sm:text-base outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-3 space-y-4 text-xs sm:text-sm">
          {/* Interactive Labs Section */}
          {filteredLabs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-indigo-500" />
                Interactive Labs ({filteredLabs.length})
              </div>
              <div className="space-y-1">
                {filteredLabs.map((lab) => (
                  <div
                    key={lab.id}
                    onClick={() => {
                      onSelectLab(lab.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between group transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {lab.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100/60 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono">
                          {lab.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {lab.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapters Section */}
          {filteredChapters.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                Chapters ({filteredChapters.length})
              </div>
              <div className="space-y-1">
                {filteredChapters.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(ch.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between group transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {ch.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                          Class {ch.classGrade} · Sem {ch.semester}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {ch.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Textbooks & Exam Resources Section */}
          {filteredDocs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                <Library className="w-3.5 h-3.5 text-amber-500" />
                Textbooks &amp; Exam Papers ({filteredDocs.length})
              </div>
              <div className="space-y-1">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onNavigateTab?.('resources');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between group transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          {doc.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100/60 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono">
                          {doc.pageCount} Pages · {doc.fileSizeMB}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {doc.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas Section */}
          {filteredFormulas.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                <Sigma className="w-3.5 h-3.5 text-emerald-500" />
                Formulas ({filteredFormulas.length})
              </div>
              <div className="space-y-1">
                {filteredFormulas.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => {
                      onSelectFormula(f.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between group transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {f.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono">
                          {f.category}
                        </span>
                      </div>
                      <div className="font-mono text-xs text-slate-500 mt-0.5">
                        {f.latex}
                      </div>
                    </div>
                    {f.labId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLab(f.labId!);
                          onClose();
                        }}
                        className="text-[10px] px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-md flex items-center gap-1 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
                      >
                        <FlaskConical className="w-3 h-3" />
                        Lab
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredChapters.length === 0 && filteredFormulas.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              <p>No results found for "{query}".</p>
              <p className="text-xs mt-1">Try searching "trigonometry", "AP", "quadratics", or "Heron".</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between px-4">
          <span>Search spans Classes 9 &amp; 10 AP Board Syllabus</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
