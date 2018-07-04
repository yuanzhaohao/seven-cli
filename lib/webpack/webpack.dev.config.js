'use strict'

const path = require('path')
const webpack = require('webpack')
const express = require('express')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const configs = require('../configs')
const logger = require('../logger')
const utils = require('../utils')
const opts = configs.abcOpts

module.exports = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',

  // devServer: {
  //   clientLogLevel: 'warning',
  //   compress: true,
  //   hot: opts.hotReplace,
  //   proxy: opts.proxyTable,
  //   open: opts.autoOpen,
  //   overlay: { warnings: false, errors: true },
  //   quiet: true,
  //   watchOptions: {
  //     aggregateTimeout: 350,
  //     poll: 1500
  //   },
  //   before(app) {
  //     logger.log('starting dev server...')
  //     app.use('/static', express.static(utils.cwd('./static')))
  //
  //     // mock data
  //     const mockPath = utils.cwd('./mock')
  //     if (opts.mockData && fs.existsSync(mockPath)) {
  //       const mockRouter = express.Router()
  //       mockRouter.all('/:method', (req, res) => {
  //         let method = req.params.method.replace(/\.json$/, '')
  //         let jsonPath = path.join(mockPath, method + '.json')
  //         delete require.cache[require.resolve(jsonPath)]
  //         let data = require(jsonPath)
  //         res.json(data)
  //       });
  //       app.use('/mock-api', mockRouter)
  //     }
  //   }
  // },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    ...(opts.extractStyle === true && opts.type !== 'mini-program'
      ? [new ExtractTextPlugin('[name].css', { allChunks: true })]
      : []
    )
  ]
});
