import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  groupsErrorState,
  groupsSuccessState,
  groupsInitialState,
  groupsLoadingState,
  GroupsState,
  selectedGroupLoadingState,
  selectedGroupSuccessState,
  selectedGroupErrorState,
  creatingGroupState,
  createGroupErrorState,
  createGroupSuccessState,
  deleteGroupErrorState,
  deleteGroupSuccessState,
} from "./groups_states";
import { TStore } from "../../store/store";
import {
  createGroup,
  deleteGroup,
  getGroups,
  getSelectedGroup,
} from "../../actions/groups_actions";
import GroupModel from "../../../infrastructure/model/GroupModel";

const groupsSlice = createSlice({
  name: "groups",
  initialState: groupsInitialState,
  reducers: {},
  extraReducers: {
    [getGroups.pending.type]: (state: GroupsState) => groupsLoadingState(state),

    [getGroups.fulfilled.type]: (
      state: GroupsState,
      { payload }: PayloadAction<GroupModel[]>
    ) => groupsSuccessState(state, payload),

    [getGroups.rejected.type]: (
      state: GroupsState,
      { payload }: PayloadAction<Error>
    ) => groupsErrorState(state, payload),

    [getSelectedGroup.pending.type]: (state) =>
      selectedGroupLoadingState(state),

    [getSelectedGroup.fulfilled.type]: (
      state: GroupsState,
      { payload }: PayloadAction<GroupModel>
    ) => selectedGroupSuccessState(state, payload),

    [getSelectedGroup.rejected.type]: (
      state: GroupsState,
      { payload }: PayloadAction<Error>
    ) => selectedGroupErrorState(state, payload),

    [createGroup.pending.type]: (state: GroupsState) =>
      creatingGroupState(state),

    [createGroup.rejected.type]: (
      state: GroupsState,
      { payload }: PayloadAction<Error>
    ) => createGroupErrorState(state, payload),

    [createGroup.fulfilled.type]: (
      state: GroupsState,
      { payload }: PayloadAction<GroupModel>
    ) => createGroupSuccessState(state, payload),

    [deleteGroup.rejected.type]: (
      state: GroupsState,
      { payload }: PayloadAction<Error>
    ) => deleteGroupErrorState(state, payload),

    [deleteGroup.fulfilled.type]: (
      state: GroupsState,
      { payload }: PayloadAction<GroupModel>
    ) => deleteGroupSuccessState(state, payload),
  },
});

export const groupsSliceReducer = groupsSlice.reducer;

export const groupsSelector = (store: TStore) => store.groups;
