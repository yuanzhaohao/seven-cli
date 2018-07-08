'use strict'

const path = require('path')
const webpack = require('webpack')
const express = require('express')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const configs = require('../configs')
const logger = require('../logger')
const utils = require('../utils')
const opts = configs.abcOpts

module.exports = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',

  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    inline: true,
    process: true,
    hot: opts.hotReplace,
    proxy: opts.proxyTable,
    open: opts.autoOpen,
    disableHostCheck: true,
    overlay: { warnings: false, errors: true },
    quiet: true,
    watchOptions: {
      aggregateTimeout: 350,
      poll: 1500
    }
  },

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
