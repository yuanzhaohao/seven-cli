'use strict';

const path = require('path');
const webpack = require('webpack');
const exists = require('fs').existsSync;
const px2viewport = require('postcss-px2viewport');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const logger = require('./logger');
const utils = require('./utils');
const cssLoaders = require('./css-loaders');
const srcPath = utils.cwd('./src');
const config = require(utils.cwd('./abc.json'));

module.exports = function getWebpackBaseConfig(env) {
  const isProduction = env === 'production';
  const vendorName = 'vendor';
  const entryPath = path.join(srcPath, './entry/*.js');
  const entries = utils.getEntries(entryPath);
  const chunks = Object.keys(entries);

  const webpackConfig = {
    entry: entries,
    output: {
      path: utils.cwd(config.assetsRoot),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.vue', '.css', '.less', '.json'],
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
          options: {
            loaders: cssLoaders({
              sourceMap: config.cssSourceMap,
              extract: isProduction
            }),
            transformToRequire: {
              video: 'src',
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            },
            postcss: [
              config.viewportWidth
                ? px2viewport({
                  viewportWidth: config.viewportWidth,
                })
                : null
            ]
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: srcPath
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
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
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: vendorName,
        minChunks: 3
      }),
    ]
  };

  chunks.forEach(chunk => {
    let templatePath = path.join(srcPath, './template.html');
    let chunkTplPath = path.join(srcPath, './' + chunk + '.html');

    if (exists(chunkTplPath)) templatePath = chunkTplPath;
    const pluginOpts = {
      filename: chunk + '.html',
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: false
      } : null
    };
    if (chunk in entries) {
      pluginOpts.chunks = [vendorName, chunk];
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(pluginOpts));
  });

  return webpackConfig;
}
