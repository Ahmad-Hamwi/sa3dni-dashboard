import IUserRoleRepository from "../../domain/gateway/IUserRoleRepository";
import UserRole from "../../domain/entity/UserRole";
import IApiClient from "../provider/api/client/IApiClinet";
import EmptyResponse from "../remote/model/EmptyResponse";
import { API_ENDPOINTS } from "../remote/config";

export default class UserRoleRepository implements IUserRoleRepository {
  constructor(private readonly api: IApiClient) {}

  async getRole(id: string): Promise<UserRole | undefined> {
    let roles = await this.getRoles();
    roles = roles.filter((r) => r.id === id);

    return roles.length > 0 ? roles[0] : undefined;
  }

  async getRoles(): Promise<Array<UserRole>> {
    return [
      new UserRole("OWNER", "Owner"),
      new UserRole("ADMIN", "Admin"),
      new UserRole("AGENT", "Agent"),
    ];
  }

  async updateRole(userId: string, roleId: string): Promise<boolean> {
    const response = await this.api.put<EmptyResponse>(
      API_ENDPOINTS.changeUserRole,
      { role: roleId },
      {
        params: {
          id: userId,
        },
      }
    );

    return response.data.metadata.status;
  }
}
