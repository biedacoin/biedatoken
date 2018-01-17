pragma solidity ^0.4.17;

contract Krzysiek {
    address private krzysiek;
    address public destination;

    modifier onlyKrzysiek() {
        require(msg.sender == krzysiek);
        _;
    }

    function Krzysiek() public {
        krzysiek = msg.sender;
    }

    function setDestination(address _destination) public onlyKrzysiek {
        destination = _destination;
    }

    function() public payable {
        require(destination != 0);

        address d = destination;
        uint x;

        assembly {
            calldatacopy(mload(0x40), 0, calldatasize)
            x := delegatecall(sub(gas, 700), d, mload(0x40), calldatasize, mload(0x40), 32)
        }

        assert(x == 1);

        assembly {
            return(mload(0x40), 32)
        }
    }
}