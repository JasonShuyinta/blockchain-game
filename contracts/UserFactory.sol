//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./SafeMath.sol";

contract UserFactory {
    using SafeMath for uint256;
    using SafeMath16 for uint16;

    struct User {
        string name;
        uint16 level;
        uint256 activeMonster;
        uint256 victories;
        uint256 losses;
        address userAddress;
        bool exist;
    }

    address[] public users;
    mapping(address => User) addressToUser;

    // Function to create new user associate to wallet
    function createUser(string memory username) public returns (bool) {
        if (addressToUser[msg.sender].exist == true) {
            return false;
        } else {
            addressToUser[msg.sender] = User( username,1, 0, 0, 0, msg.sender, true);
            //users.push(User(username, 1, 0, 0, 0, msg.sender, true));
            users.push(msg.sender);
            return true;
        }
    }

    // Function to login
    function login() public view returns (string memory name) {
        if (addressToUser[msg.sender].exist == true) {
            return addressToUser[msg.sender].name;
        } else {
            return "";
        }
    }

    // Function to increase the winning score of user
    function updateWinningScore(address userAddress) internal {
        addressToUser[userAddress].victories = addressToUser[userAddress].victories.add(1);
        if (addressToUser[userAddress].victories % 10 == 0) {
            updateLevel(userAddress);
        }
    }

    // Function to increase the loosing score of user
    function updateLosingScore(address userAddress) internal {
        addressToUser[userAddress].losses = addressToUser[userAddress].losses.add(1);
    }

    // Function to increase the level of user 
    function updateLevel(address userAddress) internal {
        addressToUser[userAddress].level = addressToUser[userAddress].level.add(1);
    }

    // Function to get user data
    function getUserData() public view returns (User memory) {
        return addressToUser[msg.sender];
    }

    // Function to check if exist an account associented to current wallet
    function existAccount() public view returns (bool) {
        if (addressToUser[msg.sender].exist == true) {
            return true;
        } else {
            return false;
        }
    }

    // Function to get user data from wallet addess
    function getUserByAddress(address userAddress) public view returns(User memory) {
        return addressToUser[userAddress];
    }
}
