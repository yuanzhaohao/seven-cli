'use strict';

const path = require('path');
const exists = require('fs').existsSync;
const utils = require('./utils');
const logger = require('./logger');

/**
 * Padding
 */
console.log();
process.on('exit', function() {
  console.log();
});

module.exports = function() {
  let abcFile = utils.cwd('./abc.json')
  if (!exists(abcFile)) {
    logger.fatal('abc.json does not exist. Please check it out.')
    process.exit()
  }

  /**
   * check entry path
   */
  let srcPath = utils.cwd('./src')
  let entries = utils.getEntries(path.join(srcPath, './entry/*.js'))

  if (Object.keys(entries).length === 0) {
    logger.fatal('Entry files do not exist. Please check it out.')
    process.exit()
  }
}
