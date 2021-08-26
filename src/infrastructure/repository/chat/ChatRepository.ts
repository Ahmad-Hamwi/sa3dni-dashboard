import IChatRepository from "./IChatRepository";
import IApiClient from "../../provider/api/client/IApiClinet";
import ChatModel from "../../model/chat/ChatModel";
import { API_ENDPOINTS } from "../../remote/config";
import ChatsResponse from "../../remote/model/chat/ChatsResponse";
import ChatResponse from "../../remote/model/chat/ChatResponse";
import ChatMessageModel from "../../model/chat/message/ChatMessageModel";
import ChatMessagesResponse from "../../remote/model/chat/ChatMessagesResponse";

export default class ChatRepository implements IChatRepository {
  constructor(private readonly api: IApiClient) {}

  async getChats(): Promise<ChatModel[]> {
    const response = await this.api.get<ChatsResponse>(API_ENDPOINTS.chats);
    return response.data.data;
  }

  async getChat(chatId: string): Promise<ChatModel> {
    const response = await this.api.get<ChatResponse>(API_ENDPOINTS.chat, {
      params: {
        id: chatId,
      },
    });
    return response.data.data;
  }

  async getChatMessages(chatId: string): Promise<ChatMessageModel[]> {
    const response = await this.api.get<ChatMessagesResponse>(API_ENDPOINTS.chatMessages, {
      params: {
        id: chatId,
      },
    });

    return response.data.data;
  }

}