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
  gender: 'male' | 'female' | 'other';
  country: string;
  phoneNumber?: string;
  acceptTerms: boolean;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber?: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  status: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  acceptedTermsAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  access: {
    token: string;
    expiresIn: string;
  };
  refresh: {
    token: string;
    expiresIn: string;
  };
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await apiClient.post<AuthResponse>('/v1/auth/login', credentials);
      
      if (response.status === 200 && response.data.success) {
        const { user, tokens } = response.data.data;
        
        // Store tokens and user data
        localStorage.setItem('accessToken', tokens.access.token);
        localStorage.setItem('refreshToken', tokens.refresh.token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return user;
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      const response = await apiClient.post<AuthResponse>('/v1/auth/register', data);
      
      if (response.status === 201 && response.data.success) {
        const { user, tokens } = response.data.data;
        
        // Store tokens and user data
        localStorage.setItem('accessToken', tokens.access.token);
        localStorage.setItem('refreshToken', tokens.refresh.token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return user;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    }
  }

  async logout(): Promise<void> {
    try {
      // Optional: Call logout endpoint to invalidate tokens on server
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiClient.post('/v1/auth/logout', { refreshToken });
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
}

export default new AuthService();
