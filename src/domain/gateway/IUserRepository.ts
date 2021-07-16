import User from "../entity/User";

export default interface IUserRepository {
  getAll(): Promise<Array<User>>;

  get(id: string): Promise<User>;

  me(): Promise<User>;

  delete(userId: string): Promise<boolean>;
}

export const INJECT_USER_REPOSITORY = "INJECT_USER_REPOSITORY";
