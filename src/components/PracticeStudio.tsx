import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { MathView } from './MathView';
import { chaptersData } from '../data/curriculumData';
import { buildBalancedPracticeSet } from '../data/questionSelector';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  ArrowRight,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  GraduationCap,
  RefreshCw,
  PieChart,
  BookOpen,
} from 'lucide-react';
import { GuestBanner } from './GuestBanner';
import type { PracticeQuestion, QuestionDifficulty, ClassGrade, Semester } from '../types/curriculum';
import type { UserProgress } from '../types/progress';
import type { StudentUser } from '../types/auth';

interface PracticeStudioProps {
  progress: UserProgress;
  onRecordAnswer: (questionId: string, isCorrect: boolean) => void;
  user?: StudentUser | null;
  onOpenAuth?: () => void;
}

export const PracticeStudio: React.FC<PracticeStudioProps> = ({
  progress,
  onRecordAnswer,
  user,
  onOpenAuth,
}) => {
  // Session-level in-memory counters (distinct from lifetime and global)
  const [sessionAttempted, setSessionAttempted] = useState<number>(0);
  const [sessionCorrect, setSessionCorrect] = useState<number>(0);

  // Session Configuration State
  const [selectedClass, setSelectedClass] = useState<'all' | ClassGrade>(10);
  const [selectedSemester, setSelectedSemester] = useState<'all' | Semester>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | QuestionDifficulty>('all');
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [seed, setSeed] = useState<number>(() => Date.now());
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [showCoverageStats, setShowCoverageStats] = useState<boolean>(false);

  // Active question state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [numericInput, setNumericInput] = useState<string>('');
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(-1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Base authored questions from curriculum
  const authoredQuestions: PracticeQuestion[] = useMemo(() => {
    return chaptersData.flatMap((ch) =>
      ch.practiceQuestions.map((q) => ({
        ...q,
        chapterId: ch.id,
        classGrade: ch.classGrade,
        semester: ch.semester,
        generationMethod: 'authored' as const,
        validationMethod: 'exact-match' as const,
      }))
    );
  }, []);

  // Generate Balanced Practice Set using Central Question Selector
  const practiceSession = useMemo(() => {
    return buildBalancedPracticeSet(
      {
        classGrade: selectedClass,
        semester: selectedSemester,
        chapterId: selectedChapterId,
        difficulty: selectedDifficulty,
        questionCount,
        seed,
      },
      authoredQuestions
    );
  }, [selectedClass, selectedSemester, selectedChapterId, selectedDifficulty, questionCount, seed, authoredQuestions]);

  const questions = practiceSession.questions;
  const safeIndex = currentIndex < questions.length ? currentIndex : 0;
  const currentQ: PracticeQuestion | undefined = questions[safeIndex];
  const history = currentQ ? progress.questionHistory[currentQ.id] : undefined;

  // Available chapters for current class & semester filters
  const availableChapters = useMemo(() => {
    return chaptersData.filter((ch) => {
      if (selectedClass !== 'all' && ch.classGrade !== selectedClass) return false;
      if (selectedSemester !== 'all' && ch.semester !== selectedSemester) return false;
      return true;
    });
  }, [selectedClass, selectedSemester]);

  // Current chapter meta
  const currentChapterMeta = useMemo(() => {
    if (!currentQ?.chapterId) return undefined;
    return chaptersData.find((ch) => ch.id === currentQ.chapterId);
  }, [currentQ]);

  // Handlers
  const handleRevealNextHint = () => {
    if (currentQ && revealedHintIndex < currentQ.hints.length - 1) {
      setRevealedHintIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (!currentQ || submitted) return;

    let correct = false;
    if (currentQ.type === 'numerical') {
      const userNum = parseFloat(numericInput.trim());
      const targetNum = Number(currentQ.correctAnswer);
      const tol = currentQ.tolerance ?? 0.05;
      correct = !isNaN(userNum) && Math.abs(userNum - targetNum) <= tol;
    } else {
      correct = selectedOption.trim() === String(currentQ.correctAnswer).trim();
    }

    setIsCorrect(correct);
    setSubmitted(true);
    setSessionAttempted((prev) => prev + 1);
    if (correct) {
      setSessionCorrect((prev) => prev + 1);
    }
    onRecordAnswer(currentQ.id, correct);

    if (correct) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleNextQuestion = () => {
    if (questions.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % questions.length);
    }
    setSelectedOption('');
    setNumericInput('');
    setRevealedHintIndex(-1);
    setSubmitted(false);
    setIsCorrect(false);
  };

  const handleRetry = () => {
    setSelectedOption('');
    setNumericInput('');
    setSubmitted(false);
    setIsCorrect(false);
  };

  const handleGenerateFresh = () => {
    setSeed(Date.now() + Math.floor(Math.random() * 10000));
    setCurrentIndex(0);
    setSelectedOption('');
    setNumericInput('');
    setRevealedHintIndex(-1);
    setSubmitted(false);
    setIsCorrect(false);
  };

  const getDifficultyBadge = (d: QuestionDifficulty) => {
    switch (d) {
      case 'Foundation':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Standard':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Advanced':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Challenge':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 space-y-4 sm:space-y-6">
      <GuestBanner user={user || null} onOpenAuth={onOpenAuth || (() => {})} context="practice" />

      {/* Header & Overall Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Balanced Multi-Chapter Question Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Interactive Practice Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Syllabus-wide question registry ensuring balanced topic distribution across all 26 AP SSC chapters.
          </p>
        </div>

        {/* Stats Pill: Clearly separating streak, current session score, and lifetime mastery */}
        <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 p-2 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs sm:text-sm">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>{progress.practiceStats.currentStreak} streak</span>
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <div className="text-xs text-slate-500 font-mono" title="Questions answered correctly in this active session">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{sessionCorrect}/{sessionAttempted}</span> session
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <div className="text-xs text-slate-500 font-mono" title="Total unique syllabus questions mastered">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{progress.practiceStats.correctCount}</span> mastered
          </div>
        </div>
      </div>

      {/* FILTER & SYLLABUS BALANCER CONFIGURATION PANEL */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
            <span>Syllabus &amp; Balanced Distribution Filters</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCoverageStats(!showCoverageStats)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition"
              title="View balanced chapter distribution"
            >
              <PieChart className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Coverage Report</span>
            </button>

            <button
              onClick={handleGenerateFresh}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 rounded-lg border border-indigo-200 dark:border-indigo-800 transition"
              title="Generate a brand new balanced set"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Shuffle Balanced Set</span>
            </button>
          </div>
        </div>

        {/* Compact Filters Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 ${isFilterOpen ? 'block' : 'hidden sm:grid'}`}>
          {/* Class Select */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-indigo-400" />
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                const val = e.target.value === 'all' ? 'all' : (Number(e.target.value) as ClassGrade);
                setSelectedClass(val);
                setSelectedChapterId('all');
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-semibold p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Classes (9 &amp; 10)</option>
              <option value="9">Class 9 (SSC)</option>
              <option value="10">Class 10 (SSC)</option>
            </select>
          </div>

          {/* Semester Select */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Layers className="w-3 h-3 text-indigo-400" />
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => {
                const val = e.target.value === 'all' ? 'all' : (Number(e.target.value) as Semester);
                setSelectedSemester(val);
                setSelectedChapterId('all');
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-semibold p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          {/* Chapter Select */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Chapter
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => {
                setSelectedChapterId(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-semibold p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 truncate"
            >
              <option value="all">Balanced Syllabus ({availableChapters.length} Chapters)</option>
              {availableChapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  Ch {ch.chapterNumber}: {ch.title}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Level Select */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Cognitive Level
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value as 'all' | QuestionDifficulty);
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-semibold p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Levels (1 - 4)</option>
              <option value="Foundation">Level 1 — Foundation</option>
              <option value="Standard">Level 2 — Standard</option>
              <option value="Advanced">Level 3 — Advanced</option>
              <option value="Challenge">Level 4 — Challenge</option>
            </select>
          </div>

          {/* Question Set Size */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Batch Size
            </label>
            <select
              value={questionCount}
              onChange={(e) => {
                setQuestionCount(Number(e.target.value));
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-semibold p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions (Standard)</option>
              <option value={20}>20 Questions</option>
              <option value={26}>26 Questions (1 per Chapter)</option>
            </select>
          </div>
        </div>

        {/* Coverage Statistics Drawer */}
        {showCoverageStats && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5 text-indigo-500" />
                Active Set Chapter Balance:
              </span>
              <span className="text-[11px] text-slate-400">
                {Object.keys(practiceSession.chapterDistribution).length} unique chapters represented
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Object.entries(practiceSession.chapterDistribution).map(([chId, count]) => {
                const meta = chaptersData.find((c) => c.id === chId);
                return (
                  <span
                    key={chId}
                    className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 text-[11px] text-slate-700 dark:text-slate-300"
                  >
                    <strong>{meta ? `Ch ${meta.chapterNumber} (${meta.title})` : chId}:</strong> {count}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Filter Summary Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <span>Active filter:</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            {selectedClass === 'all' ? 'All Classes' : `Class ${selectedClass}`}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            {selectedSemester === 'all' ? 'Both Semesters' : `Sem ${selectedSemester}`}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            {selectedDifficulty === 'all' ? 'All Levels (1-4)' : selectedDifficulty}
          </span>
          <span className="ml-auto text-indigo-600 dark:text-indigo-400 font-bold">
            {questions.length} Balanced Questions
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      {currentQ ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-7 shadow-sm space-y-5">
          {/* Question Header & Meta */}
          <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono font-bold text-slate-400">
                Problem {safeIndex + 1} of {questions.length}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-bold border text-[11px] ${getDifficultyBadge(
                  currentQ.difficulty
                )}`}
              >
                {currentQ.difficulty}
              </span>
              {currentChapterMeta && (
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800">
                  <BookOpen className="w-3 h-3 text-indigo-500" />
                  <span>
                    Class {currentChapterMeta.classGrade} • Ch {currentChapterMeta.chapterNumber}: {currentChapterMeta.title}
                  </span>
                </span>
              )}
              {history?.answered && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-200 dark:border-emerald-800">
                  {history.isCorrect ? 'Solved ✓' : 'Attempted'}
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              {currentQ.type.toUpperCase()}
            </span>
          </div>

          {/* Question Prompt */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.prompt}
            </h2>
            {currentQ.latexPrompt && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl my-2 text-center overflow-x-auto">
                <MathView math={currentQ.latexPrompt} block />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="space-y-3 pt-1">
            {currentQ.type === 'numerical' ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Enter your numerical answer:
                </label>
                <div className="flex items-center gap-2 max-w-xs">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    disabled={submitted}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="e.g. 42 or 3.5"
                    className="w-full text-base font-mono p-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options?.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  const isThisCorrect = String(currentQ.correctAnswer).trim() === opt.trim();
                  return (
                    <button
                      key={i}
                      disabled={submitted}
                      onClick={() => setSelectedOption(opt)}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between ${
                        submitted
                          ? isThisCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                            : isSelected
                            ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                          : isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-100 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{opt}</span>
                      {submitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Guided Hints Drawer */}
          <div className="pt-2">
            {revealedHintIndex >= 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Hints ({revealedHintIndex + 1}/{currentQ.hints.length}):</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-amber-950 dark:text-amber-300 space-y-1 leading-relaxed">
                  {currentQ.hints.slice(0, revealedHintIndex + 1).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {!submitted && revealedHintIndex < currentQ.hints.length - 1 && (
              <button
                onClick={handleRevealNextHint}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {revealedHintIndex === -1 ? 'Need a clue? Reveal Concept Hint 1' : `Reveal Next Hint (${revealedHintIndex + 2})`}
                </span>
              </button>
            )}
          </div>

          {/* Feedback & Comprehensive Mathematical Solution */}
          {submitted && (
            <div
              className={`p-4 rounded-xl border space-y-2.5 text-xs sm:text-sm animate-in fade-in duration-200 ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Correct! Mathematically verified solution:</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>Not quite right. Detailed step-by-step reasoning below:</span>
                  </>
                )}
              </div>

              <div className="pl-7 space-y-2 text-xs sm:text-sm">
                <p className="leading-relaxed font-medium">{currentQ.explanation}</p>

                {currentQ.methodRationale && (
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800/60">
                    <strong>Why this method works: </strong>{currentQ.methodRationale}
                  </p>
                )}

                {currentQ.verificationCheck && (
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800/60">
                    <strong>Substitution / Sanity Check: </strong>{currentQ.verificationCheck}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions Row */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {submitted ? (
              <div className="flex items-center gap-2 w-full justify-between">
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
                >
                  Next Problem
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={currentQ.type === 'numerical' ? !numericInput : !selectedOption}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 disabled:opacity-50 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition self-end"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            No questions match your current filter settings.
          </p>
          <button
            onClick={() => {
              setSelectedClass('all');
              setSelectedSemester('all');
              setSelectedChapterId('all');
              setSelectedDifficulty('all');
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
