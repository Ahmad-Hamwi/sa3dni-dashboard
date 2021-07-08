export default class UserRole implements IUserRole {
  private readonly _id: string;
  private readonly _title: string;

  constructor(id: string, title: string) {
    this._id = id;
    this._title = title;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }
}

export interface IUserRole {
  id: string;
  title: string;
}
