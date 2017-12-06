'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const logger = require('./logger');
const utils = require('./utils');
const getHtmlPlugins = require('./html-plugins');
const happypackPlugins = require('./happypack-plugins');
const config = require(utils.cwd('./abc.json'));
const getVueLoaderConfig = require('./vue-loader.config');

module.exports = function getWebpackBaseConfig(env) {
  const srcPath = utils.cwd('./src');
  const entries = utils.getEntries(path.join(srcPath, './entry/*.js'));

  const webpackConfig = {
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
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: getVueLoaderConfig(config, env)
        }, {
          test: /\.js$/,
          loader: 'happypack/loader?id=js',
          include: srcPath
        },
        // {
        //   test: /\.jsx$/,
        //   loader: 'happypack/loader?id=js',
        //   include: srcPath
        // },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract('happypack/loader?id=less')
        }, {
          test: /\.css$/,
          use: ExtractTextPlugin.extract('happypack/loader?id=css')
        }, {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            name: 'img/[name].[hash:7].[ext]'
          }
        }, {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
    ]
    .concat(happypackPlugins)
    .concat(getHtmlPlugins(srcPath, entries))
  };

  return webpackConfig;
}
