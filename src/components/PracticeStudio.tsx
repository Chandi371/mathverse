import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MathView } from './MathView';
import { chaptersData } from '../data/curriculumData';
import { CheckCircle2, XCircle, HelpCircle, Flame, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import type { PracticeQuestion } from '../types/curriculum';
import type { UserProgress } from '../types/progress';

interface PracticeStudioProps {
  progress: UserProgress;
  onRecordAnswer: (questionId: string, isCorrect: boolean) => void;
}

export const PracticeStudio: React.FC<PracticeStudioProps> = ({ progress, onRecordAnswer }) => {
  // Aggregate all questions across chapters
  const allQuestions: PracticeQuestion[] = chaptersData.flatMap((ch) => ch.practiceQuestions);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [numericInput, setNumericInput] = useState<string>('');
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(-1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentQ = allQuestions[currentIndex] || allQuestions[0];
  const history = progress.questionHistory[currentQ.id];

  const handleRevealNextHint = () => {
    if (revealedHintIndex < currentQ.hints.length - 1) {
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
    onRecordAnswer(currentQ.id, correct);

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleNextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % allQuestions.length);
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      {/* Header and Streaks */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300">
            Active Problem Solving
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Interactive Practice Studio
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Solve, diagnose errors, and verify with step-by-step mathematical reasoning.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm self-start sm:self-auto">
          <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>{progress.practiceStats.currentStreak} streak</span>
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <div className="text-xs text-slate-500 font-mono">
            {progress.practiceStats.correctCount} / {progress.practiceStats.totalAttempted} solved
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6">
        {/* Question Header & Meta */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-400">
              Question {currentIndex + 1} of {allQuestions.length}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-semibold ${
                currentQ.difficulty === 'Foundation'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                  : currentQ.difficulty === 'Standard'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
              }`}
            >
              {currentQ.difficulty}
            </span>
            {history?.answered && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                {history.isCorrect ? 'Previously Solved ✓' : 'Previously Attempted'}
              </span>
            )}
          </div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            {currentQ.type.toUpperCase()}
          </span>
        </div>

        {/* Question Prompt */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.prompt}
          </h2>
          {currentQ.latexPrompt && (
            <div className="p-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl my-2">
              <MathView math={currentQ.latexPrompt} block />
            </div>
          )}
        </div>

        {/* Input area based on Question Type */}
        <div className="space-y-3 pt-2">
          {currentQ.type === 'numerical' ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Enter your numerical answer:
              </label>
              <div className="flex items-center gap-2 max-w-xs">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  disabled={submitted}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="e.g. 47"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options?.map((opt, i) => {
                const isSelected = selectedOption === opt;
                let optionStyle = 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100';

                if (isSelected) {
                  optionStyle = 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/70 text-indigo-950 dark:text-white font-semibold';
                }

                if (submitted) {
                  if (opt === String(currentQ.correctAnswer)) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={submitted}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between text-sm ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 ml-2">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Hints Drawer */}
        <div className="pt-2">
          {revealedHintIndex >= 0 && (
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-2 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Hints Revealed ({revealedHintIndex + 1}/{currentQ.hints.length}):</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-amber-950 dark:text-amber-300 space-y-1">
                {currentQ.hints.slice(0, revealedHintIndex + 1).map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {!submitted && revealedHintIndex < currentQ.hints.length - 1 && (
            <button
              onClick={handleRevealNextHint}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Need a clue? Reveal hint {revealedHintIndex + 2}
            </button>
          )}
        </div>

        {/* Feedback & Mathematical Explanation */}
        {submitted && (
          <div
            className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Brilliant! Mathematically Correct.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Not quite right. Review the explanation below:</span>
                </>
              )}
            </div>
            <p className="leading-relaxed pl-7 text-xs sm:text-sm opacity-90">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Actions Row */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {submitted ? (
            <div className="flex items-center gap-2 w-full justify-between">
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Retry
              </button>
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
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
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
