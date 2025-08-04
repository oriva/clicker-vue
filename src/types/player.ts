export interface Item {
    id: string;
    name: string;
    type: 'weapon' | 'armor' | 'misc';
    baseStats: { attack?: number; armorPen?: number; defense?: number };
    maxEnhance: number;
}
