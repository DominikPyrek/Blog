import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// Store auth functions reference
let authFunctions: {
  getAccessToken: () => string | null;
  logout: () => void;
} | null = null;

// Initialize auth functions
export const configureApi = (auth: {
  getAccessToken: () => string | null;
  logout: () => void;
}) => {
  authFunctions = auth;
};

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor with correct typing
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (authFunctions) {
      const token = authFunctions.getAccessToken();
      if (token) {
        // Properly typed headers assignment
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry && authFunctions) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post('/api/token/refresh/');
        const newAccessToken = refreshResponse.data.access;
        
        // Update auth context
        authFunctions.getAccessToken = () => newAccessToken;
        
        // Retry original request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        authFunctions.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;