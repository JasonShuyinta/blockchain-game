//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./MonsterFactory.sol";
import "./Random.sol";
import "./SafeMath.sol";

contract Capture is MonsterFactory, Random {
    using SafeMath for uint256;
    event CaptureResult(bool _value);

    // Function to get a random findable monster from a random number
    function getRandomMonster() public view returns (uint256) {
        return randomResult % numberOfFindableMonster;
    }

    // Function to define if the cacth have success or not
    function captureMonster(uint256 typeOfTool, uint256 defaultIdMonster) public returns (bool){
        // typeOfTool 0 => normal tool
        // typeOfTool 1 => mega tool
        // typeOfTool 2 => ultra tool

        bool checkUserHaveTool = false;
        if (typeOfTool == 0 && getNumberOfNormalCaptureToolOfUser() > 0) {
            checkUserHaveTool = true;
        } else if (typeOfTool == 1 && getNumberOfMegaCaptureToolOfUser() > 0) {
            checkUserHaveTool = true;
        } else if (typeOfTool == 2 && getNumberOfUltralCaptureToolOfUser() > 0) {
            checkUserHaveTool = true;
        } else {
            return false;
        }

        if (checkUserHaveTool = true) {
            uint256 randomResultToCapture = (randomResult % 10).add(1);
            randomResult = 0;

            if (typeOfTool == 0) {
                addressToCaputeTools[msg.sender].normal = addressToCaputeTools[msg.sender].normal.sub(1);
                if (randomResultToCapture < 4) {
                    addFindableMonsterToUser(defaultIdMonster);
                    emit CaptureResult(true);
                } else {
                    emit CaptureResult(false);
                }
            } else if (typeOfTool == 1) {
                addressToCaputeTools[msg.sender].mega = addressToCaputeTools[msg.sender].mega.sub(1);
                if (randomResultToCapture < 7) {
                    addFindableMonsterToUser(defaultIdMonster);
                    emit CaptureResult(true);
                } else {
                    emit CaptureResult(false);
                }
            } else if (typeOfTool == 2) {
                addressToCaputeTools[msg.sender].ultra = addressToCaputeTools[msg.sender].ultra.sub(1);
                if (randomResultToCapture < 10) {
                    addFindableMonsterToUser(defaultIdMonster);
                    emit CaptureResult(true);
                } else {
                    emit CaptureResult(true);
                }
            } else {
                emit CaptureResult(false);
            }
        } else {
            emit CaptureResult(false);
        }
    }
}
