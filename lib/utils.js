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
  
  cwd(file) {
    return path.resolve(file || '')
  },

  ownDir(file) {
    return path.join(__dirname, '..', file || '')
  }
};
