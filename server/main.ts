import express, {Express, Request, Response} from 'express';
import { loadDeckFromBase64 } from './src/deck';
import { getBoosterPack } from './src/booster-pack';
const app : Express = express();
const PORT : number | string  = process.env.PORT || 3000;

app.use(express.json());

const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const config = require('../config/webpack.dev');
const compiler = webpack(config);

const webpackDevMiddlware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

app.use(webpackDevMiddlware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

const staticMiddleware = express.static("dist");

app.use(staticMiddleware);

app.get('/api/deck', async (req: Request, res: Response) => {
    try {
        const encodedString: string = req.query.encodedString as string;
        const cards = await loadDeckFromBase64(encodedString);
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get cards' });
    }
});

app.get('/api/booster', async (req: Request, res: Response) => {
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