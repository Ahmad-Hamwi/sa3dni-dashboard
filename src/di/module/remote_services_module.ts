import {DependencyContainer} from "tsyringe";
import IAuthRemoteService from "../../infrastructure/remote/service/auth/IAuthRemoteService";
import AuthRemoteService from "../../infrastructure/remote/service/auth/AuthRemoteService";


export const INJECT_AUTH_REMOTE_SERVICE = "INJECT_AUTH_REMOTE_SERVICE"

export function registerRemoterServices(container: DependencyContainer) {
    container.register<IAuthRemoteService>(INJECT_AUTH_REMOTE_SERVICE, AuthRemoteService)
}