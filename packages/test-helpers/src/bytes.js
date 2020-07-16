const EMPTY_BYTES = '0x00' // Empty bytes from Solidity getters are returned with 2 zeroes
const ZERO_BYTES32 = '0x' + '0'.repeat(64) // 0x0000...0000

function stripBytePrefix(bytes) {
  return bytes.substring(0, 2) === '0x' ? bytes.slice(2) : bytes
}

module.exports = {
  EMPTY_BYTES,
  ZERO_BYTES32,
  stripBytePrefix,
}
