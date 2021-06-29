import { BaseResponse } from "../BaseResponse";
import UserModel from "../../../model/UserModel";
import { Expose, Type } from "class-transformer";

export default class LoginResponse extends BaseResponse<LoginResponseData> {}

export class LoginResponseData {
  user!: UserModel;

  token!: string;
}