export interface LoginState {
  isLoading: boolean;
  error?: string | null;
  success: boolean;
}

export const initialState: LoginState = {
  isLoading: false,
  success: false,
};
