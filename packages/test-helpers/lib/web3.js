module.exports = (web3) => {
  const GETH_NODE_ID = 'Geth'
  const GANACHE_NODE_ID = 'TestRPC'

  const isGeth = () => web3.version.node.includes(GETH_NODE_ID)

  const isGanache = () => web3.version.node.includes(GANACHE_NODE_ID)

  const advanceBlock = async () => {
    await web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: new Date().getTime(),
    })
    return web3.eth.getBlock('latest').hash
  }

  const advanceBlocks = async (blocks) => {
    for (let i = 0; i < blocks; i++) {
      await advanceBlock()
    }
  }

  const advanceTime = (time) => {
    return web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [time],
      id: new Date().getTime(),
    })
  }

  const advanceTimeAndBlock = async (time) => {
    await advanceTime(time)
    await advanceBlock()
    return web3.eth.getBlock('latest')
  }

  const advanceTimeAndBlocksBy = async (time, numOfBlocks) => {
    await advanceTime(time)
    while (numOfBlocks !== 0) {
      await advanceBlock()
      numOfBlocks--
    }
    return web3.eth.getBlock('latest')
  }

  function signatures(
    contract,
    exclude,
    web3,
    names = false,
    excludeConstant = false
  ) {
    const flatten = (x) => [].concat.apply([], x)
    const sig = (f) => `${f.name}(${f.inputs.map((x) => x.type).join(',')})`

    const excludedSigs = flatten(exclude.map((x) => x.abi)).map(sig)

    let signatures = contract.abi
      .filter((x) => x.type == 'function')
      .filter((s) => !excludeConstant || !s.constant)
      .map(sig)
      .filter((s) => excludedSigs.indexOf(s) < 0)

    let bs = signatures.map((s) => web3.sha3(s).slice(0, 10)).sort()
    if (names) return bs.map((b, i) => ({ name: signatures[i], bytes: b }))

    return bs
  }

  async function getSignatureFields(payload, address) {
    const signedPayload = await web3.eth.sign(address, payload)
    const adding0x = (x) => '0x'.concat(x)
    return {
      r: adding0x(signedPayload.substr(2, 64)),
      s: adding0x(signedPayload.substr(66, 64)),
      v: signedPayload.substr(130, 2) == '00' ? 27 : 28,
    }
  }

  async function sign(signer, hash) {
    return web3.eth.sign(signer, hash)
  }

  async function getNonce() {
    const accounts = await web3.eth.getAccounts()
    return web3.eth.getTransactionCount(accounts[0])
  }

  async function call(tx) {
    return web3.eth.call(tx)
  }

  async function getBalance(addr) {
    return web3.eth.getBalance(addr)
  }

  async function getBlockNumber() {
    return web3.eth.getBlockNumber()
  }

  async function getBlock(n) {
    return web3.eth.getBlock(n)
  }

  async function sendTransaction(payload) {
    return web3.eth.sendTransaction(payload)
  }

  async function getTransaction(addr) {
    return web3.eth.getTransaction(addr)
  }

  return {
    isGeth,
    isGanache,
    advanceBlock,
    advanceBlocks,
    advanceTimeAndBlock,
    advanceTimeAndBlocksBy,
    advanceTime,
    signatures,
    getSignatureFields,
    sign,
    getNonce,
    call,
    getBalance,
    getBlockNumber,
    getBlock,
    sendTransaction,
    getTransaction,
  }
}
