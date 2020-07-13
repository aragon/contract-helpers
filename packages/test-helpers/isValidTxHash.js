function isValidTxHash(txHash) {
  return /^0x([a-f0-9]{64})$/.test(txHash)
}

module.exports = {
  isValidTxHash,
}
