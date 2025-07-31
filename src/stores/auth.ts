import { defineStore } from 'pinia';
import { computed, reactive, toRefs } from 'vue';

import { tokenStorage } from '@/services/tokenStorage';
import type { UserProfile } from '@/types';
import * as api from '@/services/authApi';

export const useAuthStore = defineStore('auth', () => {
    const state = reactive({
        token: <string | null>null,
        user: <UserProfile | null>null,
        initialised: false,
    });

    const isAuthenticated = computed(() => !!state.token);

    async function loadAuth() {
        state.token = tokenStorage.get();

        if (state.token) {
            try {
                state.user = await api.loadUserProfile(state.token);
            } catch {
                logout();
            }
        }
        state.initialised = true;
    }

    async function login(email: string, pass: string) {
        const { accessToken, profile } = await api.login(email, pass);
        state.token = accessToken;
        state.user = profile;
        tokenStorage.set(accessToken);
    }

    function logout() {
        state.token = null;
        state.user = null;
        tokenStorage.remove();
    }

    return { ...toRefs(state), loadAuth, login, logout, isAuthenticated };
});
