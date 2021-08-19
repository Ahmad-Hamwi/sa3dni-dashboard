import ChatModel from "../../infrastructure/model/ChatModel";

export default interface IChatRepository {
  getChats(): Promise<ChatModel[]>;

  getChat(chatId: string): Promise<ChatModel>;
}

export const INJECT_CHAT_REPOSITORY = "INJECT_CHAT_REPOSITORY";