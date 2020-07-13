# Solc 0.4 contract mocks

## aragonOS

### `EtherTokenConstant`

A simple mock to get the "mock" token address of ether for aragonOS and most Aragon app implementations, when the contract supports both ether and a token address.

```solidity
contract EtherTokenConstantMock is EtherTokenConstant {
    function getETHConstant() external pure returns (address);
}
```

### `TimeHelpersMock`

A mock to manipulate aragonOS's `TimeHelpers` construct.

This mock is useful to ensure smart contracts requiring a notion of time can be easily tested on "real" chain implementations like geth or parity, which do not implement "test" APIs such as `evm_increaseTime` or `evm_mine` (and rightly so!).

Most Aragon apps are built by extending the `TimeHelpers` contract, allowing this mock to manipulate the app's internal concept of time.

There are a number of simple utility methods included in the `TimeHelpersMock` to update, advance, or reverse time, so the best [documentation is the implementation itself](./aragonOS/TimeHelpersMock.sol).

## Tokens

Imported via `@aragon/test-helpers/contracts/0.4/token/`.

### `TokenMock`

A standards compliant ERC-20 token, with the ability to specify a specific account's balance on construction:

```solidity
contract TokenMock {
    constructor(address initialAccount, uint256 initialBalance) public;
}
```

Returns `true` on allowed actions and reverts on failed actions.

### `TokenReturnFalseMock`

A standards compliant ERC-20 token, similar to `TokenMock`, but while `TokenMock` reverts on failed actions, `TokenReturnFalseMock` returns `false`.

### `TokenReturnMissingMock`

A **non-compliant** ERC-20 token, which does not return a value on allowed actions.

Useful for testing that a contract correctly handles these non-compliant tokens, of which there are [multiple high-profile ones deployed](https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca).

## Internals

Contracts in the `internals/` subdirectory are meant to be private to this package and should not be used directly.

They have been given prefixed names to avoid causing name clashes with real contracts.
