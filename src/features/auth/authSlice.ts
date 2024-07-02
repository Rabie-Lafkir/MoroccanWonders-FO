import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, LoginPayload, Tokens } from './authTypes';
import { RootState } from '../../app/store';

const API_URL = import.meta.env.VITE_API_URL; 

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk<Tokens, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/account/login`, { username, password });
      return response.data as Tokens;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const refreshToken = createAsyncThunk<Tokens, void, { state: RootState, rejectValue: string }>(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken: auth.refreshToken });
      return response.data as Tokens;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<Tokens>) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? 'Login failed';
        state.status = 'failed';
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<Tokens>) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload ?? 'Token refresh failed';
        state.accessToken = null;
        state.refreshToken = null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
