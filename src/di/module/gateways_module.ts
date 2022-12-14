import IAuthService, {
  INJECT_AUTH_SERVICE,
} from "../../infrastructure/service/IAuthService";
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
} from "../../infrastructure/repository/user/IUserRepository";
import UserRepository from "../../infrastructure/repository/user/UserRepository";
import IUserRoleRepository, {
  INJECT_USER_ROLE_REPOSITORY,
} from "../../infrastructure/repository/role/IUserRoleRepository";
import UserRoleRepository from "../../infrastructure/repository/role/UserRoleRepository";
import IGroupRepository, {
  INJECT_GROUP_REPOSITORY,
} from "../../infrastructure/repository/group/IGroupRepository";
import GroupRepository from "../../infrastructure/repository/group/GroupRepository";
import IInvitationRepository, {
  INJECT_INVITATION_REPOSITORY,
} from "../../infrastructure/repository/invitation/IInvitationRepository";
import InvitationRepository from "../../infrastructure/repository/invitation/InvitationRepository";
import IChatRepository, {
  INJECT_CHAT_REPOSITORY,
} from "../../infrastructure/repository/chat/IChatRepository";
import ChatRepository from "../../infrastructure/repository/chat/ChatRepository";
import ICompanyRepository, {
  INJECT_COMPANY_REPOSITORY,
} from "../../infrastructure/repository/company/ICompanyRepository";
import CompanyRepository from "../../infrastructure/repository/company/CompanyRepository";
import IChatReportsRepository, {
  INJECT_CHAT_REPORTS_REPOSITORY,
} from "../../infrastructure/repository/reports/chat/IChatReportsRepository";
import ChatReportsRepository from "../../infrastructure/repository/reports/chat/ChatReportsRepository";
import IUserReportsRepository, {
  INJECT_USER_REPORTS_REPOSITORY,
} from "../../infrastructure/repository/reports/user/IUserReportsRepository";
import UserReportsRepository from "../../infrastructure/repository/reports/user/UserReportsRepository";
import IUserStatusRepository, {
  INJECT_USER_STATUS_REPOSITORY,
} from "../../infrastructure/repository/userstatus/IUserStatusRepository";
import UserStatusRepository from "../../infrastructure/repository/userstatus/UserStatusRepository";

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
  );

  container.registerLazySingleton<ICompanyRepository>(
    INJECT_COMPANY_REPOSITORY,
    (c) => {
      return new CompanyRepository(c.resolve<IApiClient>(INJECT_API_CLIENT));
    }
  );

  container.registerLazySingleton<IChatReportsRepository>(
    INJECT_CHAT_REPORTS_REPOSITORY,
    (c) => {
      return new ChatReportsRepository(
        c.resolve<IApiClient>(INJECT_API_CLIENT)
      );
    }
  );

  container.registerLazySingleton<IUserReportsRepository>(
    INJECT_USER_REPORTS_REPOSITORY,
    (c) => {
      return new UserReportsRepository(
        c.resolve<IApiClient>(INJECT_API_CLIENT)
      );
    }
  );

  container.registerLazySingleton<IUserStatusRepository>(
    INJECT_USER_STATUS_REPOSITORY,
    (c) => {
      return new UserStatusRepository(c.resolve<IApiClient>(INJECT_API_CLIENT));
    }
  );
}
