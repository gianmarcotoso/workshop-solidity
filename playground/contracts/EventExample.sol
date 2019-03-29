pragma solidity >=0.5.0;

contract EventExample {
    address payable owner;
    event MoneyReceived(address sender, uint256 value);
    event DonorNameSet(address sender, string name);
    mapping(address => uint256) balances;

    modifier isOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function withdraw() external isOwner {
        selfdestruct(owner);
    }

    function donate() external payable {
        require(msg.value > 0, "Send some cash!");
        require(msg.value + balances[msg.sender] <= uint(2**256 - 1), "You already sent too much!");

        balances[msg.sender] += msg.value;
        emit MoneyReceived(msg.sender, msg.value);
    }

    function setDonorName(string calldata name) external {
        emit DonorNameSet(msg.sender, name);
    }
}