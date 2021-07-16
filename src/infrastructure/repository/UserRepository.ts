import IUserRepository from "../../domain/gateway/IUserRepository";
import User from "../../domain/entity/User";
import IApiClient from "../provider/api/client/IApiClinet";
import { mapToEntities, mapToEntity } from "../model/UserModel";
import { API_ENDPOINTS } from "../remote/config";
import { UserResponse } from "../remote/model/user/UserResponse";
import { UsersResponse } from "../remote/model/user/UsersResponse";
import EmptyResponse from "../remote/model/EmptyResponse";

export default class UserRepository implements IUserRepository {
  constructor(private readonly api: IApiClient) {}

  async get(id: string): Promise<User> {
    const response = await this.api.get<UserResponse>(API_ENDPOINTS.user, {
      params: {
        id: id,
      },
    });

    return mapToEntity(response.data.data)!;
  }

  async me(): Promise<User> {
    const response = await this.api.get<UserResponse>(API_ENDPOINTS.me);

    return mapToEntity(response.data.data)!;
  }

  async getAll(): Promise<Array<User>> {
    const response = await this.api.get<UsersResponse>(API_ENDPOINTS.users);

    return mapToEntities(response.data.data)!;
  }

  async delete(userId: string): Promise<boolean> {
    const response = await this.api.delete<EmptyResponse>(
      API_ENDPOINTS.deleteUser,
      {
        params: {
          id: userId,
        },
      }
    );

    return response.data.metadata.status;
  }
}
