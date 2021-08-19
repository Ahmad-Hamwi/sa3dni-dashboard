import IChatRepository from "../../domain/gateway/IChatRepository";
import IApiClient from "../provider/api/client/IApiClinet";
import ChatModel from "../model/ChatModel";
import { API_ENDPOINTS } from "../remote/config";
import ChatsResponse from "../remote/model/chat/ChatsResponse";
import ChatResponse from "../remote/model/chat/ChatResponse";

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
}