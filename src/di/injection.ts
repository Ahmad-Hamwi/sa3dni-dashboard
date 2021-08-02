import { registerCache } from "./module/cache_module";
import { registerNetwork } from "./module/network_module";
import Container from "./container/Container";
import IContainer from "./container/IContainer";
import { registerGateways } from "./module/gateways_module";
import { registerUseCases } from "./module/usecases_module";
import IUserRepository, {
  INJECT_USER_REPOSITORY,
} from "../domain/gateway/IUserRepository";
import IGroupRepository, {
  INJECT_GROUP_REPOSITORY,
} from "../domain/gateway/IGroupRepository";
import IInvitationRepository, {
  INJECT_INVITATION_REPOSITORY,
} from "../domain/gateway/IInvitationRepository";
import IUserRoleRepository, {
  INJECT_USER_ROLE_REPOSITORY,
} from "../domain/gateway/IUserRoleRepository";
import IAuthService, {INJECT_AUTH_SERVICE} from "../domain/gateway/IAuthService";

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
};

export const resolveService = {
  authService: (): IAuthService => resolve(INJECT_AUTH_SERVICE)
}

function register(container: IContainer) {
  registerCache(container);
  registerNetwork(container);
  registerGateways(container);
  registerUseCases(container);
}
