export interface Card {
    color: string;
    id: number;
    inkwell: boolean;
    rarity: string;
    type: string;
    fullIdentifier: string;
    setNumber: number;
    number: number;
    artist: string;
    baseName: string;
    fullName: string;
    simpleName: string;
    subtitle: string;
    cost: number;
    lore: number;
    strength: number;
    willpower: number;
    images: CardImages;
    flavorText: string;
    abilities: string[];
    effects: { name: string; text: string }[];
    subtypes: string[];
    keywordAbilities: string[];
    fullText: string;
    story: string;
    foil: boolean;
}

export interface CardImages {
    full: string;
    thumbnail: string;
    foilMask: string;
}