const path = require('path');
const glob = require('glob');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  { mode: 'development' },
  parts.generateSourceMap('cheap-module-eval-source-map'),
  parts.loadTypeScript({
    include: path.resolve(parts.appDirectory, 'src'),
  }),
  parts.loadImages({
    options: {
      limit: 10000,
      name: '[name].[hash:5].[ext]',
    },
  }),
  parts.loadCSS({
    test: /\.(sc|sa|c)ss$/,
    include: path.resolve(parts.appDirectory, 'src'),
    miniCssLoaderOptions: {
      hmr: true,
      reloadAll: true,
    },
    cssLoaderOptions: {
      modules: {
        localIdentName: '[folder]_[name]_[hash:5]',
      },
      sourceMap: true,
    },
    use: [parts.autoprefix(), parts.parseScss({})],
  }),
  //   parts.extractCSS({}),
  parts.purgeCSS({
    paths: glob.sync(`${path.resolve(parts.appDirectory, 'src')}/**/*.tsx`, { nodir: true }),
  }),
  parts.setFreeVariable('process.env.NODE_ENV', 'development'),
  parts.devServer({
    port: process.env.port,
    host: process.env.host,
  }),
  parts.page({
    output: {
      filename: '[name].[hash:5].hash.js',
      chunkFilename: '[name].[contenthash:5].contenthash.js',
      path: path.resolve(parts.appDirectory, 'dist'),
      publicPath: '/',
    },
    title: 'demo2',
    filename: 'index.html',
  }),
  parts.clean(),
]);
