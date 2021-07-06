import ICacheStorage from "./ICacheStorage";

export default class WebLocalStorage implements ICacheStorage {
  getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = localStorage.getItem(key);
    return value ? Boolean(JSON.parse(value)) : defaultValue ?? false;
  }

  getNumber(key: string, defaultValue?: number): number {
    const value = localStorage.getItem(key);
    return value ? Number(value) : defaultValue ?? -1;
  }

  getObject(key: string, defaultValue?: object): object {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue ?? null;
  }

  getString(key: string, defaultValue?: string): string {
    const value = localStorage.getItem(key);
    return value ? value : defaultValue ?? "";
  }

  putBoolean(key: string, value: boolean): void {
    localStorage.setItem(key, value.toString());
  }

  putNumber(key: string, value: number): void {
    localStorage.setItem(key, value.toString());
  }

  putObject(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  putString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  clean(key: string): void {
    localStorage.removeItem(key);
  }
}
