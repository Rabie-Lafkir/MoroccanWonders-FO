import axios from 'axios';
import store, { AppDispatch } from '../app/store';
import { refreshToken, logout } from '../features/auth/authSlice';
import { Tokens } from '../features/auth/authTypes';

const API_URL = import.meta.env.VITE_API_URL; 


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const result = await (store.dispatch as AppDispatch)(refreshToken());
        const payload = result.payload as Tokens; 
        if (payload.accessToken) {
          api.defaults.headers.common['Authorization'] = 'Bearer ' + payload.accessToken;
          return api(originalRequest);
        }
      } catch (err) {
        (store.dispatch as AppDispatch)(logout());
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
