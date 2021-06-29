import { registerCache } from "./module/cache_module";
import { registerNetwork } from "./module/network_module";
import { registerRemoterServices } from "./module/remote_services_module";
import Container from "./container/Container";
import IContainer from "./container/IContainer";
import { registerGateways } from "./module/gateways_module";
import { registerUseCases } from "./module/usecases_module";

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

function register(container: IContainer) {
  registerCache(container);
  registerNetwork(container);
  registerRemoterServices(container);
  registerGateways(container);
  registerUseCases(container);
}