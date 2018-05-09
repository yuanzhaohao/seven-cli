'use strict';

const path = require('path');
const exists = require('fs').existsSync;
const configs = require('./configs');
const logger = require('./logger');

/**
 * Padding
 */
console.log();
process.on('exit', function() {
  console.log();
});

module.exports = function() {
  if (!exists(configs.abcFile)) {
    logger.fatal('abc.json does not exist. Please check it out.')
    process.exit()
  }
  
  if (Object.keys(configs.entries).length === 0) {
    logger.fatal('Entry files do not exist. Please check it out.')
    process.exit()
  }
}
