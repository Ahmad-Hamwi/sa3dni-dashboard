import IAppCache from "./IAppCache";
import { TOKEN_CACHE_KEY } from "./cache_constants";
import ICacheStorage from "../../provider/cache/ICacheStorage";

export default class AppCache implements IAppCache {
  constructor(private readonly cacheStorage: ICacheStorage) {}

  getToken(): string | null {
    return this.cacheStorage.getString(TOKEN_CACHE_KEY);
  }

  saveToken(token: string): void {
    this.cacheStorage.putString(TOKEN_CACHE_KEY, token);
  }

  removeToken(): void {
    this.cacheStorage.clean(TOKEN_CACHE_KEY);
  }
}
