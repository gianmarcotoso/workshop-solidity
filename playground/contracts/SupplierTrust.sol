pragma solidity >=0.5.0;

contract SupplierTrust {
    address owner;
    
    struct Supplier {
        string name;
        bool active;
        mapping(string => string) signatures;
    }
    
    mapping(address => Supplier) suppliers;
    
    event SupplierRegistered(address supplier);

    constructor() public {
        owner = msg.sender;
    }
    
    modifier isOwner {
        require(msg.sender == owner, "You are not allowed!");
        _;
    }
    
    modifier isActive {
        require(suppliers[msg.sender].active == true, "You are not allowed");
        _;
    }
    
    function register(string calldata name) external {
        require(msg.sender != owner, "Owner cannot be supplier");
        require(bytes(suppliers[msg.sender].name).length == 0, "The supplier already exists");
        
        Supplier memory created = Supplier({ name: name, active: false });
        suppliers[msg.sender] = created;
        
        emit SupplierRegistered(msg.sender);
    }

    
    function activateSupplier(address supplier) external isOwner {
        require(suppliers[supplier].active == false, "Already active");
        
        suppliers[supplier].active = true;
    }
    
    function addSignature(string calldata name, string calldata signature) external isActive {
        suppliers[msg.sender].signatures[name] = signature;
    }
    
    function getSignatureFrom(address supplier, string calldata name) external view isOwner returns (string memory) {
        return suppliers[supplier].signatures[name];
    }

}