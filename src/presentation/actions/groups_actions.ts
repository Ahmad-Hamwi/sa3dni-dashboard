import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolveRepository } from "../../di/injection";

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
