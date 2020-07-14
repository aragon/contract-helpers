const { assert } = require('chai')
const { bn } = require('../')

const assertBn = (actual, expected, errorMsg) => {
  assert.equal(
    bn(actual).toString(),
    bn(expected).toString(),
    `${errorMsg} expected ${expected.toString()} to equal ${actual.toString()}`
  )
}

module.exports = {
  assertBn,
}
