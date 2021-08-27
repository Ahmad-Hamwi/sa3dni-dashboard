import IInvitationRepository, {
  CreateInvitationParams,
  InvitationResult,
} from "./IInvitationRepository";
import IApiClient from "../../provider/api/client/IApiClinet";
import { API_ENDPOINTS } from "../../remote/config";
import { BaseResponse } from "../../remote/model/BaseResponse";
import EmptyResponse from "../../remote/model/EmptyResponse";
import { InvitationResponse } from "../../remote/model/invitation/InvitationResponse";
import InvitationModel  from "../../model/InvitationModel";
import { InvitationsResponse } from "../../remote/model/invitation/InvitationsResponse";

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

  async get(id: string): Promise<InvitationModel> {
    const response = await this.api.get<InvitationResponse>(
      API_ENDPOINTS.invitation,
      {
        params: {
          id: id,
        },
      }
    );

    return response.data.data;
  }

  async getAll(): Promise<Array<InvitationModel>> {
    const response = await this.api.get<InvitationsResponse>(
      API_ENDPOINTS.invitations
    );

    return response.data.data;
  }
}
