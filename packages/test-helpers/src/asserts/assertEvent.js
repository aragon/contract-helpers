const { assert } = require('chai')
const { isAddress, isBN, toChecksumAddress } = require('web3-utils')

const { getEvents, getEventAt } = require('../events')

function normalizeArg(arg) {
  if (isBN(arg)) {
    return arg.toString()
  } else if (isAddress(arg)) {
    return toChecksumAddress(arg)
  } else if (arg && arg.address) {
    // Web3.js or Truffle contract instance
    return toChecksumAddress(arg.address)
  }

  return arg
}

function assertEvent(
  receipt,
  eventName,
  { index = 0, expectedArgs = {}, ...options } = {}
) {
  const event = getEventAt(receipt, eventName, { index, ...options })

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

function assertAmountOfEvents(
  receipt,
  eventName,
  { expectedAmount = 1, ...options } = {}
) {
  const events = getEvents(receipt, eventName, options)
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
