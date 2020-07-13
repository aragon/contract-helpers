pragma solidity ^0.4.24;

import "./TimeHelpersMock.sol";
import "@aragon/os/contracts/common/TimeHelpers.sol";


contract SharedTimeHelpersMock is TimeHelpers {
    TimeHelpersMock public clock;

    /**
    * @dev Set shared clock mock instance
    *      Allows to avoid changing constructors to have this time mocked functionality
    */
    function setClock(TimeHelpersMock _clock) external {
        clock = _clock;
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
        if (clock != TimeHelpersMock(0)) {
            return clock.getTimestampPublic();
        }
        return super.getTimestamp();
    }

    /**
    * @dev Returns the mocked block number if it was set, or current `block.number`
    */
    function getBlockNumber() internal view returns (uint256) {
        if (clock != TimeHelpersMock(0)) {
            return clock.getBlockNumberPublic();
        }
        return super.getBlockNumber();
    }
}
