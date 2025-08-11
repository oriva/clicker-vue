export interface Monster {
    id: string;
    name: string;
    health: number;
    attack: number;
    picture?: string;
}

export interface Npc {
    id: string;
    name: string;
    dialogue: string[];
    picture?: string;
}

export interface Location {
    id: string;
    name: string;
    description: string;
    picture?: string;
    monsters: Monster[];
    npcs: Npc[];
}
