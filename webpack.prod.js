const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimzeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const worker = require('workbox-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        libraryTarget: 'var',
        library: 'Client'

    },
    optimization: {
    minimizer: [new TerserPlugin({}), new OptimzeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: '/\.scss$/',
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
            {
                test: /.css$/, loaders: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {

            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery'
        }),
        new worker.GenerateSW({
            swDest: 'serviceworker.js',
            skipWaiting: true,
            clientsClaim: true
})
    ]
}
