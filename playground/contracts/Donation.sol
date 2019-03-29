pragma solidity >=0.5.0;

contract Donation {
    mapping(address => uint256) internal balances;
    
    function donate() external payable {
        require(msg.value > 0, "You have not donated enough!");
        
        balances[msg.sender] += msg.value;
    }
    
    function balance() external view returns(uint256) {
        return balances[msg.sender];
    }
}

