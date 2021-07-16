import { IUserRole } from "./UserRole";

export default class Invitation implements IInvitation {
  private readonly _id: string;
  private readonly _companyId: string;
  private readonly _email: string;
  private readonly _role: IUserRole;
  private readonly _groups: string[];

  constructor(params: InvitationData) {
    this._id = params.id;
    this._companyId = params.companyId;
    this._email = params.email;
    this._role = params.role;
    this._groups = params.groups;
  }

  get id(): string {
    return this._id;
  }

  get companyId(): string {
    return this._companyId;
  }

  get email(): string {
    return this._email;
  }

  get role(): IUserRole {
    return this._role;
  }

  get groups(): string[] {
    return this._groups;
  }
}

export interface IInvitation {
  id: string;
  companyId: string;
  email: string;
  role: IUserRole;
  groups: string[];
}

export type InvitationData = {
  id: string;
  companyId: string;
  email: string;
  role: IUserRole;
  groups: string[];
};
