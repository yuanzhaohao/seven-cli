const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

let webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map'
})

delete webpackConfig.entry

module.exports = webpackConfig
