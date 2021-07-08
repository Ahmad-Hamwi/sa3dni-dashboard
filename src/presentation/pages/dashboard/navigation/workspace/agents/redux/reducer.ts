import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearState,
  dataErrorState,
  dataState,
  initialState,
  loadingState,
  UsersState,
} from "./states";
import { GetUsersResult } from "../../../../../../../domain/interactor/user/GetUsersUseCase";
import { TStore } from "../../../../../../store/store";

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearActionReducer: (state: UsersState) => clearState(state),
    loadingActionReducer: (state: UsersState) => loadingState(state),
    dataSuccessActionReducer: (
      state: UsersState,
      { payload }: PayloadAction<GetUsersResult>
    ) => dataState(state, payload),
    dataErrorActionReducer: (
      state: UsersState,
      { payload }: PayloadAction<Error>
    ) => dataErrorState(state, payload),
  },
});

export const {
  clearActionReducer,
  loadingActionReducer,
  dataSuccessActionReducer,
  dataErrorActionReducer,
} = usersSlice.actions;

export const usersSliceReducer = usersSlice.reducer;

export const usersSelector = (store: TStore) => store.users;
