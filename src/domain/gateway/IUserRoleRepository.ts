import { UserRole } from "../entity/UserRole";

export default interface IUserRoleRepository {

  getAll(): Promise<Array<UserRole>>;

  update(userId: string, role: string): Promise<boolean>;
}

export const INJECT_USER_ROLE_REPOSITORY = "INJECT_USER_ROLE_REPOSITORY";
