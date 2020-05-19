const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    output: {
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [ 
                        '@babel/preset-env',
                        '@babel/react', 
                        {
                            "plugins": [
                                "@babel/plugin-proposal-class-properties",
                            ]
                        }
                    ]
                }
            },
            {
              test: /\.html$/,
              use: [
                {
                  loader: "html-loader"
                }
              ]
            }, 
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./build/index.html"
        })
        
    ]
}