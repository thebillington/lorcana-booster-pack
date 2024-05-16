import express, { Express, Request, Response } from "express";
import { webpack } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { getBoosterPack } from "./src/booster-pack";
const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());

(function () {
  console.log(process.env.WEBPACK_CONFIG); 
  const webpackConfig = require(process.env.WEBPACK_CONFIG
    ? process.env.WEBPACK_CONFIG
    : "./webpack.config");
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    })
  );
})();

app.get("/", function (req: Request, res: Response) {
  res.sendFile(__dirname + "/client/index.html");
});

app.get("/cards/booster-pack", async (req: Request, res: Response) => {
  try {
    const cards = await getBoosterPack();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to get cards" });
  }
});

app.listen(PORT, (): void => {
  console.log(`Server is running on http:localhost:${PORT}`);
});
