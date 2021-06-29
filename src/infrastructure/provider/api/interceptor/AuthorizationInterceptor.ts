import IRequestInterceptor from "./base/IRequestInterceptor";
import { AxiosRequestConfig } from "axios";
import IAppCache, { INJECT_APP_CACHE } from "../../../local/cache/IAppCache";
import { HEADER_AUTH } from "../../../remote/constants/remote_constants";

export default class AuthorizationInterceptor implements IRequestInterceptor {
  constructor(private readonly appCache: IAppCache) {}

  intercept(
    request: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    request.headers[HEADER_AUTH] = this.appCache.getToken();

    return request;
  }
}