export default interface IAppCache {

    saveToken(token: string): void

    getToken(): string | null
}

export const INJECT_APP_CACHE = "INJECT_APP_CACHE";