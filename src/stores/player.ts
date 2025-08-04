import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import type { Item } from '@/types';

export const usePlayerStore = defineStore('player', () => {
    const playerStats = reactive({
        health: { max: 100, current: 100 },
        mana: { max: 50, current: 50 },
        experience: 0,
        level: 1,
        gold: 0,
    });
    const fighterStats = reactive({
        baseDamage: 10,
        attackSpeed: 0.8,
        armorPen: 0.1,
    });
    const equipment = reactive<Record<'weapon' | 'head' | 'body' | 'legs', Item | null>>({
        weapon: null,
        head: null,
        body: null,
        legs: null,
    });

    const totalDamage = computed(
        () => fighterStats.baseDamage + (equipment.weapon?.baseStats.attack ?? 0),
    );

    return { playerStats, fighterStats, equipment, totalDamage };
});
