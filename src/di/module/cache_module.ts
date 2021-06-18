import IAppCache, {INJECT_APP_CACHE} from "../../infrastructure/local/cache/IAppCache";
import LocalStorageCache from "../../infrastructure/local/cache/LocalStorageCache";
import IContainer from "../container/IContainer";


export function registerCache(container: IContainer) {
    container.registerLazySingleton<IAppCache>(INJECT_APP_CACHE, () => new LocalStorageCache())
}