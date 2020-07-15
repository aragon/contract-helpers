const EMPTY_BYTES = '0x'
const ZERO_BYTES32 =
  '0x0000000000000000000000000000000000000000000000000000000000000000'

function stripBytePrefix(bytes) {
  return bytes.substring(0, 2) === '0x' ? bytes.slice(2) : bytes
}

module.exports = {
  EMPTY_BYTES,
  ZERO_BYTES32,
  stripBytePrefix,
}
