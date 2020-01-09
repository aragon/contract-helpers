const flatten = require('truffle-flattener')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const findUp = require('find-up')

const FLATTEN_DIR = './flattened_contracts'

const getTruffleConfig = () => {
  try {
    let truffleConfigPath = findUp.sync('truffle-config.js')
    if (fs.existsSync(truffleConfigPath)) {
      const truffleConfig = require(truffleConfigPath)
      return truffleConfig
    }
    truffleConfigPath = findUp.sync('truffle.js')
    if (fs.existsSync(truffleConfigPath)) {
      const truffleConfig = require(truffleConfigPath)
      return truffleConfig
    }
  } catch (err) {
    throw new Error(err)
  }
  throw new Error(`Didn't find a truffle configuration file. You should add it to your project or provide one using the "truffleConfig" argument`)
}

module.exports = async (
  instance,
  {
    verbose = true,
    flattenContracts = true,
    truffleConfig = getTruffleConfig(),
    output,
  } = {}
) => {

  const {
    contractName,
    sourcePath,
    updatedAt: compiledAt,
    compiler: { name: compilerName, version: compilerVersion },
  } = instance.constructor._json

  if (flattenContracts) {
    const flattenedCode = await flatten([sourcePath])
    const flattenDir = output || FLATTEN_DIR
    mkdirp.sync(flattenDir)
    const savePath = path.join(flattenDir, `${contractName}.sol`)
    fs.writeFileSync(savePath, flattenedCode)
  }

  const optimizer = truffleConfig.solc.optimizer || null
  const optimizerStatus =
    optimizer && optimizer.enabled ? `${optimizer.runs} runs` : 'Disabled'

  if (!verbose) {
    console.log(`Deployed ${contractName}: ${instance.address}`)
  } else {
    console.log('=========')
    console.log(`# ${contractName}:`)
    console.log(`Address: ${instance.address}`)
    console.log(`Transaction hash: ${instance.transactionHash}`)
    console.log(
      `Compiler: ${compilerName}@${compilerVersion} (Optimizer: ${optimizerStatus})`
    )
    console.log(`Compiled at: ${compiledAt}`)
    console.log('=========')
  }
}
