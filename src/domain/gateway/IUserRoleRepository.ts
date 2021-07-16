import UserRole from "../entity/UserRole";

export default interface IUserRoleRepository {
  get(id: string): Promise<UserRole | undefined>;

  getAll(): Promise<Array<UserRole>>;

  update(userId: string, roleId: string): Promise<boolean>;
}

export const INJECT_USER_ROLE_REPOSITORY = "INJECT_USER_ROLE_REPOSITORY";