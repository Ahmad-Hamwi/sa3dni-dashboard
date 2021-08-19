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
import IUserRoleRepository, {
  INJECT_USER_ROLE_REPOSITORY,
} from "../../domain/gateway/IUserRoleRepository";
import UserRoleRepository from "../../infrastructure/repository/UserRoleRepository";
import IGroupRepository, {
  INJECT_GROUP_REPOSITORY,
} from "../../domain/gateway/IGroupRepository";
import GroupRepository from "../../infrastructure/repository/GroupRepository";
import IInvitationRepository, {
  INJECT_INVITATION_REPOSITORY,
} from "../../domain/gateway/IInvitationRepository";
import InvitationRepository from "../../infrastructure/repository/InvitationRepository";
import IChatRepository, {INJECT_CHAT_REPOSITORY} from "../../domain/gateway/IChatRepository";
import ChatRepository from "../../infrastructure/repository/ChatRepository";

export function registerGateways(container: IContainer) {
  container.registerLazySingleton<IAuthService>(INJECT_AUTH_SERVICE,
      (c) => {
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

  container.registerLazySingleton<IUserRoleRepository>(
    INJECT_USER_ROLE_REPOSITORY,
    (c) => {
      return new UserRoleRepository(c.resolve<IApiClient>(INJECT_API_CLIENT));
    }
  );

  container.registerLazySingleton<IGroupRepository>(
    INJECT_GROUP_REPOSITORY,
    (c) => {
      return new GroupRepository(c.resolve<IApiClient>(INJECT_API_CLIENT));
    }
  );

  container.registerLazySingleton<IInvitationRepository>(
    INJECT_INVITATION_REPOSITORY,
    (c) => {
      return new InvitationRepository(c.resolve<IApiClient>(INJECT_API_CLIENT));
    }
  );

  container.registerLazySingleton<IChatRepository>(
      INJECT_CHAT_REPOSITORY,
      (c) => {
        return new ChatRepository(c.resolve<IApiClient>(INJECT_API_CLIENT));
      }
  )
}
