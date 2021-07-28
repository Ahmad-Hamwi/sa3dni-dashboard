import { resolveRepository } from "../../di/injection";
import IUserRepository from "../../domain/gateway/IUserRepository";
import { UserRole } from "../../domain/entity/UserRole";
import IUserRoleRepository from "../../domain/gateway/IUserRoleRepository";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

const getUsersAction = createAction("users/getUsers");
export const getUsers = createAsyncThunk(
  getUsersAction.type,
  async (_, thunkAPI) => {
    const userRepository: IUserRepository = resolveRepository.users();
    return userRepository.getAll();
  }
);

export const getSelectedUser = createAsyncThunk(
  "users/getSelectedUser",
  async (selectedUserId: string, thunkAPI) => {
    const userRepository: IUserRepository = resolveRepository.users();
    return userRepository.get(selectedUserId);
  }
);

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
