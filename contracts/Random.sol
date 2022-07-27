// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VRFConsumerBase.sol";

contract Random is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    constructor()
        VRFConsumerBase(
            //0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, //VRF Coordinator KOVAN
            //0xa36085F69e2889c224210F603D836748e7dC0088 //LINK token
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, //VRF Coordinator Matic Mumbai testnet
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB
        )
    {
        //keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4; //KOVAN
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4; //Matic Mumbai Testnet
        fee = 0.0001 * 10**18;
    }

    /**
     * Request Randomness
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        randomResult = 0;
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        randomResult = randomness;
    }

    /** Getter */
    function getNum() public view returns (uint256) {
        return randomResult;
    }
}
