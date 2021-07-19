import {
  usersErrorReducer,
  usersSuccessReducer,
  usersLoadingReducer,
  selectedUserLoadingReducer,
  selectedUserSuccessReducer,
  selectedUserErrorReducer,
} from "../reducers/users/users_reducer";
import { resolveRepository } from "../../di/injection";
import IUserRepository from "../../domain/gateway/IUserRepository";
import { UserRole } from "../../domain/entity/UserRole";
import IUserRoleRepository from "../../domain/gateway/IUserRoleRepository";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = () => async (dispatch: any) => {
  dispatch(usersLoadingReducer());

  const userRepository: IUserRepository = resolveRepository.users();

  try {
    const users = await userRepository.getAll();
    dispatch(usersSuccessReducer(users));
  } catch (e) {
    dispatch(usersErrorReducer(e));
  }
};

export const getSelectedUser =
  (selectedUserId: string) => async (dispatch: any) => {
    dispatch(selectedUserLoadingReducer());

    const userRepository: IUserRepository = resolveRepository.users();

    try {
      const selectedUser = await userRepository.get(selectedUserId);
      dispatch(selectedUserSuccessReducer(selectedUser));
    } catch (e) {
      dispatch(selectedUserErrorReducer(e));
    }
  };

export type ChangeUserRoleArgs = {
  userId: string;
  newRole: UserRole;
};

export const changeSelectedUserRole = createAsyncThunk<any, ChangeUserRoleArgs>(
  "changeUserRole",
  async (args, thunkApi) => {

    const userRoleRepository: IUserRoleRepository =
      resolveRepository.userRole();

    const userRepository: IUserRepository = resolveRepository.users();

    const result = await userRoleRepository.update(args.userId, args.newRole);

    if (result) {
      return await userRepository.get(args.userId);
    } else {
      thunkApi.rejectWithValue(new Error("Couldn't change user role"));
    }
  }
);
