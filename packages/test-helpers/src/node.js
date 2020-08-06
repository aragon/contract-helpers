const { getWeb3 } = require('./config')

const GANACHE_NODE_ID = 'TestRPC'
const GETH_NODE_ID = 'Geth'

async function isNode(ctx, nodeId) {
  const web3 = getWeb3(ctx)
  if (web3.eth.getNodeInfo) {
    const nodeInfo = await web3.eth.getNodeInfo()
    return nodeInfo.includes(nodeId)
  }
}

async function isGanache(ctx) {
  const isNodeResult = await isNode(ctx, GANACHE_NODE_ID)
  if (isNodeResult === undefined) {
    return web3.currentProvider.host === 'http://localhost:8545'
  }
  return isNodeResult
}

async function isGeth(ctx) {
  const isNodeResult = await isNode(ctx, GETH_NODE_ID)
  return isNodeResult !== undefined
}

module.exports = {
  isGanache,
  isGeth,
}
