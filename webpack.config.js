// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/main.js'
    ],
    mode: 'development',
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'main.min.js',
    },
    devServer: {
        contentBase: __dirname + "/build",
        compress: false,
        port: 8080,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ["@babel/preset-env"],
                plugins: [
                    "@babel/plugin-syntax-jsx",
                    ["@babel/plugin-transform-react-jsx", { pragma: "dom" }]
                ]
            }
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    resolve: {
        extensions: ['.js']
    },
}
