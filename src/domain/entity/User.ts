import {UserRole} from "./UserRole";
import { IGroup } from "./Group";
import { UserActiveStatus } from "./UserActiveStatus";

export default class User implements IUser {
  private _id: string;
  private _companyId: string;
  private _name: string;
  private _email: string;
  private _phoneNumber: string;
  private _jobTitle: string;
  private _userStatus: UserActiveStatus | undefined;
  private _role: UserRole;
  private _groupIds: string[];
  private _groups: IGroup[] | undefined;

  constructor(params: UserData) {
    this._id = params.id;
    this._companyId = params.companyId;
    this._name = params.name;
    this._email = params.email;
    this._phoneNumber = params.phoneNumber;
    this._jobTitle = params.jobTitle;
    this._userStatus = params.userStatus;
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

  get role(): UserRole {
    return this._role;
  }

  get userStatus(): UserActiveStatus | undefined {
    return this._userStatus;
  }

  get groupIds(): string[] {
    return this._groupIds;
  }

  get groups(): IGroup[] | undefined {
    return this._groups;
  }


  set id(value: string) {
    this._id = value;
  }

  set companyId(value: string) {
    this._companyId = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  set jobTitle(value: string) {
    this._jobTitle = value;
  }

  set userStatus(value: UserActiveStatus | undefined) {
    this._userStatus = value;
  }

  set role(value: UserRole) {
    this._role = value;
  }

  set groupIds(value: string[]) {
    this._groupIds = value;
  }

  set groups(value: IGroup[] | undefined) {
    this._groups = value;
  }
}

export interface IUser {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  userStatus?: UserActiveStatus;
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
  role: UserRole;
  userStatus?: UserActiveStatus;
  groupIds: string[];
  jobTitle: string;
  groups?: IGroup[];
};
