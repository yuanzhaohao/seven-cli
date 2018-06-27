'use strict'

let path = require('path')
let webpack = require('webpack')
let merge = require('webpack-merge')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let baseConfig = require('./webpack.base.config')
let configs = require('../configs')
let opts = configs.abcOpts

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
