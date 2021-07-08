import { Exception } from "./Exception";

export default class UnknownException extends Exception {
  constructor(message?: string) {
    super(500, message);
  }
}
