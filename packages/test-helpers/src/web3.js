const { getWeb3 } = require('./config')

module.exports = {
  signatures(contract, exclude, names = false, excludeConstant = false, ctx = {}) {
    const web3 = getWeb3(ctx)
    const flatten = x => [].concat.apply([], x)
    const sig = f => `${f.name}(${f.inputs.map(x=>x.type).join(',')})`

    const excludedSigs = flatten(exclude.map(x => x.abi)).map(sig)

    let signatures = contract.abi
      .filter(x => x.type == 'function')
      .filter(s => !excludeConstant || !s.constant)
      .map(sig)
      .filter(s => excludedSigs.indexOf(s) < 0)

     let bs = signatures.map(s => web3.sha3(s).slice(0, 10)).sort()
     if (names)
        return bs.map((b, i) => ({ name: signatures[i], bytes: b }))

     return bs
  },

  async getBalance(addr, ctx) {
    const web3 = getWeb3(ctx)
    return await web3.eth.getBalance(addr)
  },

  async getBlockNumber(ctx) {
    const web3 = getWeb3(ctx)
    return await web3.eth.getBlockNumber()
  },

  async getBlock(n, ctx) {
    const web3 = getWeb3(ctx)
    return await web3.eth.getBlock(n)
  },

  async sendTransaction(payload, ctx) {
    const web3 = getWeb3(ctx)
    return await web3.eth.sendTransaction(payload)
  },

  async getNonce(ctx) {
    const web3 = getWeb3(ctx)
    const acc = await web3.eth.getAccounts()
    return await web3.eth.getTransactionCount(acc[0])
  },

  sign(payload, address, ctx) {
    const web3 = getWeb3(ctx)
    return new Promise((resolve, reject) => {
      web3.eth.sign(address, payload, async (err, signedPayload) => {
        if (err || !signedPayload) return reject(err)
        const adding0x = x => '0x'.concat(x)
        resolve({
          r: adding0x(signedPayload.substr(2, 64)),
          s: adding0x(signedPayload.substr(66, 64)),
          v: signedPayload.substr(130, 2) == '00' ? 27 : 28,
        })
      })
    })
  }
}
