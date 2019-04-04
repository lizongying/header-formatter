const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const name ='Header Formatter';

module.exports = {
    mode: 'production',
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.join(__dirname, './dist')
    },
    entry: {
        options: './src/js/options',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist', 'zip']),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'options.html',
            template: './src/options.html',
            chunks: ['options'],
            title: name,
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                sortAttributes: true,
                sortClassName: true,
                useShortDoctype: true,
            },
        }),
        new CopyWebpackPlugin([
            {
                from: './src/manifest.json',
                to: path.join(__dirname, './dist/manifest.json'),
            },
            {
                from: './src/_locales',
                to: path.join(__dirname, './dist/_locales'),
            },
        ]),
        new ZipPlugin({
            path: '../zip',
            filename: name,
            pathPrefix: 'dist',
        })
    ],
};