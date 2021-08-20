import {Role} from "../../model/UserModel";

export default interface IUserRoleRepository {

  getAll(): Promise<Array<Role>>;

  update(userId: string, role: string): Promise<boolean>;
}

export const INJECT_USER_ROLE_REPOSITORY = "INJECT_USER_ROLE_REPOSITORY";
