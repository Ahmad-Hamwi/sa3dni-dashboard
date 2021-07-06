import IAuthService, {
  INJECT_AUTH_SERVICE,
} from "../../domain/gateway/IAuthService";
import AuthService from "../../infrastructure/service/AuthService";
import IContainer from "../container/IContainer";
import IAppCache, {
  INJECT_APP_CACHE,
} from "../../infrastructure/local/cache/IAppCache";
import IApiClient, {
  INJECT_API_CLIENT,
} from "../../infrastructure/provider/api/client/IApiClinet";
import IUserRepository, {
  INJECT_USER_REPOSITORY,
} from "../../domain/gateway/IUserRepository";
import UserRepository from "../../infrastructure/repository/UserRepository";

export function registerGateways(container: IContainer) {
  container.registerLazySingleton<IAuthService>(INJECT_AUTH_SERVICE, (c) => {
    return new AuthService(
      c.resolve<IAppCache>(INJECT_APP_CACHE),
      c.resolve<IApiClient>(INJECT_API_CLIENT)
    );
  });

  container.registerLazySingleton<IUserRepository>(
    INJECT_USER_REPOSITORY,
    (c) => {
      return new UserRepository(c.resolve<IApiClient>(INJECT_API_CLIENT));
    }
  );
}
