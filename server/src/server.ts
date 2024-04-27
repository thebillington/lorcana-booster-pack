import express, {Express, Request, Response} from 'express';
import { getBoosterPack } from './booster-pack';
const app : Express = express();
const PORT : number | string  = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello, World!');
});

app.get('/cards/booster-pack', async (req: Request, res: Response) => {
    try {
        const cards = await getBoosterPack();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get cards' });
    }
});

app.listen(PORT, (): void => {
    console.log(`Server is running on http:localhost:${PORT}`);
});