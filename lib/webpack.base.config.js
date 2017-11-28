'use strict';

const os = require('os');
const path = require('path');
const webpack = require('webpack');
const exists = require('fs').existsSync;
const px2viewport = require('postcss-px2viewport');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const logger = require('./logger');
const utils = require('./utils');
const srcPath = utils.cwd('./src');
const config = require(utils.cwd('./abc.json'));

module.exports = function getWebpackBaseConfig(env) {
  const isProduction = env === 'production';
  const vendorName = 'vendor';
  const entries = utils.getEntries(path.join(srcPath, './entry/*.js'));
  const chunks = Object.keys(entries);

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
          options: {
            loaders: {
              js: 'happypack/loader?id=js',
              css: isProduction
                ? ExtractTextPlugin.extract({
                  use: ['happypack/loader?id=css'],
                  fallback: 'vue-style-loader'
                })
                : ['vue-style-loader', 'happypack/loader?id=css'],
              less: isProduction
                ? ExtractTextPlugin.extract({
                  use: [
                    'happypack/loader?id=css',
                    'happypack/loader?id=less',
                  ],
                  fallback: 'vue-style-loader'
                })
                : [
                  'vue-style-loader',
                  'happypack/loader?id=css',
                  'happypack/loader?id=less'
                ],
            },
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
      new webpack.optimize.CommonsChunkPlugin({
        name: vendorName,
        minChunks: 3
      }),
      new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: [{
          path: 'babel-loader',
          query: {
            cacheDirectory: '.happypack_cache'
          }
        }],
      }),
      new HappyPack({
        id: 'less',
        threadPool: happyThreadPool,
        loaders: ['less-loader']
      }),
      new HappyPack({
        id: 'css',
        threadPool: happyThreadPool,
        loaders: ['css-loader'],
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
