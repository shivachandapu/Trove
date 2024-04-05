// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.9.0;

contract Drive {
    struct FileMetadata {
        string file_name;
        string upload_date;
        string file_size;
        string file_type;
    }

    struct File {
        string[] cid; // The IPFS CID
        FileMetadata metadata;
    }

    mapping(address => File[]) private userFiles;

    function uploadFile(string[] memory cid,string memory name,string memory date,string memory size,string memory file_type) public returns (bool) {
        FileMetadata memory metadata = FileMetadata(name,date,size,file_type);
        File memory file = File(cid, metadata);
        userFiles[msg.sender].push(file);
        return true;
    }

    function getNumberOfFiles() public view returns (uint256) {
        return userFiles[msg.sender].length;
    }

    function getFile(uint256 index) public view returns (string[] memory cid, FileMetadata memory metadata) {
        require(index < userFiles[msg.sender].length, "File not found");
        File storage file = userFiles[msg.sender][index];
        return (file.cid, file.metadata);
    }
 
    // Add functions to send and delete files as needed.
}
