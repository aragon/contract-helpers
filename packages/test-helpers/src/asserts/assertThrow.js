const { assert } = require('chai')
const { isGeth } = require('../node')
const { decodeErrorReasonFromTx } = require('../decoding')

const THROW_ERROR_PREFIX =
  'Returned error: VM Exception while processing transaction: revert'

async function assertThrows(
  blockOrPromise,
  expectedErrorCode,
  expectedReason,
  ctx
) {
  try {
    typeof blockOrPromise === 'function'
      ? await blockOrPromise()
      : await blockOrPromise
  } catch (error) {
    if (isGeth(ctx)) {
      // With geth, we are only provided the transaction receipt and have to decode the failure
      // ourselves.
      const status = error.receipt.status

      assert.equal(
        status,
        '0x0',
        `Expected transaction to revert but it executed with status ${status}`
      )
      if (!expectedReason.length) {
        // Note that it is difficult to ascertain invalid jumps or out of gas scenarios
        // and so we simply pass if no revert message is given
        return
      }

      const { tx } = error
      assert.notEqual(
        tx,
        undefined,
        `Expected error to include transaction hash, cannot assert revert reason ${expectedReason}: ${error}`
      )

      error.reason = decodeErrorReasonFromTx(tx, ctx)
      return error
    } else {
      const errorMatchesExpected = error.message.search(expectedErrorCode) > -1
      assert(
        errorMatchesExpected,
        `Expected error code "${expectedErrorCode}" but failed with "${error}" instead.`
      )
      return error
    }
  }
  // assert.fail() for some reason does not have its error string printed 🤷
  assert(
    false,
    `Expected "${expectedErrorCode}"${
      expectedReason ? ` (with reason: "${expectedReason}")` : ''
    } but it did not fail`
  )
}

async function assertJump(blockOrPromise, ctx) {
  await assertThrows(blockOrPromise, 'invalid JUMP', ctx)
}

async function assertInvalidOpcode(blockOrPromise, ctx) {
  await assertThrows(blockOrPromise, 'invalid opcode', ctx)
}

async function assertOutOfGas(blockOrPromise, ctx) {
  await assertThrows(blockOrPromise, 'out of gas', ctx)
}

async function assertRevert(blockOrPromise, expectedReason, ctx) {
  const error = await assertThrows(
    blockOrPromise,
    'revert',
    expectedReason,
    ctx
  )

  if (!expectedReason) {
    return
  }

  // Truffle v5 provides `error.reason`, but v4 does not.
  if (!error.reason && error.message.includes(THROW_ERROR_PREFIX)) {
    error.reason = error.message.replace(THROW_ERROR_PREFIX, '').trim()
  }
  // Truffle 5 sometimes adds an extra ' -- Reason given: reason.' to the error message 🤷
  error.reason = error.reason
    .replace(` -- Reason given: ${expectedReason}.`, '')
    .trim()

  if (process.env.SOLIDITY_COVERAGE !== 'true') {
    assert.equal(
      error.reason,
      expectedReason,
      `Expected revert reason "${expectedReason}" but failed with "${
        error.reason || 'no reason'
      }" instead.`
    )
  }
}

module.exports = {
  assertJump,
  assertInvalidOpcode,
  assertOutOfGas,
  assertRevert,
}
