const MpvuePlugin = require('webpack-mpvue-asset-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueLoaderConfig = require('./mpvue-loader.config')
const utils = require('../utils')
const configs = require('../configs')

let srcPath = configs.srcPath
let opts = configs.abcOpts

module.exports = {
  target: require('mpvue-webpack-target'),
  resolve: {
    extensions: ['.vue'],
    alias: {
      'vue': 'mpvue'
    },
    symlinks: false,
    aliasFields: ['mpvue', 'weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  externals: {},
  plugins: [
    new MpvuePlugin(),
    new ExtractTextPlugin('css/[name].wxss')
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: vueLoaderConfig
      }
    ]
  }
}
