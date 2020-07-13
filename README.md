# Contract Helpers <img align="right" src="https://raw.githubusercontent.com/aragon/design/master/readme-logo.png" height="80px" />

## Structure

This is a monorepo containing utilities and helpers for developing smart contracts.

Includes the following packages (see their packages for documentation):

- **`@aragon/contract-helpers-test` ([Test helpers](packages/test-helpers))**: Test helpers for both generic Solidity and Aragon-related smart contracts
- **`@aragon/truffle-config-v5` ([Truffle v5 config](packages/truffle-config-v5))**: Base Truffle v5 configuration for Aragon smart contract development

The following packages have yet to be published:

- **[Deploy Helpers](packages/deploy-helpers)**: Tools to deploy smart contracts on the Aragon framework

## Developing

Each individual package in the [`packages/`](./packages/) directory is a self-contained package that should be installed individually.

As evidenced through the lock files, we generally use [`yarn`](https://yarnpkg.com/) during local development.
