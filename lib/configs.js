'use strict'

let path = require('path')
let exists = require('fs').existsSync;
let utils = require('./utils')
let logger = require('./logger')

let srcPath = utils.cwd('./src')
let entries = utils.getEntries(path.join(srcPath, './entry/*.js'))
let abcFile = utils.cwd('./abc.json')
/**
 * Padding
 */
console.log()
process.on('exit', function() {
  console.log()
});

if (!exists(abcFile)) {
  logger.fatal('abc.json not exist. Please check it out.')
  process.exit()
}

if (Object.keys(entries).length === 0) {
  logger.fatal('Entry files not exist. Please check it out.')
  process.exit()
}

let abcOpts = process.env.NODE_ENV === 'testing' ? {} : require(abcFile)

module.exports = {
  srcPath,
  entries,
  abcFile,
  abcOpts,
}
