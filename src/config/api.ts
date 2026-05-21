import axios from 'axios';

/**
 * API base URL.
 * - In local dev defaults to http://localhost:5000/api/v1
 * - In production set VITE_API_URL in your hosting provider (e.g. Netlify) to
 *   the deployed backend's /api/v1 URL.
 *
 * Note: this value MUST already include the API version segment (/v1) so we
 * never call `/v1/v1/...` by accident.
 */
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'
).replace(/\/$/, '');

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 30000, // 30 second timeout for slow connections
});

// Request interceptor to attach the access token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh on the refresh-token endpoint itself
    const isRefreshCall = originalRequest?.url?.includes('/auth/refresh-token');

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await apiClient.post('/auth/refresh-token', { refreshToken });

        if (response.status === 200 && response.data?.success) {
          // Backend returns { data: { accessToken, expiresIn } }
          const newAccessToken =
            response.data.data?.accessToken ||
            response.data.data?.tokens?.access?.token;
          if (!newAccessToken) throw new Error('No access token in refresh response');

          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        // Avoid hard navigation loop if we're already on /login
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
