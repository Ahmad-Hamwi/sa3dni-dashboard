import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  userReportsInitialState,
  UserReportsState,
} from "./user_reports_states";
import {
  getTopRatedUsers,
  getUserPerformance,
} from "../../../actions/reports_actions";
import { UserPerformanceModel } from "../../../../infrastructure/model/report/UserPerformanceModel";
import { TStore } from "../../../store/store";

const userReportsSlice = createSlice({
  name: "userReports",
  initialState: userReportsInitialState,
  reducers: {},
  extraReducers: {
    [getTopRatedUsers.pending.type]: (state: UserReportsState) => {
      state.isLoading = true;
    },
    [getTopRatedUsers.fulfilled.type]: (
      state: UserReportsState,
      { payload }: PayloadAction<UserPerformanceModel[]>
    ) => {
      state.isLoading = false;
      state.topRatedUsers = payload;
    },
    [getTopRatedUsers.rejected.type]: (
      state: UserReportsState,
      { payload }: PayloadAction<Error>
    ) => {
      state.isLoading = false;
    },

    [getUserPerformance.fulfilled.type]: (
      state: UserReportsState,
      { payload }: PayloadAction<UserPerformanceModel>
    ) => {
      state.selectedUserPerformance = payload;
    },
    [getUserPerformance.rejected.type]: (
        state: UserReportsState,
        {payload}: PayloadAction<Error>
    ) => {
      state.selectedUserPerformance = undefined
    }
  },
});

export const userReportsSliceReducer = userReportsSlice.reducer;

export const userReportsSelector = (store: TStore) => store.userReports;
