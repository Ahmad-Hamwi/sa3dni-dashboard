import { AxiosRequestConfig } from "axios";

export default interface IRequestInterceptor {
  intercept(
    request: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig>;
}