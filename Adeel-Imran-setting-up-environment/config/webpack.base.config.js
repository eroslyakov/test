const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
    const { PLATFORM, VERSION, NODE_ENV } = env;

    return merge([
        {
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: 'babel-loader',
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: [
                            NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                            'css-loader',
                            'sass-loader',
                        ],
                    },
                ],
            },
            resolve: {
                extensions: ['*', '.js', '.jsx'],
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, '../src/index.html'),
                    filename: path.resolve(__dirname, '../dist/index.html'),
                }),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, '../src/static'),
                    },
                ]),
                new webpack.DefinePlugin({
                    'process.env.VERSION': JSON.stringify(VERSION),
                    'process.env.PLATFORM': JSON.stringify(PLATFORM),
                }),
            ],
        }
    ]);
}
