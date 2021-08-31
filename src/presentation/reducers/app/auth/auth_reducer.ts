import {authenticatedState, initialState, unAuthenticatedState} from "./auth_states";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStore } from "../../../store/store";
import {authenticateUser, logout} from "../../../actions/auth_actions";
import UserViewModel from "../../../viewmodel/user/UserViewModel";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: {
    [authenticateUser.fulfilled.type]: (
      state,
      { payload }: PayloadAction<{ user: UserViewModel, token: string }>
    ) => authenticatedState(state, payload.user, payload.token),

    [authenticateUser.rejected.type]: (state) => unAuthenticatedState(state),

    [logout.fulfilled.type]: (state) => unAuthenticatedState(state),
  },
});

export const authReducer = authSlice.reducer;

export const authSelector = (store: TStore) => store.auth;
