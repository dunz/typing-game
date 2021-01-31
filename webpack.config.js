// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//
// module.exports = {
//     mode: 'none',
//     entry: {
//         router: './router.js',
//         app: './main.js'
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name][chunkhash].js',
//         publicPath: '/'
//     },
//     devServer: {
//         port: 9000
//     },
//     resolve: {
//         modules: ['node_modules'],
//         extensions: ['.js', '.json', '.jsx', '.css'],
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.hbs$/,
//                 loader: 'handlebars-loader'
//             },
//             {
//                 test: /\.css$/,
//                 use: [MiniCssExtractPlugin.loader, 'css-loader']
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: 'index.html',
//             filename: 'index.html'
//         }),
//         new MiniCssExtractPlugin({filename: 'app.css'}),
//         new CleanWebpackPlugin({
//             cleanAfterEveryBuildPatterns: ['dist']
//         })
//     ]
// };

// zero cho
// const webpack = require('webpack');
// module.exports = {
//     mode: 'development',
//     entry: {
//         app: './main.js'
//     },
//     output: {
//         path: '/dist',
//         filename: '[name][chunkhash].js',
//         publicPath: '/'
//     },
//     module: {},
//     plugins: [],
//     optimization: {},
//     resolve: {
//         modules: ['node_modules'],
//         extensions: ['.js', '.ts', '.json', '.jsx', '.css']
//     }
// };

// captain pankyo
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({filename: 'app.css'}),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        })
    ]
};