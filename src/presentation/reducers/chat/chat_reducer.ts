import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatsState, initialChatsState } from "./chat_state";
import { getChats } from "../../actions/chat_actions";
import ChatModel from "../../../infrastructure/model/ChatModel";

export const chatsSlice = createSlice({
  name: "chats",
  initialState: initialChatsState,
  reducers: {},
  extraReducers: {
    [getChats.pending.type]: (
        state: ChatsState
    ) => {
      state.chatsLoading = true;
    },

    [getChats.fulfilled.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatModel[]>
    ) => {
      state.chatsLoading = false;
      state.chats = payload;
    },

    [getChats.rejected.type]: (
        state: ChatsState,
        { payload }: PayloadAction<Error>
    ) => {
      state.chatsLoading = false;
      state.error = payload
    },
  },
});