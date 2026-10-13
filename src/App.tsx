import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { ChapterListView } from './components/ChapterListView';
import { ChapterView } from './components/ChapterView';
import { LabHubView } from './components/LabHubView';
import { FormulaLibrary } from './components/FormulaLibrary';
import { PracticeStudio } from './components/PracticeStudio';
import { ProgressDashboard } from './components/ProgressDashboard';
import { SearchModal } from './components/SearchModal';
import { chaptersData } from './data/curriculumData';
import {
  loadProgress,
  recordQuestionAnswer,
  toggleChapterCompleted,
  toggleBookmarkFormula,
  setLastVisitedChapter,
  resetAllProgress,
} from './utils/storage';
import type { UserProgress } from './types/progress';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedClass, setSelectedClass] = useState<9 | 10 | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string>('c10-s1-ap');
  const [activeLabId, setActiveLabId] = useState<string>('area-model');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgress>(loadProgress());

  useEffect(() => {
    // Sync progress on load
    setProgress(loadProgress());
  }, []);

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setActiveTab('chapter-view');
    setLastVisitedChapter(chapterId);
    setProgress(loadProgress());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLab = (labId: string) => {
    setActiveLabId(labId);
    setActiveTab('labs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFormula = (_formulaId: string) => {
    setActiveTab('formulas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        setActiveTab={setActiveTab}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        onOpenSearch={() => setIsSearchOpen(true)}
        progress={progress}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pb-24 lg:pb-8">
        {activeTab === 'home' && (
          <HomeView
            onSelectChapter={handleSelectChapter}
            onOpenLab={handleOpenLab}
            onNavigateTab={setActiveTab}
            selectedClass={selectedClass}
          />
        )}

        {activeTab === 'chapters' && (
          <ChapterListView
            onSelectChapter={handleSelectChapter}
            selectedClass={selectedClass}
            progress={progress}
          />
        )}

        {activeTab === 'chapter-view' && (
          <ChapterView
            chapter={detailedChapter}
            onBack={() => setActiveTab('chapters')}
            progress={progress}
            onToggleComplete={handleToggleComplete}
            onRecordAnswer={handleRecordAnswer}
          />
        )}

        {activeTab === 'labs' && <LabHubView initialLabId={activeLabId} />}

        {activeTab === 'formulas' && (
          <FormulaLibrary
            onOpenLab={handleOpenLab}
            bookmarkedIds={progress.bookmarkedFormulaIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeStudio
            progress={progress}
            onRecordAnswer={handleRecordAnswer}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard
            progress={progress}
            onResetProgress={handleResetProgress}
            onSelectChapter={handleSelectChapter}
            onSelectFormula={handleSelectFormula}
          />
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChapter={handleSelectChapter}
        onSelectFormula={handleSelectFormula}
        onSelectLab={handleOpenLab}
      />

      {/* Mobile-First Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
