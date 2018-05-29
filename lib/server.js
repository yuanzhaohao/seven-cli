let fs = require('fs')
let express = require('express')
let webpack = require('webpack')
let open = require('open')
let utils = require('./utils')
let logger = require('./logger')
let configs = require('./configs')
let webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('../lib/webpack/webpack.test.config')
  : require('../lib/webpack/webpack.dev.config')

function Server(port, host) {
  return this instanceof Server
    ? this.init.call(this, port, host)
    : new Server(port, host)
}

Server.prototype = {
  constructor: Server,

  init(port, host, defaultOpts) {
    this.port = port
    this.host = host
    this.defaultOpts = defaultOpts
    this.app = express()
  },

  start(callback) {
    let { port, host, app } = this
    let compiler = webpack(webpackConfig)
    let opts = this.defaultOpts || require(configs.abcFile)
    let devMiddleware = require('webpack-dev-middleware')(compiler, {
      quiet: true
    })

    app.use('/static', express.static(utils.cwd('./static')))
    app.use(require('connect-history-api-fallback')())
    app.use(devMiddleware)

    // hotReplace
    if (opts.hotReplace === true) {
      let hotMiddleware = require('webpack-hot-middleware')(compiler, {
        heartbeat: 2000,
        log: false
      })
      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
          hotMiddleware.publish({ action: 'reload' })
          cb && cb()
        })
      })
      app.use(hotMiddleware)
    }

    // proxy api requests
    if (opts.proxyTable && Object.keys(opts.proxyTable).length > 0) {
      let proxyMiddleware = require('http-proxy-middleware');

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

    // start server
    logger.log('starting dev server...')
    devMiddleware.waitUntilValid(function() {
      let page = opts.mainPage
        ? opts.mainPage
        : Object.keys(configs.entries)[0]

      let uri = `http://${host}:${port}/${page}.html`
      logger.log(`Listening at ${uri}\n`)
      if (opts.electron !== true && process.env.NODE_ENV !== 'testing') open(uri)

      callback && callback()
    })

    this.server = app.listen(port)
  },

  close(callback) {
    if (this.server) this.server.close()
    callback && callback()
  },

  resume() {
    this.close()
    this.start()
  }
}

module.exports = Server
