const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: './src/index.js', // defines ./src/index.js as the main file to be  used with webpack
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // searchs for all .js files, those files will be transpiled with babel
                exclude: /node_modules/, // excludes node_modules folder from the search
                use: {
                    loader: 'babel-loader' // defines babel-loader to be the transpiler used with those files
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }), // defines the plugin which will be used to generate the html file in the build
        new Dotenv()
    ]
}