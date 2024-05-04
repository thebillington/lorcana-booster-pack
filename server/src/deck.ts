import { CardRepository } from "./data/card-repository";
import { Card } from "./entities/card/card";

export async function loadDeckFromBase64(encodedDeck: string) {
    const cardRepository = new CardRepository('server/src/data/card-data.json');
    const cards: Card[] = await cardRepository.getCards();

    const deck : Card[] = [];
    for (let card of cards) {
        if (card.rarity == "Special" || card.rarity == "Enchanted") continue;
        for (let decodedCard of atob(encodedDeck).split("|")) {
            const cardComponents: string[] = decodedCard.split(/[_$]/);
            if(card.baseName.toLowerCase() == cardComponents[0].toLowerCase()) {
                if (card.subtitle == cardComponents[1]) {
                    for (let i = 0; i < +cardComponents[2]; i++) {
                        deck.push(card);
                        continue;
                    }
                    continue;
                } else if (cardComponents[2] == undefined) {
                    for (let i = 0; i < +cardComponents[1]; i++) {
                        deck.push(card);
                    }
                    continue;
                }
            }
        }
    }

    return deck;
}