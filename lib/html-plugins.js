'use strict';

const path = require('path');
const webpack = require('webpack');
const exists = require('fs').existsSync;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vendorName = 'vendor';
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: vendorName,
    minChunks: 3
  })
];

module.exports = function getHtmlPlugins(srcPath, entries) {
  const chunks = Object.keys(entries);

  chunks.forEach(chunk => {
    let templatePath = path.join(srcPath, './template.html');
    let chunkTplPath = path.join(srcPath, './' + chunk + '.html');

    if (exists(chunkTplPath)) templatePath = chunkTplPath;
    const opts = {
      filename: chunk + '.html',
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    };
    if (chunk in entries) {
      opts.chunks = [vendorName, chunk];
    }
    plugins.push(new HtmlWebpackPlugin(opts));
  });

  return plugins;
};
