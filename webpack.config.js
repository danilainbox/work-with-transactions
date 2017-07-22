var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './app/app.js',

    output: {
        path: 'public',
        filename: 'bundle.js',
        publicPath: '/'
    },

    plugins: process.env.NODE_ENV === 'production' ? [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'bootstrap': 'bootstrap'
            }),
            new ExtractTextPlugin('bundle.css')
        ] : [
            new ExtractTextPlugin('bundle.css'),
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'bootstrap': 'bootstrap'
            })
        ],

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name].[ext]" }
        ]
    }
};
