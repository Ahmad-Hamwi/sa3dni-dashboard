import {ChatSatisfactionsModel} from "../../../../../infrastructure/model/report/ChatSatisfactionsModel";

export interface ChatSatisfactionsState {
    isLoading: boolean
    error?: Error | null
    satisfactions?: ChatSatisfactionsModel
}

export const chatSatisfactionsInitialState: ChatSatisfactionsState = {
    isLoading: false,
}