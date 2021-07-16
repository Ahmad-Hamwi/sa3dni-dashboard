import IGroupRepository, {
  CreateGroupParams,
} from "../../domain/gateway/IGroupRepository";
import Group from "../../domain/entity/Group";
import IApiClient from "../provider/api/client/IApiClinet";
import { API_ENDPOINTS } from "../remote/config";
import { GroupResponse } from "../remote/model/group/GroupResponse";
import { mapToEntity } from "../model/GroupModel";
import EmptyResponse from "../remote/model/EmptyResponse";
import { mapToEntities } from "../model/Mapper";
import { GroupsResponse } from "../remote/model/group/GroupsResponse";

export default class GroupRepository implements IGroupRepository {
  constructor(private readonly api: IApiClient) {}

  async create(param: CreateGroupParams): Promise<Group> {
    const response = await this.api.post<GroupResponse>(API_ENDPOINTS.groups, {
      name: param.name,
      memberIds: param.members,
    });

    return mapToEntity(response.data.data)!;
  }

  async delete(id: string): Promise<boolean> {
    const response = await this.api.delete<EmptyResponse>(API_ENDPOINTS.group, {
      params: {
        id: id,
      },
    });

    return response.data.metadata.status;
  }

  async get(id: string): Promise<Group | null> {
    const response = await this.api.get<GroupResponse>(API_ENDPOINTS.group, {
      params: {
        id: id,
      },
    });

    return mapToEntity(response.data.data);
  }

  async getAll(): Promise<Array<Group>> {
    const response = await this.api.get<GroupsResponse>(API_ENDPOINTS.groups);

    return mapToEntities(response.data.data, mapToEntity);
  }
}
