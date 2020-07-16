const { getWeb3 } = require('./config')

const GANACHE_NODE_ID = 'TestRPC'
const GETH_NODE_ID = 'Geth'

async function isGanache(ctx) {
  const web3 = getWeb3(ctx)
  const nodeInfo = await web3.eth.getNodeInfo()
  return nodeInfo.includes(GANACHE_NODE_ID)
}

async function isGeth(ctx) {
  const web3 = getWeb3(ctx)
  const nodeInfo = await web3.eth.getNodeInfo()
  return nodeInfo.includes(GETH_NODE_ID)
}

module.exports = {
  isGanache,
  isGeth,
}
