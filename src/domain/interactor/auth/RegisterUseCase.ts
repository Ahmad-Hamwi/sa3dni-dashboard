import ParamUseCase from "../base/ParamUseCase";
import IAuthService from "../../gateway/IAuthService";

export default class RegisterUseCase extends ParamUseCase<
  RegisterParams,
  RegisterResult
> {
  constructor(private readonly authService: IAuthService) {
    super();
  }

  async execute(param: RegisterParams): Promise<RegisterResult> {
    const registerResult = await this.authService.register(param);

    // !!registerResult <=> registerResult ? true : false
    return { success: !!registerResult };
  }
}

export type RegisterParams = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  companyName: string;
};

export type RegisterResult = {
  success: boolean;
};
