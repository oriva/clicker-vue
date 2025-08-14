interface BaseEntity {
    id: string;
    name: string;
    picture?: string;
}
export interface Monster extends BaseEntity {
    health: number;
    attack: number;
}

export interface Npc extends BaseEntity {
    dialogue: string[];
}

export interface Location extends BaseEntity {
    description: string;
    monsters: Monster[];
    npcs: Npc[];
}
