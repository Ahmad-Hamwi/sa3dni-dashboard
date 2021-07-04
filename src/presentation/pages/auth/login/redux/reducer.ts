import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStore } from "../../../../store/store";
import { initialState, loginFailedState, loginSuccessState } from "./states";

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      clearState();
      state.isLoading = payload;
    },
    setLoginSuccess: (state) => loginSuccessState(state),
    setLoginFailed: (state, { payload }: PayloadAction<Error | undefined>) =>
      loginFailedState(state, payload),
  },
});

export const loginReducer = loginSlice.reducer;

export const { setLoginSuccess, setLoading, setLoginFailed, clearState } =
  loginSlice.actions;

export const loginSelector = (store: TStore) => store.login;
