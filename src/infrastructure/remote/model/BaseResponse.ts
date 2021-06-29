import { Expose, plainToClass, Transform, Type } from "class-transformer";

export class BaseResponse<T> {
  metadata: Metadata;

  data: T;
}

export class Metadata {
  status: boolean;

  statusCode: number;

  message: string;
}