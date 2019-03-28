'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BITFINEX_BASE_URL: "https://www.bitmex.com/api/v1",
  SHOW_SIDEBAR: true
})
