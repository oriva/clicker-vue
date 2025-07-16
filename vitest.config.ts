import { fileURLToPath, URL } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/**'],
            root: fileURLToPath(new URL('./', import.meta.url)),
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                src: fileURLToPath(new URL('./src', import.meta.url)),
                components: fileURLToPath(new URL('./src/components', import.meta.url)),
                views: fileURLToPath(new URL('./src/views', import.meta.url)),
            },
        },
    }),
);
