import UseCase from "../base/UseCase";
import { IUser } from "../../entity/User";
import IUserRepository from "../../gateway/IUserRepository";

export default class GetUsersUseCase extends UseCase<GetUsersResult> {
  constructor(private readonly userRepository: IUserRepository) {
    super();
  }

  async execute(): Promise<GetUsersResult> {
    return {
      users: await this.userRepository.getUsers(),
    };
  }
}

export type GetUsersResult = {
  users: Array<IUser>;
};
