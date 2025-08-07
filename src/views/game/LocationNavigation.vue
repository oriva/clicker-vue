<script setup lang="ts">
    import { QList, QItem, QItemSection, QItemLabel } from 'quasar';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    import { useLocationsStore } from '@/stores/location';

    const locations = useLocationsStore();
    const router = useRouter();

    onMounted(() => {
        locations.load();
    });

    function go(id: string) {
        locations.select(id);
        router.push({ name: 'location', params: { locationId: id } });
    }
</script>
<template>
    <QList class="q-pa-sm">
        <QItemLabel header class="medieval-font q-px-sm">Локации</QItemLabel>
        <QItem
            v-for="loc in locations.locations"
            :key="loc.id"
            clickable
            :active="loc.id === locations.currentId"
            @click="go(loc.id)"
        >
            <QItemSection>{{ loc.name }}</QItemSection>
        </QItem>
    </QList>
</template>
