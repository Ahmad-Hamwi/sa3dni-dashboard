export class Customer implements ICustomer {
  constructor(
    private readonly _id: string,
    private readonly _companyId: string,
    private readonly _email: string,
    private readonly _fullName: string,
    private readonly _os: SupportedOS
  ) {}

  get id(): string {
    return this._id;
  }

  get companyId(): string {
    return this._companyId;
  }

  get email(): string {
    return this._email;
  }

  get fullName(): string {
    return this._fullName;
  }

  get os(): SupportedOS {
    return this._os;
  }
}

export type SupportedOS = "android" | "web";

export interface ICustomer {
  id: string;
  companyId: string;
  email: string;
  fullName: string;
  os: SupportedOS;
}