import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  userId: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('accessToken', action.payload.accessToken!);
      localStorage.setItem('refreshToken', action.payload.refreshToken!);
    },
    clearAuthData: (state) => {
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
