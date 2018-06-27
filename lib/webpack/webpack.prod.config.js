'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const baseConfig = require('./webpack.base.config')
const configs = require('../configs')
const opts = configs.abcOpts
const isMiniProgram = opts.type === 'mini-program'

module.exports = merge(baseConfig, {
  devtool: '#source-map',
  output: {
    filename: isMiniProgram ? 'js/[name].js' : 'js/[name].[chunkhash:7].js',
    chunkFilename: isMiniProgram ? 'js/[id].js' : 'js/[id].[chunkhash:7].js'
  },
  plugins: [
    ...(opts.visualizer
      ? [new Visualizer({
        filename: opts.visualizerFile && typeof opts.visualizerFile === 'string'
          ? opts.visualizerFile
          : './statistics.html'
      })]
      : []
    ),
    ...(opts.extractStyle === true && !isMiniProgram
      ? [new ExtractTextPlugin('[name].[contenthash:7].css', { allChunks: true })]
      : []
    ),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + ['js', 'css'].join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
