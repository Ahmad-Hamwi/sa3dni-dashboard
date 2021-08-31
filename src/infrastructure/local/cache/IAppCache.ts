export default interface IAppCache {
  saveToken(token: string): void;

  getToken(): string | null;

  removeToken(): void;
}

export const INJECT_APP_CACHE = "INJECT_APP_CACHE";