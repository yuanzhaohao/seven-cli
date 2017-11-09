const path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const config = require(cwd('./abc.json'));
const getWebpackBaseConfig = require('./webpack.base.config');
const outputPath = cwd(config.assetsRoot)

const webpackConfig = merge(getWebpackBaseConfig('development'), {
  devtool: '#source-map',
  output: {
    path: outputPath,
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
    new CopyWebpackPlugin([
      {
        from: cwd(config.staticPath),
        to: path.join(outputPath, config.staticPath),
        ignore: ['.*']
      }
    ])
  ]
});

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;

function cwd(file) {
  return path.resolve(file || '')
}
