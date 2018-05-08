const utils = require('../utils')
const config = require(utils.cwd('./abc.json'))
const vueLoaderConfig = require('./vue-loader.config')

module.exports = {
  resolve: {
    extensions: ['.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }
    ]
  }
}
