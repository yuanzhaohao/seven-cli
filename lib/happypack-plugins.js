'use strict';

const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = [
  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [{
      path: 'babel-loader',
      query: {
        cacheDirectory: '.happypack_cache'
      }
    }],
  }),
  new HappyPack({
    id: 'less',
    threadPool: happyThreadPool,
    loaders: ['less-loader']
  }),
  new HappyPack({
    id: 'css',
    threadPool: happyThreadPool,
    loaders: ['css-loader'],
  })
];
