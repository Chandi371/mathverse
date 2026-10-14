export interface StudentUser {
  id: string;
  email: string;
  username: string;
  name: string;
  classGrade: 9 | 10;
  emailVerified: boolean;
  createdAt: number;
}

export interface AuthState {
  user: StudentUser | null;
  token: string | null;
  isLoading: boolean;
  isGuest: boolean;
}

export interface AuthResponse {
  user?: StudentUser;
  token?: string;
  progress?: any;
  error?: string;
  message?: string;
  requiresVerification?: boolean;
  email?: string;
  emailServiceConfigured?: boolean;
  sandboxVerificationCode?: string;
  sandboxResetCode?: string;
}

export interface GlobalCommunityStats {
  totalQuestionsSolvedCommunity: number;
  activeStudentCommunity: number;
}
