import React, { useState } from 'react';
import { allCurriculumChapters } from '../data/curriculumData';
import { allFormulasData } from '../data/formulasData';
import { CheckCircle2, BookmarkCheck, Flame, RotateCcw, ArrowRight, Award, BookOpen } from 'lucide-react';
import type { UserProgress } from '../types/progress';

interface ProgressDashboardProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onSelectChapter: (id: string) => void;
  onSelectFormula: (id: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onResetProgress,
  onSelectChapter,
  onSelectFormula,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const totalChapters = allCurriculumChapters.length;
  const completedCount = progress.completedChapterIds.length;
  const progressPct = Math.round((completedCount / totalChapters) * 100);

  const { totalAttempted, correctCount, bestStreak } = progress.practiceStats;
  const accuracyPct = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  const bookmarkedFormulas = allFormulasData.filter((f) =>
    progress.bookmarkedFormulaIds.includes(f.id)
  );

  const completedChapters = allCurriculumChapters.filter((c) =>
    progress.completedChapterIds.includes(c.id)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300">
          Personal Learning Analytics
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Your MATHVERSE Progress
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Track syllabus coverage, formula recall lists, and practice streaks stored safely on your device.
        </p>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Syllabus Covered</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {completedCount} <span className="text-xs text-slate-400">/ {totalChapters}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div style={{ width: `${progressPct}%` }} className="bg-emerald-500 h-full rounded-full" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>Practice Accuracy</span>
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            {accuracyPct}%
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">
            {correctCount} correct of {totalAttempted}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Best Streak</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-500 font-mono">
            {bestStreak}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">consecutive correct</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
            <BookmarkCheck className="w-4 h-4 text-purple-500" />
            <span>Saved Formulas</span>
          </div>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {progress.bookmarkedFormulaIds.length}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">bookmarked for revision</p>
        </div>
      </div>

      {/* Completed Chapters List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            Completed Chapters ({completedChapters.length})
          </h2>
        </div>

        {completedChapters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {completedChapters.map((ch) => (
              <div
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 cursor-pointer flex items-center justify-between group transition"
              >
                <div>
                  <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-emerald-600">
                    {ch.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Class {ch.classGrade} · Semester {ch.semester}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-3 text-center">
            No chapters marked complete yet. Click "Mark as Complete" on any chapter to track it here!
          </p>
        )}
      </div>

      {/* Bookmarked Formulas List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-purple-500" />
            Quick Revision Formulas ({bookmarkedFormulas.length})
          </h2>
        </div>

        {bookmarkedFormulas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookmarkedFormulas.map((f) => (
              <div
                key={f.id}
                onClick={() => onSelectFormula(f.id)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer flex items-center justify-between group transition"
              >
                <div>
                  <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-purple-600">
                    {f.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                    {f.latex}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-3 text-center">
            No formulas bookmarked yet. Click the bookmark icon next to any formula in the Formula Library to pin it here!
          </p>
        )}
      </div>

      {/* Local Storage Privacy & Reset Confirmation */}
      <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <strong className="block text-slate-700 dark:text-slate-300 mb-0.5">
            Local Storage Architecture:
          </strong>
          All progress is safely persisted locally in your browser. No registration or server account required.
        </div>

        {showConfirmReset ? (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-rose-600 font-semibold">Confirm Reset?</span>
            <button
              onClick={() => {
                onResetProgress();
                setShowConfirmReset(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
            >
              Yes, Clear
            </button>
            <button
              onClick={() => setShowConfirmReset(false)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Progress
          </button>
        )}
      </div>
    </div>
  );
};
