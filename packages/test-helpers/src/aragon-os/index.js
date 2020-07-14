const acl = require('./acl')
const apps = require('./apps')
const dao = require('./dao')
const evmScript = require('./evmScript')

module.exports = {
  ...acl,
  ...apps,
  ...dao,
  ...evmScript,
}
