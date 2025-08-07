<script setup lang="ts">
    import { useLocationsStore } from '@/stores/location';
    import { useRoute } from 'vue-router';
    import { onMounted, watch } from 'vue';

    const locations = useLocationsStore();
    const route = useRoute();

    async function init() {
        await locations.load();
        const id = route.params.locationId as string | undefined;
        if (id) locations.select(id);
    }

    onMounted(init);
    watch(
        () => route.params.locationId,
        id => {
            if (typeof id === 'string') locations.select(id);
        },
    );
</script>

<template>
    <div class="q-pa-md column">
        <div v-if="locations.current" class="column q-gutter-md">
            <h2 class="medieval-font">{{ locations.current.name }}</h2>
            <p>{{ locations.current.description }}</p>
            <div v-if="locations.current.monsters.length">
                <h3>Монстры</h3>
                <div class="entities-list q-gutter-sm">
                    <div
                        v-for="monster in locations.current.monsters"
                        :key="monster.name"
                        class="entity monster"
                    >
                        <img :src="monster.picture" :alt="monster.name" />
                        <span>{{ monster.name }}</span>
                    </div>
                </div>
            </div>
            <div v-if="locations.current.npcs.length">
                <h3>NPC</h3>
                <div class="entities-list q-gutter-sm">
                    <div v-for="npc in locations.current.npcs" :key="npc.name" class="entity npc">
                        <img :src="npc.picture" :alt="npc.name" />
                        <span>{{ npc.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Локация не найдена</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .entity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.5rem;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 4px;

        img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 4px;
        }

        &.monster img {
            border: 2px solid #b71c1c;
        }

        &.npc img {
            border: 2px solid #1e88e5;
        }
    }
</style>
