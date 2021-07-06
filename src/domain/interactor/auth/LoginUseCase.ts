import IAuthService from "../../gateway/IAuthService";
import ParamUseCase from "../base/ParamUseCase";
import User, { IUser } from "../../entity/User";

export default class LoginUseCase extends ParamUseCase<
  LoginParams,
  LoginResult
> {
  constructor(private readonly authService: IAuthService) {
    super();
  }

  async execute(param: LoginParams): Promise<LoginResult> {
    const response = await this.authService.login(param.email, param.password);

    await this.authService.saveToken(response.token);

    return {
      user: response.user,
    };
  }
}

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResult = {
  user: IUser;
};
