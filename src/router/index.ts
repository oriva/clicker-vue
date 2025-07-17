import { createRouter, createWebHistory } from 'vue-router';
import { useHead } from '@vueuse/head';

import { authRoutes } from './modules/auth';

const baseRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/IndexPage.vue'),
        meta: {
            head: {
                title: 'Орден Дряхлого Дуба — средневековый кликер‑приключение в мире монстров и тайных лесов',
                meta: [
                    {
                        name: 'description',
                        content:
                            'Вступай в Орден Дряхлого Дуба: странствуй по лесам и горам, кликай, чтобы побеждать чудовищ, прокачивай навыки и стань легендой Средневековья!',
                    },
                ],
            },
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/PageNotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...baseRoutes, ...authRoutes],
});

type HeadMeta = {
    head?: Record<string, unknown>;
};

router.afterEach(to => {
    const meta = to.meta as HeadMeta;
    if (meta?.head) useHead(meta.head);
});

export default router;
