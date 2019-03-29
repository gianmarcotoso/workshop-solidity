pragma solidity >=0.5.0;

import './Donation.sol';

contract CollectableDonation is Donation {
    address payable owner;
    
    constructor() public {
        owner = msg.sender;    
    }
    
    function withdraw() external {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}