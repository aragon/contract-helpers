const { isBN, toBN } = require('web3-utils')

function bn(x) {
  return toBN(x)
}

function bigExp(x, y) {
  return bn(x)
    .mul(bn(10)
    .pow(bn(y)))
}

function isBn(x) {
  return isBN(x)
}

function maxUint(e) {
  return bn(2)
    .pow(bn(e))
    .sub(bn(1))
}

function pct16(x) {
  return bigExp(x, 16)
}

const ONE = bigExp(1, 18)
const MAX_UINT64 = maxUint(64)
const MAX_UINT192 = maxUint(192)
const MAX_UINT256 = maxUint(256)

module.exports = {
  bn,
  bigExp,
  isBn,
  pct16,
  MAX_UINT64,
  MAX_UINT192,
  MAX_UINT256,
  ONE,
}
