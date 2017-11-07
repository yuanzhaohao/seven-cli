const path = require('path');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const async = require('async');
const render = require('consolidate').handlebars.render;

module.exports = function generate(data, src, dest, callback) {
  const metalsmith = new Metalsmith(path.join(src, 'template'));

  data = Object.assign(metalsmith.metadata(), data);
  metalsmith
    .use(renderTemplateFiles())
    .clean(false)
    .source('.')
    .destination(dest)
    .build(function (err, files) {
      callback(err);
    });

  return data;
}

function renderTemplateFiles()  {
  return function (files, metalsmith, done) {
    var keys = Object.keys(files);
    var metalsmithMetadata = metalsmith.metadata();
    async.each(keys, function (file, next) {
      var str = files[file].contents.toString()
      if (!/{{([^{}]+)}}/g.test(str)) return next();
      render(str, metalsmithMetadata, function (err, res) {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer(res)
        next()
      })
    }, done)
  }
}
