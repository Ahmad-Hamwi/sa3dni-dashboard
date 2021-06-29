import IApiExceptionFactory from "./IApiExceptionFactory";
import { Exception } from "../../../domain/exception/Exception";
import UnauthorizedException from "../../../domain/exception/UnauthorizedException";

export default class ApiExceptionFactory implements IApiExceptionFactory {
  createException(statusCode: number, message: string | undefined): Exception {
    return (
      this.errors[`${statusCode}`]?.(message) ||
      new Exception(statusCode, message)
    );
  }

  private errors: any = {
    "401": (message?: string): Exception => {
      return new UnauthorizedException(401, message);
    },
  };
}