import apiClient from '../config/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  country?: 'Nigeria' | 'Ghana' | 'Kenya' | 'South Africa' | 'Other';
  phoneNumber?: string;
  acceptTerms: boolean;
  role?: string;
}

/**
 * Shape of `errors` returned by the backend's express-validator middleware.
 */
export interface BackendValidationError {
  field: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber?: string;
  isPhoneVerified?: boolean;
  isEmailVerified: boolean;
  status?: string;
  dateOfBirth?: string;
  gender?: string;
  country?: string;
  profilePicture?: string;
  acceptedTermsAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      if (response.status === 200 && response.data.success) {
        const { user, tokens } = response.data.data;
        
        // Store tokens and user data
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        return user;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      // Backend (express-validator) quirks:
      //  - `acceptTerms` is checked with .equals('true') so we MUST send the
      //    string "true", not the boolean true.
      //  - `phoneNumber` must match the Nigerian regex if present, so we
      //    strip it entirely when blank.
      //  - `country` is optional; only send it if the user picked one.
      const payload: Record<string, unknown> = {
        ...data,
        acceptTerms: data.acceptTerms ? 'true' : 'false',
      };
      if (!data.phoneNumber || !data.phoneNumber.trim()) delete payload.phoneNumber;
      if (!data.country) delete payload.country;

      const response = await apiClient.post<AuthResponse>('/auth/register', payload);

      if (response.status === 201 && response.data.success) {
        const { user, tokens } = response.data.data;

        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        return user;
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      const data = error.response?.data;
      // Surface per-field express-validator errors as a readable message so the
      // UI can show e.g. "Password must contain at least one special character"
      // instead of the generic "Validation failed".
      const fieldErrors: BackendValidationError[] | undefined = data?.errors;
      let message = data?.message || error.message || 'Registration failed';
      if (Array.isArray(fieldErrors) && fieldErrors.length) {
        message = fieldErrors.map(e => e.message).join('\n');
      }
      const err = new Error(message) as Error & { fieldErrors?: BackendValidationError[] };
      err.fieldErrors = fieldErrors;
      throw err;
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate tokens on server
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      // Continue with logout even if server call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      return null;
    }
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Fetch a fresh copy of the authenticated user's profile from the server
   * and update the cached copy in localStorage. Returns null if the request
   * fails (e.g. token expired and refresh also failed).
   */
  async fetchMe(): Promise<User | null> {
    try {
      const response = await apiClient.get('/users/me');
      const user: User | undefined = response.data?.data?.user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      return null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await apiClient.post('/auth/forgot-password', { email });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to send reset email');
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const response = await apiClient.post('/auth/reset-password', { token, password });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to reset password');
    }
  }

  /**
   * Exchange a Clerk-authenticated user for a MentWel backend JWT pair so the
   * rest of the app's API calls work seamlessly after social login.
   */
  async syncClerkUser(payload: {
    clerkUserId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
  }): Promise<User> {
    const response = await apiClient.post<AuthResponse>('/auth/clerk-sync', payload);
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Clerk sync failed');
    }
    const { user, tokens } = response.data.data;
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
}

export default new AuthService();
