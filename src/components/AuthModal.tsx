import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  Mail,
  Lock,
  GraduationCap,
  ArrowRight,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  registerStudent,
  loginStudent,
  submitPasswordReset,
} from '../utils/auth';
import { setActiveStudentId, saveProgress, defaultProgress } from '../utils/storage';
import type { StudentUser } from '../types/auth';
import type { UserProgress } from '../types/progress';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: StudentUser, progress: UserProgress) => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [classGrade, setClassGrade] = useState<9 | 10>(10);

  // Password reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetMessages = () => {
    setError(null);
    setInfoMessage(null);
  };

  const handleSwitchMode = (newMode: AuthMode) => {
    resetMessages();
    setMode(newMode);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();
    try {
      const { user, progress } = await loginStudent(email, password);
      setActiveStudentId(user.id);
      const userProg = progress || defaultProgress;
      saveProgress(userProg);
      onAuthSuccess(user, userProg);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please ensure both passwords are identical.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerStudent(email, username, password, confirmPassword, classGrade);
      if (res.user && res.token) {
        setActiveStudentId(res.user.id);
        const userProg = res.progress || defaultProgress;
        saveProgress(userProg);
        onAuthSuccess(res.user, userProg);
        onClose();
      } else {
        setInfoMessage(res.message || 'Account created! You can now sign in.');
        setMode('login');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try a different email or username.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match. Please verify both password fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitPasswordReset(email, newPassword, confirmNewPassword);
      setInfoMessage(res.message || 'Password reset successfully! You can now log in.');
      setMode('login');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Password reset failed. Please check your registered email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Top Header */}
        <div className="relative p-5 pb-4 bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-transparent border-b border-slate-100 dark:border-slate-800/80">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Student Cloud Account
            </span>
          </div>

          <h2 id="auth-modal-title" className="text-xl font-extrabold text-slate-900 dark:text-white">
            {mode === 'login' && 'Sign in to MATHVERSE'}
            {mode === 'register' && 'Create your Student Account'}
            {mode === 'forgot' && 'Reset your Password'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {mode === 'login' && 'Access your personal streaks, bookmarks, and syllabus completion.'}
            {mode === 'register' && 'Instant access to formulas, quizzes, and personal progress tracking.'}
            {mode === 'forgot' && 'Enter your registered email and choose a new password.'}
          </p>

          {/* Mode Switch Tabs */}
          {(mode === 'login' || mode === 'register') && (
            <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl mt-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className={`flex-1 py-1.5 rounded-lg transition text-center cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleSwitchMode('register')}
                className={`flex-1 py-1.5 rounded-lg transition text-center cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-600 dark:text-indigo-400 flex items-start gap-2 animate-in fade-in">
              <Check className="w-4 h-4 shrink-0 mt-0.5 text-indigo-600" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('forgot')}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Signing In...' : 'Sign In'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* 2. REGISTRATION FORM (Instant direct account creation) */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name / Student Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Class / Grade
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setClassGrade(9)}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                      classGrade === 9
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" /> Class 9
                  </button>
                  <button
                    type="button"
                    onClick={() => setClassGrade(10)}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                      classGrade === 10
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" /> Class 10
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </label>
                  {confirmPassword && (
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        password === confirmPassword ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {password === confirmPassword ? (
                        <>
                          <Check className="w-3 h-3" /> Passwords match
                        </>
                      ) : (
                        'Does not match'
                      )}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-rose-400 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (confirmPassword.length > 0 && password !== confirmPassword)}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Creating Account...' : 'Create Account & Start Learning'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* 3. FORGOT PASSWORD FORM (Direct password reset by email) */}
          {mode === 'forgot' && (
            <form onSubmit={handleResetSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  New Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Confirm New Password
                  </label>
                  {confirmNewPassword && (
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        newPassword === confirmNewPassword ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {newPassword === confirmNewPassword ? (
                        <>
                          <Check className="w-3 h-3" /> Passwords match
                        </>
                      ) : (
                        'Does not match'
                      )}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 ${
                      confirmNewPassword && newPassword !== confirmNewPassword
                        ? 'border-rose-400 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (confirmNewPassword.length > 0 && newPassword !== confirmNewPassword)}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Updating Password...' : 'Save New Password & Sign In'}
                {!loading && <KeyRound className="w-4 h-4" />}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className="text-xs text-slate-500 hover:text-indigo-600 font-semibold cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Cloud Sync Footer */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
            Cloud Sync: Your streak, practice test records, and progress are saved automatically.
          </div>
        </div>
      </div>
    </div>
  );
};
