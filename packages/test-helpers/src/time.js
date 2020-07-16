const { bn } = require('./numbers')
const { getWeb3 } = require('./config')

const ONE_DAY = 60 * 60 * 24
const ONE_WEEK = ONE_DAY * 7
const NOW = parseInt(new Date().getTime() / 1000) // EVM timestamps are expressed in seconds
const TOMORROW = NOW + ONE_DAY
const NEXT_WEEK = NOW + ONE_WEEK

async function latestBlock(ctx) {
  const web3 = getWeb3(ctx)

  const block = await web3.eth.getBlock('latest')
  return bn(block.number)
}

// Returns the time of the last mined block in seconds
async function latestTime(ctx) {
  const web3 = getWeb3(ctx)

  const block = await web3.eth.getBlock('latest')
  return bn(block.timestamp)
}

module.exports = {
  NOW,
  TOMORROW,
  NEXT_WEEK,
  ONE_DAY,
  ONE_WEEK,
  latestBlock,
  latestTime,
}
