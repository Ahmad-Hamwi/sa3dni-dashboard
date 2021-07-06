import IRequestInterceptor from "../../provider/api/interceptor/IRequestInterceptor";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import IResponseInterceptor from "../../provider/api/interceptor/IResponseInterceptor";

export class LoggingRequestInterceptor implements IRequestInterceptor {
  intercept(
    request: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    console.log("Request:\n", JSON.stringify(request, null, 2));
    return request;
  }
}

export class LoggingResponseInterceptor implements IResponseInterceptor {
  intercept(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
    console.log("Response:\n", JSON.stringify(response, null, 2));
    return response;
  }
}
