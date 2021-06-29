import { Exception } from "../../domain/exception/Exception";

export default class ServerException extends Exception {
  constructor(message?: string | undefined) {
    super(500, message);
  }
}