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
exports.CardRepository = void 0;
const json_utility_1 = require("./json-utility");
class CardRepository {
    constructor(filePath) {
        this.cardsFilePath = filePath;
    }
    getCards() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = yield json_utility_1.JsonUtilityClass.readJsonFromFile(this.cardsFilePath);
                if (!jsonData.cards || !Array.isArray(jsonData.cards)) {
                    throw new Error('Invalid JSON format: "cards" field not found or not an array');
                }
                const cards = jsonData.cards;
                return cards;
            }
            catch (error) {
                console.error('Error reading JSON file:', error);
                throw new Error('Failed to get cards from JSON file');
            }
        });
    }
}
exports.CardRepository = CardRepository;
