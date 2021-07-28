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
} from "./groups_states";
import { TStore } from "../../store/store";
import { IGroup } from "../../../domain/entity/Group";
import {getGroups, getSelectedGroup} from "../../actions/groups_actions";

const groupsSlice = createSlice({
  name: "groups",
  initialState: groupsInitialState,
  reducers: {},
  extraReducers: {
    [getGroups.pending.type]: (state: GroupsState) => groupsLoadingState(state),

    [getGroups.fulfilled.type]: (
      state: GroupsState,
      { payload }: PayloadAction<IGroup[]>
    ) => groupsSuccessState(state, payload),

    [getGroups.rejected.type]: (
      state: GroupsState,
      { payload }: PayloadAction<Error>
    ) => groupsErrorState(state, payload),

    [getSelectedGroup.pending.type]: (state) =>
      selectedGroupLoadingState(state),

    [getSelectedGroup.fulfilled.type]: (
      state: GroupsState,
      { payload }: PayloadAction<IGroup>
    ) => selectedGroupSuccessState(state, payload),

    [getSelectedGroup.rejected.type]: (
      state: GroupsState,
      { payload }: PayloadAction<Error>
    ) => selectedGroupErrorState(state, payload),
  },
});

export const groupsSliceReducer = groupsSlice.reducer;

export const groupsSelector = (store: TStore) => store.groups;
