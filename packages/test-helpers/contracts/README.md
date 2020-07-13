# Contract mocks

Useful utility contract mocks, organized by the solc version they are meant to be compiled with.

For more information about the available mocks and their interfaces, visit each version grouping:

- [solc 0.4.x](./0.4)

## Usage

You should be able to import these into your tests via your test framework's contract loader. In some environments, such as Truffle, you may need to "inject" these mock contracts through a separate declaration mechanism.

In order to use the `aragonOS` mocks (in the `/aragonOS` subdirectories), you will have to install a matching `@aragon/os` version:

```sh
yarn add --dev @aragon/os
```

The current aragonOS compatibility table:

| aragonOS          | solc version       |
| ------------------|------------------- |
| `@aragon/os <= 4` | `solidity ^0.4.24` |

### Truffle

For usage with Truffle, you will need to do something like:

```solidity
// contracts/test/TestImport
pragma solidity ^0.4.24;

import "@aragon/test-helpers/contracts/0.4/aragonOS/TimeHelpersMock.sol";
import "@aragon/test-helpers/contracts/0.4/token/TokenMock.sol";


contract TestImport {
    constructor() public { }
}
```

To "trick" the Truffle-artifact resolution module into knowing about these contracts.

And then in your test files, you can simply fetch them via the normal `artifacts.require()`:

```js
// test/example-test.js

const TokenMock = artifacts.require('TokenMock')
```
