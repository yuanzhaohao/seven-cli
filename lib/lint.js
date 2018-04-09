const path = require('path');
const fs = require('fs');
const Linter = require('eslint').Linter;
const utils = require('./utils');

const linter = new Linter();

module.exports = function lint(folder) {
  console.log(utils.cwd('./src'));
  let srcPath = folder && fs.existsSync(utils.cwd(folder))
    ? utils.cwd(folder)
    : utils.cwd('./src');

  verifyFile(srcPath);
}

function verifyFile(filePath) {
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err)
    } else {
      files.forEach(function(filename) {
        let filedir = path.join(filePath, filename);
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            let isFile = stats.isFile();
            let isDir = stats.isDirectory();
            if (isFile) {
              let srcText = fs.readFileSync(filedir, { encoding: 'utf8' });
              let messages = linter.verify(srcText, {
                rules: {
                  semi: 2
                }
              });
              console.log(messages);
            }
            if (isDir) {
              verifyFile(filedir);
            }
          }
        })
      });
    }
  });
}
