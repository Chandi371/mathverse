export interface StudentUser {
  id: string;
  email: string;
  name: string;
  classGrade: 9 | 10;
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
  resetToken?: string;
}

export interface GlobalCommunityStats {
  totalQuestionsSolvedCommunity: number;
  activeStudentCommunity: number;
}
