import ParamUseCase from "../base/ParamUseCase";
import IUserRepository from "../../gateway/IUserRepository";
import UnknownException from "../../exception/UnknownException";

export default class DeleteUserUseCase extends ParamUseCase<
  DeleteUserParams,
  DeleteUserResult
> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  async execute(param: DeleteUserParams): Promise<DeleteUserResult> {
    const result = await this.userRepository.deleteUser(param.userId);

    if (result)
      return {
        deletedUserId: param.userId,
      };

    throw new UnknownException();
  }
}

export type DeleteUserParams = {
  userId: string;
};

export type DeleteUserResult = {
  deletedUserId: string;
};
