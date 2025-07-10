import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './modules/auth'

const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/IndexPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/PageNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...baseRoutes, ...authRoutes],
})

export default router
