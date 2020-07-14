const { assert } = require('chai')
const { isAddress, isBN, toChecksumAddress } = require('web3-utils')

const { getEvents, getEventAt } = require('../')

function normalizeArg(arg) {
  if (isBN(arg)) {
    return arg.toString()
  } else if (isAddress(arg)) {
    return toChecksumAddress(arg)
  }

  return arg
}

function assertEvent(receipt, eventName, expectedArgs = {}, index = 0) {
  const event = getEventAt(receipt, eventName, index)

  assert(
    typeof event === 'object',
    `could not find an emitted ${eventName} event ${
      index === 0 ? '' : `at index ${index}`
    }`
  )

  for (const arg of Object.keys(expectedArgs)) {
    const foundArg = normalizeArg(event.args[arg])
    const expectedArg = normalizeArg(expectedArgs[arg])

    assert.equal(
      foundArg,
      expectedArg,
      `${eventName} event's ${arg} value does not match`
    )
  }
}

function assertAmountOfEvents(receipt, eventName, expectedAmount = 1) {
  const events = getEvents(receipt, eventName)
  assert.equal(
    events.length,
    expectedAmount,
    `number of ${eventName} events does not match`
  )
}

module.exports = {
  assertEvent,
  assertAmountOfEvents,
}
