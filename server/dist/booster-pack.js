"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoosterPack = void 0;
const card_repository_1 = require("./data/card-repository");
function getBoosterPack() {
    return __awaiter(this, void 0, void 0, function* () {
        const cardRepository = new card_repository_1.CardRepository('src/data/card-data.json');
        const cards = yield cardRepository.getCards();
        const groupedCards = {
            common: [],
            uncommon: [],
            rare: [],
            super: [],
            legendary: [],
            enchanted: [],
            special: []
        };
        cards.forEach((card) => {
            const rarity = card.rarity.toLowerCase();
            groupedCards[rarity].push(card);
        });
        const boosterPack = [];
        for (let i = 0; i < 6; i++) {
            const commonCards = groupedCards["common"];
            const randomCommonNumber = Math.floor(Math.random() * groupedCards["common"].length);
            const card = commonCards[randomCommonNumber];
            boosterPack.push(card);
        }
        for (let i = 0; i < 3; i++) {
            const commonCards = groupedCards["uncommon"];
            const randomCommonNumber = Math.floor(Math.random() * groupedCards["uncommon"].length);
            const card = commonCards[randomCommonNumber];
            boosterPack.push(card);
        }
        const oddsSelector = [
            ...Array(135).fill("rare"),
            ...Array(48).fill("super"),
            ...Array(48).fill("legendary")
        ];
        for (let i = 0; i < 2; i++) {
            const rarityRandomNumber = Math.floor(Math.random() * oddsSelector.length);
            const oddsSelectorRarity = oddsSelector[rarityRandomNumber];
            const rarityCards = groupedCards[oddsSelectorRarity];
            const cardRandomNumber = Math.floor(Math.random() * rarityCards.length);
            const card = rarityCards[cardRandomNumber];
            boosterPack.push(card);
        }
        const foilOddsSelector = [
            ...Array(125).fill("common"),
            ...Array(50).fill("uncommon"),
            ...Array(14).fill("rare"),
            ...Array(8).fill("super"),
            ...Array(2).fill("legendary"),
            ...Array(1).fill("enchanted")
        ];
        const foilRandomNumber = Math.floor(Math.random() * foilOddsSelector.length);
        const foilSelectorRarity = oddsSelector[foilRandomNumber];
        const rarityCards = groupedCards[foilSelectorRarity];
        const cardRandomNumber = Math.floor(Math.random() * rarityCards.length);
        const foilCard = rarityCards[cardRandomNumber];
        foilCard.foil = true;
        boosterPack.push(foilCard);
        return boosterPack;
    });
}
exports.getBoosterPack = getBoosterPack;
