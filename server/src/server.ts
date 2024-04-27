import express, {Express, Request, Response} from 'express';

const app : Express = express();
const PORT : number | string  = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello, World!');
});

app.listen(PORT, (): void => {
    console.log(`Server is running on http:localhost:${PORT}`);
});