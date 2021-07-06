import IAppCache, {
  INJECT_APP_CACHE,
} from "../../infrastructure/local/cache/IAppCache";
import AppCache from "../../infrastructure/local/cache/AppCache";
import IContainer from "../container/IContainer";
import ICacheStorage, {
  INJECT_CACHE_STORAGE,
} from "../../infrastructure/provider/cache/ICacheStorage";
import WebLocalStorage from "../../infrastructure/provider/cache/WebLocalStorage";

export function registerCache(container: IContainer) {
  container.registerLazySingleton<ICacheStorage>(INJECT_CACHE_STORAGE, () => {
    return new WebLocalStorage();
  });
  container.registerLazySingleton<IAppCache>(
    INJECT_APP_CACHE,
    (c) => new AppCache(c.resolve<ICacheStorage>(INJECT_CACHE_STORAGE))
  );
}
