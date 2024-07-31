import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types/User';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const API_URL = import.meta.env.VITE_API_URL;
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('accessToken', action.payload.accessToken!);
      localStorage.setItem('refreshToken', action.payload.refreshToken!);
      localStorage.setItem('user', JSON.stringify(action.payload.user)!);
    },
    clearAuthData: (state) => {
      const accessToken = state.accessToken;
      if (accessToken) {
        axios.delete(`${API_URL}/account/logout`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).catch(error => {
          console.error('Error during logout:', error);
        });
      }

      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  },
});

export const { setAuthData, clearAuthData, updateUser } = authSlice.actions;
export default authSlice.reducer;
