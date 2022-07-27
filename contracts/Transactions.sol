//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCounter;

    event Transfer(address _from, address _to, uint256 amount);

    // Function to transfer matic from buyer of monster to owner of monster
    function addToBlockchain(address payable receiver, uint256 amount) public {
        emit Transfer(msg.sender, receiver, amount);
    }
}
