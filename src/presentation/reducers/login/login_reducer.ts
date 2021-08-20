import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStore } from "../../store/store";
import {
  initialState,
  loginFailedState,
  loginSuccessState,
} from "./login_states";
import { login } from "../../actions/login_actions";

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
  extraReducers: {
    [login.fulfilled.type]: (state) => loginSuccessState(state),
    [login.rejected.type]: (
      state,
      { payload }: PayloadAction<Error | undefined>
    ) => loginFailedState(state, payload),

    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

export const loginReducer = loginSlice.reducer;

export const { setLoginSuccess, setLoading, setLoginFailed, clearState } =
  loginSlice.actions;

export const loginSelector = (store: TStore) => store.login;
