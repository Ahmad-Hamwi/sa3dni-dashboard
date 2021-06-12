
export const INJECT_API_CLIENT = "INJECT_API_CLIENT";

export default interface IApiClient {

    post(url: string, data?: any): Promise<Response>
}

export type Response = {
    code: number,
    body: any // Json data
}