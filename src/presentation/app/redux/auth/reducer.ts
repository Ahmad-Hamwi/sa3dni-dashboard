import {
  authenticatedState,
  initialState,
  unAuthenticatedState,
} from "./states";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStore } from "../../../store/store";
import { GetUserDetailsResult } from "../../../../domain/interactor/user/GetUserDetailsUseCase";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticated: (state, { payload }: PayloadAction<GetUserDetailsResult>) =>
      authenticatedState(state, payload.user),
    unAuthenticated: (state) => unAuthenticatedState(state),
  },
});

export const authReducer = authSlice.reducer;

export const { authenticated, unAuthenticated } = authSlice.actions;

export const authSelector = (store: TStore) => store.auth;
