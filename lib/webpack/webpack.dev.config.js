'use strict';

let path = require('path')
let webpack = require('webpack')
let merge = require('webpack-merge')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let baseConfig = require('./webpack.base.config')
let utils = require('../utils')
let configs = require('../configs')
let opts = configs.abcOpts
let srcPath = configs.srcPath
let entries = configs.entries

if (opts.hotReplace === true) {
  const hotClient = utils.ownDir('./lib/webpack/hot-client')

  Object.keys(entries).forEach(function (name) {
    baseConfig.entry[name] = [hotClient].concat(baseConfig.entry[name])
  })
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
