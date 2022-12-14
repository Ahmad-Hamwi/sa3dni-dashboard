import IUserRoleRepository from "./IUserRoleRepository";
import IApiClient from "../../provider/api/client/IApiClinet";
import EmptyResponse from "../../remote/model/EmptyResponse";
import { API_ENDPOINTS } from "../../remote/config";
import {Role} from "../../model/UserModel";

export default class UserRoleRepository implements IUserRoleRepository {
  constructor(private readonly api: IApiClient) {}

  async getAll(): Promise<Array<Role>> {
    return [Role.OWNER, Role.ADMIN, Role.AGENT];
  }

  async update(userId: string, role: string): Promise<boolean> {
    const response = await this.api.put<EmptyResponse>(
      API_ENDPOINTS.userRole,
      { role: role },
      {
        params: {
          id: userId,
        },
      }
    );

    return response.data.metadata.status;
  }
}
