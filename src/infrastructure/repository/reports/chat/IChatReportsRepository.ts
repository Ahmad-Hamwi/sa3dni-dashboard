import { ChatSatisfactionsModel } from "../../../model/report/ChatSatisfactionsModel";
import {ChatAvailabilitiesModel} from "../../../model/report/ChatAvailabilitiesModel";

export default interface IChatReportsRepository {
  getSatisfactions(filter: ChatReportsFilter): Promise<ChatSatisfactionsModel>;

  getAvailabilities(filter: ChatReportsFilter): Promise<ChatAvailabilitiesModel>;
}

export type ChatReportsFilter = {
  startDate?: Date;
  endDate?: Date;
};

export const INJECT_CHAT_REPORTS_REPOSITORY = "INJECT_CHAT_REPORTS_REPOSITORY";