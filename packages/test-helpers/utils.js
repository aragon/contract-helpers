// Only runs given test block when the condition passes
const onlyIf = (condition) => {
  return (testBlock) => {
    if (condition()) {
      return testBlock()
    }
  }
}

const isValidTxHash = (txHash) => /^0x([A-Fa-f0-9]{64})$/.test(txHash)

function makeErrorMappingProxy(target) {
  return new Proxy(target, {
    get(target, property) {
      if (property in target) {
        return target[property]
      }

      throw new Error(`Could not find error ${property} in error mapping`)
    },
    set() {
      throw new Error('Unexpected set to error mapping')
    },
  })
}

module.exports = {
  onlyIf,
  isValidTxHash,
  makeErrorMappingProxy,
}
