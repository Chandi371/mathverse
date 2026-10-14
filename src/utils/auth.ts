import type { StudentUser, AuthResponse } from '../types/auth';

const TOKEN_KEY = 'mathverse_auth_token_v1';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (err) {
    console.error('Failed to update auth token in localStorage:', err);
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(path, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    const error: any = new Error(data.error || `Request failed with status ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data as T;
}

export async function registerStudent(
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
  classGrade: 9 | 10
): Promise<AuthResponse> {
  return await apiFetch<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password, confirmPassword, classGrade }),
  });
}

export async function verifyEmail(
  email: string,
  code: string
): Promise<{ user: StudentUser; token: string; progress: any }> {
  const data = await apiFetch<AuthResponse>('/api/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
  if (data.token) {
    setStoredToken(data.token);
  }
  return {
    user: data.user!,
    token: data.token!,
    progress: data.progress,
  };
}

export async function resendVerificationCode(email: string): Promise<AuthResponse> {
  return await apiFetch<AuthResponse>('/api/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function loginStudent(
  email: string,
  password: string
): Promise<{ user: StudentUser; token: string; progress: any }> {
  const data = await apiFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    setStoredToken(data.token);
  }
  return {
    user: data.user!,
    token: data.token!,
    progress: data.progress,
  };
}

export async function fetchCurrentStudent(): Promise<{ user: StudentUser; progress: any } | null> {
  const token = getStoredToken();
  if (!token) return null;
  try {
    const data = await apiFetch<{ user: StudentUser; progress: any }>('/api/auth/me');
    return data;
  } catch (err) {
    console.warn('Session expired or invalid, reverting to guest mode.', err);
    setStoredToken(null);
    return null;
  }
}

export async function logoutStudent(): Promise<void> {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } catch (err) {
    console.warn('Error during logout request:', err);
  } finally {
    setStoredToken(null);
  }
}

export async function requestPasswordReset(
  email: string
): Promise<{ success: boolean; message: string; sandboxResetCode?: string }> {
  return await apiFetch<{ success: boolean; message: string; sandboxResetCode?: string }>(
    '/api/auth/request-password-reset',
    {
      method: 'POST',
      body: JSON.stringify({ email }),
    }
  );
}

export async function submitPasswordReset(
  token: string,
  newPassword: string,
  confirmNewPassword: string
): Promise<{ success: boolean; message: string }> {
  return await apiFetch<{ success: boolean; message: string }>(
    '/api/auth/reset-password',
    {
      method: 'POST',
      body: JSON.stringify({ token, newPassword, confirmNewPassword }),
    }
  );
}

export async function fetchCommunityStats(): Promise<{
  totalQuestionsSolvedCommunity: number;
  activeStudentCommunity: number;
}> {
  try {
    return await apiFetch<{ totalQuestionsSolvedCommunity: number; activeStudentCommunity: number }>(
      '/api/stats/global'
    );
  } catch {
    return {
      totalQuestionsSolvedCommunity: 348,
      activeStudentCommunity: 42,
    };
  }
}
