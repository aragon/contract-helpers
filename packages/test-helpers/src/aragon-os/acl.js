const { bn } = require('../')

const ANY_ENTITY = '0x' + 'f'.repeat(40) // 0xffff...ffff
const BURN_MANAGER = '0x' + '0'.repeat(38) + '01' // 0x0000...0001

// Set role such that the ACLOracle's canPerform() function is used to determine the permission
function createEqOraclePermissionParam(oracleAddress) {
  const argId = '0xCB' // arg 203 - Oracle ID
  const op = '01' // equal
  const value = oracleAddress.slice(2).padStart(60, 0) // 60 as params are uint240
  return bn(`${argId}${op}${value}`)
}

async function setOpenPermission(acl, appAddress, role, rootAddress) {
  // Note: Setting a permission to 0xffffffffffffffffffffffffffffffffffffffff
  // is interpreted by aragonOS as allowing the role for any address.
  await acl.createPermission(
    ANY_ENTITY, // entity (who?)
    appAddress, // app (where?)
    role, // role (what?)
    rootAddress, // manager
    { from: rootAddress }
  )
}

module.exports = {
  ANY_ENTITY,
  BURN_MANAGER,
  createEqOraclePermissionParam,
  setOpenPermission,
}
