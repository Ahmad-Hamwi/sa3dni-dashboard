import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStore } from "../../store/store";
import {
  initialState,
  registerFailedState,
  registerSuccessState,
} from "./register_states";
import { register } from "../../actions/register_actions";

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: {
    [register.pending.type]: (state, { payload }: PayloadAction<boolean>) => {
      clearState();
      state.isLoading = payload;
    },

    [register.fulfilled.type]: (state) => registerSuccessState(state),

    [register.rejected.type]: (
      state,
      { payload }: PayloadAction<Error | undefined>
    ) => registerFailedState(state, payload),
  },
});

export const registerReducer = registerSlice.reducer;

export const { clearState } = registerSlice.actions;

export const registerSelector = (store: TStore) => store.register;
