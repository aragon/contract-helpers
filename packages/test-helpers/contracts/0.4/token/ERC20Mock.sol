pragma solidity ^0.4.24;

import "./TokenMock.sol";


contract ERC20Mock is TokenMock {
    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(string _name, string _symbol, uint8 _decimals) TokenMock(msg.sender, 0) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    /**
    * @dev Mint tokens for a specific address
    * @param _to address The address which you want to mint the tokens to
    * @param _value uint256 the amount of tokens to be minted
    */
    function mint(address _to, uint256 _value) public {
        totalSupply_ = totalSupply_.add(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(address(0), _to, _value);
    }

    /**
    * @dev Burn tokens for a specific address
    * @param _to address The address which you want to burn the tokens from
    * @param _value uint256 the amount of tokens to be burned
    */
    function burn(address _to, uint256 _value) public {
        balances[_to] = balances[_to].sub(_value);
        totalSupply_ = totalSupply_.sub(_value);
        emit Transfer(_to, address(0), _value);
    }
}
