const spawnSync = require('cross-spawn').sync;
const logger = require('./logger');

module.exports = {
  exec(cmd, args, opts = {}) {
    const errMessage = opts.errorMessage;
    const command = spawnSync(cmd, args || [], opts);

    if (command.status === 1) {
      if (command.stderr) {
        logger.fatal(errMessage || command.stderr.toString());
      }
      process.exit(1);
    }

    return command;
  }
};
