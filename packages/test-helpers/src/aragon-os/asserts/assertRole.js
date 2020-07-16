const { assert } = require('chai')
const { toChecksumAddress } = require('web3-utils')

const { ZERO_ADDRESS } = require('../../addresses')

async function assertRole(acl, app, manager, roleName, grantee = manager) {
  const appName = app.constructor.contractName
  const permission = await app[roleName]()
  const managerAddress = await acl.getPermissionManager(app.address, permission)

  assert.equal(
    toChecksumAddress(managerAddress),
    toChecksumAddress(manager.address),
    `Manager of ${appName}'s ${roleName} role should match`
  )
  assert.isTrue(
    await acl.hasPermission(grantee.address, app.address, permission),
    `Grantee should have permission to access ${appName}'s ${roleName} role`
  )
}

async function assertRoleNotGranted(acl, app, roleName, to) {
  const appName = app.constructor.contractName
  const permission = await app[roleName]()

  assert.isFalse(
    await acl.hasPermission(to.address, app.address, permission),
    `Given address should not have permission to access ${appName}'s ${roleName} role`
  )
}

async function assertMissingRole(acl, app, roleName) {
  const appName = app.constructor.contractName
  const permission = await app[roleName]()
  const managerAddress = await acl.getPermissionManager(app.address, permission)
  assert.equal(
    managerAddress,
    ZERO_ADDRESS,
    `Manager should not exist for ${appName}'s ${roleName} role`
  )
}

async function assertBurnedRole(acl, app, roleName) {
  const appName = app.constructor.contractName
  const permission = await app[roleName]()
  const burnEntity = await acl.BURN_ENTITY()
  const managerAddress = await acl.getPermissionManager(app.address, permission)
  assert.equal(
    managerAddress,
    burnEntity,
    `${appName}'s ${roleName} should be burned`
  )
}

module.exports = {
  assertRole,
  assertRoleNotGranted,
  assertMissingRole,
  assertBurnedRole,
}
