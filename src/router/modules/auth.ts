import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: () => import('@/views/auth/PasswordReset.vue'),
    meta: { guestOnly: true },
  },
]
