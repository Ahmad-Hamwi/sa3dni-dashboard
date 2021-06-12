import {container, DependencyContainer} from "tsyringe";
import {registerCache} from "./module/cache_module";
import {registerNetwork} from "./module/network_module";
import {registerRemoterServices} from "./module/remote_services_module";

let initialized = false;

export function inject() {
    if (initialized)
        return;

    initialized = true;

    register(container);
}

export function resolve<T>(token: any): T {
    return container.resolve(token) as T
}

function register(container: DependencyContainer) {
    registerCache(container);
    registerNetwork(container);
    registerRemoterServices(container);
    // registerGateways(container);
}