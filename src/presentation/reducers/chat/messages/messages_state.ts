import ChatViewModel from "../../../viewmodel/chat/ChatViewModel";

export interface MessagesState {
    loading: boolean;
    error?: Error | null;
}

export const messagesInitialState: MessagesState = {
    loading: false,
};