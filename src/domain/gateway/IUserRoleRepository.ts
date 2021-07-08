import UserRole from "../entity/UserRole";

export default interface IUserRoleRepository {
  getRole(id: string): Promise<UserRole | undefined>;

  getRoles(): Promise<Array<UserRole>>;

  updateRole(userId: string, roleId: string): Promise<boolean>;
}

export const INJECT_USER_ROLE_REPOSITORY = "INJECT_USER_ROLE_REPOSITORY";