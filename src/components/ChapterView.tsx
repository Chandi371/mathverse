import React, { useState } from 'react';
import { MathView } from './MathView';
import { InteractiveLabDispatcher } from './InteractiveLab/InteractiveLabDispatcher';
import {
  BookOpen,
  FlaskConical,
  Sigma,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  ChevronRight,
  FileCheck,
  Check,
} from 'lucide-react';
import { GuestBanner } from './GuestBanner';
import type { Chapter } from '../types/curriculum';
import type { UserProgress } from '../types/progress';
import type { StudentUser } from '../types/auth';

interface ChapterViewProps {
  chapter: Chapter;
  onBack: () => void;
  progress: UserProgress;
  onToggleComplete: (chapterId: string) => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean) => void;
  user?: StudentUser | null;
  onOpenAuth?: () => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  onBack,
  progress,
  onToggleComplete,
  onRecordAnswer,
  user = null,
  onOpenAuth = () => {},
}) => {
  const [activeSection, setActiveSection] = useState<
    'intro' | 'lab' | 'derivation' | 'memory' | 'examples' | 'practice' | 'revision'
  >('intro');

  const isCompleted = progress.completedChapterIds.includes(chapter.id);

  const allSections = [
    { id: 'intro', label: '1. Introduction', icon: BookOpen },
    { id: 'lab', label: '2. Interactive Lab', icon: FlaskConical, show: Boolean(chapter.labId) },
    { id: 'derivation', label: '3. Formula Origins', icon: Sigma },
    { id: 'memory', label: '4. Memory Lab', icon: Brain },
    { id: 'examples', label: '5. Worked Examples', icon: FileCheck },
    { id: 'practice', label: '6. Practice Studio', icon: CheckCircle2 },
    { id: 'revision', label: '7. Revision Recap', icon: Lightbulb },
  ] as const;

  const sections = allSections.filter((sec) => ('show' in sec ? sec.show : true));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      <GuestBanner user={user} onOpenAuth={onOpenAuth} context="chapter-view" />

      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 self-start transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapter List
        </button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => onToggleComplete(chapter.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-300'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>

      {/* Chapter Title Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-200 uppercase">
            <span>AP SSC Class {chapter.classGrade}</span>
            <span>•</span>
            <span>Semester {chapter.semester}</span>
            <span>•</span>
            <span>Chapter {chapter.chapterNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {chapter.title}
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 max-w-2xl leading-relaxed">
            {chapter.shortDescription}
          </p>
        </div>
      </div>

      {/* Horizontal Learning Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs whitespace-nowrap font-semibold transition border-b-2 ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION CONTENT CONTAINER */}
      <div className="space-y-6">
        {/* 1. CONCEPT INTRODUCTION */}
        {activeSection === 'intro' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Why It Matters */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Educational Context &amp; Significance
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Why This Topic Matters
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {chapter.whyItMatters}
              </p>
            </div>

            {/* Prior Knowledge */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Required Prior Foundations
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium">
                {chapter.priorKnowledge.map((pk, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold shrink-0">✓</span>
                    <span className="leading-snug">{pk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Vocabulary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Key Mathematical Vocabulary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {chapter.vocabulary.map((v, i) => (
                  <div key={i} className="p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/70 shadow-xs">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm block mb-1">
                      {v.term}
                    </span>
                    <p className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
                      {v.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setActiveSection(chapter.labId ? 'lab' : 'derivation')}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-3 sm:py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm transition active:scale-[0.98]"
              >
                <span>{chapter.labId ? 'Proceed to Interactive Lab' : 'Explore Formula Origins'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. INTERACTIVE LAB */}
        {activeSection === 'lab' && chapter.labId && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <InteractiveLabDispatcher labId={chapter.labId} />

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveSection('intro')}
                className="text-xs font-semibold text-slate-500 hover:underline"
              >
                ← Back to Intro
              </button>
              <button
                onClick={() => setActiveSection('derivation')}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
              >
                <span>Explore Formula Origins</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3. FORMULA ORIGINS & DERIVATION */}
        {activeSection === 'derivation' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {chapter.derivation ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    Formula Origins &amp; Proof Architecture
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {chapter.derivation.title}
                  </h2>
                  <div className="my-3 p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
                    <MathView math={chapter.derivation.targetFormula} block />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    <strong>Starting Premise:</strong> {chapter.derivation.startingObservation}
                  </p>
                </div>

                {/* Derivation Steps */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Step-by-Step Logical Proof:
                  </h3>
                  {chapter.derivation.steps.map((st) => (
                    <div
                      key={st.stepNumber}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-100/80 dark:bg-slate-800/80 space-y-2 text-xs sm:text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                          Step {st.stepNumber}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-300 italic">
                          Justification: {st.justification}
                        </span>
                      </div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {st.statement}
                      </p>
                      {st.latex && (
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-mono">
                          <MathView math={st.latex} block />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Conclusion */}
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm text-indigo-950 dark:text-indigo-100">
                  <strong>Conclusion:</strong> {chapter.derivation.conclusion}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p>Derivation details for this chapter will be shown shortly.</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveSection(chapter.labId ? 'lab' : 'intro')}
                className="text-xs font-semibold text-slate-500 hover:underline"
              >
                ← Back to {chapter.labId ? 'Lab' : 'Intro'}
              </button>
              <button
                onClick={() => setActiveSection('memory')}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
              >
                <span>Memory Lab &amp; Mnemonics</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 4. MEMORY LAB */}
        {activeSection === 'memory' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                  Cognitive Retainers &amp; Mnemonics
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Memory Lab
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Mnemonic acronyms, visual hooks, and specific AP SSC examination pitfalls to guard against.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapter.memoryLab?.map((trick, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/40 space-y-2 text-xs sm:text-sm"
                  >
                    <span className="font-bold text-purple-900 dark:text-purple-200 block text-sm">
                      {trick.title}
                    </span>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-purple-200 dark:border-purple-800 font-mono text-purple-700 dark:text-purple-300 font-bold text-center">
                      "{trick.mnemonic}"
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 text-xs">
                      <strong>Meaning:</strong> {trick.meaning}
                    </p>
                    <div className="flex items-start gap-1.5 text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/70 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                      <span><strong>Board Tip:</strong> {trick.boardExamTip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveSection('derivation')}
                className="text-xs font-semibold text-slate-500 hover:underline"
              >
                ← Back to Derivations
              </button>
              <button
                onClick={() => setActiveSection('examples')}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
              >
                <span>Worked Examples</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 5. WORKED EXAMPLES */}
        {activeSection === 'examples' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="space-y-4">
              {chapter.workedExamples.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-4"
                >
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                      Worked Solution
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {ex.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 mt-2 bg-slate-100/90 dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <strong>Problem:</strong> {ex.problemStatement}
                    </p>
                  </div>

                  {/* Given & Strategy */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">
                        Given Information:
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-700 dark:text-slate-200">
                        {ex.given.map((g, gi) => (
                          <li key={gi}>{g}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800">
                      <span className="font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                        Strategic Method:
                      </span>
                      <p className="text-indigo-950 dark:text-indigo-200 leading-relaxed">{ex.strategy}</p>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Calculation Steps:
                    </span>
                    {ex.steps.map((st) => (
                      <div
                        key={st.stepNumber}
                        className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1"
                      >
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          Step {st.stepNumber}: {st.title}
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-200">
                          {st.explanation}
                        </p>
                        {st.latex && (
                          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-center font-mono my-1 border border-slate-200 dark:border-slate-700">
                            <MathView math={st.latex} block />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Common mistake & Sanity check */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100">
                      <strong>Common Exam Mistake:</strong> {ex.commonMistake}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100">
                      <strong>Sanity Check:</strong> {ex.sanityCheck}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveSection('memory')}
                className="text-xs font-semibold text-slate-500 hover:underline"
              >
                ← Back to Memory Lab
              </button>
              <button
                onClick={() => setActiveSection('practice')}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
              >
                <span>Interactive Practice</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 6. PRACTICE STUDIO */}
        {activeSection === 'practice' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  Active Knowledge Assessment
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Chapter Practice ({chapter.practiceQuestions.length} Questions)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Attempt these curated questions with guided discovery hints.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {chapter.practiceQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 space-y-3"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        Problem {idx + 1} ({q.difficulty})
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRecordAnswer(q.id, true)}
                          className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium text-[10px] hover:bg-emerald-100"
                        >
                          Mark Solved ✓
                        </button>
                        <span className="font-mono text-[10px] uppercase text-slate-400">
                          {q.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {q.prompt}
                    </p>
                    <div className="text-xs text-slate-700 dark:text-slate-200 italic bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                      <strong className="text-slate-900 dark:text-white not-italic">Answer / Solution:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveSection('examples')}
                className="text-xs font-semibold text-slate-500 hover:underline"
              >
                ← Back to Worked Examples
              </button>
              <button
                onClick={() => setActiveSection('revision')}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
              >
                <span>Revision Recap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 7. REVISION RECAP */}
        {activeSection === 'revision' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Final Takeaway &amp; Exam Checklist
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Revision Summary
                </h2>
              </div>

              {/* Core Points */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Key Learnings to Remember:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                  {chapter.revisionSummary.corePoints.map((cp, cpi) => (
                    <li key={cpi} className="flex items-start gap-2 bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-indigo-500 font-bold shrink-0">▸</span>
                      <span>{cp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Traps */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Common Exam Traps to Avoid:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-950 dark:text-rose-100">
                  {chapter.revisionSummary.commonTraps.map((ct, cti) => (
                    <li key={cti} className="flex items-start gap-2 bg-rose-50/80 dark:bg-rose-950/60 p-3 rounded-xl border border-rose-200 dark:border-rose-800">
                      <span className="text-rose-500 font-bold shrink-0">⚠</span>
                      <span>{ct}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete Chapter CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Finished studying {chapter.title}?
                </span>
                <button
                  onClick={() => onToggleComplete(chapter.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
