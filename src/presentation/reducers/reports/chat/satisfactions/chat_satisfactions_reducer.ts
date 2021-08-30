import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  chatSatisfactionsInitialState,
  ChatSatisfactionsState,
} from "./chat_satisfactions_states";
import { getChatsSatisfactions } from "../../../../actions/reports_actions";
import { ChatSatisfactionsModel } from "../../../../../infrastructure/model/report/ChatSatisfactionsModel";
import {TStore} from "../../../../store/store";

const chatSatisfactionsSlice = createSlice({
  name: "chatSatisfactions",
  initialState: chatSatisfactionsInitialState,
  reducers: {},
  extraReducers: {
    [getChatsSatisfactions.pending.type]: (state: ChatSatisfactionsState) => {
      state.isLoading = true;
      state.error = null;
    },
    [getChatsSatisfactions.fulfilled.type]: (
      state: ChatSatisfactionsState,
      { payload }: PayloadAction<ChatSatisfactionsModel>
    ) => {
      state.isLoading = false;
      state.error = null;
      state.satisfactions = payload;
    },
    [getChatsSatisfactions.rejected.type]: (
      state: ChatSatisfactionsState,
      { payload }: PayloadAction<Error>
    ) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});


export const chatSatisfactionsReducer = chatSatisfactionsSlice.reducer

export const chatSatisfactionsSelector = (store: TStore) => store.chatSatisfactions