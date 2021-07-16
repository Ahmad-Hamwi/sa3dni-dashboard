export interface RegisterState {
  isLoading: boolean;
  error?: Error | null;
  success: boolean;
}

export const initialState: RegisterState = {
  isLoading: false,
  success: false,
};

export const registerSuccessState = (state: RegisterState): RegisterState => {
  state.success = true;
  state.error = null;
  state.isLoading = false;
  return state;
};

export const registerFailedState = (
  state: RegisterState,
  e?: Error
): RegisterState => {
  state.success = false;
  state.error = e;
  state.isLoading = false;
  return state;
};
