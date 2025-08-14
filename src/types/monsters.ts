import type { Item } from './items';

export interface DropEntry {
    item: Item;
    chance: number;
    minQty?: number;
    maxQty?: number;
}

export interface Monster {
    id: string;
    name: string;
    health: number;
    attack: number;
    experience?: number;
    goldMin?: number;
    goldMax?: number;
    drops?: DropEntry[];
}

export type DropResult = { item: Item; qty: number } | null;

type isVictory<T> = T extends { gold: number; drops: DropResult[] } ? true : false;

export interface BattleOutcome {
    victory: isVictory<this>;
    xp: number;
    gold?: number;
    drops?: DropResult[];
}

export interface CombatRewardsConfig {
    xp?: number;
    goldMin?: number;
    goldMax?: number;
    drops?: DropEntry[];
}
