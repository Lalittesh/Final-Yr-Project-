import axios from 'axios';

// Define base URL for APIs (mock backend endpoint by default)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.metro-compliance.ai/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Inject JWT token into requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Intercept 401 Unauthorized errors to automatically logout or refresh token
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      // Optionally trigger reload or redirect to login page:
      // window.location.href = '/login';
    }
    
    // Customize API error responses for cleaner handling
    const customError = {
      message: error.response?.data?.message || 'An unexpected error occurred. Please try again.',
      status: error.response?.status,
      data: error.response?.data,
    };
    
    return Promise.reject(customError);
  }
);

export default apiClient;
