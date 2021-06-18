import {AxiosInstance, AxiosResponse} from "axios";
import IApiClient, {Response} from "./IApiClinet";
import ServerException from "../../../exception/ServerException";

export default class AxiosApiClient implements IApiClient {

    constructor(private readonly axios: AxiosInstance) {
    }

    private async tryRequest<T>(request: () => Promise<AxiosResponse<T>>): Promise<Response> {
        try {
            const response = await request();

            return {
                body: response.data,
                code: response.status
            }
        } catch (e) {
            if (e.response) {
                return {
                    body: e.response.data,
                    code: e.response.status
                }
            }
            throw new ServerException();
        }
    }

    async post(url: string, data?: any): Promise<Response> {
        return this.tryRequest(() => {
            return this.axios.post(url, data);
        });
    }

}