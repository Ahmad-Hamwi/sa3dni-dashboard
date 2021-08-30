import IUserReportsRepository, {
  UserPerformanceFilter,
  UserReportsFilter,
} from "./IUserReportsRepository";
import IApiClient from "../../../provider/api/client/IApiClinet";
import { UserPerformanceModel } from "../../../model/report/UserPerformanceModel";
import { API_ENDPOINTS } from "../../../remote/config";
import { buildDatesQueryParams } from "../reports_util";
import { TopRatedUsersResponse } from "../../../remote/model/reports/TopRatedUsersResponse";
import { UserPerformanceResponse } from "../../../remote/model/reports/UserPerformanceResponse";

export default class UserReportsRepository implements IUserReportsRepository {
  constructor(private readonly api: IApiClient) {}

  async getTopRatedUsers(
    filter: UserReportsFilter
  ): Promise<UserPerformanceModel[]> {
    const response = await this.api.get<TopRatedUsersResponse>(
      API_ENDPOINTS.userReportsTopRated,
      {
        queryParams: {
          ...buildDatesQueryParams(filter.startDate, filter.endDate),
        },
      }
    );

    return response.data.data;
  }

  async getUserPerformance(
    filter: UserPerformanceFilter
  ): Promise<UserPerformanceModel> {
    const response = await this.api.get<UserPerformanceResponse>(
      API_ENDPOINTS.userPerformance,
      {
        queryParams: {
          ...buildDatesQueryParams(filter.startDate, filter.endDate),
        },
        params: {
          id: filter.userId,
        },
      }
    );

    return response.data.data;
  }
}
