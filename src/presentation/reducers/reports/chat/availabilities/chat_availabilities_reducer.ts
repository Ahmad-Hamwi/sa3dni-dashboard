import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  chatAvailabilitiesInitialState,
  ChatAvailabilitiesState,
} from "./chat_availabilities_states";
import { getChatsAvailabilities } from "../../../../actions/reports_actions";
import { TStore } from "../../../../store/store";
import { ChatAvailabilitiesModel } from "../../../../../infrastructure/model/report/ChatAvailabilitiesModel";

const chatAvailabilitiesSlice = createSlice({
  name: "chatAvailabilities",
  initialState: chatAvailabilitiesInitialState,
  reducers: {},
  extraReducers: {
    [getChatsAvailabilities.pending.type]: (state: ChatAvailabilitiesState) => {
      state.isLoading = true;
      state.error = null;
    },
    [getChatsAvailabilities.fulfilled.type]: (
      state: ChatAvailabilitiesState,
      { payload }: PayloadAction<ChatAvailabilitiesModel>
    ) => {
      state.isLoading = false;
      state.error = null;
      state.availabilities = payload;
    },
    [getChatsAvailabilities.rejected.type]: (
      state: ChatAvailabilitiesState,
      { payload }: PayloadAction<Error>
    ) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const chatAvailabilitiesReducer = chatAvailabilitiesSlice.reducer;

export const chatAvailabilitiesSelector = (store: TStore) =>
  store.chatAvailabilities;
