const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
        port: 8000,
        watchContentBase: true,
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public' }
        ],
        {
            ignore: ['index.html']
        }),
        new HtmlWebpackPlugin({
            inject: 'head',
            template: 'public/index.html'
        }),
    ]
};
