export class Exception extends Error {
  public id: string;
  public readonly code: number;

  constructor(code: number, message: string | undefined) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);

    this.id = this.constructor.name;
    this.code = code;
  }
}