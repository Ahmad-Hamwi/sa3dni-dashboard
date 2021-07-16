import IInvitationRepository, {
  CreateInvitationParams,
  InvitationResult,
} from "../../domain/gateway/IInvitationRepository";
import Invitation from "../../domain/entity/Invitation";
import IApiClient from "../provider/api/client/IApiClinet";
import { API_ENDPOINTS } from "../remote/config";
import { BaseResponse } from "../remote/model/BaseResponse";
import EmptyResponse from "../remote/model/EmptyResponse";
import { InvitationResponse } from "../remote/model/invitation/InvitationResponse";
import { mapToEntity } from "../model/InvitationModel";
import { mapToEntities } from "../model/Mapper";
import { InvitationsResponse } from "../remote/model/invitation/InvitationsResponse";

export default class InvitationRepository implements IInvitationRepository {
  constructor(private readonly api: IApiClient) {}

  async create(
    ...invitations: CreateInvitationParams[]
  ): Promise<Array<InvitationResult>> {
    const response = await this.api.post<BaseResponse<Array<InvitationResult>>>(
      API_ENDPOINTS.invitations,
      {
        invites: invitations,
      }
    );

    return response.data.data;
  }

  async delete(id: string, reason: string): Promise<boolean> {
    const response = await this.api.delete<EmptyResponse>(
      API_ENDPOINTS.invitation,
      {
        data: {
          reason: reason,
        },
      }
    );

    return response.data.metadata.status;
  }

  async get(id: string): Promise<Invitation> {
    const response = await this.api.get<InvitationResponse>(
      API_ENDPOINTS.invitation,
      {
        params: {
          id: id,
        },
      }
    );

    return mapToEntity(response.data.data)!;
  }

  async getAll(): Promise<Array<Invitation>> {
    const response = await this.api.get<InvitationsResponse>(
      API_ENDPOINTS.invitations
    );

    return mapToEntities(response.data.data, mapToEntity);
  }
}
