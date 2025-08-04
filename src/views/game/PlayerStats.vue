<script setup lang="ts">
    import { QItem, QItemSection, QItemLabel } from 'quasar';
    import { usePlayerStore } from '@/stores/player';

    const player = usePlayerStore();
</script>

<template>
    <q-list class="q-pa-sm">
        <QItemLabel header class="medieval-font q-px-sm">Персонаж</QItemLabel>

        <QItem>
            <QItemSection avatar>HP</QItemSection>
            <QItemSection class="text-right"
                >{{ player.playerStats.health.current }} /
                {{ player.playerStats.health.max }}</QItemSection
            >
        </QItem>
        <QItem>
            <QItemSection avatar>Уровень</QItemSection>
            <QItemSection class="text-right">{{ player.playerStats.level }}</QItemSection>
        </QItem>
        <QItem>
            <QItemSection avatar>Урон</QItemSection>
            <QItemSection class="text-right">{{ player.totalDamage }}</QItemSection>
        </QItem>
        <QItem>
            <QItemSection avatar>Скорость</QItemSection>
            <QItemSection class="text-right">{{ player.fighterStats.attackSpeed }}с</QItemSection>
        </QItem>
    </q-list>
</template>
