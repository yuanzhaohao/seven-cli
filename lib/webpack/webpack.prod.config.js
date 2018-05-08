const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const baseConfig = require('./webpack.base.config')
const utils = require('../utils')
const config = require(utils.cwd('./abc.json'))

let plugins = [
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      warnings: false,
      collapse_vars: true,
      reduce_vars: true
    }
  }),
  new ExtractTextPlugin({
    filename: '[name].[contenthash:7].css',
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
];

if (config.visualizer) {
  plugins.push(new Visualizer({
    filename: config.visualizerFile && typeof config.visualizerFile === 'string'
      ? config.visualizerFile
      : './statistics.html'
  }))
}

module.exports = merge(baseConfig, {
  devtool: '#source-map',
  output: {
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[id].[chunkhash:7].js'
  },
  plugins
});
