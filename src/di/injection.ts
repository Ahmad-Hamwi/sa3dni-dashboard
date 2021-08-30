import { registerCache } from "./module/cache_module";
import { registerNetwork } from "./module/network_module";
import Container from "./container/Container";
import IContainer from "./container/IContainer";
import { registerGateways } from "./module/gateways_module";
import IUserRepository, {
  INJECT_USER_REPOSITORY,
} from "../infrastructure/repository/user/IUserRepository";
import IGroupRepository, {
  INJECT_GROUP_REPOSITORY,
} from "../infrastructure/repository/group/IGroupRepository";
import IInvitationRepository, {
  INJECT_INVITATION_REPOSITORY,
} from "../infrastructure/repository/invitation/IInvitationRepository";
import IUserRoleRepository, {
  INJECT_USER_ROLE_REPOSITORY,
} from "../infrastructure/repository/role/IUserRoleRepository";
import IAuthService, {
  INJECT_AUTH_SERVICE,
} from "../infrastructure/service/IAuthService";
import IChatRepository, {
  INJECT_CHAT_REPOSITORY,
} from "../infrastructure/repository/chat/IChatRepository";
import ICompanyRepository, {
  INJECT_COMPANY_REPOSITORY,
} from "../infrastructure/repository/company/ICompanyRepository";
import IChatReportsRepository, {INJECT_CHAT_REPORTS_REPOSITORY} from "../infrastructure/repository/reports/chat/IChatReportsRepository";

let initialized = false;

const container = new Container();

export function inject() {
  if (initialized) return;

  initialized = true;

  register(container);
}

export function resolve<T>(token: any): T {
  return container.resolve(token);
}

export const resolveRepository = {
  users: (): IUserRepository => resolve(INJECT_USER_REPOSITORY),
  groups: (): IGroupRepository => resolve(INJECT_GROUP_REPOSITORY),
  invitations: (): IInvitationRepository =>
    resolve(INJECT_INVITATION_REPOSITORY),
  userRole: (): IUserRoleRepository => resolve(INJECT_USER_ROLE_REPOSITORY),
  chats: (): IChatRepository => resolve(INJECT_CHAT_REPOSITORY),
  company: (): ICompanyRepository => resolve(INJECT_COMPANY_REPOSITORY),
  chatReports: (): IChatReportsRepository => resolve(INJECT_CHAT_REPORTS_REPOSITORY)
};

export const resolveService = {
  authService: (): IAuthService => resolve(INJECT_AUTH_SERVICE),
};

function register(container: IContainer) {
  registerCache(container);
  registerNetwork(container);
  registerGateways(container);
}
