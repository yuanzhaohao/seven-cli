'use strict';

const px2viewport = require('postcss-px2viewport')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('../utils')
const config = require(utils.cwd('./abc.json'))

const isProduction = process.env.NODE_ENV === 'production'
const postcssOpts = [];

if (typeof config.viewportWidth === 'number' && config.type !== 'mini-program') {
  postcssOpts.push(px2viewport({
    viewportWidth: config.viewportWidth,
  }));
}

module.exports = {
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
  postcss: postcssOpts
}
