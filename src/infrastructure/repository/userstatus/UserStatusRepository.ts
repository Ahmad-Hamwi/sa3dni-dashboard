import IUserStatusRepository from "./IUserStatusRepository";
import UserModel, { Activity } from "../../model/UserModel";
import IApiClient from "../../provider/api/client/IApiClinet";
import { UserResponse } from "../../remote/model/user/UserResponse";
import { API_ENDPOINTS } from "../../remote/config";

export default class UserStatusRepository implements IUserStatusRepository {
  constructor(private readonly api: IApiClient) {}

  async updateStatus(activity: Activity): Promise<UserModel> {
    const response = await this.api.put<UserResponse>(
      API_ENDPOINTS.userStatus,
      {
        activity: activity,
      }
    );
    return response.data.data;
  }
}