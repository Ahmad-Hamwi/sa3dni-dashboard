import { resolveRepository } from "../../di/injection";
import IUserRepository from "../../infrastructure/repository/user/IUserRepository";
import IUserRoleRepository from "../../infrastructure/repository/role/IUserRoleRepository";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import UserViewModel from "../viewmodel/user/UserViewModel";
import {Role} from "../../infrastructure/model/UserModel";

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
  newRole: Role
};

export const changeSelectedUserRole = createAsyncThunk<any, ChangeUserRoleArgs>(
  "users/changeUserRole",
  async (args, thunkApi) => {
    const userRoleRepository: IUserRoleRepository =
      resolveRepository.userRole();

    const userRepository: IUserRepository = resolveRepository.users();

    console.log("calling the repo");

    const result = await userRoleRepository.update(args.userId, args.newRole);

    if (result) {
      return await userRepository.get(args.userId);
    } else {
      thunkApi.rejectWithValue(new Error("Couldn't change user role"));
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userToBeDeleted: UserViewModel, thunkAPI) => {
    const usersRepo = resolveRepository.users();
    const result = await usersRepo.delete(userToBeDeleted.id);
    if (result) {
      return userToBeDeleted;
    } else {
      thunkAPI.rejectWithValue(new Error("Something went wrong, agent was not removed"));
    }
  }
);
