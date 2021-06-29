import IApiClient, {
  INJECT_API_CLIENT,
} from "../../../provider/api/client/IApiClinet";
import IApiExceptionFactory, {
  INJECT_API_EXCEPTION_FACTORY,
} from "../../exception/IApiExceptionFactory";
import IAuthRemoteService from "./IAuthRemoteService";
import LoginResponse from "../../model/auth/LoginResponse";
import LoginRequest from "../../model/auth/LoginRequest";
import { LOGIN_URL } from "../../constants/remote_constants";
import BaseRemoteService from "../BaseRemoteService";

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
    const response = await this.apiClient.post(LOGIN_URL, request);

    return this.parseResponse<LoginResponse>(LoginResponse, response);
  }
}