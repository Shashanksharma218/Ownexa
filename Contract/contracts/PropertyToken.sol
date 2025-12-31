// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 

contract PropertyToken is ERC1155, Ownable {

    struct Property {
        address owner;
        uint256 id;
        uint256 tokensupply;
        uint256 propertyvalue; 
        bool active; 
    }  

     Property[] public allProperty ;

     
    
    constructor()
        ERC1155("")           // metadata URI (can update later)
        Ownable(msg.sender)   // initial owner
    {}
}  