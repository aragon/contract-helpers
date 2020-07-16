const abi = require('web3-eth-abi')
const { isAddress } = require('web3-utils')

const { getWeb3 } = require('./config')
const { stripBytePrefix } = require('./bytes')

function decodeErrorReason(returnValue) {
  returnValue = stripBytePrefix(returnValue)

  const rawReason = returnValue
    .slice(8) // remove identifier: bytes4(keccak256('Error(string)'))
    .slice(128) // remove encoded result metadata (length + offset)

  let decodedReason = ''
  for (let i = 0; i < rawReason.length; i += 2) {
    const code = parseInt(rawReason.substr(i, 2), 16)
    if (code === 0) {
      continue
    }
    decodedReason += String.fromCharCode(code)
  }

  return decodedReason
}

async function decodeErrorReasonFromTx(tx, ctx) {
  const web3 = getWeb3(ctx)

  const {
    gas,
    gasPrice,
    from,
    to,
    nonce,
    input: data,
  } = web3.eth.getTransaction(tx)
  const response = await web3.eth.call({ data, from, to, gas, gasPrice, nonce })

  return decodeErrorReason(response)
}

function decodeEvents(receipt, contractAbi, eventName) {
  const rawLogs = receipt.rawLogs || []

  const eventAbi = contractAbi.filter(
    (abi) => abi.name === eventName && abi.type === 'event'
  )[0]
  const eventSignature = abi.encodeEventSignature(eventAbi)
  const eventLogs = rawLogs.filter((l) => l.topics[0] === eventSignature)

  return eventLogs.map((log) => {
    // First topic is the event signature
    const decodedArgs = abi.decodeLog(
      eventAbi.inputs,
      log.data,
      log.topics.slice(1)
    )
    // Undo checksumed addresses
    const eventArgs = Object.keys(decodedArgs).map((arg) =>
      isAddress(arg) ? arg.toLowerCase() : arg
    )

    log.event = eventAbi.name
    log.args = eventArgs

    return log
  })
}

module.exports = {
  decodeErrorReason,
  decodeErrorReasonFromTx,
  decodeEvents,
}
