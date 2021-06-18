import IAppCache from "./IAppCache";
import {TOKEN_CACHE_KEY} from "./cache_constants";

export default class LocalStorageCache implements IAppCache {

    getToken(): string | null {
        return localStorage.getItem(TOKEN_CACHE_KEY);
    }

    saveToken(token: string): void {
        localStorage.setItem(TOKEN_CACHE_KEY, token);
    }

}