import { AxiosResponse } from "axios";

export default interface IResponseInterceptor {
  intercept(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse>;
}
