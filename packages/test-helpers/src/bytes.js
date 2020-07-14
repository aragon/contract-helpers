function stripBytePrefix(bytes) {
  return bytes.substring(0, 2) === '0x' ? bytes.slice(2) : bytes
}

module.exports = {
  stripBytePrefix,
}
