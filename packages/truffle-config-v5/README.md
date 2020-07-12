# Truffle v5 configuration file

> **⚠️  Note**: for smart contract development, we recommend migrating to [buidler](https://buidler.dev/).

Default Truffle v5 configuration for Aragon smart contract development.

Comes with:

- Solc 0.4.24, with 10k optimization runs
- Predefined networks and gas settings
- Custom private key or mnemonic selection for live networks (see the [Set a private key](#set-a-private-key) section below)

## Install

```
$ npm install @aragon/truffle-config-v5
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
