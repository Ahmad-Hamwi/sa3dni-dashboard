import AxiosApiClient from "../provider/api/client/AxiosApiClient";
import { AxiosInstance } from "axios";
import IApiExceptionFactory from "./exception/IApiExceptionFactory";
import { ApiResponse, RequestOptions } from "../provider/api/client/IApiClinet";

export default class AxiosApiClientProxy extends AxiosApiClient {
  constructor(
    private readonly exceptionFactory: IApiExceptionFactory,
    axios: AxiosInstance
  ) {
    super(axios);
  }

  async post<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const response = await super.post<T>(url, data, options);

    this.processResponseStatus(response.data);

    return response;
  }

  private processResponseStatus(data: any) {
    if (data.metadata) {
      if (!data.metadata.status) {
        throw this.exceptionFactory.createException(
          data.metadata.statusCode,
          data.metadata.message
        );
      }
    }
  }
}
