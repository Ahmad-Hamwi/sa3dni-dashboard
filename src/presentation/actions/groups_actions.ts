import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolveRepository } from "../../di/injection";
import thunk from "redux-thunk";
import GroupViewModel from "../viewmodel/group/GroupViewModel";
import UserViewModel from "../viewmodel/user/UserViewModel";

export const getGroups = createAsyncThunk(
  "groups/getGroups",
  async (arg, thunkAPI) => {
    const groupsRepository = resolveRepository.groups();
    return groupsRepository.getAll();
  }
);

export const getSelectedGroup = createAsyncThunk(
  "groups/getSelectedGroup",
  async (selectedGroupId: string, thunkAPI) => {
    const groupRepository = resolveRepository.groups();
    return groupRepository.get(selectedGroupId);
  }
);

export interface createGroupArgs {
  name: string;
  members: string[];
}

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (args: createGroupArgs, thunkAPI) => {
    return resolveRepository.groups().create(args);
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (group: GroupViewModel, thunkAPI) => {
    return resolveRepository.groups().delete(group.id);
  }
);
