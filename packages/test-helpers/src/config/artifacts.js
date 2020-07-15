// If an injected artifacts exists in the current environment, use it by default
let defaultArtifacts = global.artifacts

function getArtifacts(ctx = {}) {
  return ctx.artifacts || defaultArtifacts
}

function injectArtifacts(artifacts) {
  defaultArtifacts = artifacts
}

module.exports = {
  getArtifacts,
  injectArtifacts,
}
