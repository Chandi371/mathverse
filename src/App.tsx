import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { ChapterListView } from './components/ChapterListView';
import { ChapterView } from './components/ChapterView';
import { LabHubView } from './components/LabHubView';
import { FormulaLibrary } from './components/FormulaLibrary';
import { PracticeStudio } from './components/PracticeStudio';
import { ProgressDashboard } from './components/ProgressDashboard';
import { ResourceLibraryView } from './components/ResourceLibraryView';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { chaptersData } from './data/curriculumData';
import {
  loadProgress,
  recordQuestionAnswer,
  toggleChapterCompleted,
  toggleBookmarkFormula,
  setLastVisitedChapter,
  resetAllProgress,
  setActiveStudentId,
  saveProgress,
  mergeUserProgress,
} from './utils/storage';
import { fetchCurrentStudent, logoutStudent } from './utils/auth';
import {
  parseUrlToState,
  formatStateToUrl,
  areStatesEqual,
  type RouteState,
} from './utils/router';
import type { UserProgress } from './types/progress';
import type { StudentUser } from './types/auth';

export function App() {
  // Parse initial state from browser address bar / hash
  const initialRoute = parseUrlToState(
    typeof window !== 'undefined' ? window.location.pathname : '/',
    typeof window !== 'undefined' ? window.location.search : '',
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  const [activeTab, setActiveTab] = useState<string>(initialRoute.tab || 'home');
  const [selectedClass, setSelectedClass] = useState<9 | 10 | null>(initialRoute.selectedClass ?? null);
  const [activeChapterId, setActiveChapterId] = useState<string>(initialRoute.chapterId || 'c10-s1-ap');
  const [activeLabId, setActiveLabId] = useState<string>(initialRoute.labId || 'area-model');
  const [activeFormulaId, setActiveFormulaId] = useState<string | null>(initialRoute.formulaId ?? null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Authentication & Per-Student Session State
  const [user, setUser] = useState<StudentUser | null>(null);
  const [progress, setProgress] = useState<UserProgress>(loadProgress());

  // Restore authenticated session on load with strict account isolation
  useEffect(() => {
    let isMounted = true;
    fetchCurrentStudent().then((result) => {
      if (!isMounted) return;
      if (result && result.user) {
        setUser(result.user);
        setActiveStudentId(result.user.id);
        const localProg = loadProgress();
        const mergedProg = mergeUserProgress(result.progress, localProg);
        saveProgress(mergedProg);
        setProgress(mergedProg);
      } else {
        setActiveStudentId(null);
        setProgress(loadProgress());
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Universal Navigation helper that pushes or replaces history state
  const navigateTo = useCallback(
    (next: Partial<RouteState>, replace = false) => {
      const currentFull: RouteState = {
        tab: activeTab,
        chapterId: activeChapterId,
        labId: activeLabId,
        formulaId: activeFormulaId,
        selectedClass,
        modal: isSearchOpen ? 'search' : isAuthModalOpen ? 'auth' : null,
      };

      const fullState: RouteState = {
        tab: next.tab ?? currentFull.tab,
        chapterId: next.chapterId !== undefined ? next.chapterId : currentFull.chapterId,
        labId: next.labId !== undefined ? next.labId : currentFull.labId,
        formulaId: next.formulaId !== undefined ? next.formulaId : currentFull.formulaId,
        selectedClass: next.selectedClass !== undefined ? next.selectedClass : currentFull.selectedClass,
        modal: next.modal !== undefined ? next.modal : currentFull.modal,
      };

      // If state is completely identical, skip pushing duplicate history entries
      if (areStatesEqual(currentFull, fullState) && !replace) {
        return;
      }

      const nextIndex = replace ? historyIndex : historyIndex + 1;
      const historyState: RouteState = { ...fullState, historyIndex: nextIndex };
      const targetUrl = formatStateToUrl(fullState);

      try {
        if (replace) {
          window.history.replaceState(historyState, '', targetUrl);
        } else {
          window.history.pushState(historyState, '', targetUrl);
          setHistoryIndex(nextIndex);
        }
      } catch (err) {
        console.warn('[ROUTER] Push/replaceState warning:', err);
      }

      // Update state
      if (fullState.tab !== activeTab) setActiveTab(fullState.tab);
      if (fullState.chapterId && fullState.chapterId !== activeChapterId) setActiveChapterId(fullState.chapterId);
      if (fullState.labId && fullState.labId !== activeLabId) setActiveLabId(fullState.labId);
      if (fullState.formulaId !== activeFormulaId) setActiveFormulaId(fullState.formulaId ?? null);
      if (fullState.selectedClass !== selectedClass) setSelectedClass(fullState.selectedClass ?? null);
      setIsSearchOpen(fullState.modal === 'search');
      setIsAuthModalOpen(fullState.modal === 'auth');
    },
    [
      activeTab,
      activeChapterId,
      activeLabId,
      activeFormulaId,
      selectedClass,
      isSearchOpen,
      isAuthModalOpen,
      historyIndex,
    ]
  );

  // Synchronize browser forward/backward navigation (popstate)
  useEffect(() => {
    // Replace initial entry so browser history has historyIndex: 0 and current state
    const initial = parseUrlToState(window.location.pathname, window.location.search, window.location.hash);
    const initialStateWithIdx: RouteState = {
      ...initial,
      chapterId: initial.chapterId || activeChapterId,
      labId: initial.labId || activeLabId,
      historyIndex: 0,
    };
    try {
      window.history.replaceState(initialStateWithIdx, '', formatStateToUrl(initialStateWithIdx));
    } catch (e) {
      console.warn('[ROUTER] Initial replaceState warning:', e);
    }

    const handlePopState = (event: PopStateEvent) => {
      let nextState: RouteState;
      if (event.state && typeof event.state === 'object' && event.state.tab) {
        nextState = event.state as RouteState;
      } else {
        nextState = parseUrlToState(window.location.pathname, window.location.search, window.location.hash);
      }

      setActiveTab(nextState.tab || 'home');
      if (nextState.chapterId) setActiveChapterId(nextState.chapterId);
      if (nextState.labId) setActiveLabId(nextState.labId);
      setActiveFormulaId(nextState.formulaId ?? null);
      setSelectedClass(nextState.selectedClass ?? null);
      setIsSearchOpen(nextState.modal === 'search');
      setIsAuthModalOpen(nextState.modal === 'auth');

      if (typeof nextState.historyIndex === 'number') {
        setHistoryIndex(nextState.historyIndex);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activeChapterId, activeLabId]);

  const handleTabChange = (tab: string) => {
    const fromModal = isSearchOpen || isAuthModalOpen || window.history.state?.modal;
    navigateTo({ tab, modal: null }, Boolean(fromModal));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectClass = (cls: 9 | 10 | null) => {
    navigateTo({ selectedClass: cls });
  };

  const handleSelectChapter = (chapterId: string) => {
    const fromModal = isSearchOpen || isAuthModalOpen || window.history.state?.modal;
    navigateTo({ tab: 'chapter-view', chapterId, modal: null }, Boolean(fromModal));
    setLastVisitedChapter(chapterId);
    setProgress(loadProgress());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromChapter = () => {
    if (historyIndex > 0) {
      window.history.back();
    } else {
      navigateTo({ tab: 'chapters', selectedClass, modal: null });
    }
  };

  const handleOpenLab = (labId: string) => {
    const fromModal = isSearchOpen || isAuthModalOpen || window.history.state?.modal;
    navigateTo({ tab: 'labs', labId, modal: null }, Boolean(fromModal));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFormula = (formulaId: string) => {
    const fromModal = isSearchOpen || isAuthModalOpen || window.history.state?.modal;
    navigateTo({ tab: 'formulas', formulaId, modal: null }, Boolean(fromModal));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSearch = () => {
    navigateTo({ modal: 'search' });
  };

  const handleCloseSearch = () => {
    if (window.history.state?.modal === 'search') {
      window.history.back();
    } else {
      setIsSearchOpen(false);
    }
  };

  const handleOpenAuth = () => {
    navigateTo({ modal: 'auth' });
  };

  const handleCloseAuth = () => {
    if (window.history.state?.modal === 'auth') {
      window.history.back();
    } else {
      setIsAuthModalOpen(false);
    }
  };

  const handleAuthSuccess = (authenticatedUser: StudentUser, updatedProgress: UserProgress) => {
    setUser(authenticatedUser);
    setActiveStudentId(authenticatedUser.id);
    const localProg = loadProgress();
    const mergedProg = mergeUserProgress(updatedProgress, localProg);
    saveProgress(mergedProg);
    setProgress(mergedProg);
    handleCloseAuth();
  };

  const handleLogout = async () => {
    await logoutStudent();
    setUser(null);
    setActiveStudentId(null);
    const guestFresh = loadProgress();
    setProgress(guestFresh);
  };

  const handleToggleComplete = (chapterId: string) => {
    const updated = toggleChapterCompleted(chapterId);
    setProgress(updated);
  };

  const handleToggleBookmark = (formulaId: string) => {
    const updated = toggleBookmarkFormula(formulaId);
    setProgress(updated);
  };

  const handleRecordAnswer = (questionId: string, isCorrect: boolean) => {
    const updated = recordQuestionAnswer(questionId, isCorrect);
    setProgress(updated);
  };

  const handleResetProgress = () => {
    const updated = resetAllProgress();
    setProgress(updated);
  };

  // Find detailed chapter object or fallback
  const detailedChapter =
    chaptersData.find((ch) => ch.id === activeChapterId) ||
    chaptersData.find((ch) => ch.id === 'c10-s1-ap')!;

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        selectedClass={selectedClass}
        setSelectedClass={handleSelectClass}
        onOpenSearch={handleOpenSearch}
        progress={progress}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pb-24 lg:pb-8">
        {activeTab === 'home' && (
          <HomeView
            onSelectChapter={handleSelectChapter}
            onOpenLab={handleOpenLab}
            onNavigateTab={handleTabChange}
            selectedClass={selectedClass}
          />
        )}

        {activeTab === 'chapters' && (
          <ChapterListView
            onSelectChapter={handleSelectChapter}
            selectedClass={selectedClass}
            progress={progress}
            user={user}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'chapter-view' && (
          <ChapterView
            chapter={detailedChapter}
            onBack={handleBackFromChapter}
            progress={progress}
            onToggleComplete={handleToggleComplete}
            onRecordAnswer={handleRecordAnswer}
            user={user}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'labs' && (
          <LabHubView
            initialLabId={activeLabId}
            user={user}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'formulas' && (
          <FormulaLibrary
            onOpenLab={handleOpenLab}
            bookmarkedIds={progress.bookmarkedFormulaIds}
            onToggleBookmark={handleToggleBookmark}
            user={user}
            onOpenAuth={handleOpenAuth}
            initialFormulaId={activeFormulaId}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeStudio
            progress={progress}
            onRecordAnswer={handleRecordAnswer}
            user={user}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'resources' && (
          <ResourceLibraryView
            selectedClassFilter={selectedClass}
            onSelectClassFilter={handleSelectClass}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard
            progress={progress}
            user={user}
            onOpenAuth={handleOpenAuth}
            onResetProgress={handleResetProgress}
            onSelectChapter={handleSelectChapter}
            onSelectFormula={handleSelectFormula}
          />
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        onSelectChapter={handleSelectChapter}
        onSelectFormula={handleSelectFormula}
        onSelectLab={handleOpenLab}
        onNavigateTab={handleTabChange}
      />

      {/* Student Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuth}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Mobile-First Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
}

export default App;
