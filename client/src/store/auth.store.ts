import { client } from '@/apollo/client';
import type { LoginInput, LogoutInput, RefreshTokenInput, SignupInput } from '@/graphql/auth';
import { LOGIN_MUTATION, LOGOUT_MUTATION, REFRESH_TOKEN_MUTATION, SIGNUP_MUTATION } from '@/graphql/auth';
import type { IAuthUser } from '@/graphql/queries';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const EXPIRES_IN = 12 * 60 * 60 * 1000;

interface AuthState {
  isAuthenticated: boolean;
  user: IAuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: Error | null;
  tokenExpiryTime: number | null;

  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  setError: (error: Error | null) => void;

  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setAccessToken: (token: string) => void;
  clearTokens: () => void;
  hasValidToken: () => boolean;
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
      tokenExpiryTime: null,

      login: async (input: LoginInput) => {
        try {
          set({ loading: true, error: null });
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: { input }
          });
          if (data?.login) {
            const { accessToken, refreshToken, user } = data.login;
            const tokenExpiryTime = Date.now() + EXPIRES_IN;
            set({
              isAuthenticated: true,
              user,
              accessToken,
              refreshToken,
              tokenExpiryTime,
              loading: false
            });
          }
        } catch (err) {
          const error = err instanceof Error ? err : new Error('An error occurred during login');
          set({ error, loading: false });
          throw error;
        }
      },
      signup: async (input: SignupInput) => {
        try {
          set({ loading: true, error: null });
          const { data } = await client.mutate({
            mutation: SIGNUP_MUTATION,
            variables: { input }
          });
          if (data?.signup) {
            const { accessToken, refreshToken, user } = data.signup;
            const tokenExpiryTime = Date.now() + EXPIRES_IN;
            set({
              isAuthenticated: true,
              user,
              accessToken,
              refreshToken,
              tokenExpiryTime,
              loading: false
            });
          }
        } catch (err) {
          const error = err instanceof Error ? err : new Error('An error occurred during signup');
          set({ error, loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null });
          const refreshToken = get().refreshToken;
          if (refreshToken) {
            const input: LogoutInput = { refreshToken };
            await client.mutate({
              mutation: LOGOUT_MUTATION,
              variables: { input }
            });
          }
        } catch (err) {
          const error = err instanceof Error ? err : new Error('An error occurred during logout');
          set({ error, loading: false });
        } finally {
          set({
            isAuthenticated: false,
            user: null,
            accessToken: null,
            refreshToken: null,
            tokenExpiryTime: null,
            loading: false
          });
        }
      },
      setError: (error: Error | null) => set({ error }),
      getAccessToken: () => get().accessToken,
      setAccessToken: (token: string) => {
        const tokenExpiryTime = Date.now() + EXPIRES_IN;
        set({
          accessToken: token,
          tokenExpiryTime,
          isAuthenticated: true
        });
      },

      clearTokens: () => {
        set({
          accessToken: null,
          refreshToken: null,
          tokenExpiryTime: null,
          isAuthenticated: false
        });
      },

      refreshAccessToken: async () => {
        try {
          if (!get().isTokenExpired()) {
            console.log('Token not expired, no need to refresh');
            return true;
          }
          const refreshToken = get().refreshToken;
          if (!refreshToken) {
            console.log('No refresh token found');
            return false;
          }
          const input: RefreshTokenInput = { refreshToken };
          set({ loading: true, error: null });
          const { data } = await client.mutate({
            mutation: REFRESH_TOKEN_MUTATION,
            variables: { input }
          });
          if (data?.refresh_token) {
            const { accessToken, refreshToken } = data.refresh_token;
            const tokenExpiryTime = Date.now() + EXPIRES_IN;
            set({
              isAuthenticated: true,
              accessToken,
              refreshToken,
              tokenExpiryTime,
              loading: false
            });
            console.log('Refreshed access token');
            return true;
          }
          console.log('Failed to refresh access token');
          return false;
        } catch (err) {
          const error = err instanceof Error ? err : new Error('An error occurred during token refresh');
          set({ error, loading: false });
          return false;
        }
      },

      getRefreshToken: () => get().refreshToken,

      isTokenExpired: () => {
        const expiryTime = get().tokenExpiryTime;
        if (!expiryTime) return true;
        return Date.now() >= expiryTime;
      },

      hasValidToken: () => {
        const token = get().accessToken;
        if (!token) return false;
        return !get().isTokenExpired();
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        tokenExpiryTime: state.tokenExpiryTime
      })
    }
  )
);

export const useAuthState = () => {
  const { isAuthenticated, user, accessToken, refreshToken, loading, error, tokenExpiryTime } = useAuthStore();
  return { isAuthenticated, user, accessToken, refreshToken, loading, error, tokenExpiryTime };
};

export const useAuthActions = () => {
  const { login, signup, logout, refreshAccessToken, setError } = useAuthStore();
  return { login, signup, logout, refreshAccessToken, setError };
};

export const useAuthToken = () => {
  const { getAccessToken, getRefreshToken, setAccessToken, clearTokens, hasValidToken, isTokenExpired } = useAuthStore();
  return { getAccessToken, getRefreshToken, setAccessToken, clearTokens, hasValidToken, isTokenExpired };
};
