const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },  
            
            {
                test:/\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
			}
        ]
    },
    output: {
        filename: 'script.min.js',
        path: path.resolve(__dirname, "dist"),
    },
    plugins:[
        new HtmlWebpackPlugin(
            {
                hash: true,
                title:'Svg Cr',
                template: './public/index.html'
            }
        ),
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[name].css"
         }),
    ]
};