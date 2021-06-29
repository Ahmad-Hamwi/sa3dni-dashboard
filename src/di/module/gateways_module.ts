import IAuthService, {
  INJECT_AUTH_SERVICE,
} from "../../domain/gateway/IAuthService";
import AuthService from "../../infrastructure/service/AuthService";
import IContainer from "../container/IContainer";
import IAppCache, {
  INJECT_APP_CACHE,
} from "../../infrastructure/local/cache/IAppCache";
import IAuthRemoteService, {
  INJECT_AUTH_REMOTE_SERVICE,
} from "../../infrastructure/remote/service/auth/IAuthRemoteService";

export function registerGateways(container: IContainer) {
  container.registerLazySingleton<IAuthService>(INJECT_AUTH_SERVICE, (c) => {
    return new AuthService(
      c.resolve<IAppCache>(INJECT_APP_CACHE),
      c.resolve<IAuthRemoteService>(INJECT_AUTH_REMOTE_SERVICE)
    );
  });
}