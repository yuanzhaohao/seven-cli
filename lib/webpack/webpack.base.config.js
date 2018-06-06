'use strict';

let path = require('path')
let exists = require('fs').existsSync
let webpack = require('webpack')
let merge = require('webpack-merge')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let logger = require('../logger')
let utils = require('../utils')
let configs = require('../configs')
let plugins = require('./happypack-plugins')

let opts = configs.abcOpts
let srcPath = configs.srcPath
let entries = configs.entries
let isMiniProgram = opts.type === 'mini-program'
let webpackConfigs = {
  'vue': require('./webpack-vue.config'),
  'vue-mobile': require('./webpack-vue.config'),
  'element': require('./webpack-vue.config'),
  'react': require('./webpack-react.config'),
  'electron-antd': require('./webpack-react.config'),
  'mini-program': require('./webpack-mpvue.config')
}
let vendors = {}

if (isMiniProgram) {
  vendors = { app: path.join(srcPath, './main.js') }
  entries = {}
} else {
  if (opts.optimizeCommon && typeof opts.optimizeCommon === 'object') {
    vendors = opts.optimizeCommon
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: Object.keys(vendors),
      minChunks: Infinity
    }))
  }
  plugins = plugins.concat(getHtmlPlugins(srcPath, entries, vendors))
}

module.exports = merge({
  entry: Object.assign({}, entries, vendors),
  output: {
    path: utils.cwd(opts.assetsRoot),
    filename: '[name].js',
  },
  externals: opts.externals || {},
  resolve: {
    extensions: ['.js', '.css', '.less', '.json'],
    modules: [
      utils.cwd(),
      utils.cwd('node_modules'),
      utils.ownDir('node_modules')
    ],
    alias: {
      '@': srcPath
    }
  },
  resolveLoader: {
    modules: [
      utils.cwd('node_modules'),
      utils.ownDir('node_modules')
    ]
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=js',
      },
      {
        test: /\.(css|less)$/,
        loader: opts.extractStyle === true
          ? ExtractTextPlugin.extract(['happypack/loader?id=css', 'happypack/loader?id=less'])
          : ['style-loader', 'happypack/loader?id=css', 'happypack/loader?id=less']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 3 * 1024,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5 * 1024,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}, webpackConfigs[opts.type])

function getHtmlPlugins(srcPath, entries, vendors) {
  let pages = Object.keys(entries)
  let defaultTplPath = path.join(srcPath, './template.html')

  return pages.map(page => {
    let pageTplPath = path.join(srcPath, `./${page}.html`)
    let templatePath = defaultTplPath
    let chunks = Object.keys(vendors).concat(page)

    if (exists(pageTplPath)) templatePath = pageTplPath

    let opts = {
      filename: `${page}.html`,
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      chunks
    }

    return new HtmlWebpackPlugin(opts)
  });
};
