import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { joinInitialState, JoinState } from "./join_states";
import { joinWorkspace } from "../../actions/join_actions";
import { TStore } from "../../store/store";

const joinSlice = createSlice({
  name: "join",
  initialState: joinInitialState,
  reducers: {},
  extraReducers: {
    [joinWorkspace.pending.type]: (state: JoinState) => {
      state.isLoading = true;
    },
    [joinWorkspace.fulfilled.type]: (
      state: JoinState,
      action: PayloadAction<boolean>
    ) => {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },
    [joinWorkspace.rejected.type]: (
      state: JoinState,
      action: PayloadAction<Error>
    ) => {
      state.isLoading = false;
      state.success = null;
      state.error = action.payload;
    },
  },
});

export const joinReducer = joinSlice.reducer;

export const joinSelector = (store: TStore) => store.join;