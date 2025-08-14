export type Resource = { max: number; current: number };

export interface PlayerStats {
    health: Resource;
    mana: Resource;
    experience: number;
    level: number;
    gold: number;
}

export interface FighterStats {
    baseDamage: number;
    attackSpeed: number;
    armorPen: number;
    critChance?: number;
    critMultiplier?: number;
}
