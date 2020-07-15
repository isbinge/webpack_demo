const path = require('path');

const appSourcePath = path.resolve(process.cwd(), 'src');
const appDistPath = path.resolve(process.cwd(), 'dist');

module.exports = {
  entry: {
    main: appSourcePath,
  },
  output: {
    path: appDistPath,
    filename: '[name].[hash].js',
    chunkFilename: '[id].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.test/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    runtimeChunk: 'single',
    moduleIds: 'hashed',
  },
  resolve: {
    modules: [appSourcePath, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.ejs'],
    alias: {
      '@': appSourcePath,
    },
  },
};
