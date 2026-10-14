import React, { useState, useEffect } from 'react';
import { Search, Compass, CheckCircle, Sun, Moon, User as UserIcon, LogOut } from 'lucide-react';
import type { UserProgress } from '../types/progress';
import type { StudentUser } from '../types/auth';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedClass: 9 | 10 | null;
  setSelectedClass: (grade: 9 | 10 | null) => void;
  onOpenSearch: () => void;
  progress: UserProgress;
  user: StudentUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedClass,
  setSelectedClass,
  onOpenSearch,
  progress,
  user,
  onOpenAuth,
  onLogout,
}) => {
  const completedCount = progress.completedChapterIds.length;
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mathverse_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('mathverse_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('mathverse_theme', 'light');
      }
    } catch (e) {
      console.warn('Error setting theme:', e);
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Primary Row */}
        <div className="h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  MATHVERSE
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                  AP SSC
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5">
                Classes 9 &amp; 10 Mathematics
              </p>
            </div>
          </div>

          {/* Desktop Grade Selector (Hidden on Mobile & Tablet) */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold shrink-0">
            <button
              onClick={() => setSelectedClass(null)}
              className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${
                selectedClass === null
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedClass(9)}
              className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${
                selectedClass === 9
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Class 9
            </button>
            <button
              onClick={() => setSelectedClass(10)}
              className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${
                selectedClass === 10
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Class 10
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'chapters'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Chapters
            </button>
            <button
              onClick={() => setActiveTab('labs')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'labs'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Interactive Labs
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'formulas'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Formula Library
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'practice'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Practice Studio
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'resources'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Textbooks &amp; Blueprint
            </button>
          </nav>

          {/* Right Tools: Search, Theme Toggle, Progress, & Account */}
          <div className="flex items-center gap-1.5 sm:gap-2 relative">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs transition hover:border-indigo-300"
              title="Search topics and formulas (Ctrl + K)"
              aria-label="Search topics and formulas"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search math...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Progress Pill */}
            <button
              onClick={() => setActiveTab('progress')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition"
              title="Learning Progress"
              aria-label="Learning progress"
            >
              <CheckCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{completedCount}</span>
              <span className="hidden sm:inline">done</span>
            </button>

            {/* Account / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition"
                  title={`${user.name} (Class ${user.classGrade})`}
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[11px] font-extrabold uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline max-w-[90px] truncate">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-white truncate">{user.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                      <div className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        Class {user.classGrade} Student
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('progress')}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-500" />
                      View Analytics &amp; Saved
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition flex items-center gap-2 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                title="Sign in to save and sync progress"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dedicated Second Row: Grade Segmented Bar */}
        <div className="lg:hidden pb-2.5 pt-0.5">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedClass(null)}
              className={`flex-1 py-1.5 px-2 text-center whitespace-nowrap rounded-lg transition min-h-[34px] flex items-center justify-center ${
                selectedClass === null
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All Grades
            </button>
            <button
              onClick={() => setSelectedClass(9)}
              className={`flex-1 py-1.5 px-2 text-center whitespace-nowrap rounded-lg transition min-h-[34px] flex items-center justify-center ${
                selectedClass === 9
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Class 9
            </button>
            <button
              onClick={() => setSelectedClass(10)}
              className={`flex-1 py-1.5 px-2 text-center whitespace-nowrap rounded-lg transition min-h-[34px] flex items-center justify-center ${
                selectedClass === 10
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Class 10
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
