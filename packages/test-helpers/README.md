# Aragon test helpers

[![Status](https://img.shields.io/badge/stability-stable.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index)
[![npm version](https://img.shields.io/npm/v/@aragon/contract-helpers-test.svg?style=flat-square&color=lightgrey)](https://npmjs.org/package/@aragon/truffle-config-v4)

Test helpers for both generic Solidity and Aragon-related smart contracts.

> 🛠  This package is designed to be used in a [`web3.js@1`](js.readthedocs.io/en/1.0/) and [Truffle v5](https://www.trufflesuite.com/docs/truffle/overview) environment. If you are using [ethers.js](https://docs.ethers.io/v5/), you are likely much better served by [waffle](https://getwaffle.io/) which comes batteries-included with most of the [assertion matchers](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) you'll need.

## Quick start

Install with `yarn add --dev @aragon/contract-helpers-test`.

In your tests, you'll then import these utilities like so:

```js
const { bn, getEvents, MAX_UINT256, ZERO_ADDRESS } = require('@aragon/contract-helpers-test')
const { assertEvent, assertRevert } = require('@aragon/contract-helpers-test/asserts')
const { newDao, newDaoFactory } = require('@aragon/contract-helpers-test/aragon-os')
```

A number of contract mocks are also accessible through `@aragon/contract-helpers-test/contracts/` and may be useful for testing Aragon apps or other generic smart contracts. More documentation on these contract mocks is available in the [`contracts/`](./contracts) subdirectory.

## API

The test helpers are grouped into several main exports:

- [`@aragon/contract-helpers-test/`](#generic-utilities): generic utilities for on-chain interactions
- [`@aragon/contract-helpers-test/asserts`](#custom-assertions): custom assertions for on-chain interactions
- [`@aragon/contract-helpers-test/aragon-os`](#aragonos-utilities): aragonOS-related utilities
- [`@aragon/contract-helpers-test/aragon-os/asserts`](#aragonos-assertions): aragonOS-related assertions

Furthermore, the package also comes with:

- [`@aragon/contract-helpers-test/contracts`](#smart-contract-mocks): smart contract mocks
- [`@aragon/contract-helpers-test/scripts`](#shell-scripts): utility shell scripts

### Global state

The utilities exposed from the test helpers will automatically detect and bind to an injected Truffle environment (`artifacts` and `web3`).

However, it is possible to override this default binding or inject your own if none exist at the start of a file.

#### `ctx`

Individual utilities containing a trailing `ctx` parameter allow you to override the environment specifically for that single call.

```ts
type Artifacts = {
  require: (name: string) => TruffleContract,
}

type Context = {
  artifacts: Artifacts,
  web3: Web3,
}
```

#### `injectArtifacts()`

Inject an `artifacts` object into the global default environment.

Note that all future calls will now reference this new `artifacts` object by default.

#### `injectWeb3()`

Inject a `web3` object into the global default environment.

Note that all future calls will now reference this new `web3` object by default.

### Generic utilities

#### Constants

The following constants are available, and mostly self-explanatory:

- Ethereum related
  - `EMPTY_BYTES`
  - `ZERO_ADDRESS`
  - `ZERO_BYTES32`
- Number related
  - `MAX_UINT64`
  - `MAX_UINT192`
  - `MAX_UINT256`
- Time related
  - `NOW`: `Date.now()`, *in seconds*
  - `TOMORROW`: one day ahead of `Date.now()`, *in seconds*
  - `NEXT_WEEK`: one week ahead of `Date.now()`, *in seconds*
  - `ONE_DAY`: duration for one day, *in seconds*
  - `ONE_WEEK`: duration for one week, *in seconds*

### Custom assertions

### aragonOS utilities

#### Constants

The following constants are available:

- ACL
  - `ANY_ENTITY`: address denoting any address has permission
  - `BURN_MANAGER`: address denoting a permission has been frozen via discarding (burning) its manager
- EVM Scripts
  - `EMPTY_CALLS_SCRIPT`: empty CallsScript (with spec id 1)

### aragonOS assertions

### Smart contract mocks

Please visit the documentation available in [`contracts/`](./contracts).

### Shell scripts

#### `ganache-cli.sh`

A utility script to start a local `ganache-cli` or `solidity-coverage` RPC node and initiate `npx truffle test`.

This script is generally considered deprecated but may be useful if your test framework still requires you to start a local test node manually.

If you haven't already done so, you may be interested in migrating to [buidler](https://buidler.dev/), which handles this connection for you.
