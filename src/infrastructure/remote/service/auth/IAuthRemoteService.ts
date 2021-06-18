import LoginRequest from "../../model/auth/LoginRequest";
import LoginResponse from "../../model/auth/LoginResponse";

export const INJECT_AUTH_REMOTE_SERVICE = "INJECT_AUTH_REMOTE_SERVICE"

export default interface IAuthRemoteService {

    login(request: LoginRequest): Promise<LoginResponse>

}