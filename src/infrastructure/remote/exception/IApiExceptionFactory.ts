import {Exception} from "../../../domain/exception/Exception";

export const INJECT_API_EXCEPTION_FACTORY = "INJECT_API_EXCEPTION_FACTORY";

export default interface IApiExceptionFactory {

    createException(statusCode: number, message: string | undefined): Exception;
}