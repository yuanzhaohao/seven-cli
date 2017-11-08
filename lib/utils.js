const glob = require('glob');

module.exports = {
  /**
   * 获取所有入口文件
   * @param {String} globPath
   */
  getEntries(globPath) {
     var files = glob.sync(globPath);
     var entries = {};

     files.forEach(function(filepath) {
       var name = filepath.replace(/(.*\/)*([^.]+).*/ig, '$2');
       if (name && !entries[name]) {
         entries[name] = filepath;
       }
     });

     return entries;
  },

  isFile(path) {
    try {
      if (fs.statSync(p).isFile()) {
        return true;
      }
    } catch (e) {
    }
    return false;
  }
};
