import { IUser } from "../../../domain/entity/User";

export interface UsersState {
  isUsersLoading: boolean;
  UsersError?: Error | null;
  users?: IUser[] | null;
  isSelectedUserLoading: boolean;
  selectedUserError?: Error | null;
  selectedUser?: IUser | null;
}

export const usersInitialState: UsersState = {
  isUsersLoading: false,
  isSelectedUserLoading: false,
};

export const usersLoadingState = (state: UsersState): UsersState => {
  state.isUsersLoading = true;
  return state;
};

export const usersSuccessState = (state: UsersState, users: IUser[]): UsersState => {
  state.isUsersLoading = false;
  state.users = users;
  return state;
};

export const usersErrorState = (state: UsersState, error: Error): UsersState => {
  state.isUsersLoading = false;
  state.UsersError = error;
  return state;
};

export const selectedUserLoadingState = (state: UsersState): UsersState => {
  state.isSelectedUserLoading = true;
  return state;
}

export const selectedUserSuccessState = (state: UsersState, user: IUser): UsersState => {
  state.isSelectedUserLoading = false;
  state.selectedUser = user;
  return state;
}

export const selectedUserErrorState = (state: UsersState, error: Error): UsersState => {
  state.isSelectedUserLoading = false;
  state.selectedUserError = error;
  return state;
}