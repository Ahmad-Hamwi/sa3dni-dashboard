import InvitationModel from "../../model/InvitationModel";

export default interface IInvitationRepository {
  get(id: string): Promise<InvitationModel>;

  getAll(): Promise<Array<InvitationModel>>;

  delete(id: string, reason: string): Promise<boolean>;

  create(...invitations: CreateInvitationParams[]): Promise<Array<InvitationResult>>;
}

export type CreateInvitationParams = {
  email: string;
  isAdmin: boolean;
  groupIds: string[];
};

export type InvitationResult = {
  email: string,
  status: boolean,
  errorMessage: string
}

export const INJECT_INVITATION_REPOSITORY = "INJECT_INVITATION_REPOSITORY";
