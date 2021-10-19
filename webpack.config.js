const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
         filename: "bundle.js",
         path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [miniCss.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "imgs/",
                            publicPath: 'imgs/',
                            esModule: false,
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),
        new miniCss()    
]
}