import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStore } from "../../../../redux/store";
import {
  initialState,
  registerFailedState,
  registerSuccessState,
} from "./states";

const registerSlice = createSlice({
  name: "register",
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
    setRegisterSuccess: (state) => registerSuccessState(state),
    setRegisterFailed: (state, { payload }: PayloadAction<Error | undefined>) =>
      registerFailedState(state, payload),
  },
});

export const registerReducer = registerSlice.reducer;

export const { setRegisterSuccess, setLoading, setRegisterFailed, clearState } =
  registerSlice.actions;

export const registerSelector = (store: TStore) => store.register;
