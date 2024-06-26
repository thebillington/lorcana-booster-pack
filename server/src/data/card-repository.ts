import { JsonUtilityClass } from "./json-utility";
import { Card } from "../entities/card/card";

export class CardRepository {
    private cardsFilePath: string;

    constructor(filePath: string){
        this.cardsFilePath = filePath;
    }

    async getCards(): Promise<Card[]> {
        try {
            const jsonData = await JsonUtilityClass.fetchJsonFromUrl<any>("https://lorcanajson.org/files/current/en/allCards.json");
            if (!jsonData.cards || !Array.isArray(jsonData.cards)) {
                throw new Error('Invalid JSON format: "cards" field not found or not an array');
            }
            const cards: Card[] = jsonData.cards;
            return cards;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw new Error('Failed to get cards from JSON file');
        }
    }
}