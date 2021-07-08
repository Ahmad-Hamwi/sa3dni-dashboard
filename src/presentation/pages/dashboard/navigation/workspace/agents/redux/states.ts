import { GetUsersResult } from "../../../../../../../domain/interactor/user/GetUsersUseCase";

export interface UsersState {
  isLoading: boolean;
  error?: Error | null;
  success?: GetUsersResult | null;
}

export const initialState: UsersState = {
  isLoading: false,
};

export const loadingState = (state: UsersState): UsersState => {
  state.isLoading = true;
  return state;
};

export const dataState = (
  state: UsersState,
  getUsersResult: GetUsersResult
): UsersState => {
  state.isLoading = false;
  state.error = null;
  state.success = getUsersResult;
  return state;
};

export const dataErrorState = (state: UsersState, error: Error): UsersState => {
  state.isLoading = false;
  state.error = error;
  state.success = null;
  return state;
};

export const clearState = (state: UsersState): UsersState => {
  state.isLoading = false;
  state.error = null;
  state.success = null;
  return state;
};
