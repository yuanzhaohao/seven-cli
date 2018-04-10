'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./../utils');
const getWebpackBaseConfig = require('./webpack.base.config');
const baseConfig = getWebpackBaseConfig('development');
const config = require(utils.cwd('./abc.json'));

if (config.hotReplace === true) {
  const hotClient = utils.ownDir('./lib/webpack/hot-client');

  Object.keys(baseConfig.entry).forEach(function (name) {
    baseConfig.entry[name] = [hotClient].concat(baseConfig.entry[name]);
  });
}


module.exports = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ]
});
