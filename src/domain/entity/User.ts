import { IUserRole } from "./UserRole";
import { IGroup } from "./Group";

export default class User implements IUser {
  private readonly _id: string;
  private readonly _companyId: string;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _phoneNumber: string;
  private readonly _jobTitle: string;
  private readonly _role: IUserRole;
  private readonly _groupIds: string[];
  private readonly _groups: IGroup[] | undefined;

  constructor(params: UserData) {
    this._id = params.id;
    this._companyId = params.companyId;
    this._name = params.name;
    this._email = params.email;
    this._phoneNumber = params.phoneNumber;
    this._jobTitle = params.jobTitle;
    this._role = params.role;
    this._groupIds = params.groupIds;
    this._groups = params.groups;
  }

  get id(): string {
    return this._id;
  }

  get companyId(): string {
    return this._companyId;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get jobTitle(): string {
    return this._jobTitle;
  }

  get role(): IUserRole {
    return this._role;
  }

  get groupIds(): string[] {
    return this._groupIds;
  }

  get groups(): IGroup[] | undefined {
    return this._groups;
  }
}

export interface IUser {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: IUserRole;
  groupIds: string[];
  jobTitle: string;
  groups?: IGroup[];
}

export type UserData = {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: IUserRole;
  groupIds: string[];
  jobTitle: string;
  groups?: IGroup[];
};
