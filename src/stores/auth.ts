import { defineStore } from 'pinia';
import { ref } from 'vue';

import { tokenStorage } from '@/services/tokenStorage';

interface User {
    id: number;
    username: string;
    email: string;
}

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const user = ref<User | null>(null);

    async function loadAuth() {
        token.value = tokenStorage.get();

        if (token.value) {
            try {
                // user.value = await api.fetchMe(token.value);
            } catch {
                logout();
            }
        }
    }

    function logout() {
        token.value = null;
        user.value = null;
        tokenStorage.remove();
    }

    return { loadAuth, token };
});
