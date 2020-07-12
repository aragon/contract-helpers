# Truffle v4 configuration file

[![Status](https://img.shields.io/badge/stability-deprecated-lightgrey.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index)
[![npm version](https://img.shields.io/npm/v/@aragon/truffle-config-v4.svg?style=flat-square&color=lightgrey)](https://npmjs.org/package/@aragon/truffle-config-v4)

> **⚠️  Deprecation notice**: this package has been deprecated and should not be used any more. For smart contract development, we recommend migrating to [buidler](https://buidler.dev/), or if you still have to use Truffle, to upgrade to v5.

Base Truffle v4 configuration for Aragon smart contract development.

Comes with:

- Solc 0.4.24, with 10k optimization runs
- Predefined networks and gas settings
- Custom private key or mnemonic selection for live networks (see the [Set a private key](#set-a-private-key) section below)

## Install

```
$ npm install @aragon/truffle-config-v4
```

## Set a private key

For interacting with live networks using the Truffle console or aragonCLI, you can configure a private key in `~/.aragon`. Create a file`<network>_key.json`(e.g. `rinkeby_key.json`) with this structure:

```json
{
  "rpc": "https://<network>.infura.io",
  "keys": ["put-your-priv-key-here"]
}
```

The Truffle console and aragonCLI will then use that account if the matching network is selected.

You can also define a`~/.aragon/mnemonic.json` file instead of a single key, like:

```json
{
  "mnemonic": "explain tackle mirror kit ..."
}
```
