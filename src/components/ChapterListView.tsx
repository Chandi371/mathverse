import React, { useState } from 'react';
import { allCurriculumChapters } from '../data/curriculumData';
import { FlaskConical, CheckCircle2, ArrowRight, Search, Award } from 'lucide-react';
import { GuestBanner } from './GuestBanner';
import { getClass10ChapterWeightage } from '../data/textbooksData';
import type { UserProgress } from '../types/progress';
import type { StudentUser } from '../types/auth';

interface ChapterListViewProps {
  onSelectChapter: (id: string) => void;
  selectedClass: 9 | 10 | null;
  progress: UserProgress;
  user?: StudentUser | null;
  onOpenAuth?: () => void;
}

export const ChapterListView: React.FC<ChapterListViewProps> = ({
  onSelectChapter,
  selectedClass,
  progress,
  user = null,
  onOpenAuth = () => {},
}) => {
  const [filterSemester, setFilterSemester] = useState<'All' | 1 | 2>('All');
  const [search, setSearch] = useState('');

  const filtered = allCurriculumChapters.filter((c) => {
    const matchesClass = selectedClass === null || c.classGrade === selectedClass;
    const matchesSemester = filterSemester === 'All' || c.semester === filterSemester;
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.topicCategory.toLowerCase().includes(search.toLowerCase());
    return matchesClass && matchesSemester && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 space-y-4 sm:space-y-6">
      <GuestBanner user={user} onOpenAuth={onOpenAuth} context="chapters" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300">
            AP SSC Board Curriculum Map
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Complete Chapter Syllabus
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Structured for Class 9 and Class 10 across both semesters with rigorous proofs and interactive labs.
          </p>
        </div>

        {/* Semester Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
          {(['All', 1, 2] as const).map((sem) => (
            <button
              key={sem}
              onClick={() => setFilterSemester(sem)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterSemester === sem
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {sem === 'All' ? 'All Semesters' : `Semester ${sem}`}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search chapters by title or topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:border-indigo-500 transition shadow-sm"
        />
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ch) => {
          const isDone = progress.completedChapterIds.includes(ch.id);
          return (
            <div
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 cursor-pointer shadow-sm hover:shadow transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                      Class {ch.classGrade} · Sem {ch.semester}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono">
                      Ch {ch.chapterNumber}
                    </span>
                  </div>

                  {isDone && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      Done
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition mt-1">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {ch.description}
                </p>

                {/* Class 10 SSC Board Marks Quick Strip */}
                {ch.classGrade === 10 && (() => {
                  const weightage = getClass10ChapterWeightage(ch.chapterNumber) || getClass10ChapterWeightage(ch.title);
                  if (!weightage) return null;
                  return (
                    <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        SSC: {weightage.totalMarksWithChoice}M
                      </span>
                      <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">
                        1M:{weightage.q1mCount} · 2M:{weightage.q2mCount} · 4M:{weightage.q4mCount} · 8M:{weightage.q8mCount}
                      </span>
                    </div>
                  );
                })()}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {ch.hasInteractiveLab ? (
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <FlaskConical className="w-3.5 h-3.5" />
                    Interactive Lab Included
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Complete Syllabus Topic</span>
                )}
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p>No chapters found matching "{search}".</p>
        </div>
      )}
    </div>
  );
};
