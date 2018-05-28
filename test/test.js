process.env.NODE_ENV = 'testing'

const assert = require('assert')
const Server = require('../lib/server')

let port = 7777
let host = 'localhost'
let opts = {
  "type": "vue",
  "staticPath": "./static",
  "assetsRoot": "./dist",
  "cssSourceMap": true,
  "hotReplace": false,
  "viewportWidth": 750,
  "mockData": false,
  "proxyTable": {}
}

let server = new Server(port, host, opts)

describe('seven dev', function() {
  it('server start', function(done) {
    server.start(function() {
      done()
    })
  })

  it('server close', function() {
    server.close(function() {
      done()
    })
  })
})
