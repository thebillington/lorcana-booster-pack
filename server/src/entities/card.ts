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
    images: {
        full: string;
        thumbnail: string;
        foilMask: string;
    };
    flavorText: string;
    effects: { name: string; text: string }[];
    subtypes: string[];
    fullText: string;
    story: string;
}