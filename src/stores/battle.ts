import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Monster } from '@/types';
import { usePlayerStore } from './player';

export const useBattleStore = defineStore('battle', () => {
    const activeMonster = ref<Monster | null>(null);
    const monsterHealth = ref(0);
    const player = usePlayerStore();

    const isActive = computed(() => activeMonster.value !== null);

    function start(monster: Monster) {
        activeMonster.value = monster;
        monsterHealth.value = monster.health;
    }

    function attack() {
        if (!activeMonster.value) return;

        monsterHealth.value = Math.max(0, monsterHealth.value - player.totalDamage);
        if (monsterHealth.value === 0) {
            finish(true);
            return;
        }

        player.playerStats.health.current = Math.max(
            0,
            player.playerStats.health.current - activeMonster.value.attack,
        );
        if (player.playerStats.health.current === 0) {
            finish(false);
        }
    }

    function finish(victory: boolean) {
        activeMonster.value = null;
        monsterHealth.value = 0;
        if (victory) {
        }
    }

    return { activeMonster, monsterHealth, isActive, start, attack, finish };
});
