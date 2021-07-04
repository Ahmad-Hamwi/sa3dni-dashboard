import IRequestInterceptor from "./base/IRequestInterceptor";
import { AxiosRequestConfig } from "axios";
import IAppCache from "../../../local/cache/IAppCache";
import {API_HEADERS} from "../../../remote/config";

export default class AuthorizationInterceptor implements IRequestInterceptor {
  constructor(private readonly appCache: IAppCache) {}

  intercept(
    request: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    request.headers[API_HEADERS.authorization] = this.appCache.getToken();

    return request;
  }
}