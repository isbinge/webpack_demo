const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const dotEnv = require('dotenv');

dotEnv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const appDirectory = fs.realpathSync(process.cwd());

exports.appDirectory = appDirectory;

exports.page = ({
  output,
  filename,
  title,
  options,
  template = path.resolve(appDirectory, 'src/template.ejs'),
}) => ({
  context: path.resolve(appDirectory, 'src'),
  entry: {
    main: path.resolve(appDirectory, 'src/index.tsx'),
  },
  output,
  plugins: [
    new HtmlWebpackPlugin({
      filename,
      template,
      title,
      ...options,
    }),
  ],
});

exports.loadTypeScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      // {
      //   loader: 'inspect-loader',
      //   options: {
      //     callback(inspect) {
      //       console.log('start to inspect loader flow');
      //       console.log(inspect.arguments);
      //       console.log(inspect.context);
      //       console.log(inspect.options);
      //     },
      //   },
      // },
      {
        test: /\.tsx?$/,
        include,
        exclude,
        use: 'ts-loader',
        options,
      },
    ],
  },
});
exports.loadImages = ({ include, exclude, options, use = [] }) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options,
          },
        ].concat(use),
      },
    ],
  },
});
exports.compressImages = (options) => ({
  loader: 'image-webpack-loader',
  options,
});
exports.loadCSS = ({
  test,
  include,
  exclude,
  miniCssLoaderOptions,
  miniCssConfig,
  cssLoaderOptions,
  use = [],
}) => {
  const plugin = new MiniCssExtractPlugin(miniCssConfig);

  const defaultLoaders = [{ loader: 'css-loader', options: cssLoaderOptions }].concat(use);
  return {
    module: {
      rules: [
        {
          test: { test },
          include,
          exclude,
          use: [
            process.env.NODE_ENV === 'development'
              ? 'style-loader'
              : { loader: MiniCssExtractPlugin.loader, options: miniCssLoaderOptions },
          ].concat(defaultLoaders),
        },
      ],
    },
    plugins: process.env.NODE_ENV === 'development' ? [] : [plugin],
  };
};
exports.parseScss = ({ options }) => ({
  loader: 'sass-loader',
  options,
});
exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()],
  },
});
/* @deprecated. Do not use*/
exports.extractCSS = (miniCssConfig) => {
  const plugin = new MiniCssExtractPlugin(miniCssConfig);
  return {
    // module: {
    //   rules: [
    //     {
    //       test,
    //       include,
    //       exclude,
    //       use: [
    //         {
    //           loader: MiniCssExtractPlugin.loader,
    //           options: miniCssOptions,
    //         },
    //       ].concat(use),
    //     },
    //   ],
    plugins: [plugin],
  };
};
exports.purgeCSS = (options) => {
  return {
    plugins: [new PurgecssPlugin(options)],
  };
};
exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()],
});
exports.devServer = ({ host, port }) => ({
  devServer: {
    host,
    port,
    contentBase: path.resolve(appDirectory, 'dist'),
    stats: true,
    hot: true,
    open: true,
  },
});

exports.generateSourceMap = (type) => ({
  devtool: type,
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);
  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};
