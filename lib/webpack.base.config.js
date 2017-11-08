var fs = require('fs');
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var px2viewport = require('postcss-px2viewport');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config');
var cssUtils = require('./css-utils');
var projectRoot = path.resolve(__dirname, '../');
var env = process.env.NODE_ENV;
var isProduction = env === 'production';
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;
var entryPath = './src/page/*.js';

var vendorName = 'vendor';
var entries = getEntries(entryPath);
var chunks = Object.keys(entries);
var webpackConfig = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: env === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.less', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: cssUtils.cssLoaders({
            sourceMap: isProduction
              ? config.build.productionSourceMap
              : config.dev.cssSourceMap,
            extract: env === 'production'
          }),
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          },
          postcss: [
            px2viewport({
              viewportWidth: 750,
            })
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src')
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
    new webpack.DefinePlugin({
      'process.env': env === 'production'
        ? config.build.env
        : config.dev.env
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: vendorName,
      minChunks: 3
    }),
  ]
};

chunks.forEach(function(chunk) {
  var templatePath = path.join(__dirname, '../src/template.html');
  var chunkTplPath = path.join(__dirname, '../src/' + chunk + '.html');
  if (isFile(chunkTplPath)) {
    templatePath = chunkTplPath;
  }
  var config = {
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
  webpackConfig.plugins.push(new HtmlWebpackPlugin(config));
});

module.exports = webpackConfig;

// 获取所有入口文件
function getEntries(globPath) {
   var files = glob.sync(globPath);
   var entries = {};

   files.forEach(function(filepath) {
     var name = filepath.replace(/(.*\/)*([^.]+).*/ig, '$2');
     if (name && !entries[name]) {
       entries[name] = filepath;
     }
   });

   return entries;
}

function isFile(path) {
  try {
    if (fs.statSync(p).isFile()) {
      return true;
    }
  } catch (e) {
  }
  return false;
}
