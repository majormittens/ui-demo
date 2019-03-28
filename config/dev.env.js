'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BITFINEX_BASE_URL: "https://www.bitmex.com/api/v1",
  API_KEY: "hFRscuP-oc7Kby-1dPsaawA8",
  API_SECRET: "pVWFBGQQDuZFk-ofjcJsw84y4UBJb3VxcxSNbZKOzMxiLjyu",
})
