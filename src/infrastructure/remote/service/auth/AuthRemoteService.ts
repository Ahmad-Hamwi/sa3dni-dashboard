import BaseRemoteService from "../BaseRemoteService";
import IApiClient, {INJECT_API_CLIENT} from "../../../provider/api/client/IApiClient";
import IApiExceptionFactory, {INJECT_API_EXCEPTION_FACTORY} from "../../exception/IApiExceptionFactory";
import {inject, injectable} from "tsyringe";

@injectable()
export default class AuthRemoteService extends BaseRemoteService {

    constructor(@inject(INJECT_API_CLIENT) apiClient: IApiClient,
                @inject(INJECT_API_EXCEPTION_FACTORY) exceptionFactory: IApiExceptionFactory) {
        super(apiClient, exceptionFactory);
    }
}