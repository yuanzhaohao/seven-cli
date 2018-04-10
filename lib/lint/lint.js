const path = require('path');
const fs = require('fs');
const glob = require('glob');
const formatter = require('eslint-friendly-formatter');
const utils = require('../utils');
const esConfig = require('./eslintrc');

const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine(esConfig);

module.exports = function lint(folder) {
  let srcPath = folder && fs.existsSync(utils.cwd(folder))
    ? utils.cwd(folder)
    : utils.cwd('./src');

  let files = glob.sync(`${srcPath}/**/*.js`).concat(
    glob.sync(`${srcPath}/**/*.jsx`),
    glob.sync(`${srcPath}/**/*.vue`)
  );

  files.forEach(function(fileName) {
    let filePath = utils.cwd(fileName);
    let srcText = fs.readFileSync(filePath, { encoding: 'utf8' });
    let res = cli.executeOnText(srcText, filePath, true);
    let reportOutput = formatter(res.results);
    console.log(reportOutput);
  });
}
