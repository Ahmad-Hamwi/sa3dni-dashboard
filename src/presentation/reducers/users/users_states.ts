import {IUser} from "../../../domain/entity/User";

export interface UsersState {
  isLoading: boolean;
  error?: Error | null;
  users?: IUser[] | null;
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
  users: IUser[]
): UsersState => {
  state.isLoading = false;
  state.error = null;
  state.users = users;
  return state;
};

export const dataErrorState = (state: UsersState, error: Error): UsersState => {
  state.isLoading = false;
  state.error = error;
  state.users = null;
  return state;
};

export const clearState = (state: UsersState): UsersState => {
  state.isLoading = false;
  state.error = null;
  state.users = null;
  return state;
};
