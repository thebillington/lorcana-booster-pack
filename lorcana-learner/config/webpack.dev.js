const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function findHtmlFiles(directory) {
  const htmlFiles = [];
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      htmlFiles.push(...findHtmlFiles(filePath));
    } else if (path.extname(file) === '.html') {
      htmlFiles.push(filePath);
    }
  });
  return htmlFiles;
}

function generateHtmlPlugins(directory) {
  const htmlFiles = findHtmlFiles(directory);
  return htmlFiles.map(filePath => {
    const filename = path.relative(directory, filePath);
    return new HtmlWebpackPlugin({
      filename: filename,
      template: filePath
    });
  });
}

const htmlPlugins = generateHtmlPlugins(path.resolve(__dirname, '../src'));

module.exports = {
    mode: "development",
    entry: {
        main: ['webpack-hot-middleware/client', "./src/main.ts"]
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        clean: true,
    },
    devServer: {
        static: "dist",
        hot: true,
        client: {
            overlay: true
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-typescript'
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/[name][ext]'
            }
          },
          {
                test: /\.html$/,
                use: ['html-loader'],
            generator: {
                filename: '[name][ext]'
              }
          },
        ],
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(), ...htmlPlugins
      ],
      resolve: {
        extensions: ['.ts', '.js'],
      },
    };