// If an injected web3 exists in the current environment, use it by default
let defaultWeb3 = global.web3

function getWeb3(ctx = {}) {
  return ctx.web3 || defaultWeb3
}

function injectWeb3(web3) {
  defaultWeb3 = web3
}

module.exports = {
  getWeb3,
  injectWeb3,
}
