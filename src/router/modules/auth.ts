import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginPage.vue'),
        meta: {
            guestOnly: true,
            head: {
                title: 'Авторизация и регистрация',
                meta: [{ name: 'description', content: '' }],
            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/LoginPage.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/forgot',
        name: 'forgot',
        component: () => import('@/views/auth/PasswordReset.vue'),
        meta: { title: 'Восстановление пароля', guestOnly: true },
    },
];
