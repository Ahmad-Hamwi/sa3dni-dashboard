import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStore } from "../../../../redux/store";
import { initialState } from "./states";

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
      state.isLoading = payload;
    },
    setLoginSuccess: (state) => {
      state.success = true;
      state.isLoading = false;
      state.error = null;
    },
    setLoginFailed: (state, { payload }: PayloadAction<Error | undefined>) => {
      state.error = payload?.message;
      state.success = false;
      state.isLoading = false;
    },
  },
});

export const loginReducer = loginSlice.reducer;

export const { setLoginSuccess, setLoading, setLoginFailed, clearState } =
  loginSlice.actions;

export const loginSelector = (store: TStore) => store.login;
