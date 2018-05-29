// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vueLoaderConfig = require('./vue-loader.config')

module.exports = {
  resolve: {
    extensions: ['.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  // @note: A plugin is now required for vue-loader 15
  // plugins: [
  //   new VueLoaderPlugin()
  // ],
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
