'use strict';

const path = require('path');
const glob = require('glob');
const spawnSync = require('cross-spawn').sync;
const logger = require('./logger');

module.exports = {
  exec(cmd, args, opts = {}) {
    const errMessage = opts.errorMessage;
    const command = spawnSync(cmd, args || [], opts);

    if (command.status === 1) {
      if (command.stderr) {
        logger.fatal(errMessage || command.stderr.toString());
      }
      process.exit(1);
    }

    return command;
  }

  , cwd(file) {
    return path.resolve(file || '')
  }

  , ownDir(file) {
    return path.join(__dirname, '..', file || '')
  }

  /**
   * 获取所有入口文件
   * @param {String} globPath
   */
  , getEntries(globPath) {
     const files = glob.sync(globPath);
     const entries = {};

     files.forEach(filepath => {
       const name = filepath.replace(/(.*\/)*([^.]+).*/ig, '$2');
       if (name && !entries[name]) {
         entries[name] = filepath;
       }
     });

     return entries;
  }
};
