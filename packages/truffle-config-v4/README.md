# Truffle configuration file v4

## Install

```
$ npm install @aragon/truffle-config-v4
```

## Requirements

```
aragonCLI >= 6.4.0
```

## Set a private key

For interacting with aragonCLI you can configure a private key in `~/.aragon`. Create a file`<network>_key.json`(eg. `rinkeby_key.json`) with this structure:

```json
{
  "rpc": "https://<network>.infura.io",
  "keys": ["put-your-priv-key-here"]
}
```

aragonCLI will then use that account if you supply`--environment aragon:<network>` to its commands.

You can also define a`~/.aragon/mnemonic.json` file instead of a single key, like:

```json
{
  "mnemonic": "explain tackle mirror kit ..."
}
```
