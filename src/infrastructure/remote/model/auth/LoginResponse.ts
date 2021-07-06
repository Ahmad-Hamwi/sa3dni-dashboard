import { BaseResponse } from "../BaseResponse";
import UserModel from "../../../model/UserModel";

export default class LoginResponse extends BaseResponse<LoginResponseData> {}

export class LoginResponseData {
  user: UserModel;

  token: string;
}
