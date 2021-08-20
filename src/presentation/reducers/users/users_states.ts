import UserModel from "../../../infrastructure/model/UserModel";


export interface UsersState {
  isUsersLoading: boolean;
  usersError?: Error | null;
  users?: UserModel[] | null;
  isSelectedUserLoading: boolean;
  selectedUserError?: Error | null;
  selectedUser?: UserModel | null;
  changeRoleSuccess?: UserModel | null;
  changeRoleError?: Error;
  deleteUserSuccess?: UserModel | null;
  deleteUserError?: Error;
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
  users: UserModel[]
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
  user: UserModel
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
  affectedUser: UserModel
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

export const deleteUserSuccessState = (
    state: UsersState,
    affectedUser: UserModel
): UsersState => {
  state.deleteUserSuccess = affectedUser;

  const user = state.users?.find((u) => u.id === affectedUser.id);

  if (user) user.role = affectedUser.role;

  return state;
};

export const deleteUserErrorState = (
    state: UsersState,
    error: Error
): UsersState => {
  state.deleteUserError = error;
  return state;
};

export const clearDeleteUserState = (state: UsersState): UsersState => {
  state.deleteUserSuccess = null;
  state.deleteUserError = undefined;
  return state;
};

