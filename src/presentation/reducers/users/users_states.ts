import { IUser } from "../../../domain/entity/User";

export interface UsersState {
  isUsersLoading: boolean;
  usersError?: Error | null;
  users?: IUser[] | null;
  isSelectedUserLoading: boolean;
  selectedUserError?: Error | null;
  selectedUser?: IUser | null;
  changeRoleSuccess?: IUser | null;
  changeRoleError?: Error;
}

export const usersInitialState: UsersState = {
  isUsersLoading: false,
  isSelectedUserLoading: false,
};

export const usersLoadingState = (state: UsersState): UsersState => {
  state.isUsersLoading = true;
  return state;
};

export const usersSuccessState = (
  state: UsersState,
  users: IUser[]
): UsersState => {
  state.isUsersLoading = false;
  state.users = users;
  return state;
};

export const usersErrorState = (
  state: UsersState,
  error: Error
): UsersState => {
  state.isUsersLoading = false;
  state.usersError = error;
  return state;
};

export const selectedUserLoadingState = (state: UsersState): UsersState => {
  state.isSelectedUserLoading = true;
  return state;
};

export const selectedUserSuccessState = (
  state: UsersState,
  user: IUser
): UsersState => {
  state.isSelectedUserLoading = false;
  state.selectedUser = user;
  return state;
};

export const selectedUserErrorState = (
  state: UsersState,
  error: Error
): UsersState => {
  state.isSelectedUserLoading = false;
  state.selectedUserError = error;
  return state;
};

export const changeRoleSuccessState = (
  state: UsersState,
  affectedUser: IUser
): UsersState => {
  state.changeRoleSuccess = affectedUser;

  const user = state.users?.find((u) => u.id === affectedUser.id);

  if (user) user.role = affectedUser.role;

  return state;
};

export const changeRoleErrorState = (
  state: UsersState,
  error: Error
): UsersState => {
  state.changeRoleError = error;
  return state;
};

export const clearChangeRoleState = (state: UsersState): UsersState => {
  state.changeRoleSuccess = null;
  state.changeRoleError = undefined;
  return state;
};
