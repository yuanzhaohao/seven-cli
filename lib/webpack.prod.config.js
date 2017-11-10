const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const config = require(path.resolve('./abc.json'));
const getWebpackBaseConfig = require('./webpack.base.config');

module.exports = merge(getWebpackBaseConfig('development'), {
  devtool: '#source-map',
  output: {
    path: path.resolve(config.assetsRoot || ''),
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[id].[chunkhash:7].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:7].css',
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + ['js', 'css'].join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
