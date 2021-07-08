import User from "../entity/User";

export default interface IUserRepository {
  getUsers(): Promise<Array<User>>;

  getUser(id: string): Promise<User>;

  me(): Promise<User>;

  deleteUser(userId: string): Promise<boolean>;
}

export const INJECT_USER_REPOSITORY = "INJECT_USER_REPOSITORY";
