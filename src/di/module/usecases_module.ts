import IContainer from "../container/IContainer";
import LoginUseCase from "../../domain/interactor/auth/LoginUseCase";
import IAuthService, {
  INJECT_AUTH_SERVICE,
} from "../../domain/gateway/IAuthService";
import RegisterUseCase from "../../domain/interactor/auth/RegisterUseCase";
import GetUserDetailsUseCase from "../../domain/interactor/user/GetUserDetailsUseCase";
import IUserRepository, {
  INJECT_USER_REPOSITORY,
} from "../../domain/gateway/IUserRepository";
import GetUsersUseCase from "../../domain/interactor/user/GetUsersUseCase";

export function registerUseCases(container: IContainer) {
  registerAuthUseCases(container);

  registerUserUseCases(container);
}

function registerAuthUseCases(container: IContainer) {
  container.register<LoginUseCase>(LoginUseCase, (c) => {
    return new LoginUseCase(c.resolve<IAuthService>(INJECT_AUTH_SERVICE));
  });

  container.register<RegisterUseCase>(RegisterUseCase, (c) => {
    return new RegisterUseCase(c.resolve<IAuthService>(INJECT_AUTH_SERVICE));
  });
}

function registerUserUseCases(container: IContainer) {
  container.register<GetUserDetailsUseCase>(GetUserDetailsUseCase, (c) => {
    return new GetUserDetailsUseCase(
      c.resolve<IUserRepository>(INJECT_USER_REPOSITORY)
    );
  });

  container.register<GetUsersUseCase>(GetUsersUseCase, (c) => {
    return new GetUsersUseCase(
      c.resolve<IUserRepository>(INJECT_USER_REPOSITORY)
    );
  });
}
