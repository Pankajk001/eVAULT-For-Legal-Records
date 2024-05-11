pragma solidity ^0.8.0;

contract DocumentPermissions {
    struct Document {
        bool canRead;
        bool canWrite;
    }

    mapping(bytes32 => mapping(uint => Document)) public userDocumentPermissions;

    function setDocumentPermissions(bytes32 _userId, uint _documentId, bool _canRead, bool _canWrite) public {
        userDocumentPermissions[_userId][_documentId] = Document(_canRead, _canWrite);
    }

    function getDocumentPermissions(bytes32 _userId, uint _documentId) public view returns (bool canRead, bool canWrite) {
        Document memory doc = userDocumentPermissions[_userId][_documentId];
        return (doc.canRead, doc.canWrite);
    }

    function generateUserIdHash(string memory _userId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_userId));
    }
}
