import { AxiosResponse } from "axios";

export default interface IResponseInterceptor {
  intercept(request: AxiosResponse): AxiosResponse | Promise<AxiosResponse>;
}