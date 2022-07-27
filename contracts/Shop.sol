//TODO: un mostro messo in vendita non può essere messo come mostro attivo

//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./MonsterFactory.sol";
import "./SafeMath.sol";
import "./Transactions.sol";

contract Shop is MonsterFactory, Transactions {
    using SafeMath for uint256;
    using SafeMath for uint8;
    using SafeMath16 for uint16;

    address payable public Owner;

    struct SellMonster {
        uint256 idMonster;
        uint256 price;
        address owner;
    }

    SellMonster[] public monstersOnSell;

    constructor() payable {
        Owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "Not owner");
        _;
    }

    modifier checkIsNotActiveMonster(uint256 idMonster) {
        require(addressToUser[msg.sender].activeMonster != idMonster);
        _;
    }

    // Function to add new move to monster
    function addNewMove(uint256 monsterGlobalId, string memory moveName, uint16 moveDamage, uint8 moveType) public payable returns (bool) {
        bool isOwnerOdMonster = checkIsOwner(monsterGlobalId);
        if (isOwnerOdMonster == true) {
            idToMovesOfPersonalMonsters[monsterGlobalId].push(
                Move(moveName, moveDamage, moveType)
            );
            return true;
        } else {
            return false;
        }
    }

    
    // Function that increase the monster's level by 1 and health by 20.
    function levelUp(uint256 monsterGlobalId) public payable returns (bool) {
        bool isOwnerOdMonster = checkIsOwner(monsterGlobalId);
        if (isOwnerOdMonster == true) {
            addressToMonster[msg.sender][monsterGlobalId].level = addressToMonster[msg.sender][monsterGlobalId].level.add(1);
            addressToMonster[msg.sender][monsterGlobalId].healthPoints = addressToMonster[msg.sender][monsterGlobalId].healthPoints.add(20);
            return true;
        } else {
            return false;
        }
    }

    // Function to buy normal capture tool 
    function buyNormalCaptureTool() internal {
        addressToCaputeTools[msg.sender].normal = addressToCaputeTools[msg.sender].normal.add(1);
    }
    
    // Function to buy mega capture tool
    function buyMegaCaptureTool() internal {
        addressToCaputeTools[msg.sender].mega = addressToCaputeTools[msg.sender].mega.add(1);
    }

    // Function to buy ultra capture tool
    function buyUltraCaptureTool() internal {
        addressToCaputeTools[msg.sender].ultra = addressToCaputeTools[msg.sender].ultra.add(1);
    }

    // Call function to buy capture tools
    function buyCaptureTool(uint typeOfTool) public payable{
        if (typeOfTool == 0){
            buyNormalCaptureTool();
        } else if (typeOfTool == 1){
            buyMegaCaptureTool();
        } else if (typeOfTool == 2){
            buyUltraCaptureTool();
        }
    }
    
    // Function to buy new move
    function buyMove(uint monsterID, string memory name, uint16 damage,uint8 typeOfMove) public payable {
        addMoveToMonster(monsterID, name, damage, typeOfMove);
    }

    // Function to sell a monster  
    function sellUserMonster(uint256 idMonster, uint256 price) public checkIsNotActiveMonster(idMonster) returns(uint) {
        monstersOnSell.push(SellMonster(idMonster, price, msg.sender));
        return monstersOnSell.length;
    }

    // Funtion to check if monster is on sell
    function checkMonsterIsOnSell(uint idMonster) public view returns(bool){
        // true -> il mostro è messo in vendita
        // false -> il mostro non è messo in vendita
        for (uint256 i = 0; i < monstersOnSell.length; i++) {
            if (monstersOnSell[i].idMonster == idMonster) {
                return true;
            }
        }
        return false;
        
    }

    // Function to get all monsters on sell
    function getAllMonstersOnSell() public view returns (SellMonster[] memory) {
        return monstersOnSell;
    }

    // Function to buy a monster on sell
    function buyMonster(uint256 idMonster) public returns (bool) {
        for (uint256 i = 0; i < monstersOnSell.length; i++) {
            if (monstersOnSell[i].idMonster == idMonster) {
                addToBlockchain(
                    payable(monstersOnSell[i].owner),
                    monstersOnSell[i].price
                );
                for (uint256 j = 0; j < allMonsters.length; j++) {
                    if (allMonsters[j].id == idMonster) {
                        addressToMonster[msg.sender].push(allMonsters[j]);
                        for (uint256 k = 0; k < addressToMonster[monstersOnSell[i].owner].length; k++) {
                            if ( addressToMonster[monstersOnSell[i].owner][k].id == idMonster ) {
                                delete addressToMonster[monstersOnSell[i].owner][k];
                            }
                        }
                    }
                    
                }
                delete monstersOnSell[i];
                return true;
            }
        }
        return false;
    }

    /*****************************/
    //   FUNCTIONS TO PAYABLE    //
    /*****************************/
    //Function where  the owner can withdraw from the contract because payable was added to the state variable above
    function withdraw(uint256 _amount) public onlyOwner {
        Owner.transfer(_amount);
    }

    //to.transfer works because we made the address above payable.
    function transfer(address payable _to, uint256 _amount) public onlyOwner {
        _to.transfer(_amount); //to.transfer works because we made the address above payable.
    }

    // Function to get the balance of contract
    function getAmount() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }
}
