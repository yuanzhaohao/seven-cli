'use strict'

const assert = require('assert')

describe('Array', function() {
  describe.only('#indexOf()', function() {
    it('should return -1 unless present', function() {
      // 这个测试用例会运行
    })

    it('should return the index when present', function() {
      // 这个测试用例也会运行
    })
  })

  describe.only('#concat()', function () {
    it('should return a new Array', function () {
      // 这个测试用例也会运行
    })
  })

  describe('#slice()', function () {
    it('should return a new Array', function () {
      // 这个测试用例不会运行
    })
  })
})
