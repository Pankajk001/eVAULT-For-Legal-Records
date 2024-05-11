pragma solidity ^0.8.0;

contract DocumentLogger {
    event DocumentCreated(address indexed user, uint indexed documentId, uint timestamp);
    event DocumentModified(address indexed user, uint indexed documentId, uint timestamp);
    event DocumentDeleted(address indexed user, uint indexed documentId, uint timestamp);

    function logDocumentCreated(address _user, uint _documentId) external {
        emit DocumentCreated(_user, _documentId, block.timestamp);
    }

    function logDocumentModified(address _user, uint _documentId) external {
        emit DocumentModified(_user, _documentId, block.timestamp);
    }

    function logDocumentDeleted(address _user, uint _documentId) external {
        emit DocumentDeleted(_user, _documentId, block.timestamp);
    }
}
