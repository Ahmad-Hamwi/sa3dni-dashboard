import IChatReportsRepository, {
  ChatReportsFilter,
} from "./IChatReportsRepository";
import { ChatSatisfactionsModel } from "../../../model/report/ChatSatisfactionsModel";
import IApiClient from "../../../provider/api/client/IApiClinet";
import { ChatSatisfactionsResponse } from "../../../remote/model/reports/ChatSatisfactionsResponse";
import { API_ENDPOINTS } from "../../../remote/config";
import { ChatAvailabilitiesModel } from "../../../model/report/ChatAvailabilitiesModel";
import { ChatAvailabilitiesResponse } from "../../../remote/model/reports/ChatAvailabilitiesResponse";
import { buildDatesQueryParams } from "../reports_util";

export default class ChatReportsRepository implements IChatReportsRepository {
  constructor(private readonly api: IApiClient) {}

  async getSatisfactions(
    filter: ChatReportsFilter
  ): Promise<ChatSatisfactionsModel> {
    const response = await this.api.get<ChatSatisfactionsResponse>(
      API_ENDPOINTS.chatReportsSatisfactions,
      {
        queryParams: {
          ...buildDatesQueryParams(filter.startDate, filter.endDate),
        },
      }
    );

    return response.data.data;
  }

  async getAvailabilities(
    filter: ChatReportsFilter
  ): Promise<ChatAvailabilitiesModel> {
    const response = await this.api.get<ChatAvailabilitiesResponse>(
      API_ENDPOINTS.chatReportsAvailabilities,
      {
        queryParams: {
          ...buildDatesQueryParams(filter.startDate, filter.endDate),
        },
      }
    );

    return response.data.data;
  }
}