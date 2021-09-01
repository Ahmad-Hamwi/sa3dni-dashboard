import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatsState, initialChatsState } from "./chats_state";
import {
  closeChat,
  getChat,
  getChatMessages,
  getChats,
  transferChat,
} from "../../../actions/chat_actions";
import ChatModel from "../../../../infrastructure/model/chat/ChatModel";
import { TStore } from "../../../store/store";
import ChatMessageViewModel from "../../../viewmodel/chat/message/ChatMessageViewModel";
import ChatViewModel from "../../../viewmodel/chat/ChatViewModel";
import {
  notifyChatAssigned,
  notifyChatClosed,
  notifyMessageReceived,
} from "../../../actions/dashboardsocket/dashboard_socket_actions";
import ChatClosedViewModel from "../../../viewmodel/chat/message/data/events/ChatClosedViewModel";

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

    [getChatMessages.fulfilled.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatMessageViewModel[]>
    ) => {
      if (state.chats) {
        if (payload.length !== 0) {
          const foundChat = state.chats.find(
            (chatItem) => payload[0].chatId === chatItem.id
          );

          if (foundChat) {
            payload.reverse();
            foundChat.messages = payload;

            foundChat.status = "OPENED";
          } else {
            // TODO make "messages pending for chat field" cause the message came but did not find the parent chat.
          }
        }
      }
    },

    ///////////////////////////////////////////////////////////////////////////////////////

    [closeChat.fulfilled.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatViewModel>
    ) => {
      if (state.chats) {
        const foundChatIndex = state.chats?.findIndex(
          (chatItem) => chatItem.id === payload.id
        );
        if (foundChatIndex) {
          state.chats[foundChatIndex] = payload;
        }
      }
    },

    [transferChat.fulfilled.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatViewModel>
    ) => {
      if (state.chats) {
        const foundChatIndex = state.chats?.findIndex(
          (chatItem) => chatItem.id === payload.id
        );
        if (foundChatIndex) {
          state.chats.splice(foundChatIndex, 1);
        }
      }
    },

    ///////////////////////////////////////////////////////////////////////////////////////

    [notifyMessageReceived.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatMessageViewModel>
    ) => {
      if (state.chats) {
        const foundChat = state.chats.find(
          (chatItem) => payload.chatId === chatItem.id
        );
        if (foundChat) {
          foundChat.messages = foundChat.messages
            ? [...foundChat.messages, payload]
            : [payload];
        } else {
        }
      }
    },

    [notifyChatAssigned.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatViewModel>
    ) => {

      const foundIndex = state.chats!.findIndex(
        (chatItr) => chatItr.id === payload.id
      );
      if (foundIndex) {
        state.chats![foundIndex] = payload;
      } else {
        state.chats = [...state.chats!, payload];
      }
    },

    [notifyChatClosed.type]: (
      state: ChatsState,
      { payload }: PayloadAction<ChatClosedViewModel>
    ) => {
      if (state.chats) {
        const foundChat = state.chats.find(
          (chatItem) => payload.chatId === chatItem.id
        );
        if (foundChat) {
          foundChat.status = "CLOSED";

          const chatMessage: ChatMessageViewModel = {
            id: "chat-closed-id",
            chatId: payload.chatId,
            content: {
              type: "EVENT",
              data: {
                action: "chat-closed",
                payload: payload,
              },
            },
            createdAt: payload.createdAt,
          };

          foundChat.messages = foundChat.messages
            ? [...foundChat.messages, chatMessage]
            : [chatMessage];
        }
      }
    },
  },
});

export const chatReducer = chatsSlice.reducer;

export const chatSelector = (store: TStore) => store.chat;
