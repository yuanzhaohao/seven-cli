const merge = require('webpack-merge')
const reactConfig = require('./webpack-react.config')

module.exports = merge(reactConfig, {
  target: 'electron-renderer',
  node: {
    fs: 'empty'
  }
})
