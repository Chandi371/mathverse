import React, { useState } from 'react';
import { allCurriculumChapters } from '../data/curriculumData';
import { allFormulasData } from '../data/formulasData';
import {
  CheckCircle2,
  BookmarkCheck,
  Flame,
  RotateCcw,
  ArrowRight,
  Award,
  BookOpen,
  Cloud,
  ShieldCheck,
} from 'lucide-react';
import { GuestBanner } from './GuestBanner';
import type { UserProgress } from '../types/progress';
import type { StudentUser } from '../types/auth';

interface ProgressDashboardProps {
  progress: UserProgress;
  user: StudentUser | null;
  onOpenAuth: () => void;
  onResetProgress: () => void;
  onSelectChapter: (id: string) => void;
  onSelectFormula: (id: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  user,
  onOpenAuth,
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
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 space-y-4 sm:space-y-6">
      {/* Account Status / Cloud Sync Banner */}
      {user ? (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-transparent border border-indigo-200 dark:border-indigo-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-base uppercase shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-base">
                  {user.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  AP SSC Class {user.classGrade}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cloud Sync Active · {user.email}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 self-start sm:self-auto font-mono">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Private Learning Profile</span>
          </div>
        </div>
      ) : (
        <GuestBanner user={user} onOpenAuth={onOpenAuth} context="progress" />
      )}

      {/* Header */}
      <div>
        <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300">
          Personal Learning Analytics
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Your MATHVERSE Mastery
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Personal syllabus completion, formula recall, and practice stats isolated strictly to your student account.
        </p>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
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

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>Practice Accuracy</span>
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            {accuracyPct}%
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">
            {correctCount} correct of {totalAttempted} unique
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Best Streak</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-500 font-mono">
            {bestStreak}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">consecutive correct</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
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

      {/* Privacy Note & Reset Confirmation */}
      <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <strong className="block text-slate-700 dark:text-slate-300 mb-0.5">
            Student Data Isolation &amp; Privacy:
          </strong>
          {user
            ? `Your progress is linked strictly to account ${user.email}. No other student or visitor can access or overwrite your history.`
            : 'You are currently in guest mode. Progress is isolated to this browser and will not affect any registered student.'}
        </div>

        {showConfirmReset ? (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-rose-600 font-semibold">Confirm Reset?</span>
            <button
              onClick={() => {
                onResetProgress();
                setShowConfirmReset(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer"
            >
              Yes, Clear
            </button>
            <button
              onClick={() => setShowConfirmReset(false)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Progress
          </button>
        )}
      </div>
    </div>
  );
};
