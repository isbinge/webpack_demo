const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
      {
        test: /\.(sc|sa|c)ss$/,
        include: path.resolve(process.cwd(), 'src'),
        use: [
          {
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader,
            options: {
              // esModule: true,
              hmr: true,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[folder]_[local]_[hash:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000,
              name: 'static/images/[name].[hash:5].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack demo1',
      template: './src/template.ejs',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].[contenthash:6].contenthash.css',
    }),
  ],
  devServer: {
    stats: 'errors-only',
    contentBase: path.resolve(process.cwd(), 'dist'),
    port: process.env.npm_package_config_port,
    proxy: {
      '/api': 'http://localhost:8080',
    },
    hot: true,
  },
});
