import IUserRepository from "./IUserRepository";
import IApiClient from "../../provider/api/client/IApiClinet";
import UserModel  from "../../model/UserModel";
import { API_ENDPOINTS } from "../../remote/config";
import { UserResponse } from "../../remote/model/user/UserResponse";
import { UsersResponse } from "../../remote/model/user/UsersResponse";
import EmptyResponse from "../../remote/model/EmptyResponse";

export default class UserRepository implements IUserRepository {
  constructor(private readonly api: IApiClient) {}

  async get(id: string): Promise<UserModel> {
    const response = await this.api.get<UserResponse>(API_ENDPOINTS.user, {
      params: {
        id: id,
      },
    });

    return response.data.data;
  }

  async me(): Promise<UserModel> {
    const response = await this.api.get<UserResponse>(API_ENDPOINTS.me);

    return response.data.data;
  }

  async getAll(): Promise<Array<UserModel>> {
    const response = await this.api.get<UsersResponse>(API_ENDPOINTS.users);

    return response.data.data;
  }

  async delete(userId: string): Promise<boolean> {
    const response = await this.api.delete<EmptyResponse>(
      API_ENDPOINTS.user,
      {
        params: {
          id: userId,
        },
      }
    );

    return response.data.metadata.status;
  }
}
