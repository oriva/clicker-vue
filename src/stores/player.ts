import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import type { Item, Slot } from '@/types';

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

    const equipment = reactive<Record<Slot, Item | null>>({
        weapon: null,
        head: null,
        body: null,
        legs: null,
    });

    const equipValues = () => Object.values(equipment) as (Item | null)[];

    const sumEquip = (pick: (i: Item) => number) =>
        equipValues().reduce((acc, it) => acc + (it ? pick(it) : 0), 0);

    const flatAttackFromEquip = computed(() => sumEquip(i => (i as Item)?.baseStats?.attack ?? 0));

    const totalDamage = computed(() =>
        Math.max(0, fighterStats.baseDamage + flatAttackFromEquip.value),
    );

    return { playerStats, fighterStats, equipment, totalDamage };
});
