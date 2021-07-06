import IAuthService, { LoginResult } from "../../domain/gateway/IAuthService";
import { RegisterParams } from "../../domain/interactor/auth/RegisterUseCase";
import IAppCache from "../local/cache/IAppCache";

import { mapToEntity } from "../model/UserModel";
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
      user: mapToEntity(response.data.data.user)!,
      token: response.data.data.token,
    };
  }

  async register(params: RegisterParams): Promise<{}> {
    return await this.api.post<BaseResponse<{}>>(API_ENDPOINTS.register, {
      email: params.email,
      password: params.password,
      fullName: params.fullName,
      phoneNumber: params.phoneNumber,
      companyName: params.companyName,
    });
  }

  async saveToken(token: string): Promise<void> {
    this.cache.saveToken(token);
  }
}
