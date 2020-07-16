const { decodeEvents } = require('./decoding')

function getEvents(receipt, eventName, { decodeForAbi } = {}) {
  const logs = decodeForAbi
    ? decodeEvents(receipt, decodeForAbi, eventName)
    : receipt.logs

  return logs.filter((l) => l.event === eventName)
}

function getEventAt(receipt, eventName, { index = 0, ...options } = {}) {
  return getEvents(receipt, eventName, options)[index]
}

function getEventArgument(receipt, eventName, arg, options) {
  return getEventAt(receipt, eventName, options).args[arg]
}

module.exports = {
  getEvents,
  getEventAt,
  getEventArgument,
}
