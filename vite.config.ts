import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            src: fileURLToPath(new URL('./src', import.meta.url)),
            components: fileURLToPath(new URL('./src/components', import.meta.url)),
            views: fileURLToPath(new URL('./src/views', import.meta.url)),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        watch: {
            usePolling: true,
            interval: 100,
        },
        allowedHosts: ['vue-clicker.local', 'localhost'],
    },
});
