import './styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import { createHead } from '@vueuse/head';

import App from './App.vue';
import router from './router';

import 'quasar/dist/quasar.sass';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createHead());
app.use(Quasar, {
    plugins: {},
    config: {
        brand: {
            primary: '#6b4f1d',
            secondary: '#d9b382',
            dark: '#3b2c02',
            positive: '#543b14',
            // https://quasar.dev/style/color-palette#Brand-Map
        },
    },
});

app.mount('#app');
