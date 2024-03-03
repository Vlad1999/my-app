const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  const isProduction = env?.production;

  return {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      modules: [__dirname, 'src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new ESLintWebpackPlugin({
        context: 'src',
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules'],
        fix: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          ],
        },
        {
          test: /\.scss$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          exclude: /node_modules/,
          use: ['file-loader'],
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
  };
};
