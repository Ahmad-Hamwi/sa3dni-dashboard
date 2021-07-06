export default interface ICacheStorage {
  putString(key: string, value: string): void;

  putNumber(key: string, value: number): void;

  putBoolean(key: string, value: boolean): void;

  putObject(key: string, value: object): void;

  getString(key: string, defaultValue?: string): string;

  getNumber(key: string, defaultValue?: number): number;

  getBoolean(key: string, defaultValue?: boolean): boolean;

  getObject(key: string, defaultValue?: object): object;

  clean(key: string): void;
}

export const INJECT_CACHE_STORAGE = "INJECT_CACHE_STORAGE";
