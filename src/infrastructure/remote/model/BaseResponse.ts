import {Expose, plainToClass, Transform, Type} from "class-transformer";

export class BaseResponse<T> {

    @Expose({name: "metadata"})
    @Type(() => Metadata)
    metadata!: Metadata;

    @Expose({name: "data"})
    data?: T
}

export class Metadata {
    @Expose({name: "status"})
    status!: boolean;

    @Expose({name: "statusCode"})
    statusCode!: number;

    @Expose({name: "message"})
    message!: string;
}