
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
    devServer: {
        contentBase: [
            __dirname + "/target",
            __dirname + "/src/static"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};