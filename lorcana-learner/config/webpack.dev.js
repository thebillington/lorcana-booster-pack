const path = require("path")

module.exports = {
    mode: "development",
    entry: {
        main: "./src/main.js"
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        static: "dist"
    }
};