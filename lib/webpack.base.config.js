const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const px2viewport = require('postcss-px2viewport');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');
const cssLoaders = require('./css-loaders');
const config = require(cwd('./abc.json'));
const srcPath = cwd('./src');

module.exports = function getWebpackBaseConfig(env) {
  const isProduction = env === 'production';
  const entryPath = path.join(srcPath, './page/*.js');
  const vendorName = 'vendor';
  const entries = utils.getEntries(entryPath);
  const chunks = Object.keys(entries);
  console.log(entries);

  const webpackConfig = {
    entry: entries,
    output: {
      path: cwd(config.assetsRoot),
      filename: '[name].js',
      publicPath: cwd(config.assetsPublicPath)
    },
    resolve: {
      extensions: ['.js', '.vue', '.css', '.less', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': srcPath
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: cssLoaders({
              sourceMap: config.cssSourceMap,
              extract: isProduction
            }),
            transformToRequire: {
              video: 'src',
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            },
            postcss: [
              px2viewport({
                viewportWidth: config.viewportWidth || 750,
              })
            ]
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: srcPath
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            name: 'img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: vendorName,
        minChunks: 3
      }),
    ]
  };

  chunks.forEach(chunk => {
    let templatePath = path.join(srcPath, './template.html');
    let chunkTplPath = path.join(srcPath, './' + chunk + '.html');

    if (utils.isFile(chunkTplPath)) templatePath = chunkTplPath;
    const pluginOpts = {
      filename: chunk + '.html',
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: false
      } : null
    };
    if (chunk in entries) {
      config.chunks = [vendorName, chunk];
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(pluginOpts));
  });

  return webpackConfig;
}

function cwd(file) {
  return path.resolve(file || '')
}
