import IAuthService, {LoginAuthResponse} from "../../domain/gateway/IAuthService";
import {inject, injectable} from "tsyringe";
import IAppCache, {INJECT_APP_CACHE} from "../local/cache/IAppCache";
import User from "../../domain/entity/User";
import {INJECT_AUTH_REMOTE_SERVICE} from "../../di/module/remote_services_module";
import IAuthRemoteService from "../remote/service/auth/IAuthRemoteService";
import {mapToEntity} from "../model/UserModel";

@injectable()
export default class AuthService implements IAuthService {

    constructor(@inject(INJECT_APP_CACHE) private readonly appCache: IAppCache,
                @inject(INJECT_AUTH_REMOTE_SERVICE) private readonly authRemote: IAuthRemoteService) {
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