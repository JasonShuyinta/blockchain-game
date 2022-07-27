//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Shop.sol";
import "./Capture.sol";
import "./Fight.sol";
import "./SafeMath.sol";

contract MainContract is Shop, Capture, Fight {
    using SafeMath for uint256;

    constructor() payable {
        Owner = payable(msg.sender);
    }

    // Function to add new findable monster
    function addNewFindableDefaultMonster( string memory name, uint8 typeOfMonster, uint16 healthPoints, string memory url, string memory moveName, uint16 damage, uint8 typeOfMove) public onlyOwner { 
        createDefaultMonster( name, typeOfMonster, healthPoints, url, moveName, damage, typeOfMove );
    }

    // Function to change the active monster 
    function setActiveMonster(uint256 globalId) public returns (bool) {
        bool isOwnerOfMonster = checkIsOwner(globalId);
        bool isMonsterOnSell = checkMonsterIsOnSell(globalId);
        if (isOwnerOfMonster == true && isMonsterOnSell == false) {
            addressToUser[msg.sender].activeMonster = globalId;
            return true;
        } else {
            return false;
        }
    }

    // Function to check if user is the owner
    function isOwner() public view returns (bool) {
        if (msg.sender == Owner) {
            return true;
        } else {
            return false;
        }
    }

    // Function to add new buyable move
    function addNewMoveByOwner(string memory name, uint16 damage,uint8 typeOfMove, uint price) public onlyOwner {
        addMoveToBuy(name, damage, typeOfMove, price);
    }

    // Function to get list of monsters possessed by user 
    function getUserMonstersByAddress(address userAddress) public view onlyOwner returns (Monster[] memory) {
        return addressToMonster[userAddress];
    }

    // function addNewStarterDefaultMonster(
    //     string memory name,
    //     uint8 typeOfMonster,
    //     uint16 healthPoints,
    //     string memory url,
    //     string memory moveName,
    //     uint16 damage,
    //     uint8 typeOfMove
    // ) public onlyOwner {
    //     createDefaultStarter(name, typeOfMonster, healthPoints, url, moveName, damage, typeOfMove);
    // }

    /*
    function getAllUserAddress()
        public
        view
        onlyOwner
        returns (address[] memory)
    {
        return users;
    }
    */

    // function getMonsterList()
    //     public
    //     view
    //     onlyOwner
    //     returns (DefaultMonster[] memory)
    // {
    //     return findableMonster;
    // }
}
