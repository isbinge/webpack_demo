const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const glob = require('glob');

const plugins = [
  new CleanWebpackPlugin(),

  new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash:6].css',
    chunkFilename: 'static/css/[name].[contenthash:6].css',
    ignoreOrder: false,
  }),

  // not available

  // new PurifyCSSPlugin({
  //   paths: glob.sync(`${path.join(__dirname, 'src')}/**/*.(tsx)|(js)`, { nodir: true }),
  // }),

  new HtmlWebpackPlugin({
    title: 'webpack demo1',
    template: './src/template.ejs',
    // minify: {
    //   minifyCSS: true,
    // },
  }),
];
if (process.env.OPEN_ANALYZER) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = smp.wrap(
  merge(common, {
    output: {
      publicPath: `http://localhost:${process.env.npm_package_config_port}/`,
    },
    mode: 'production',
    performance: {
      hints: 'warning',
      maxEntrypointSize: 250000,
      maxAssetSize: 450000,
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({
          assetNameRegExp: /\*.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: false,
        }),
      ],
      splitChunks: {
        // maxSize: 200000,
        cacheGroups: {
          styles: {
            name: false,
            test: /\.(sc|sa|c)ss$/,
            chunks: 'all',
            enforce: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendors',
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: 'single',
      moduleIds: 'hashed',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          include: path.resolve(process.cwd(), 'src'),
          use: [
            {
              // loader: 'style-loader',
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   publicPath: (resourcePath, context) => {
              //     // publicPath is the relative path of the resource to the context
              //     // e.g. for ./css/admin/main.css the publicPath will be ../../
              //     // while for ./css/main.css the publicPath will be ../
              //     console.log('---------------------', resourcePath, context);
              //     console.log(path.relative(path.dirname(resourcePath), context) + '/');
              //     return path.relative(path.dirname(resourcePath), context) + '/';
              //   },
              // },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[folder]_[local]_[hash:4]',
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'static/images/[name].[hash:6].[ext]',
                limit: 30000,
                // publicPath: 'static/images',
              },
            },
          ],
        },
      ],
    },
    plugins,
    devServer: {
      contentBase: path.resolve(process.cwd(), 'public'),
      port: process.env.npm_package_config_port,
      // hot: true,
    },
  }),
); 