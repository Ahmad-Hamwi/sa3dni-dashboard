export class BaseResponse<T> {
  metadata: Metadata;

  data: T;

  success(): boolean {
    return this.metadata.status;
  }
}

export class Metadata {
  status: boolean;

  statusCode: number;

  message: string;
}
