import { createAsyncThunk } from "@reduxjs/toolkit";
import IChatReportsRepository from "../../infrastructure/repository/reports/chat/IChatReportsRepository";
import { resolveRepository } from "../../di/injection";
import IUserReportsRepository from "../../infrastructure/repository/reports/user/IUserReportsRepository";

export type ReportsDaysFilter = {
  startDate?: Date;
  endDate?: Date;
};

export const getChatsSatisfactions = createAsyncThunk(
  "reports/chats/satisfactions",
  async (filter: ReportsDaysFilter, _) => {
    const chatReportsRepository: IChatReportsRepository =
      resolveRepository.chatReports();

    return chatReportsRepository.getSatisfactions(filter);
  }
);

export const getChatsAvailabilities = createAsyncThunk(
  "reports/chats/availabilities",
  async (filter: ReportsDaysFilter, _) => {
    const chatReportsRepository: IChatReportsRepository =
      resolveRepository.chatReports();

    return chatReportsRepository.getAvailabilities(filter);
  }
);

export const getTopRatedUsers = createAsyncThunk(
  "reports/users/top",
  async (filter: ReportsDaysFilter, _) => {
    const userReportsRepository: IUserReportsRepository =
      resolveRepository.userReports();

    return userReportsRepository.getTopRatedUsers(filter);
  }
);

export type UserPerformanceArgs = {
  startDate?: Date;
  endDate?: Date;
  userId: string;
};

export const getUserPerformance = createAsyncThunk(
  "reports/user/performance",
  async (filter: UserPerformanceArgs, _) => {
    const userReportsRepository: IUserReportsRepository =
      resolveRepository.userReports();

    return userReportsRepository.getUserPerformance(filter);
  }
);