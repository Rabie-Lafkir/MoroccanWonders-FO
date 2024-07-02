export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  export interface LoginPayload {
    username: string;
    password: string;
  }
  
  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }
  