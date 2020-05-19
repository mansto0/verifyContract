pragma solidity  0.5.16;

contract Verify {
    
    struct CaseDetails {
        uint caseID;
        string location;
        string ipfsHash;
        address accnt;
        
    }
    
    //address public owner ; 
    
    constructor() public {
        //owner = msg.sender;
    }
    
    mapping (uint => CaseDetails) cases;
    uint[] public caseAccounts;
    
    function setCase ( address _address,  uint _id, string memory _location ,string memory _hash) public{
        
        CaseDetails  storage Case = cases[_id];
        Case.caseID = _id;
        Case.location = _location;
        Case.ipfsHash = _hash;
        Case.accnt =_address;
        caseAccounts.push(_id) -1 ;
        
        
        
    
    }
    
     function getAllCases() view public returns(uint[] memory) {
        return caseAccounts;
    }
    
    function getCase(uint _id) view public returns (uint, string memory, string memory) {
        return (cases[_id].caseID, cases[_id].location, cases[_id].ipfsHash);
    }
}

