import ParamUseCase from "../base/ParamUseCase";
import {IUserRole} from "../../entity/UserRole";
import IUserRoleRepository from "../../gateway/IUserRoleRepository";

export default class ChangeUserRoleUseCase extends ParamUseCase<ChangeUserRoleParams, ChangeUserRoleResult> {

    constructor(private readonly userRoleRepository: IUserRoleRepository) {
        super();
    }

    async execute(param: ChangeUserRoleParams): Promise<ChangeUserRoleResult> {
        const result = await this.userRoleRepository.update(param.userId, param.roleId);

        return {
            userId: param.userId,
            newRole: (await this.userRoleRepository.get(param.roleId))!
        }
    }

}

export type ChangeUserRoleParams = {
    userId: string,
    roleId: string
}

export type ChangeUserRoleResult = {
    userId: string,
    newRole: IUserRole
}