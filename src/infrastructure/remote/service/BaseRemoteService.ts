import {BaseResponse} from "../model/BaseResponse";
import IApiExceptionFactory from "../exception/IApiExceptionFactory";
import {deserialize, plainToClass} from "class-transformer";
import {Response} from "../../provider/api/client/IApiClinet";

export default abstract class BaseRemoteService {

    protected constructor(protected readonly exceptionFactory: IApiExceptionFactory) {
    }

    protected tryParseResponse<T extends BaseResponse<unknown>>(responseType: (new(...args: any[]) => T), response: Response): T {
        return plainToClass<T, any>(responseType, response.body);
    }

    protected parseResponse<T extends BaseResponse<unknown>>(responseType: (new(...args: any[]) => T), response: Response): T {
        const mappedResponse = this.tryParseResponse<T>(responseType, response);

        if (mappedResponse.metadata.status) {
            return mappedResponse;
        }

        throw this.exceptionFactory.createException(
            mappedResponse.metadata.statusCode,
            mappedResponse.metadata.message
        );
    }
}