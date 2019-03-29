pragma solidity >=0.5.0;

contract HelloWorld {
    address internal owner;
    modifier isOwner {
        require(msg.sender == owner, "Permission Denied!");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function greet() external pure returns (string memory) {
        return "Hello, World!";
    }
}