const abi = require('ethereumjs-abi')
const { bn } = require('./lib/numbers')

const createExecutorId = (id) => `0x${String(id).padStart(8, '0')}`

module.exports = {
  EMPTY_SCRIPT: '0x00000001',

  // Encodes an array of actions ({ to: address, calldata: bytes }) into the EVM call script format
  // Sets spec id and concatenates per call
  //   [ 20 bytes (address) ] + [ 4 bytes (uint32: calldata length) ] + [ calldataLength bytes (payload) ]
  // Defaults spec id to 1
  encodeCallScript: (actions, specId = 1) => {
    return actions.reduce((script, { to, calldata }) => {
      const addr = abi.rawEncode(['address'], [to]).toString('hex')
      const length = abi
        .rawEncode(['uint256'], [(calldata.length - 2) / 2])
        .toString('hex')

      // Remove 12 first 0s of padding for addr and 28 0s for uint32
      return script + addr.slice(24) + length.slice(56) + calldata.slice(2)
    }, createExecutorId(specId))
  },

  // Set role such that the Oracle canPerform() function is used to determine the permission
  permissionParamEqOracle: (oracleAddress) => {
    const argId = '0xCB' // arg 203 - Oracle ID
    const op = '01' // equal
    const value = oracleAddress.slice(2).padStart(60, 0) // 60 as params are uint240
    return bn(`${argId}${op}${value}`)
  },
}
