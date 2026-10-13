import React from 'react';
import { AreaModelLab } from './InteractiveLab/AreaModelLab';
import { allCurriculumChapters } from '../data/curriculumData';
import {
  Sparkles,
  ArrowRight,
  FlaskConical,
  Sigma,
  Brain,
  Dumbbell,
  BookOpen,
} from 'lucide-react';

interface HomeViewProps {
  onSelectChapter: (chapterId: string) => void;
  onOpenLab: (labId: string) => void;
  onNavigateTab: (tab: string) => void;
  selectedClass: 9 | 10 | null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectChapter,
  onOpenLab,
  onNavigateTab,
  selectedClass,
}) => {
  const c9Chapters = allCurriculumChapters.filter((c) => c.classGrade === 9);
  const c10Chapters = allCurriculumChapters.filter((c) => c.classGrade === 10);

  const displayedChapters =
    selectedClass === 9 ? c9Chapters : selectedClass === 10 ? c10Chapters : allCurriculumChapters;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-2 sm:pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Andhra Pradesh State Board (SSC) • Classes 9 &amp; 10</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Understand Mathematics.{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            Don't Just Memorise It.
          </span>
        </h1>

        {/* Central Learning Cycle Banner */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">
            The MATHVERSE Learning Cycle
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            <span className="text-blue-600 dark:text-blue-400">Understand</span>
            <span className="text-slate-300">→</span>
            <span className="text-cyan-600 dark:text-cyan-400">Explore</span>
            <span className="text-slate-300">→</span>
            <span className="text-teal-600 dark:text-teal-400">Predict</span>
            <span className="text-slate-300">→</span>
            <span className="text-emerald-600 dark:text-emerald-400">Experiment</span>
            <span className="text-slate-300">→</span>
            <span className="text-amber-600 dark:text-amber-400">Derive</span>
            <span className="text-slate-300">→</span>
            <span className="text-rose-600 dark:text-rose-400">Practise</span>
            <span className="text-slate-300">→</span>
            <span className="text-purple-600 dark:text-purple-400">Reflect</span>
            <span className="text-slate-300">→</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">Master</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Manipulate variables, observe dynamic geometric proofs, discover formula origins, and master board exam techniques with guided discovery.
        </p>

        {/* Quick CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigateTab('labs')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm hover:bg-indigo-700 shadow-md shadow-indigo-500/20 active:scale-95 transition"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Open Interactive Labs</span>
          </button>
          <button
            onClick={() => onNavigateTab('chapters')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse 26 Chapters</span>
          </button>
        </div>
      </section>

      {/* Featured Live Demonstration */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              Live Feature Spotlight
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              The Interactive Mathematics Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Direct cause-and-effect: drag the sliders below to see the square areas update simultaneously.
            </p>
          </div>
          <button
            onClick={() => onOpenLab('trig-triangle')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Try Trigonometry Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <AreaModelLab />
      </section>

      {/* Core Pillars Grid */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white text-center sm:text-left">
          How MATHVERSE Empowers SSC Students
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Interactive Mathematics Lab
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Touch-friendly sliders, geometric dissections, and simulations where equations and diagrams update in real-time.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Sigma className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Formula Origins
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Step-by-step mathematical proofs with logical justifications so you see exactly why each formula works.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Memory Lab
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mnemonics (like SOH-CAH-TOA), visual memory associations, and board exam trap warnings.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Practice Studio
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Progressive hints, error spotting, numerical tolerance validation, and streak celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Navigator */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              AP SSC Curriculum Map
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {displayedChapters.length} Chapters aligned with Andhra Pradesh State Board syllabus.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => onNavigateTab('chapters')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Full Curriculum View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {displayedChapters.slice(0, 9).map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 cursor-pointer shadow-sm hover:shadow transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                    Class {ch.classGrade} · Sem {ch.semester}
                  </span>
                  {ch.hasInteractiveLab && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-semibold flex items-center gap-1">
                      <FlaskConical className="w-2.5 h-2.5" />
                      Lab
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {ch.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Start Learning</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
