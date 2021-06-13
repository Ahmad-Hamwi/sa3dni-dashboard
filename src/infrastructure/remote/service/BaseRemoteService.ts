import IApiClient, {Response} from "../../provider/api/client/IApiClient";
import {deserialize} from "class-transformer";
import {BaseResponse} from "../model/BaseResponse";
import IApiExceptionFactory from "../exception/IApiExceptionFactory";

export default abstract class BaseRemoteService {

    protected constructor(protected readonly exceptionFactory: IApiExceptionFactory) {
    }

    protected tryMapResponse<T extends BaseResponse<unknown>>(responseType: (new(...args: any[]) => T), response: Response): T {
        const mappedResponse = deserialize<T>(responseType, response.body);

        // mappedResponse.data = plainToClass(responseType['data'], mappedResponse.data);

        return mappedResponse;
    }

    protected mapResponse<T extends BaseResponse<unknown>>(responseType: (new(...args: any[]) => T), response: Response): T {
        const mappedResponse = this.tryMapResponse<T>(responseType, response);

        if (mappedResponse.metadata.status) {
            return mappedResponse;
        }

        throw this.exceptionFactory.createException(
            mappedResponse.metadata.statusCode,
            mappedResponse.metadata.message
        );
    }
}