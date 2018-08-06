'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const configs = require('../configs')
const utils = require('../utils')
const opts = configs.abcOpts

if (opts.hotReplace === true) {
  const hotClient = utils.ownDir('./lib/webpack/hot-client')

  Object.keys(configs.entries).forEach(function (name) {
    baseConfig.entry[name] = [hotClient].concat(baseConfig.entry[name])
  })
}

module.exports = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    ...(opts.extractStyle === true && opts.type !== 'mini-program'
      ? [new ExtractTextPlugin('[name].css', { allChunks: true })]
      : []
    )
  ]
});
