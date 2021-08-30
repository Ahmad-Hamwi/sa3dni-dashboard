import IGroupRepository, { CreateGroupParams } from "./IGroupRepository";
import IApiClient from "../../provider/api/client/IApiClinet";
import { API_ENDPOINTS } from "../../remote/config";
import { GroupResponse } from "../../remote/model/group/GroupResponse";
import GroupModel from "../../model/GroupModel";
import EmptyResponse from "../../remote/model/EmptyResponse";
import { GroupsResponse } from "../../remote/model/group/GroupsResponse";
import GroupViewModel from "../../../presentation/viewmodel/group/GroupViewModel";

export default class GroupRepository implements IGroupRepository {
  constructor(private readonly api: IApiClient) {}

  async create(param: CreateGroupParams): Promise<GroupModel> {
    const response = await this.api.post<GroupResponse>(API_ENDPOINTS.groups, {
      name: param.name,
      memberIds: param.members,
    });

    return response.data.data;
  }

  async delete(id: string): Promise<GroupViewModel> {
    const response = await this.api.delete<GroupResponse>(API_ENDPOINTS.group, {
      params: {
        id: id,
      },
    });

    return response.data.data;
  }

  async get(id: string): Promise<GroupModel | null> {
    const response = await this.api.get<GroupResponse>(API_ENDPOINTS.group, {
      params: {
        id: id,
      },
    });

    return response.data.data;
  }

  async getAll(): Promise<Array<GroupModel>> {
    const response = await this.api.get<GroupsResponse>(API_ENDPOINTS.groups);

    return response.data.data;
  }
}
