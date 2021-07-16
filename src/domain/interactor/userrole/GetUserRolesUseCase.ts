import UseCase from "../base/UseCase";
import { UserRole } from "../../entity/UserRole";
import IUserRoleRepository from "../../gateway/IUserRoleRepository";

export default class GetUserRolesUseCase extends UseCase<GetUserRolesResult> {
  constructor(private readonly userRoleRepository: IUserRoleRepository) {
    super();
  }

  async execute(): Promise<GetUserRolesResult> {
    return {
      roles: await this.userRoleRepository.getAll(),
    };
  }
}

export type GetUserRolesResult = {
  roles: Array<UserRole>;
};