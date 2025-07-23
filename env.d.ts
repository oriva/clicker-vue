/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        VITE_USE_MOCKS: boolean;
    }
}
