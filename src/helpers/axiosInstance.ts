import axios from 'axios';
import { store } from '../store/store';
import { setAuthData, clearAuthData } from '../store/authSlice';
import { refreshToken } from '../store/authApi';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const state = store.getState();
      const { refreshToken: token } = state.auth;
      const newTokens = await refreshToken(token);
      if (newTokens) {
        store.dispatch(setAuthData(newTokens));
        axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.accessToken}`;
        return axiosInstance(originalRequest);
      } else {
        store.dispatch(clearAuthData());
        
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
