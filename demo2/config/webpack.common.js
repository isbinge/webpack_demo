const path = require('path');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  parts.dontParse({ name: '@', path: path.resolve('src') }),
  parts.dontParse({ name: '@comps', path: path.resolve('src/components') }),
]);
