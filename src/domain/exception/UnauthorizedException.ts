import { Exception } from "./Exception";

export default class UnauthorizedException extends Exception {
  constructor(code: number, message: string | undefined) {
    super(code, message);
  }
}