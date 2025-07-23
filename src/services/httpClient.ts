import axios from 'axios';
import { tokenStorage } from './tokenStorage';

export const http = axios.create({ baseURL: '/api' });

http.interceptors.request.use(config => {
    const t = tokenStorage.get();
    if (t) config.headers.Authorization = `Bearer ${t}`;
    return config;
});
