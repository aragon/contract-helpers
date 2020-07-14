const { getWeb3 } = require('./config')

const GANACHE_NODE_ID = 'TestRPC'
const GETH_NODE_ID = 'Geth'

function isGanache(ctx) {
  const web3 = getWeb3(ctx)

  return web3.version.node.includes(GANACHE_NODE_ID)
}

function isGeth(ctx) {
  const web3 = getWeb3(ctx)

  return web3.version.node.includes(GETH_NODE_ID)
}

module.exports = {
  isGanache,
  isGeth,
}
