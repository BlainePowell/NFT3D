pragma solidity ^0.8.4;
// SPDX-License-Identifier: MIT

contract Transaction{

    address payable company; // Our crypto wallet
    constructor(address payable _company){
        company = _company;
    }

    function pay(uint256 amount) public payable{
       
    }






}

