// Only runs given test block when the condition passes
const onlyIf = condition => {
  return testBlock => {
    if (condition()) {
      return testBlock()
    }
  }
}

const isValidTxHash = txHash => /^0x([A-Fa-f0-9]{64})$/.test(txHash)

module.exports = {
  onlyIf,
  isValidTxHash
}
