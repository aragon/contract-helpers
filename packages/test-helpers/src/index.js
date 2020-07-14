// Import configuration files first
const { injectArtifacts } = require('./config/artifacts')
const { injectWeb3 } = require('./config/web3')

// Utilities
const bytes = require('./bytes')
const constants = require('./constants')
const decoding = require('./decoding')
const events = require('./events')
const mocha = require('./mocha')
const node = require('./node')
const numbers = require('./numbers')
const time = require('./time')

module.exports = {
  injectArtifacts,
  injectWeb3,
  ...bytes,
  ...constants,
  ...decoding,
  ...events,
  ...mocha,
  ...node,
  ...numbers,
  ...time,
}
