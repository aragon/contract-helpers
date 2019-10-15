# Truffle configuration file

## Set a private key

For interacting with aragonCLI you can configure a private key in `~/.aragon`. Create a file`<network>_key.json`(eg. `rinkeby_key.json`) with this structure:

```json
{
  "rpc": "https://<network>.infura.io",
  "keys": ["put-your-priv-key-here"]
}
```

Then if you use`--environment aragon:<network>` when using the aragonCLI commands it will use that account.

You can also define a`~/.aragon/mnemonic.json` file like:

```json
{
  "mnemonic": "explain tackle mirror kit ..."
}
```