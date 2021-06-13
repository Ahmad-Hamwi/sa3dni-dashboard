import {DependencyContainer} from "tsyringe";
import IAuthService, {INJECT_AUTH_SERVICE} from "../../domain/gateway/IAuthService";
import AuthService from "../../infrastructure/service/AuthService";



export function registerGateways(container: DependencyContainer) {
    container.registerSingleton<IAuthService>(INJECT_AUTH_SERVICE, AuthService);
}