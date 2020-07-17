const path = require('path');
const dotEnv = require('dotenv');
const Webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

if (process.env.NODE_ENV !== 'production') {
  dotEnv.config({
    path: path.resolve(__dirname, '..', '.env'),
  });
}
const appSourcePath = path.resolve(process.cwd(), 'src');
const appDistPath = path.resolve(process.cwd(), 'dist');

console.log(process.env.NODE_ENV, process.env.ANAL, '-------------------');

module.exports = {
  entry: {
    main: appSourcePath,
  },
  output: {
    path: appDistPath,
    filename: '[name].[hash:6].hash.js',
    chunkFilename: '[id].[contenthash:6].contenthash.js',
    publicPath: '',
    // publicPath: 'http://localhost:8080/dist/',
  },
  resolve: {
    modules: [appSourcePath, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.ejs'],
    alias: {
      '@': appSourcePath,
      '@assets': path.resolve(appSourcePath, 'assets'),
    },
  },
  plugins: [
    new Webpack.DefinePlugin({
      HELLO:
        process.env.NODE_ENV === 'development'
          ? JSON.stringify('Hello wenwu, Welcome to Webpack ground')
          : JSON.stringify(''),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(appSourcePath, 'assets'),
    //       to: path.resolve(process.cwd(), 'dist/static'),
    //     },
    //   ],
    // }),
  ],
};
