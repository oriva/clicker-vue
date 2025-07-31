import { http } from './httpClient';
import type { UserProfile } from '@/types';

export async function login(email: string, password: string) {
    const { data } = await http.post('/auth/login', { email, password });
    return data as { accessToken: string; profile: UserProfile };
}

export async function register(payload: { email: string; name: string; password: string }) {
    const { data } = await http.post('/auth/register', payload);
    return data as { accessToken: string; profile: UserProfile };
}

export async function loadUserProfile(token: string) {
    const { data } = await http.get('/auth/user-profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data as UserProfile;
}
