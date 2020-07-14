const { getEventArgument } = require('../')
const { getArtifacts } = require('../config')

async function newDao(rootAccount, contractCache, ctx) {
  const artifacts = getArtifacts(ctx)
  const Kernel = artifacts.require('Kernel')
  const ACL = artifacts.require('ACL')

  let { daoFactory } = contractCache || {}
  if (!daoFactory) {
    daoFactory = await newDaoFactory(ctx)
  }

  // Create a DAO instance
  const daoReceipt = await daoFactory.newDAO(rootAccount)
  const dao = await Kernel.at(getEventArgument(daoReceipt, 'DeployDAO', 'dao'))

  // Grant the rootAccount address permission to install apps in the DAO
  const acl = await ACL.at(await dao.acl())
  const APP_MANAGER_ROLE = await dao.APP_MANAGER_ROLE()
  await acl.createPermission(
    rootAccount,
    dao.address,
    APP_MANAGER_ROLE,
    rootAccount,
    { from: rootAccount }
  )

  return { dao, acl }
}

async function newDaoFactory(ctx) {
  const artifacts = getArtifacts(ctx)

  const Kernel = artifacts.require('Kernel')
  const ACL = artifacts.require('ACL')
  const EVMScriptRegistryFactory = artifacts.require('EVMScriptRegistryFactory')
  const DAOFactory = artifacts.require('DAOFactory')

  const kernelBase = await Kernel.new(true)
  const aclBase = await ACL.new()
  const registryFactory = await EVMScriptRegistryFactory.new()

  return await DAOFactory.new(
    kernelBase.address,
    aclBase.address,
    registryFactory.address
  )
}

module.exports = {
  newDao,
  newDaoFactory,
}
