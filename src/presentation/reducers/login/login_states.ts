export interface LoginState {
  isLoading: boolean;
  error?: Error | null;
  success: boolean;
}

export const initialState: LoginState = {
  isLoading: false,
  success: false,
};

export const loginSuccessState = (state: LoginState): LoginState => {
  state.success = true;
  state.isLoading = false;
  state.error = null;
  return state;
};

export const loginFailedState = (state: LoginState, e?: Error): LoginState => {
  state.error = e;
  state.success = false;
  state.isLoading = false;
  return state;
};
