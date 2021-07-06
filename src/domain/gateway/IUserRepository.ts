import { IUser } from "../entity/User";

export default interface IUserRepository {
  getUsers(): Promise<Array<IUser>>;

  getUser(id: string): Promise<IUser>;

  me(): Promise<IUser>;
}

export const INJECT_USER_REPOSITORY = "INJECT_USER_REPOSITORY";
