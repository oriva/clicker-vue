import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import pluginPrettier from 'eslint-plugin-prettier';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],

        rules: {
            'vue/no-v-html': 'off',
            'prettier/prettier': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
            'vue/component-name-in-template-casing': [
                'error',
                'PascalCase',
                { registeredComponentsOnly: true, ignores: [] },
            ],
        },
    },

    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/old/**']),

    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
        plugins: {
            prettier: pluginPrettier,
        },
        rules: {
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        },
    },

    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*'],
    },
    skipFormatting,
);
