const abi = require('web3-eth-abi')
const { isAddress } = require('web3-utils')

function getEvents({ logs = [] }, event) {
  return logs.filter(l => l.event === event)
}

function getEventAt(receipt, event, index = 0) {
  return getEvents(receipt, event)[index]
}

function getEventArgument(receipt, event, arg, index = 0) {
  return getEventAt(receipt, event, index).args[arg]
}

function getNewProxyAddress(receipt) {
  return getEventArgument(receipt, 'NewAppProxy', 'proxy')
}

function decodeEvents(receipt, contractAbi, eventName) {
  const eventAbi = contractAbi.filter(abi => abi.name === eventName && abi.type === 'event')[0]
  const eventSignature = abi.encodeEventSignature(eventAbi)
  const eventLogs = receipt.rawLogs.filter(l => l.topics[0] === eventSignature)

  return eventLogs.map(log => {
    // First topic is the event signature
    const decodedArgs = abi.decodeLog(eventAbi.inputs, log.data, log.topics.slice(1))
    // Undo checksumed addresses
    const eventArgs = Object.keys(eventArgs).map(arg => isAddress(arg) ? arg.toLowerCase() : arg)

    log.event = eventAbi.name
    log.args = eventArgs

    return log
  })
}

module.exports = {
  decodeEvents,
  getEvents,
  getEventAt,
  getEventArgument,
  getNewProxyAddress,
}
