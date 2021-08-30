import IChatReportsRepository, {ChatReportsFilter} from "./IChatReportsRepository";
import {ChatSatisfactionsModel} from "../../../model/report/ChatSatisfactionsModel";
import IApiClient from "../../../provider/api/client/IApiClinet";
import {ChatSatisfactionsResponse} from "../../../remote/model/reports/ChatSatisfactionsResponse";
import {API_ENDPOINTS} from "../../../remote/config";
import {ChatAvailabilitiesModel} from "../../../model/report/ChatAvailabilitiesModel";
import {ChatAvailabilitiesResponse} from "../../../remote/model/reports/ChatAvailabilitiesResponse";

export default class ChatReportsRepository implements IChatReportsRepository {

    constructor(private readonly api: IApiClient) {}

    async getSatisfactions(filter: ChatReportsFilter): Promise<ChatSatisfactionsModel> {

        const queryParams: any = {}

        if (filter.startDate)
            queryParams['startDate'] = filter.startDate

        if (filter.endDate)
            queryParams['endDate'] = filter.endDate

        const response = await this.api.get<ChatSatisfactionsResponse>(API_ENDPOINTS.chatReportsSatisfactions, {
            queryParams
        })

        return response.data.data;
    }

    async getAvailabilities(filter: ChatReportsFilter): Promise<ChatAvailabilitiesModel> {
        const queryParams: any = {}

        if (filter.startDate)
            queryParams['startDate'] = filter.startDate

        if (filter.endDate)
            queryParams['endDate'] = filter.endDate

        const response = await this.api.get<ChatAvailabilitiesResponse>(API_ENDPOINTS.chatReportsAvailabilities, {
            queryParams
        })

        return response.data.data;
    }



}