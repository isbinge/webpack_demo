const path = require('path');
const glob = require('glob');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

const shouldOpenDevServer = process.env.OPEN_SERVER;

module.exports = merge(
  [
    {
      mode: 'production',
    },
    parts.loadTypeScript({
      include: path.resolve(parts.appDirectory, 'src'),
    }),
    parts.loadImages({
      options: {
        limit: 10000,
        name: 'static/images/[name].[hash:5].[ext]',
      },
      use: [
        parts.compressImages({
          bypassOnDebug: true, // webpack@1.x
          disable: true, // webpack@2.x and newer
          // mozjpeg: {
          //   progressive: true,
          //   quality: 65,
          // },
          // // optipng.enabled: false will disable optipng
          // optipng: {
          //   enabled: false,
          // },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          // gifsicle: {
          //   interlaced: false,
          // },
          // // the webp option will enable WEBP
          // webp: {
          //   quality: 75,
          // },
        }),
      ],
    }),
    parts.loadCSS({
      test: /\.(sc|sa|c)ss$/,
      include: path.resolve(parts.appDirectory, 'src'),

      miniCssConfig: {
        filename: 'static/css/[name].[contenthash:5].css',
        chunkFilename: 'static/css/[name].[contenthash:5].css',
      },
      cssLoaderOptions: {
        modules: {
          localIdentName: '[folder]_[local]_[hash:5]',
        },
      },
      use: [parts.autoprefix(), parts.parseScss({})],
    }),
    // parts.purgeCSS({
    //   paths: glob.sync(`${path.resolve(parts.appDirectory, 'src')}/**/*.tsx`, { nodir: true }),
    // }),
    parts.page({
      output: {
        publicPath: `http://${process.env.host}:${process.env.port}/`,
      },
      title: 'demo2-build',
      filename: 'index.html',
    }),
    parts.clean(),
  ].concat(
    shouldOpenDevServer ? parts.devServer({ host: process.env.host, port: process.env.port }) : [],
  ),
);
