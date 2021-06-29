import IAuthRemoteService, {
  INJECT_AUTH_REMOTE_SERVICE,
} from "../../infrastructure/remote/service/auth/IAuthRemoteService";
import AuthRemoteService from "../../infrastructure/remote/service/auth/AuthRemoteService";
import IContainer from "../container/IContainer";
import IApiClient, {
  INJECT_API_CLIENT,
} from "../../infrastructure/provider/api/client/IApiClinet";
import IApiExceptionFactory, {
  INJECT_API_EXCEPTION_FACTORY,
} from "../../infrastructure/remote/exception/IApiExceptionFactory";

export function registerRemoterServices(container: IContainer) {
  container.register<IAuthRemoteService>(INJECT_AUTH_REMOTE_SERVICE, (c) => {
    return new AuthRemoteService(
      c.resolve<IApiClient>(INJECT_API_CLIENT),
      c.resolve<IApiExceptionFactory>(INJECT_API_EXCEPTION_FACTORY)
    );
  });
}