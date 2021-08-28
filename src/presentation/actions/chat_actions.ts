import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolveRepository } from "../../di/injection";

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, thunkAPI) => {
    return resolveRepository.chats().getChats();
  }
);

export const getChat = createAsyncThunk(
  "chat/getChat",
  async (chatId: string, thunkAPI) => {
    return resolveRepository.chats().getChat(chatId);
  }
);

export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async (chatId: string, thunkAPI) => {
    return resolveRepository.chats().getChatMessages(chatId);
  }
);

export type TransferChatArgs = {chatId: string, groupId: string}

export const transferChat = createAsyncThunk(
    "chat/transferChat",
    async (args: TransferChatArgs, thunkAPI) => {
        return resolveRepository.chats().transferChat(args.chatId, args.groupId);
    }
)

export const closeChat = createAsyncThunk(
    "chat/closeChat",
    async (chatId: string, thunkAPI) => {
        return resolveRepository.chats().closeChat(chatId);
    }
)