const THROW_ERROR_PREFIX = 'Returned error: VM Exception while processing transaction: revert'

async function assertThrows(blockOrPromise, expectedErrorCode, expectedReason) {
  try {
    (typeof blockOrPromise === 'function') ? await blockOrPromise() : await blockOrPromise
  } catch (error) {
    const errorMatchesExpected = error.message.search(expectedErrorCode) > -1
    assert(errorMatchesExpected, `Expected error code "${expectedErrorCode}" but failed with "${error}" instead.`)
    return error
  }
  // assert.fail() for some reason does not have its error string printed 🤷
  assert(false, `Expected "${expectedErrorCode}"${expectedReason ? ` (with reason: "${expectedReason}")` : ''} but it did not fail`)
}

async assertJump(blockOrPromise) {
  return assertThrows(blockOrPromise, 'invalid JUMP')
},

async assertInvalidOpcode(blockOrPromise) {
  return assertThrows(blockOrPromise, 'invalid opcode')
},

async assertOutOfGas(blockOrPromise) {
  return assertThrows(blockOrPromise, 'out of gas')
},

async assertRevert(blockOrPromise, expectedReason) {
  const error = await assertThrows(blockOrPromise, revert, expectedReason)

  // Truffle v5 provides `error.reason`, but v4 does not.
  if (!error.reason && error.message.includes(THROW_ERROR_PREFIX)) {
    error.reason = error.message.replace(THROW_ERROR_PREFIX, '').trim()
  }
  // Truffle 5 sometimes adds an extra ' -- Reason given: reason.' to the error message 🤷
  error.reason = error.reason.replace(` -- Reason given: ${expectedReason}.`, '').trim()

  if (process.env.SOLIDITY_COVERAGE !== 'true' && reason) {
    assert.equal(error.reason, expectedReason, `Expected revert reason "${expectedReason}" but failed with "${error.reason || 'no reason'}" instead.`)
  }
}

module.exports = {
  assertJump,
  assertInvalidOpcode,
  assertOutOfGas,
  assertRevert,
}
