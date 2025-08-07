import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import type { Location } from '@/types';
import * as api from '@/services/locationsApi';

export const useLocationsStore = defineStore('locations', () => {
    const locations = ref<Location[]>([]);
    const currentId = ref<string | null>(null);

    const current = computed(() => locations.value.find(l => l.id === currentId.value) || null);

    async function load() {
        locations.value = await api.fetchLocations();
        if (!currentId.value && locations.value.length) currentId.value = locations.value[0].id;
    }

    function select(id: string) {
        currentId.value = id;
    }

    return { locations, currentId, current, load, select };
});
