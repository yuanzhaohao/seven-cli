let fs = require('fs')
let express = require('express')
let webpack = require('webpack')
let open = require('open')
let utils = require('./utils')
let logger = require('./logger')
let opts = require(utils.cwd('./abc.json'))

function Server(port, host) {
  return this instanceof Server
    ? this.init.call(this, port, host)
    : new Server(port, host)
}

Server.prototype = {
  constructor: Server,

  init(port, host) {
    this.port = port
    this.host = host
    this.app = express()
  },

  use() {
    let { app } = this
    let webpackConfig = require('../lib/webpack/webpack.dev.config')
    let compiler = webpack(webpackConfig);

    opts = require(utils.cwd('./abc.json'))
    app.use('/static', express.static(utils.cwd('./static')));

    app.use(require('connect-history-api-fallback')());

    app.use(require('webpack-dev-middleware')(compiler, {
      quiet: true
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
      heartbeat: 2000,
      log: false
    }));

    // proxy api requests
    if (opts.proxyTable && Object.keys(opts.proxyTable).length > 0) {
      const proxyMiddleware = require('http-proxy-middleware');

      Object.keys(opts.proxyTable).forEach(function (context) {
        let options = opts.proxyTable[context];
        if (typeof options === 'string') {
          options = {
            target: options
          };
        }
        app.use(proxyMiddleware(options.filter || context, options));
      });
    }

    // mock
    if (opts.mockData && fs.existsSync(utils.cwd('mock'))) {
      const mockRouter = express.Router()
      mockRouter.all('/:method', (req, res) => {
        let method = req.params.method.replace(/\.json$/, '');
        let jsonPath = path.join(utils.cwd('mock'), method + '.json');
        delete require.cache[require.resolve(jsonPath)];
        let data = require(jsonPath);
        res.json(data);
      });
      app.use('/mock-api', mockRouter);
    }
  },

  start() {
    let { port, host, app } = this

    this.use()
    app.listen(port, function(err) {
      if (err) logger.fatal(err)

      let uri = `http://${host}:${port}/`
      logger.log(`Listening at ${uri}\n`)
      if (opts.electron !== true) open(uri)
    });
  },

  resume() {
    this.use()
  }
}

module.exports = Server
