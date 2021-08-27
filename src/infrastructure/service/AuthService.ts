import IAuthService, {
  LoginResult,
  RegisterAgentParams,
  RegisterParams,
} from "./IAuthService";
import IAppCache from "../local/cache/IAppCache";
import IApiClient from "../provider/api/client/IApiClinet";
import { API_ENDPOINTS } from "../remote/config";
import LoginResponse from "../remote/model/auth/LoginResponse";
import { BaseResponse } from "../remote/model/BaseResponse";

export default class AuthService implements IAuthService {
  constructor(
    private readonly cache: IAppCache,
    private readonly api: IApiClient
  ) {}

  async login(email: string, password: string): Promise<LoginResult> {
    const response = await this.api.post<LoginResponse>(API_ENDPOINTS.login, {
      email,
      password,
    });

    return {
      user: response.data.data.user,
      token: response.data.data.token,
    };
  }

  async registerAgent(params: RegisterAgentParams): Promise<{}> {
    return await this.api.post<BaseResponse<{}>>(
      API_ENDPOINTS.registerAgent,
      params
    );
  }

  async register(params: RegisterParams): Promise<{}> {
    return await this.api.post<BaseResponse<{}>>(
      API_ENDPOINTS.register,
      params
    );
  }

  async saveToken(token: string): Promise<void> {
    this.cache.saveToken(token);
  }

  getToken(): Promise<string | null> {
    return Promise.resolve(this.cache.getToken());
  }
}
