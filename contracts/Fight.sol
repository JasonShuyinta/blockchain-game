//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./MonsterFactory.sol";
import "./Random.sol";
import "./SafeMath.sol";

contract Fight is MonsterFactory, Random{
    using SafeMath16 for uint16;
    event FigthResult(bool _value);

    // Function to get a random user to fight
    function getRandomUser() public view returns(address){
        address randomUserAdress;
        if (users.length > 1) {
            randomUserAdress = users[randomResult % users.length];
            if (randomUserAdress == msg.sender){
                if ((randomResult % users.length) == users.length-1){
                        uint random = (randomResult % users.length) - 1;
                        randomUserAdress = users[random];
                    } else {
                        uint random = (randomResult % users.length) + 1;
                        randomUserAdress = users[random];
                    }
            }
            return randomUserAdress;
        } else {
            // Impossibile combattere. Non ci sono altri utenti sulla piattaforma.
            return msg.sender;
        }
    }

    // Function to get all moves of active monster of user
    function selectUserMove() public view returns(Move[] memory){
        return idToMovesOfPersonalMonsters[addressToUser[msg.sender].activeMonster];
    }

    // Function to get random move for opponent monster
    function getRandomMove(address randomUserAdress) private view returns(Move memory){
        Move[] memory randomUserActiveMonsterMoves= idToMovesOfPersonalMonsters[addressToUser[randomUserAdress].activeMonster];
        return randomUserActiveMonsterMoves[randomResult % idToMovesOfPersonalMonsters[addressToUser[randomUserAdress].activeMonster].length];
    }

    // function to subtract health points from monsters
    function subHealthPoints(address userAdress, Move memory move) private view returns(uint256){
        Monster[] memory monsterList = addressToMonster[userAdress];
        for (uint i=0; i<monsterList.length; i++){
            if (monsterList[i].id == addressToUser[userAdress].activeMonster){
                if  ((move.typeOfMove==0 && monsterList[i].typeOfMonster == 2) ||
                    (move.typeOfMove==1 && monsterList[i].typeOfMonster == 0) ||
                    (move.typeOfMove==2 && monsterList[i].typeOfMonster == 1)) {
                        return monsterList[i].healthPoints - (move.damage.mul(2));
                } else if ((move.typeOfMove==0 && monsterList[i].typeOfMonster == 1) ||
                    (move.typeOfMove==1 && monsterList[i].typeOfMonster == 2) ||
                    (move.typeOfMove==2 && monsterList[i].typeOfMonster == 0)) {
                        return monsterList[i].healthPoints - (move.damage.div(2));
                } else {
                        return  monsterList[i].healthPoints - move.damage;
                }
            }
        }
    }

    // function to define Winner
    function defineWinner(address randomUserAdress, uint moveSelectedByUser) public returns(bool){
        // return true => User win
        // return false => User loss

        Move memory randomUserMove = getRandomMove(randomUserAdress);
        Move[] memory allUserMove = idToMovesOfPersonalMonsters[addressToUser[msg.sender].activeMonster];
        Move memory userMove = allUserMove[moveSelectedByUser];

        uint256 userMonsterHealtResidue = subHealthPoints(msg.sender,randomUserMove);
        uint256 RandomUserMonsterHealtResidue = subHealthPoints(randomUserAdress,userMove);

        if (userMonsterHealtResidue > RandomUserMonsterHealtResidue) {
            updateWinningScore(msg.sender);
            updateLosingScore(randomUserAdress);
            emit FigthResult(true);
        } else {
            updateWinningScore(randomUserAdress);
            updateLosingScore(msg.sender);
            emit FigthResult(false);
        }
    }

    /*
    function getRandomMove(address randomUserAdress) public view returns(Move memory){
        Move[] memory randomUserActiveMonsterMoves= idToMovesOfPersonalMonsters[addressToUser[randomUserAdress].activeMonster];
        if (randomUserActiveMonsterMoves.length>1){
            // eseguire random
        } else {
            return randomUserActiveMonsterMoves[0];
        }
    }
    */
}