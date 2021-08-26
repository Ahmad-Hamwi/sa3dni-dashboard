export interface OpenedChatState {
    loading: boolean;
    error?: Error | null;
}

export const openedChatInitialState: OpenedChatState = {
    loading: false,
};