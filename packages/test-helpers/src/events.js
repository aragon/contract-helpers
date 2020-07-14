function getEvents({ logs = [] }, eventName) {
  return logs.filter((l) => l.event === eventName)
}

function getEventAt(receipt, eventName, index = 0) {
  return getEvents(receipt, eventName)[index]
}

function getEventArgument(receipt, eventName, arg, index = 0) {
  return getEventAt(receipt, eventName, index).args[arg]
}

module.exports = {
  getEvents,
  getEventAt,
  getEventArgument,
}
