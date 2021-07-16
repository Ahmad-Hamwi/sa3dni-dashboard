import Invitation from "../entity/Invitation";

export default interface IInvitationRepository {
  get(id: string): Promise<Invitation>;

  getAll(): Promise<Array<Invitation>>;

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
