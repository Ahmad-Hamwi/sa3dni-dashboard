import { IUser } from "./User";

export default class Group implements IGroup {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _companyId: string;
  private readonly _isGeneral: boolean;
  private readonly _memberIds: string[];
  private readonly _members?: IUser[];

  constructor(params: GroupData) {
    this._id = params.id;
    this._name = params.name;
    this._companyId = params.companyId;
    this._isGeneral = params.isGeneral;
    this._memberIds = params.memberIds;
    this._members = params.members;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get companyId(): string {
    return this._companyId;
  }

  get memberIds(): string[] {
    return this._memberIds;
  }

  get isGeneral(): boolean {
    return this._isGeneral;
  }

  get members(): IUser[] | undefined {
    return this._members;
  }
}

export interface IGroup {
  id: string;
  name: string;
  companyId: string;
  memberIds: string[];
  isGeneral: boolean;
  members?: IUser[];
}

export type GroupData = {
  id: string;
  name: string;
  companyId: string;
  memberIds: string[];
  isGeneral: boolean;
  members?: IUser[];
};
