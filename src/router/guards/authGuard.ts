import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export async function authGuard(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
) {
    const auth = useAuthStore();
    console.log('auth', auth.initialised);

    if (!auth.initialised) await auth.loadAuth();

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next({ name: 'login' });
        return;
    }
    if (to.meta.guestOnly && auth.isAuthenticated) {
        next({ name: 'play' });
        return;
    }
    next();
}
