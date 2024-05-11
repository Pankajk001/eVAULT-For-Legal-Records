pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DocumentNFT is ERC721 {
    address private admin;

    constructor() ERC721("DocumentNFT", "DNFT") {
        admin = msg.sender;
    }

    function deleteDocument(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender || msg.sender == admin, "You are not the owner of the document or admin");
        
        _burn(tokenId);
    }
}