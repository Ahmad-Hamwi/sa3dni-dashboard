import IRequestInterceptor from "../../provider/api/interceptor/IRequestInterceptor";
import { AxiosRequestConfig } from "axios";
import IAppCache from "../../local/cache/IAppCache";
import { API_HEADERS } from "../config";

export default class AuthorizationInterceptor implements IRequestInterceptor {
  constructor(private readonly appCache: IAppCache) {}

  intercept(
    request: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    request.headers[API_HEADERS.authorization] = this.appCache.getToken();
    // request.headers[API_HEADERS.authorization] =
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGJlNjQ3YzRjNzFlODI3NzRjY2ExYTIiLCJjb21wYW55SWQiOiI2MGJlNjQ3YzRjNzFlODI3NzRjY2ExYTMiLCJpYXQiOjE2MjMwOTAzMTJ9.8hXHw5IY1bFUUqxklnqjt0Y2EqHvzTlF__VRQ_3rf0U";

    return request;
  }
}
