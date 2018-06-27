'use strict';

let path = require('path')
let exists = require('fs').existsSync
let webpack = require('webpack')
let merge = require('webpack-merge')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let utils = require('../utils')
let configs = require('../configs')

let opts = configs.abcOpts
let srcPath = configs.srcPath
let entries = configs.entries
let isMiniProgram = opts.type === 'mini-program'
let isOptimize = opts.optimizeCommon && typeof opts.optimizeCommon === 'object'
let types = {
  'vue': require('./webpack-vue.config'),
  'vue-mobile': require('./webpack-vue.config'),
  'element': require('./webpack-vue.config'),
  'react': require('./webpack-react.config'),
  'electron-antd': require('./webpack-react.config'),
  'mini-program': require('./webpack-mpvue.config')
}
let vendors = isOptimize ? config.optimizeCommon : {}

if (isMiniProgram) {
  vendors = { app: path.join(srcPath, './main.js') }
  entries = {}
}

const createLintingRule = () => ({
  test: /\.(js|ts|tsx|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [srcPath],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
})

const createHtmlPlugin = () => {
  let defaultTplPath = path.join(srcPath, './template.html')
  return Object.keys(entries).map(page => {
    let pageTplPath = path.join(srcPath, `./${page}.html`)
    let templatePath = defaultTplPath
    let chunks = Object.keys(vendors).concat(page)

    if (exists(pageTplPath)) templatePath = pageTplPath

    return new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      chunks
    })
  })
}

const createHappypackPlugin = () => {
  const os = require('os')
  const HappyPack = require('happypack')
  const threadPool = HappyPack.ThreadPool({ size: os.cpus().length })
  const createHappypack = (id, loaders) => {
    return new HappyPack({ id, loaders, threadPool })
  }

  return [
    createHappypack('js', [{
      path: 'babel-loader',
      query: {
        cacheDirectory: '.happypack_cache'
      }
    }]),
    createHappypack('ts', [{
      path: 'ts-loader',
      query: {
        happyPackMode: true
      }
    }]),
    createHappypack('less', ['less-loader']),
    createHappypack('css', ['css-loader']),
  ]
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
  plugins: [
    ...(createHtmlPlugin()),
    ...(createHappypackPlugin()),
    ...(isOptimize
      ? [new webpack.optimize.CommonsChunkPlugin({
        names: Object.keys(opts.optimizeCommon),
        minChunks: Infinity
      })]
      : []
    )
  ],
  module: {
    ...(opts.useEslint ? [createLintingRule()] : []),
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=js',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts',
      },
      {
        test: /\.(css|less)$/,
        loader: opts.extractStyle === true
          ? ExtractTextPlugin.extract(['happypack/loader?id=css', 'postcss-loader', 'happypack/loader?id=less'])
          : ['style-loader', 'happypack/loader?id=css', 'postcss-loader', 'happypack/loader?id=less']
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
  }
}, types[opts.type])
