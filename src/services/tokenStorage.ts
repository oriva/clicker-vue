export const tokenKey = 'auth-token';

export interface TokenStorage<T> {
    get(): T | null;
    set(token: T): void;
    remove(): void;
}

export const localTokenStorage: TokenStorage<string> = {
    get: () => localStorage.getItem(tokenKey),
    set: t => localStorage.setItem(tokenKey, t),
    remove: () => localStorage.removeItem(tokenKey),
};

export const tokenStorage: TokenStorage<string> = localTokenStorage;
