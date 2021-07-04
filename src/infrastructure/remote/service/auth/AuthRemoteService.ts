import IApiClient from "../../../provider/api/client/IApiClinet";
import IApiExceptionFactory from "../../exception/IApiExceptionFactory";
import IAuthRemoteService from "./IAuthRemoteService";
import LoginResponse from "../../model/auth/LoginResponse";
import LoginRequest from "../../model/auth/LoginRequest";
import BaseRemoteService from "../BaseRemoteService";
import { API_ENDPOINTS } from "../../config";

export default class AuthRemoteService
  extends BaseRemoteService
  implements IAuthRemoteService
{
  constructor(
    private apiClient: IApiClient,
    exceptionFactory: IApiExceptionFactory
  ) {
    super(exceptionFactory);
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await this.apiClient.post(API_ENDPOINTS.login, request);

    return this.parseResponse<LoginResponse>(LoginResponse, response);
  }
}
