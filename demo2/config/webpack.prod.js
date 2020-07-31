const path = require('path');
// const glob = require('glob');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const common = require('./webpack.common');

const shouldOpenDevServer = process.env.OPEN_SERVER;
const openAnalyzer = process.env.OPEN_ANAL;
console.log(openAnalyzer, '-----------------------------');
module.exports = merge(
  [
    common,
    {
      mode: 'production',
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
            },
          },
          minSize: 10000,
          maxSize: 25000,
        },
        runtimeChunk: {
          name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
        moduleIds: 'hashed',
      },

      node: false,
    },
    parts.generateSourceMap(false),
    parts.loadTypeScript({
      include: path.resolve(parts.appDirectory, 'src'),
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
    }),
    parts.minifyJavaScript(),
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

      miniCssExtractConfig: {
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
    parts.minifyCSS({
      options: {
        preset: ['default', { discardComments: { removeAll: true } }],
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true,
      },
    }),
    // parts.purgeCSS({
    //   paths: glob.sync(`${path.resolve(parts.appDirectory, 'src')}/**/*.tsx`, { nodir: true }),
    // }),

    parts.page({
      output: {
        path: path.resolve(parts.appDirectory, 'dist'),
        publicPath: `/`,
      },
      title: 'demo2-build',
      filename: 'index.html',
      options: {
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          miniCSS: true,
          miniURLS: true,
        },
      },
    }),
    // parts.useDll(),
    parts.setFreeVariable('author', 'isbinge'),
    parts.attachRevisions(),
    parts.clean(),
  ].concat(
    shouldOpenDevServer ? parts.devServer({ host: process.env.host, port: process.env.port }) : [],
  ),
  // .concat(openAnalyzer ? [parts.analyzeBundle()] : []),
);
