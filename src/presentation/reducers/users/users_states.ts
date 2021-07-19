import { IUser } from "../../../domain/entity/User";

export interface UsersState {
  isUsersLoading: boolean;
  UsersError?: Error | null;
  users?: IUser[] | null;
  isSelectedUserLoading: boolean;
  selectedUserError?: Error | null;
  selectedUser?: IUser | null;
  changeRoleSuccess?: IUser | null;
  changeRoleError?: IUser | null;
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
  state.UsersError = error;
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
  return state;
};

export const changeRoleErrorState = (
  state: UsersState,
  notAffectedUser: IUser
): UsersState => {
  state.changeRoleError = notAffectedUser;
  return state;
};

export const clearChangeRoleState = (state: UsersState): UsersState => {
  state.changeRoleSuccess = null;
  state.changeRoleError = null;
  return state;
};
