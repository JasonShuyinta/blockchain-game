//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./SafeMath.sol";
import "./ToolFactory.sol";

contract MonsterFactory is ToolFactory {
    using SafeMath for uint256;
    using SafeMath for uint8;
    using SafeMath16 for uint16;

    struct Move {
        string name;
        uint16 damage;
        uint8 typeOfMove; //0:Fuoco, 1: Acqua, 2: Erba
    }

    struct MoveToBuy {
        string name;
        uint16 damage;
        uint8 typeOfMove; //0:Fuoco, 1: Acqua, 2: Erba
        uint256 price;
    }

    struct DefaultMonster {
        string name;
        uint8 typeOfMonster;
        uint256 id;
        uint16 healthPoints;
        string urlImg;
    }

    struct Monster {
        string name;
        uint8 typeOfMonster;
        uint256 id;
        uint16 level;
        uint16 healthPoints;
        string urlImg;
    }

    Monster[] public allMonsters;
    uint256 public monsterCount = 0;
    uint256 public numberOfFindableMonster = 0;
    uint256 public numerOfStarter = 0;
    DefaultMonster[] public starterArray;
    DefaultMonster[] public findableMonster;

    MoveToBuy[] public moveToBuy;

    mapping(uint256 => DefaultMonster) public idToDefaultStarter;
    mapping(uint256 => DefaultMonster) public idToDefaultMonster;
    mapping(uint256 => Move) public idToDefaultMoves;

    mapping(address => Monster[]) public addressToMonster;
    mapping(uint256 => Move[]) public idToMovesOfPersonalMonsters;

    constructor() {
        // Inserimento starter nella piattaforma
        createDefaultStarter(
            "Firemonster",
            0,
            100,
            "https://blockchain-project-monster.s3.eu-central-1.amazonaws.com/fireMonster.png",
            "Fireball",
            10,
            0
        );
        createDefaultStarter(
            "Watermonster",
            1,
            150,
            "https://blockchain-project-monster.s3.eu-central-1.amazonaws.com/waterMonster.png", "Watercannon", 8, 1
        );
        createDefaultStarter(
            "Grassmonster",
            2,
            90,
            "https://blockchain-project-monster.s3.eu-central-1.amazonaws.com/leafMonster.png", "GrassAttack", 9, 2
        );

        // Inserimento altri mostri
        createDefaultMonster(
            "Firedragon",
            0,
            100,
            "https://blockchain-project-monster.s3.eu-central-1.amazonaws.com/findableFireMonster.png", "Move1", 10, 0
        );
        createDefaultMonster(
            "Miniwather",
            1,
            150,
            "https://blockchain-project-monster.s3.eu-central-1.amazonaws.com/findableWaterMonster.png", "Move2", 8, 1
        );
        createDefaultMonster(
            "Bushmoster",
            2,
            90,
            "https://blockchain-project-monster.s3.eu-central-1.amazonaws.com/findableLeafMonster.jpg", "Move3", 9, 2
        );

        addMoveToBuy("SuperAttack", 80, 0, 1);
        addMoveToBuy("MegaAttak", 100, 1, 2);
    }

    // Function to save the starters[monsters] in blockchain whit they moves
    function createDefaultStarter(string memory name,uint8 typeOfMonster,uint16 healthPoints,string memory url,string memory moveName,uint16 damage,uint8 typeOfMove) internal {
        idToDefaultStarter[numerOfStarter] = DefaultMonster(name, typeOfMonster, numerOfStarter, healthPoints, url);
        starterArray.push( DefaultMonster(name, typeOfMonster, numerOfStarter, healthPoints, url));
        idToDefaultMoves[numerOfStarter] = Move(moveName, damage, typeOfMove);
        numerOfStarter = numerOfStarter.add(1);
    }

    // Function to save the findable monsters in blockchain whit they moves
    function createDefaultMonster(string memory name, uint8 typeOfMonster, uint16 healthPoints, string memory url, string memory moveName, uint16 damage, uint8 typeOfMove) public {
        idToDefaultMonster[numberOfFindableMonster] = DefaultMonster(name, typeOfMonster, numberOfFindableMonster, healthPoints, url);
        findableMonster.push( DefaultMonster(name, typeOfMonster, numberOfFindableMonster, healthPoints, url));
        idToDefaultMoves[numberOfFindableMonster] = Move( moveName, damage, typeOfMove);
        numberOfFindableMonster = numberOfFindableMonster.add(1);
    }

    // Function to get all starters
    // (the monsters that user can select at the start of game)
    function getStarters() public view returns (DefaultMonster[] memory) {
        return starterArray;
    }

    // Function to add new buyable move
    function addMoveToBuy(string memory name, uint16 damage, uint8 typeOfMove, uint256 price) internal {
        moveToBuy.push(MoveToBuy(name, damage, typeOfMove, price));
    }

    // Function to get the list of buyable moves
    function getMoveToBuy() public view returns (MoveToBuy[] memory) {
        return moveToBuy;
    }

    // Function to add move to monster
    function addMoveToMonster( uint256 monsterID, string memory name, uint16 damage, uint8 typeOfMove) public {
        idToMovesOfPersonalMonsters[monsterID].push( Move(name, damage, typeOfMove) );
    }

    // Function to get the list of findable monsters
    function getFindableMonster() public view returns (DefaultMonster[] memory){
        return findableMonster;
    }

    // Function to assign starter monster to user
    function addMonsterToUser(uint256 monsterID) public returns (uint256) {
        string memory nameMonster = idToDefaultStarter[monsterID].name;
        uint8 typeOfMonster = idToDefaultStarter[monsterID].typeOfMonster;
        uint256 GlobalId = monsterCount;
        uint16 level = 1;
        uint16 healthPoints = idToDefaultStarter[monsterID].healthPoints;
        string memory urlImg = idToDefaultStarter[monsterID].urlImg;
        addressToMonster[msg.sender].push(
            Monster(nameMonster, typeOfMonster, GlobalId, level, healthPoints, urlImg)
        );
        addDefaultMoveToPersonalMonster(monsterID, GlobalId);
        allMonsters.push(
            Monster(nameMonster, typeOfMonster, GlobalId, level, healthPoints, urlImg )
        );
        monsterCount = monsterCount.add(1);
        return GlobalId;
    }

    // Function to assign findable monster to user
    function addFindableMonsterToUser(uint256 monsterID) public returns (uint256) {
        string memory nameMonster = idToDefaultMonster[monsterID].name;
        uint8 typeOfMonster = idToDefaultMonster[monsterID].typeOfMonster;
        uint256 GlobalId = monsterCount;
        uint16 level = 1;
        uint16 healthPoints = idToDefaultMonster[monsterID].healthPoints;
        string memory urlImg = idToDefaultMonster[monsterID].urlImg;
        addressToMonster[msg.sender].push( 
            Monster(nameMonster, typeOfMonster, GlobalId, level, healthPoints, urlImg)
        );
        addDefaultMoveToPersonalMonster(monsterID, GlobalId);
        allMonsters.push( 
            Monster(nameMonster, typeOfMonster, GlobalId, level, healthPoints, urlImg)
        );
        monsterCount = monsterCount.add(1);
        return GlobalId;
    }

    // Function to select first monster
    function selectFirstMonster(uint256 monsterID) public returns (bool) {
        if (addressToMonster[msg.sender].length == 0) {
            uint256 GlobalId = addMonsterToUser(monsterID);
            //setActiveMonster(GlobalId);
            addressToUser[msg.sender].activeMonster = GlobalId;
            return true;
        } else {
            return false;
        }
    }

    // Function to add default move of monster to personal monster of user
    function addDefaultMoveToPersonalMonster(uint256 monsterID, uint256 monsterGlobalId) private {
        Move memory defaultMoves = idToDefaultMoves[monsterID];
        idToMovesOfPersonalMonsters[monsterGlobalId].push(
            Move(defaultMoves.name, defaultMoves.damage, defaultMoves.typeOfMove)
        );
    }

    // Function to check if monster is ownered by user
    function checkIsOwner(uint256 globalId) public view returns (bool) {
        uint256 dim = addressToMonster[msg.sender].length;
        Monster[] memory monsterOfUser = addressToMonster[msg.sender];
        for (uint256 i = 0; i < dim; i++) {
            if (monsterOfUser[i].id == globalId) {
                return true;
            }
        }
        return false;
    }

    // Function to check if user have monsters
    function checkUserHaveMonsters() public view returns (bool) {
        // true -> l'utente ha mostri
        // false -> l'utente non ha mostri
        if (addressToMonster[msg.sender].length == 0) {
            return false;
        } else {
            return true;
        }
    }

    // Function to get all monster of user
    function getUserMonsters() public view returns (Monster[] memory) {
        return addressToMonster[msg.sender];
    }

    // Function to get data of active monster of user
    function getActiveMonster() public view returns (Monster memory) {
        for (uint256 i = 0; i < addressToMonster[msg.sender].length; i++) {
            if (
                addressToMonster[msg.sender][i].id ==
                addressToUser[msg.sender].activeMonster
            ) {
                return addressToMonster[msg.sender][i];
            }
        }
    }

    // Function to get data of active monster of other user
    function getActiveMonsterOfUser(address usersAddress) public view returns (Monster memory) {
        for (uint256 i = 0; i < addressToMonster[usersAddress].length; i++) {
            if (
                addressToMonster[usersAddress][i].id ==
                addressToUser[usersAddress].activeMonster
            ) {
                return addressToMonster[usersAddress][i];
            }
        }
    }

    // Function to get data of default monsters by ID
    function getDefaultMonsterByID(uint256 MonsterID) public view returns (DefaultMonster memory) {
        return idToDefaultMonster[MonsterID];
    }

    // Function to get monster data by ID
    function getMonsterByID(uint256 monsterID) public view returns (Monster memory){
        for (uint256 i = 0; i < allMonsters.length; i++) {
            if (allMonsters[i].id == monsterID) {
                return allMonsters[i];
            }
        }
    }

    // Function to get all moves of monster
    function getMovesOfMonster(uint256 monsterID) public view returns (Move[] memory) {
        return idToMovesOfPersonalMonsters[monsterID];
    }

    // Function to get all moves of active monster
    function getMovesOfActiveMonster() public view returns (Move[] memory) {
        for (uint256 i = 0; i < addressToMonster[msg.sender].length; i++) {
            if (
                addressToMonster[msg.sender][i].id ==
                addressToUser[msg.sender].activeMonster
            ) {
                return
                    idToMovesOfPersonalMonsters[
                        addressToMonster[msg.sender][i].id
                    ];
            }
        }
    }
    
    /*
    function addDefaultMoves(uint256 id, string memory name, uint16 damage, uint8 typeOfMove) private {
        idToDefaultMoves[id] = Move(name, damage, typeOfMove);
    }
    */

    /*
    function setActiveMonster(uint256 globalId) public returns(bool){
        bool isOwnerOdMonster = checkIsOwner(globalId);
        if (isOwnerOdMonster == true) {
            addressToUser[msg.sender].activeMonster = globalId;
            return true; 
        } else {
            return false;
        }
    }
    */

    /*
    function getActiveMonsterLevel() public view returns(uint16){
        for (uint i=0 ; i < addressToMonster[msg.sender]. length; i++) {
            if (addressToMonster[msg.sender][i].id == addressToUser[msg.sender].activeMonster) {
                return addressToMonster[msg.sender][i].level;
            }
        }
        return 0; // la function non ha prodotto nessun risultato
    }
    */

    /*
    function isActiveMonster(uint256 monsterID) public view returns (bool) {
        // true --> il mostro è attivo
        // false --> il mostro non è attivo
        uint256 activeMonsterId = getActiveMonster().id;
        if (monsterID == activeMonsterId){
            return true;
        } else {
            return false;
        }
    }
    */
}
