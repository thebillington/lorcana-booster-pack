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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoosterPack = void 0;
var card_repository_1 = require("./data/card-repository");
function getBoosterPack() {
    return __awaiter(this, void 0, void 0, function () {
        var cardRepository, cards, groupedCards, boosterPack, i, commonCards, randomCommonNumber, card, i, commonCards, randomCommonNumber, card, oddsSelector, i, rarityRandomNumber, oddsSelectorRarity, rarityCards_1, cardRandomNumber_1, card, foilOddsSelector, foilRandomNumber, foilSelectorRarity, rarityCards, cardRandomNumber, foilCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardRepository = new card_repository_1.CardRepository('src/data/card-data.json');
                    return [4 /*yield*/, cardRepository.getCards()];
                case 1:
                    cards = _a.sent();
                    groupedCards = {
                        common: [],
                        uncommon: [],
                        rare: [],
                        super: [],
                        legendary: [],
                        enchanted: [],
                        special: []
                    };
                    cards.forEach(function (card) {
                        var rarity = card.rarity.toLowerCase();
                        groupedCards[rarity].push(card);
                    });
                    boosterPack = [];
                    for (i = 0; i < 6; i++) {
                        commonCards = groupedCards["common"];
                        randomCommonNumber = Math.floor(Math.random() * groupedCards["common"].length);
                        card = commonCards[randomCommonNumber];
                        boosterPack.push(card);
                    }
                    for (i = 0; i < 3; i++) {
                        commonCards = groupedCards["uncommon"];
                        randomCommonNumber = Math.floor(Math.random() * groupedCards["uncommon"].length);
                        card = commonCards[randomCommonNumber];
                        boosterPack.push(card);
                    }
                    oddsSelector = __spreadArray(__spreadArray(__spreadArray([], Array(135).fill("rare"), true), Array(48).fill("super"), true), Array(48).fill("legendary"), true);
                    for (i = 0; i < 2; i++) {
                        rarityRandomNumber = Math.floor(Math.random() * oddsSelector.length);
                        oddsSelectorRarity = oddsSelector[rarityRandomNumber];
                        rarityCards_1 = groupedCards[oddsSelectorRarity];
                        cardRandomNumber_1 = Math.floor(Math.random() * rarityCards_1.length);
                        card = rarityCards_1[cardRandomNumber_1];
                        boosterPack.push(card);
                    }
                    foilOddsSelector = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], Array(125).fill("common"), true), Array(50).fill("uncommon"), true), Array(14).fill("rare"), true), Array(8).fill("super"), true), Array(2).fill("legendary"), true), Array(1).fill("enchanted"), true);
                    foilRandomNumber = Math.floor(Math.random() * foilOddsSelector.length);
                    foilSelectorRarity = oddsSelector[foilRandomNumber];
                    rarityCards = groupedCards[foilSelectorRarity];
                    cardRandomNumber = Math.floor(Math.random() * rarityCards.length);
                    foilCard = rarityCards[cardRandomNumber];
                    foilCard.foil = true;
                    boosterPack.push(foilCard);
                    return [2 /*return*/, boosterPack];
            }
        });
    });
}
exports.getBoosterPack = getBoosterPack;
