import ChatViewModel from "../../viewmodel/chat/ChatViewModel";

export interface ChatsState {
  chats?: ChatViewModel[] | null;
  error?: Error | null;
  chatsLoading: boolean;
}

export const initialChatsState: ChatsState = {
  chatsLoading: false,
};