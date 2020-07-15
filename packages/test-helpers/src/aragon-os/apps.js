const { decodeEvents } = require('../')
const { getArtifacts } = require('../config')

function getInstalledApps(receipt, appIds, ctx) {
  appIds = Array.isArray(appIds) ? appIds : appIds ? [appIds] : null

  const artifacts = getArtifacts(ctx)
  const Kernel = artifacts.require('Kernel')

  return decodeEvents(receipt, Kernel.abi, 'NewAppProxy')
    .filter((event) =>
      Array.isArray(appIds) ? appIds.includes(event.args.appId) : true
    )
    .map((event) => event.args.proxy)
}

function getInstalledApp(receipt, appId) {
  return getInstalledApps(receipt, appId)[0]
}

async function installNewApp(dao, appId, baseAppAddress, rootAccount) {
  const receipt = await dao.newAppInstance(
    appId, // appId
    baseAppAddress, // appBase
    '0x', // initializePayload
    false, // setDefault
    { from: rootAccount }
  )

  // Find the deployed proxy address in the tx logs
  return getInstalledApp(receipt, appId)
}

module.exports = {
  getInstalledApp,
  getInstalledApps,
  installNewApp,
}
