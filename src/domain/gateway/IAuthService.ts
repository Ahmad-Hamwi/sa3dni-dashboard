import User from "../entity/User";

export const INJECT_AUTH_SERVICE = "INJECT_AUTH_SERVICE";

export default interface IAuthService {

    login(email: string, password: string): Promise<LoginAuthResponse>

    saveToken(token: string): Promise<void>
}


export type LoginAuthResponse = {
    user: User,
    token: string
}