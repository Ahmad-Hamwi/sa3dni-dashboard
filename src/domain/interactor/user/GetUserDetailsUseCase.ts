import ParamUseCase from "../base/ParamUseCase";
import { IUser } from "../../entity/User";
import IUserRepository from "../../gateway/IUserRepository";

/**
 * If the params.id wasn't passed, will retrieve signed-in user details
 */
export default class GetUserDetailsUseCase extends ParamUseCase<
  UserDetailsParams,
  GetUserDetailsResult
> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  async execute(param: UserDetailsParams): Promise<GetUserDetailsResult> {
    return {
      user: param.id
        ? await this.userRepository.get(param.id)
        : await this.userRepository.me(),
    };
  }
}

export type UserDetailsParams = {
  id?: string;
};

export type GetUserDetailsResult = {
  user: IUser;
};
