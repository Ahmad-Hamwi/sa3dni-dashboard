import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatsState, initialChatsState } from "./chats_state";
import {
  getChat,
  getChatMessages,
  getChats,
} from "../../../actions/chat_actions";
import ChatModel from "../../../../infrastructure/model/chat/ChatModel";
import { TStore } from "../../../store/store";
import ChatMessageViewModel from "../../../viewmodel/chat/message/ChatMessageViewModel";

export const chatsSlice = createSlice({
  name: "chats",
  initialState: initialChatsState,
  reducers: {},
  extraReducers: {
    ///////////////////////////////////////////////////////////////////////////////////////

    [getChats.pending.type]: (state: ChatsState) => {
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
      state.error = payload;
    },

    ///////////////////////////////////////////////////////////////////////////////////////

    [getChat.fulfilled.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatModel>
    ) => {
      state.chatsLoading = false;

      const chat = payload;
      if (state.chats) {
        const foundChat = state.chats.find(
          (chatItem) => chatItem.id === chat.id
        );
        if (foundChat) {
          const foundChatIndex = state.chats.indexOf(foundChat);
          const messages = state.chats[foundChatIndex].messages;
          state.chats[foundChatIndex] = { ...chat, messages };
        } else {
          state.chats = [...state.chats, chat];
        }
      }
    },

    ///////////////////////////////////////////////////////////////////////////////////////

    [getChatMessages.pending.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatMessageViewModel[]>
    ) => {
      if (state.chats) {
        if (payload.length !== 0) {
          const foundChat = state.chats.find(
            (chatItem) => payload[0].chatId === chatItem.id
          );

          if (foundChat) {
            foundChat.messages = payload;
          } else {
            // TODO make "messages pending for chat field" cause the message came but did not find the parent chat.
          }

        }
      }
    },
  },
});

export const chatReducer = chatsSlice.reducer;

export const chatSelector = (store: TStore) => store.chat;
