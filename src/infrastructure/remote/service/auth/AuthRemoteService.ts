import IApiClient, {INJECT_API_CLIENT, Response} from "../../../provider/api/client/IApiClient";
import IApiExceptionFactory, {INJECT_API_EXCEPTION_FACTORY} from "../../exception/IApiExceptionFactory";
import {inject, injectable} from "tsyringe";
import IAuthRemoteService from "./IAuthRemoteService";
import LoginResponse from "../../model/auth/LoginResponse";
import LoginRequest from "../../model/auth/LoginRequest";
import {LOGIN_URL} from "../../constants/remote_constants";
import BaseRemoteService from "../BaseRemoteService";

@injectable()
export default class AuthRemoteService extends BaseRemoteService implements IAuthRemoteService {

    constructor(@inject(INJECT_API_CLIENT) private apiClient: IApiClient,
                @inject(INJECT_API_EXCEPTION_FACTORY) exceptionFactory: IApiExceptionFactory) {
        super(exceptionFactory)
    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        const response = await this.apiClient.post(LOGIN_URL, request);

        return this.mapResponse<LoginResponse>(LoginResponse, response);
    }

    // protected tryMapResponse<T extends BaseResponse<unknown>>(responseType: (new(...args: any[]) => T), response: Response): T {
    //     const mappedResponse = deserialize<T>(responseType, response.body);
    //
    //     // mappedResponse.data = plainToClass(responseType['data'], mappedResponse.data);
    //
    //     return mappedResponse;
    // }
    //
    // protected mapResponse<T extends BaseResponse<unknown>>(responseType: (new(...args: any[]) => T), response: Response): T {
    //     const mappedResponse = this.tryMapResponse<T>(responseType, response);
    //
    //     if (mappedResponse.metadata.status) {
    //         return mappedResponse;
    //     }
    //
    //     throw this.exceptionFactory.createException(
    //         mappedResponse.metadata.statusCode,
    //         mappedResponse.metadata.message
    //     );
    // }

}