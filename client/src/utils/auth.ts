import { useAuthStore } from '@/store/auth.store';

export const getAccessToken = (): string | null => {
  return useAuthStore.getState().getAccessToken();
};

export const isAuthenticated = (): boolean => {
  return useAuthStore.getState().hasValidToken();
};

export const getCurrentUser = () => {
  return useAuthStore.getState().user;
};

export const setAccessToken = (token: string): void => {
  useAuthStore.getState().setAccessToken(token);
};

export const clearTokens = (): void => {
  useAuthStore.getState().clearTokens();
};
