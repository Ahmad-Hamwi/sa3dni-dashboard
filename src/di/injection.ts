import { registerCache } from "./module/cache_module";
import { registerNetwork } from "./module/network_module";
import Container from "./container/Container";
import IContainer from "./container/IContainer";
import { registerGateways } from "./module/gateways_module";
import { registerUseCases } from "./module/usecases_module";
import IUserRepository, { INJECT_USER_REPOSITORY } from "../domain/gateway/IUserRepository";
import IGroupRepository, {INJECT_GROUP_REPOSITORY} from "../domain/gateway/IGroupRepository";

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
};

function register(container: IContainer) {
  registerCache(container);
  registerNetwork(container);
  registerGateways(container);
  registerUseCases(container);
}
