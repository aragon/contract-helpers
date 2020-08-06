// Import configuration files first
const { injectArtifacts } = require('./config/artifacts')
const { injectWeb3 } = require('./config/web3')

// Utilities
const addresses = require('./addresses')
const aragonOS = require('./aragon-os')
const asserts = require('./asserts')
const bytes = require('./bytes')
const decoding = require('./decoding')
const errors = require('./errors')
const events = require('./events')
const mocha = require('./mocha')
const node = require('./node')
const numbers = require('./numbers')
const time = require('./time')
const web3 = require('./web3')

module.exports = {
  injectArtifacts,
  injectWeb3,
  ...addresses,
  ...aragonOS,
  ...asserts,
  ...bytes,
  ...decoding,
  ...errors,
  ...events,
  ...mocha,
  ...node,
  ...numbers,
  ...time,
  ...web3,
}
