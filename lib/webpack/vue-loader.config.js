'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('../utils')
const configs = require('../configs')

const opts = configs.abcOpts
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: {
    js: 'happypack/loader?id=js',
    css: isProduction && opts.extractStyle === true
      ? ExtractTextPlugin.extract({
        use: ['happypack/loader?id=css'],
        fallback: 'vue-style-loader'
      })
      : ['vue-style-loader', 'happypack/loader?id=css'],
    less: isProduction && opts.extractStyle === true
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
  }
}
