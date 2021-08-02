import User from "../entity/User";
import { RegisterParams } from "../interactor/auth/RegisterUseCase";

export const INJECT_AUTH_SERVICE = "INJECT_AUTH_SERVICE";

export default interface IAuthService {
  login(email: string, password: string): Promise<LoginResult>;

  register(params: RegisterParams): Promise<{}>;

  registerAgent(params: RegisterAgentParams): Promise<{}>;

  saveToken(token: string): Promise<void>;
}

export type LoginResult = {
  user: User;
  token: string;
};

//It hurts to put this here
export type RegisterAgentParams = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
};
