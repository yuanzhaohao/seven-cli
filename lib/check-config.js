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
  if (!exists(utils.cwd('./abc.json'))) {
    logger.fatal('abc.json does not exist. Please check it out.');
    process.exit();
  }

  /**
   * check entry path
   */
  const srcPath = utils.cwd('./src');
  const entries = utils.getEntries(path.join(srcPath, './entry/*.js'));

  if (Object.keys(entries).length === 0) {
    logger.fatal('Entry files do not exist. Please check it out.');
    process.exit();
  }
}
