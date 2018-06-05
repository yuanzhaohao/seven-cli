'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: {
    js: 'happypack/loader?id=js',
    css: ExtractTextPlugin.extract({
      use: ['happypack/loader?id=css'],
      fallback: 'vue-style-loader'
    }),
    less: ExtractTextPlugin.extract({
      use: [
        'happypack/loader?id=css',
        'happypack/loader?id=less',
      ],
      fallback: 'vue-style-loader'
    })
  },
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
