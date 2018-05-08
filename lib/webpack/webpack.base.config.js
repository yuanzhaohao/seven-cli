'use strict';

const path = require('path')
const exists = require('fs').existsSync
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const logger = require('../logger')
const utils = require('../utils')
const plugins = require('./happypack-plugins')
const opts = require(utils.cwd('./abc.json'))
const getVueLoaderConfig = require('./vue-loader.config')

let srcPath = utils.cwd('./src')
let entries = utils.getEntries(path.join(srcPath, './entry/*.js'))
let webpackConfigs = {
  'vue': require('./webpack-vue.config'),
  'vue-mobile': require('./webpack-vue.config'),
  'element': require('./webpack-vue.config'),
  'react': require('./webpack-react.config'),
  'electron-antd': require('./webpack-react.config'),
}
let vendors = {}

let htmlPlugin = getHtmlPlugins(srcPath, entries, vendors)
console.log(htmlPlugin);
plugins.concat(htmlPlugin)
if (opts.optimizeCommon && typeof opts.optimizeCommon === 'object') {
  vendors = opts.optimizeCommon
  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: Object.keys(vendors),
    minChunks: Infinity
  }))
}

console.log('entries:', Object.assign({}, entries, vendors));

module.exports = merge({
  entry: Object.assign({}, entries, vendors),
  output: {
    path: utils.cwd(opts.assetsRoot),
    filename: '[name].js',
  },
  plugins,
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
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract(['happypack/loader?id=css', 'happypack/loader?id=less'])
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

    console.log(page);
    let opts = {
      filename: `${page}.html`,
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      chunks: page
    }

    return new HtmlWebpackPlugin(opts)
  });
};
