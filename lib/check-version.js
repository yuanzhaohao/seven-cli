var request = require('request');
var semver = require('semver');
var chalk = require('chalk');
var packageConfig = require('../../package.json');

module.exports = function(done) {
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(chalk.red(
      'You musc upgrade node to ' + packageConfig.engines.node + '.'
    ));
  }

  request({
    url: 'https://registry.npmjs.org/seven-cli',
    timeout: 1500
  }, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var latestVersion = JSON.parse(body)['dist-tags'].latest;
      var localVersion = packageConfig.version;
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version is available'));
        console.log();
        console.log('  latest:     ' + chalk.green(latestVersion));
        console.log('  installed:  ' + chalk.red(localVersion));
        console.log();
      }
    }
    done();
  });
}
