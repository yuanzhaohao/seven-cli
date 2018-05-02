'use strict';

const path = require('path')
const exists = require('fs').existsSync
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const logger = require('../logger')
const utils = require('../utils')
// const getHtmlPlugins = require('./html-plugins');
const happypackPlugins = require('./happypack-plugins')
const config = require(utils.cwd('./abc.json'))
const getVueLoaderConfig = require('./vue-loader.config')
let optimizeCommon = { // 兼容老版本
  vendor: []
}

if (config.optimizeCommon && typeof config.optimizeCommon === 'object') {
  optimizeCommon = config.optimizeCommon
}

module.exports = function getWebpackBaseConfig(env) {
  const srcPath = utils.cwd('./src')
  let entries = utils.getEntries(path.join(srcPath, './entry/*.js'))
  let htmlPlugins = getHtmlPlugins(srcPath, entries)

  if (config.optimizeCommon && typeof config.optimizeCommon === 'object') {
    entries = Object.assign({}, entries, config.optimizeCommon)
  }

  let webpackConfig = {
    entry: entries,
    output: {
      path: utils.cwd(config.assetsRoot),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.vue', '.jsx', '.css', '.less', '.json'],
      modules: [
        utils.cwd(),
        utils.cwd('node_modules'),
        utils.ownDir('node_modules')
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': srcPath
      }
    },
    resolveLoader: {
      modules: [
        utils.cwd('node_modules'),
        utils.ownDir('node_modules')
      ]
    },
    plugins: happypackPlugins
      .concat(
        new webpack.optimize.CommonsChunkPlugin({
          name: Object.keys(optimizeCommon),
          minChunks: 3
        })
      )
      .concat(htmlPlugins),
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: getVueLoaderConfig(config, env)
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'happypack/loader?id=js',
          exclude: /node_modules/,
          include: srcPath
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
  }

  // electron类型
  if (config.type === 'electron') {
    webpackConfig.target = 'electron-renderer';
    webpackConfig.node = {
      fs: 'empty'
    };
  }

  return webpackConfig
}



function getHtmlPlugins(srcPath, entries) {
  let chunks = Object.keys(entries)

  return chunks.map(chunk => {
    let templatePath = path.join(srcPath, './template.html')
    let chunkTplPath = path.join(srcPath, './' + chunk + '.html')
    let chunks = Object.keys(optimizeCommon).concat(chunk)

    if (exists(chunkTplPath)) templatePath = chunkTplPath

    let opts = {
      filename: chunk + '.html',
      template: templatePath,
      inject: 'body',
      chunksSortMode(c1, c2) {// @note: 控制顺序
        let order1 = chunks.indexOf(c1.names[0])
        let order2 = chunks.indexOf(c2.names[0])
        return order1 - order2
      },
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      chunks
    }

    return new HtmlWebpackPlugin(opts)
  });
};
