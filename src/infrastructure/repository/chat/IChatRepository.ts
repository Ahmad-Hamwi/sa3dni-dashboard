import ChatModel from "../../model/chat/ChatModel";
import ChatMessageModel from "../../model/chat/message/ChatMessageModel";

export default interface IChatRepository {
  getChats(): Promise<ChatModel[]>;

  getChat(chatId: string): Promise<ChatModel>;

  getChatMessages(chatId: string): Promise<ChatMessageModel[]>
}

export const INJECT_CHAT_REPOSITORY = "INJECT_CHAT_REPOSITORY";