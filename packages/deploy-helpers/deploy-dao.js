const Kernel = artifacts.require('@aragon/os/build/contracts/kernel/Kernel')
const ACL = artifacts.require('@aragon/os/build/contracts/acl/ACL')
const EVMScriptRegistryFactory = artifacts.require(
  '@aragon/os/build/contracts/factory/EVMScriptRegistryFactory'
)
const DAOFactory = artifacts.require(
  '@aragon/os/build/contracts/factory/DAOFactory'
)

const getEventArgument = (receipt, event, arg, index = 0) =>
  getEventAt(receipt, event, index).args[arg]

const deployDAO = async appManager => {
  // Deploy a DAOFactory.
  const kernelBase = await Kernel.new(true)
  const aclBase = await ACL.new()
  const registryFactory = await EVMScriptRegistryFactory.new()
  const daoFactory = await DAOFactory.new(
    kernelBase.address,
    aclBase.address,
    registryFactory.address
  )

  // Create a DAO instance.
  const daoReceipt = await daoFactory.newDAO(appManager)
  const dao = Kernel.at(getEventArgument(daoReceipt, 'DeployDAO', 'dao'))

  // Grant the appManager address permission to install apps in the DAO.
  const acl = ACL.at(await dao.acl())
  const APP_MANAGER_ROLE = await kernelBase.APP_MANAGER_ROLE()
  await acl.createPermission(
    appManager,
    dao.address,
    APP_MANAGER_ROLE,
    appManager,
    { from: appManager }
  )

  return { dao, acl }
}

module.exports = deployDAO
