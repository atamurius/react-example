
module.exports = {
    // configuration
    context: __dirname + "/src/js",
    entry: "./index.jsx",
    output: {
        path: __dirname + "/target",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: [
            __dirname + "/target",
            __dirname + "/src/static"
        ],
        port: 8081,
        host: '0.0.0.0',
        historyApiFallback: {
          index: '/'
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: [
                      "transform-class-properties",
                      "transform-object-rest-spread"
                    ]
                },
            }
        ]
    }
};
