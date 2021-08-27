import UserModel from "../model/UserModel";

export const INJECT_AUTH_SERVICE = "INJECT_AUTH_SERVICE";

export default interface IAuthService {
  login(email: string, password: string): Promise<LoginResult>;

  register(params: RegisterParams): Promise<{}>;

  registerAgent(params: RegisterAgentParams): Promise<{}>;

  saveToken(token: string): Promise<void>;

  getToken(): Promise<string | null>;
}

export type LoginResult = {
  user: UserModel;
  token: string;
};

export type RegisterParams = {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
};

export type RegisterAgentParams = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
};
