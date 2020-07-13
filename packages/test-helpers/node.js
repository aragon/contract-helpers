const GANACHE_NODE_ID = 'TestRPC'
const GETH_NODE_ID = 'Geth'

function isGanache(web3) {
  return web3.version.node.includes(GANACHE_NODE_ID)
}

function isGeth(web3) {
  return web3.version.node.includes(GETH_NODE_ID)
}

module.exports = {
  isGanache,
  isGeth,
}
