'use strict'

let path = require('path')
let utils = require('./utils')

let srcPath = utils.cwd('./src')
let entries = utils.getEntries(path.join(srcPath, './entry/*.js'))
let abcFile = utils.cwd('./abc.json')
let abcOpts = require(abcFile)

module.exports = {
  srcPath,
  entries,
  abcFile,
  abcOpts,
}
