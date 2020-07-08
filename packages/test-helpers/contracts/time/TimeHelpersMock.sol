pragma solidity ^0.4.24;

import "./ClockMock.sol";
import "@aragon/os/contracts/common/TimeHelpers.sol";


contract TimeHelpersMock is TimeHelpers {
    ClockMock public clockMock;

    /**
    * @dev Set clock mock instance
    *      Allows to avoid changing constructors to have this time mocked functionality
    */
    function setClockMock(ClockMock _clockMock) external {
        clockMock = _clockMock;
    }

    /**
    * @dev Returns the mocked timestamp value
    */
    function getTimestampPublic() external view returns (uint256) {
        return getTimestamp();
    }

    /**
    * @dev Returns the mocked block number value
    */
    function getBlockNumberPublic() external view returns (uint256) {
        return getBlockNumber();
    }

    /**
    * @dev Returns the mocked timestamp if it was set, or current `block.timestamp`
    */
    function getTimestamp() internal view returns (uint256) {
        if (clockMock != ClockMock(0)) return clockMock.getTimestampPublic();
        return super.getTimestamp();
    }

    /**
    * @dev Returns the mocked block number if it was set, or current `block.number`
    */
    function getBlockNumber() internal view returns (uint256) {
        if (clockMock != ClockMock(0)) return clockMock.getBlockNumberPublic();
        return super.getBlockNumber();
    }
}
