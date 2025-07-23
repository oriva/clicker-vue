export const tokenKey = 'auth-token';

export interface TokenStorage {
    get(): string | null;
    set(token: string): void;
    remove(): void;
}

export const localTokenStorage: TokenStorage = {
    get: () => localStorage.getItem(tokenKey),
    set: t => localStorage.setItem(tokenKey, t),
    remove: () => localStorage.removeItem(tokenKey),
};

export const tokenStorage: TokenStorage = localTokenStorage;
