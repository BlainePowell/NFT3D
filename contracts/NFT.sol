// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract NFT_3D is ERC721URIStorage,Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


	constructor() ERC721("3D_NFT","NFT_3D"){
	}

	function getbalances() public view returns (uint256){
        return balanceOf(msg.sender);
	}

    //Only the owner of this smart contract can mint NFTs
    //may need to change this because it only allows for one owner
	function mintToken() public onlyOwner {
        _tokenIds.increment();
        uint256 newitem = _tokenIds.current();
        _safeMint(msg.sender,newitem);
	}
    //URI will utilize IPFS
    function setmetadata(string memory _URI, uint256 _tokenID) public{
        _setTokenURI(_tokenID, _URI);
    }

    // Only the owner of the smart contract can call this function and above
    // The owner would be the address that deploys this smart contract
    function transfer_NFT(address  _seller, address _buyer, uint256 _tokenID) public{
         safeTransferFrom(_seller,_buyer, _tokenID);
    }
}


contract Transaction is ERC20{
    address payable sender;
    address payable recipient;
    constructor(address payable _sender, address payable _recipient) ERC20("Transaction", "Transact"){
        sender = _sender;
        recipient = _recipient;
    }
    function transact(uint256 amount) public payable{
        _transfer(sender,recipient,amount);
    }

}