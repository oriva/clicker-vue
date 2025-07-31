import axios from 'axios';
import { tokenStorage } from './tokenStorage';
import { useAuthStore } from '@/stores/auth';

export const http = axios.create({ baseURL: '/api' });

// Чекаем хранилище токена, если есть, то кидаем в header
http.interceptors.request.use(config => {
    const t = tokenStorage.get();
    if (t) config.headers.Authorization = `Bearer ${t}`;
    return config;
});

// Для перехвата неавторизованных
http.interceptors.response.use(
    r => r,
    err => {
        if (err.response?.status === 401) {
            // убираем токен и шлём на /login
            const auth = useAuthStore();
            auth.logout();
        }
        return Promise.reject(err);
    },
);
