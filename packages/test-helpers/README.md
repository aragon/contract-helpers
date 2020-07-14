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

### Generic utilities

### Custom assertions

### aragonOS utilities

### aragonOS assertions

### Smart contract mocks

Please visit the documentation available in [`contracts/`](./contracts).

### Shell scripts

#### `ganache-cli.sh`

A utility script to start a local `ganache-cli` or `solidity-coverage` RPC node and initiate `npx truffle test`.

This script is generally considered deprecated but may be useful if your test framework still requires you to start a local test node manually.

If you haven't already done so, you may be interested in migrating to [buidler](https://buidler.dev/), which handles this connection for you.
