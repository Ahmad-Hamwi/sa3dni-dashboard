import LoginRequest from "../../model/auth/LoginRequest";
import LoginResponse from "../../model/auth/LoginResponse";

export default interface IAuthRemoteService {

    login(request: LoginRequest): Promise<LoginResponse>

}