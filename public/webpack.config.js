var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: __dirname + "/src/index",
    output: {
        path: __dirname + "/javascripts",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        })
    ]
};