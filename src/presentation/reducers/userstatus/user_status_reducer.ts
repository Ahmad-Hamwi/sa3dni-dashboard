import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserStatusState, { initialUserStatusState } from "./user_status_state";
import { changeUserStatus } from "../../actions/user_status_actions";
import UserViewModel from "../../viewmodel/user/UserViewModel";
import {TStore} from "../../store/store";

const userStatusSlice = createSlice({
  name: "userStatus",
  initialState: initialUserStatusState,
  reducers: {},
  extraReducers: {
    [changeUserStatus.fulfilled.type]: (
      state: UserStatusState,
      { payload }: PayloadAction<UserViewModel>
    ) => {
      state.isChangingState = false;
    },
    [changeUserStatus.pending.type]: (state: UserStatusState) => {
      state.isChangingState = true;
    },
    [changeUserStatus.fulfilled.type]: (
      state: UserStatusState,
      { payload }: PayloadAction<UserViewModel>
    ) => {
      state.isChangingState = false;
    },
  },
});

export const userStatusReducer = userStatusSlice.reducer;

export const chatAvailabilitiesSelector = (store: TStore) =>
    store.userStatus;
