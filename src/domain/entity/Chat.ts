import { IUser } from "./User";
import { IGroup } from "./Group";
import { ICustomer } from "./Customer";
import { ChatStatus } from "./ChatStatus";

export class Chat implements IChat {
  constructor(
    private readonly _id: string,
    private readonly _companyId: string,
    private readonly _roomId: string,
    private readonly _user: IUser,
    private readonly _group: IGroup,
    private readonly _customer: ICustomer,
    private readonly _status: ChatStatus
  ) {}

  get id(): string {
    return this._id;
  }

  get companyId(): string {
    return this._companyId;
  }

  get roomId(): string {
    return this._roomId;
  }

  get user(): IUser {
    return this._user;
  }

  get group(): IGroup {
    return this._group;
  }

  get customer(): ICustomer {
    return this._customer;
  }

  get status(): ChatStatus {
    return this._status;
  }
}

export interface IChat {
  id: string;
  companyId: string;
  roomId: string;
  user: IUser;
  group: IGroup;
  customer: ICustomer;
  status: ChatStatus;
}
