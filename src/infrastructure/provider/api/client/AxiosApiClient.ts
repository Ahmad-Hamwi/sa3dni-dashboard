import {AxiosInstance, AxiosResponse} from "axios";
import IApiClient, {Response} from "./IApiClient";
import ServerException from "../../../exception/ServerException";
import {inject, injectable} from "tsyringe";
import {INJECT_AXIOS_CLIENT} from "../../../../di/module/network_module";

@injectable()
export default class AxiosApiClient implements IApiClient {

    constructor(@inject(INJECT_AXIOS_CLIENT) private readonly axios: AxiosInstance) {
    }

    private async tryRequest<T>(request: () => Promise<AxiosResponse<T>>): Promise<Response> {
        try {
            const response = await request();

            return {
                body: response.data,
                code: response.status
            }
        } catch (e) {
            throw new ServerException();
        }
    }

    async post(url: string, data?: any): Promise<Response> {
        return this.tryRequest(() => {
            return this.axios.post(url, data);
        });
    }

}