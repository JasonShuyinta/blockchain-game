//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./UserFactory.sol";

contract ToolFactory is UserFactory {
    struct CaptureToolsOfUser {
        uint256 normal; // 30% chance of catching
        uint256 mega;   // 60% chance of catching
        uint256 ultra;  // 90% chance of catching
    }

    mapping (address => CaptureToolsOfUser) public addressToCaputeTools;

    // Function to get number of normal tools possessed by user
    function getNumberOfNormalCaptureToolOfUser() public view returns(uint256){
        return addressToCaputeTools[msg.sender].normal;
    }

    // Function to get number of mega tools possessed by user
    function getNumberOfMegaCaptureToolOfUser() public view returns(uint256){
        return addressToCaputeTools[msg.sender].mega;
    }

    // Function to get number of ultra tools possessed by user
    function getNumberOfUltralCaptureToolOfUser() public view returns(uint256){
        return addressToCaputeTools[msg.sender].ultra;
    }

    // Function to get number of all tools possessed by user
    function getNumberOfCapureToolOfUser() public view returns(uint256, uint256, uint256){
        return (addressToCaputeTools[msg.sender].normal, addressToCaputeTools[msg.sender].mega, addressToCaputeTools[msg.sender].ultra);
    }
}
