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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const card_repository_1 = require("./data/card-repository");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
const cardRepository = new card_repository_1.CardRepository('src/data/card-data.json');
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/cards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield cardRepository.getCards();
        res.json(cards);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get cards' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http:localhost:${PORT}`);
});
