import { http } from './httpClient';
import type { Location } from '@/types';

export async function fetchLocations(): Promise<Location[]> {
    const { data } = await http.get('/locations');
    return data.locations;
}

export async function fetchLocation(id: string): Promise<Location> {
    const { data } = await http.get(`/locations/${id}`);
    return data.location;
}
