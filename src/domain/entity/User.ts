export default class User implements IUser {
  private readonly _id: string;
  private readonly _name: string;

  constructor(params: UserData) {
    this._id = params.id;
    this._name = params.name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}

export interface IUser {
  id: string;
  name: string;

}

export type UserData = {
  id: string;
  name: string;
};
