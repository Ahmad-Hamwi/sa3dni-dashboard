import ChatModel from "../../model/chat/ChatModel";
import ChatMessageModel from "../../model/chat/message/ChatMessageModel";

export default interface IChatRepository {
  getChats(): Promise<ChatModel[]>;

  getChat(chatId: string): Promise<ChatModel>;

  getChatMessages(chatId: string): Promise<ChatMessageModel[]>

  transferChat(chatId: string, groupId: string): Promise<ChatModel>

  closeChat(chatId: string): Promise<ChatModel>
}

export const INJECT_CHAT_REPOSITORY = "INJECT_CHAT_REPOSITORY";