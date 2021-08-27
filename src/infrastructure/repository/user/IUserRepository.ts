import UserModel from "../../model/UserModel";

export default interface IUserRepository {
  getAll(): Promise<Array<UserModel>>;

  get(id: string): Promise<UserModel>;

  me(): Promise<UserModel>;

  delete(userId: string): Promise<boolean>;
}

export const INJECT_USER_REPOSITORY = "INJECT_USER_REPOSITORY";
