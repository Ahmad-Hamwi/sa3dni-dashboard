import IUserRepository from "../../domain/gateway/IUserRepository";
import { IUser } from "../../domain/entity/User";
import IApiClient from "../provider/api/client/IApiClinet";
import { mapToEntities, mapToEntity } from "../model/UserModel";
import { API_ENDPOINTS } from "../remote/config";
import { UserResponse } from "../remote/model/user/UserResponse";
import { UsersResponse } from "../remote/model/user/UsersResponse";

export default class UserRepository implements IUserRepository {
  constructor(private readonly api: IApiClient) {}

  async getUser(id: string): Promise<IUser> {
    const response = await this.api.get<UserResponse>(API_ENDPOINTS.user, {
      params: {
        id: id,
      },
    });

    return mapToEntity(response.data.data)!;
  }

  async me(): Promise<IUser> {
    const response = await this.api.get<UserResponse>(API_ENDPOINTS.me);

    return mapToEntity(response.data.data)!;
  }

  async getUsers(): Promise<Array<IUser>> {
    const response = await this.api.get<UsersResponse>(API_ENDPOINTS.users);

    return mapToEntities(response.data.data)!;
  }
}
