// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DocumentNFT is ERC721, Ownable(msg.sender){
    uint256 private _tokenIdCounter = 1; // Initialize the token ID counter

    // Mapping from token ID to IPFS hash (or other document reference)
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("DocumentNFT", "DNFT") {}

    // Internal function to set token URI (like IPFS hash)
    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        _tokenURIs[tokenId] = tokenURI;
    }

    // Function to mint a new NFT with a given IPFS hash (or document reference)
    function mintDocumentNFT(string memory ipfsHash) external onlyOwner {
        uint256 tokenId = _tokenIdCounter++; // Get current token ID and increment counter
        _safeMint(msg.sender, tokenId); // Mint the NFT to the contract owner
        _setTokenURI(tokenId, ipfsHash); // Set the IPFS hash for this token
    }

    function tokenURI(uint256 tokenId) public view override  returns (string memory) {
    return _tokenURIs[tokenId];
}

}
