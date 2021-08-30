import {createAsyncThunk} from "@reduxjs/toolkit";
import IChatReportsRepository from "../../infrastructure/repository/reports/chat/IChatReportsRepository";
import {resolveRepository} from "../../di/injection";

export type ReportsDaysFilter = {
    startDate?: Date,
    endDate?: Date
}

export const getChatsSatisfactions = createAsyncThunk(
    "reports/chats/satisfactions",
    async (filter: ReportsDaysFilter, _) => {

        const chatReportsRepository: IChatReportsRepository = resolveRepository.chatReports()

        return chatReportsRepository.getSatisfactions(filter)
    }
)

export const getChatsAvailabilities = createAsyncThunk(
    "reports/chats/availabilities",
    async (filter: ReportsDaysFilter, _) => {

        const chatReportsRepository: IChatReportsRepository = resolveRepository.chatReports()

        return chatReportsRepository.getAvailabilities(filter)
    }
)