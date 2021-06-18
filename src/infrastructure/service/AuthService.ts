import IAuthService, {LoginAuthResponse} from "../../domain/gateway/IAuthService";
import IAppCache from "../local/cache/IAppCache";
import IAuthRemoteService from "../remote/service/auth/IAuthRemoteService";
import {mapToEntity} from "../model/UserModel";

export default class AuthService implements IAuthService {

    constructor(private readonly appCache: IAppCache,
                private readonly authRemote: IAuthRemoteService) {
    }


    async login(email: string, password: string): Promise<LoginAuthResponse> {
        const response = await this.authRemote.login({email, password})

        return {
            user: mapToEntity(response.data?.user)!,
            token: response.data?.token!
        }
    }

    async saveToken(token: string): Promise<void> {
        this.appCache.saveToken(token)
    }

}