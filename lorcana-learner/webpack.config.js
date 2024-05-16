var webpack = require("webpack");

module.exports = {
  mode: "development",
  context: __dirname,
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    "./client/client.js",
  ],
  output: {
    path: __dirname,
    publicPath: "/client",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
