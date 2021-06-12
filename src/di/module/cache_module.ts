import {DependencyContainer} from "tsyringe";
import IAppCache, {INJECT_APP_CACHE} from "../../infrastructure/local/cache/IAppCache";
import LocalStorageCache from "../../infrastructure/local/cache/LocalStorageCache";


export function registerCache(container: DependencyContainer) {
    container.registerSingleton<IAppCache>(INJECT_APP_CACHE, LocalStorageCache)
}