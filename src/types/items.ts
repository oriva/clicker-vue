export type Slot = 'weapon' | 'head' | 'body' | 'legs';

export interface ItemBaseStats {
    attack?: number;
    attackSpeed?: number; // attacks per second
    armorPen?: number; // 0..1
    hp?: number; // flat bonus to max HP
    mana?: number; // flat bonus to max Mana
}

export interface Item {
    id: string;
    name: string;
    slot: Slot;
    rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    baseStats: ItemBaseStats;
}

export interface ItemWithPicture extends Item {
    picture: string;
}
