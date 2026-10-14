import React from 'react';
import { Sparkles, CloudOff } from 'lucide-react';
import type { StudentUser } from '../types/auth';

interface GuestBannerProps {
  user: StudentUser | null;
  onOpenAuth: () => void;
  context?: 'chapters' | 'chapter-view' | 'labs' | 'practice' | 'formulas' | 'progress';
}

export const GuestBanner: React.FC<GuestBannerProps> = ({ user, onOpenAuth, context }) => {
  if (user) return null;

  return (
    <div className="p-3 sm:p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-start sm:items-center gap-3">
        <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5 sm:mt-0">
          <CloudOff className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
              Guest Learning Session (Stored on this Device)
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5 leading-relaxed">
            {context === 'practice' &&
              'Your practice streak and question history are currently saved only in this browser.'}
            {context === 'labs' &&
              'Interactive experiments and slider adjustments are running in guest mode on this device.'}
            {context === 'chapters' &&
              'Chapter completion marks and study milestones are currently stored locally in this browser.'}
            {context === 'chapter-view' &&
              'Your lesson progress, quiz answers, and worked example notes are saved only on this machine.'}
            {context === 'formulas' &&
              'Your pinned formula bookmarks for quick revision are saved only in this browser.'}
            {(!context || context === 'progress') &&
              'Your learning streaks, completed chapters, and saved formulas are saved locally.'}
            {' Create a free student account to sync your progress across phone and laptop.'}
          </p>
        </div>
      </div>
      <button
        onClick={onOpenAuth}
        className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Sign In / Create Account</span>
      </button>
    </div>
  );
};
