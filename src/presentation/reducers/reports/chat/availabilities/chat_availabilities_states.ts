import {ChatAvailabilitiesModel} from "../../../../../infrastructure/model/report/ChatAvailabilitiesModel";

export interface ChatAvailabilitiesState {
    isLoading: boolean
    error?: Error | null
    availabilities?: ChatAvailabilitiesModel
}

export const chatAvailabilitiesInitialState: ChatAvailabilitiesState = {
    isLoading: false,
}