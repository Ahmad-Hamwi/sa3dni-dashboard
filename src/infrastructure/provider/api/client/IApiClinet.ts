export default interface IApiClient {
  post(url: string, data?: any): Promise<Response>;
}

export const INJECT_API_CLIENT = "INJECT_API_CLIENT";

export type Response = {
  code: number;
  body: any; // Json data
};