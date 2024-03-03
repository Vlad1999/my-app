const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"]
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                exclude: /node_modules/,
                use: ['file-loader']
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: ['@svgr/webpack'],
            },
        ]
    }
}