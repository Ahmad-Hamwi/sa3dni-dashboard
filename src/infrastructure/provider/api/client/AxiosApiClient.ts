import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import IApiClient, { RequestOptions, ApiResponse } from "./IApiClinet";
import ServerException from "../../../exception/ServerException";

export default class AxiosApiClient implements IApiClient {
  constructor(private readonly axios: AxiosInstance) {}

  protected async tryRequest<T>(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await request();

      return {
        data: response.data,
        code: response.status,
      };
    } catch (e) {
      if (e.response) {
        return {
          data: e.response.data,
          code: e.response.status,
        };
      }
      throw new ServerException();
    }
  }

  async post<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.tryRequest<T>(() => {
      return this.axios.post(url, data, this.axiosConfig(options));
    });
  }

  get<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.tryRequest<T>(() => {
      return this.axios.get(url, this.axiosConfig(options));
    });
  }

  async put<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.tryRequest<T>(() => {
      return this.axios.put(url, data, this.axiosConfig(options));
    });
  }

  private axiosConfig(options?: RequestOptions): AxiosRequestConfig {
    return {
      params: options?.params,
      headers: options?.headers,
    };
  }
}
