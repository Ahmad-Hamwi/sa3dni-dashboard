export default interface IApiClient {
  post<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>>;

  get<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>>;

  put<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>>;

  delete<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>>;
}

export type ApiResponse<T> = {
  code: number;
  data: T; // Json data
};

export type RequestOptions = {
  params?: any;
  headers?: {};
  data?: {};
};

export const INJECT_API_CLIENT = "INJECT_API_CLIENT";
