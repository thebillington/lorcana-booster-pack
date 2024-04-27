import express, {Express, Request, Response} from 'express';
import { CardRepository } from './data/card-repository';
const app : Express = express();
const PORT : number | string  = process.env.PORT || 3000;

app.use(express.json());

const cardRepository = new CardRepository('src/data/card-data.json');

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello, World!');
});

app.get('/cards', async (req: Request, res: Response) => {
    try {
        const cards = await cardRepository.getCards();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get cards' });
    }
});

app.listen(PORT, (): void => {
    console.log(`Server is running on http:localhost:${PORT}`);
});