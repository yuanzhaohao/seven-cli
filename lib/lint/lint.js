const path = require('path')
const fs = require('fs')
const glob = require('glob')
const formatter = require('eslint-friendly-formatter')
const CLIEngine = require('eslint').CLIEngine
const configs = require('../configs')
const logger = require('../logger')
const utils = require('../utils')

module.exports = function lint(rawName) {
  let srcPath = configs.srcPath
  let eslintFile = utils.cwd('.eslintrc.js')

  if (rawName) {
    if (!fs.existsSync(utils.cwd(rawName))) {
      logger.fatal(`Folder {${rawName}} not exist`)
    } else {
      srcPath = utils.cwd(rawName)
    }
  }

  if (!fs.existsSync(eslintFile)) {
    logger.fatal('.eslintrc.js not exist')
  }

  logger.log('Starting linting...')

  let esConfig = require(eslintFile)
  let cli = new CLIEngine(esConfig)
  let files = glob.sync(`${srcPath}/**/*.js`).concat(
    glob.sync(`${srcPath}/**/*.jsx`),
    glob.sync(`${srcPath}/**/*.vue`)
  )


  try {
    files.forEach(function(fileName) {
      let filePath = utils.cwd(fileName)
      let srcText = fs.readFileSync(filePath, { encoding: 'utf8' })
      let res = cli.executeOnText(srcText, filePath, true)
      let reportOutput = formatter(res.results)
      console.log(reportOutput)
    })
    logger.success('Linting ended!')
  } catch (e) {
    logger.fatal(e)
  }
}
