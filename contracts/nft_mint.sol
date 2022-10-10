pragma solidity ^0.8.4;
// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT_3D is ERC721 {
	address public owner;
	uint256 tokenID = 1;

	NFT[] public allTokens;
	mapping(address => NFT[]) public tokenAdresses;
	mapping(string => bool) public tokenExists;

	constructor() ERC721("3D_NFT","NFT_3D"){
		owner = msg.sender;
	}
	
	struct NFT{
		uint256 tokenID; // ID of that nft
		string name; // name of NFT
		address owner; // address of the owner of that nft
	}

	function getAllTokens() public view returns (NFT[] memory){
			return allTokens; // returning all NFTs from this contract
	}
	function getMyTokens() public view returns (NFT[] memory){
			return tokenAdresses[msg.sender]; // returns NFT of the account who called this function
	}
	function mintToken(string calldata _tokenName) public payable{
			require(!tokenExists[_tokenName],"Token already exists"); //makes sure there are no duplicates of the nft
			_safeMint(msg.sender,tokenID); // creating the NFT of the person who called this function and storing it on blockchain
			allTokens.push(NFT(tokenID, _tokenName, msg.sender)); // pushing that nft to the alltokens array
			tokenAdresses[msg.sender].push(NFT(tokenID, _tokenName, msg.sender)); // pushing the nft and the address
			tokenExists[_tokenName] = true;
			tokenID++; // incrementing the token ID for when there is another person minting an NFT
	}
}