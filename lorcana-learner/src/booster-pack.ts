import { CardRepository } from "./data/card-repository";
import { Card } from "./entities/card/card";

export async function getBoosterPack() {
    const cardRepository = new CardRepository('src/data/card-data.json');
    const cards: Card[] = await cardRepository.getCards();
    const groupedCards: { [key: string]: Card[] } = {
        common: [],
        uncommon: [],
        rare: [],
        super: [],
        legendary: [],
        enchanted: [],
        special: []
    };


    cards.forEach((card: Card) => {
        const rarity = card.rarity.toLowerCase();
        groupedCards[rarity].push(card);
    });

    const boosterPack : Card[] = [];

    for(let i = 0; i < 6; i++) {
        const commonCards = groupedCards["common"];
        const randomCommonNumber = Math.floor(Math.random() * groupedCards["common"].length)
        const card = commonCards[randomCommonNumber];
        boosterPack.push(card);
    }
    for(let i = 0; i < 3; i++) {
        const commonCards = groupedCards["uncommon"];
        const randomCommonNumber = Math.floor(Math.random() * groupedCards["uncommon"].length)
        const card = commonCards[randomCommonNumber];
        boosterPack.push(card);
    }

    const oddsSelector: string[] = [
        ...Array<string>(135).fill("rare"),
        ...Array<string>(48).fill("super"),
        ...Array<string>(48).fill("legendary")
    ];

    for(let i = 0; i < 2; i++) {
        const rarityRandomNumber = Math.floor(Math.random() * oddsSelector.length)
        const oddsSelectorRarity = oddsSelector[rarityRandomNumber];
        const rarityCards = groupedCards[oddsSelectorRarity];
        const cardRandomNumber = Math.floor(Math.random() * rarityCards.length);
        const card = rarityCards[cardRandomNumber];
        boosterPack.push(card);
    }

    const foilOddsSelector: string[] = [
        ...Array<string>(125).fill("common"),
        ...Array<string>(50).fill("uncommon"),
        ...Array<string>(14).fill("rare"),
        ...Array<string>(8).fill("super"),
        ...Array<string>(2).fill("legendary"),
        ...Array<string>(1).fill("enchanted")
    ];

    const foilRandomNumber = Math.floor(Math.random() * foilOddsSelector.length)
    const foilSelectorRarity = oddsSelector[foilRandomNumber];
    const rarityCards = groupedCards[foilSelectorRarity];
    const cardRandomNumber = Math.floor(Math.random() * rarityCards.length);
    const foilCard = rarityCards[cardRandomNumber];
    foilCard.foil = true;
    boosterPack.push(foilCard);

    return boosterPack;
}