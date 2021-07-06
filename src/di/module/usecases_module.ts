import IContainer from "../container/IContainer";
import LoginUseCase from "../../domain/interactor/auth/LoginUseCase";
import IAuthService, {
  INJECT_AUTH_SERVICE,
} from "../../domain/gateway/IAuthService";
import RegisterUseCase from "../../domain/interactor/auth/RegisterUseCase";

export function registerUseCases(container: IContainer) {
  container.register<LoginUseCase>(LoginUseCase, (c) => {
    return new LoginUseCase(c.resolve<IAuthService>(INJECT_AUTH_SERVICE));
  });

  container.register<RegisterUseCase>(RegisterUseCase, (c) => {
    return new RegisterUseCase(c.resolve<IAuthService>(INJECT_AUTH_SERVICE));
  });
}
