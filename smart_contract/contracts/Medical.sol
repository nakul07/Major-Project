// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;


contract Medical {
    address owner;
    struct Hospital{
        string name;
        uint256 timestamp;
        bool exists;
    }
    struct Doctor{
        address d_address;
        string name;
        uint256 timestamp;
    }
    // hospital_owner => hospital
    mapping (address=>Hospital) hospitals;
    // hospital => doctors
    mapping (address=>Doctor[]) doctors;

    event HospitalAddSuccess(address h_owner, string name, uint256 timestamp);
    event DoctorAddSuccess(address h_address, address d_address , string name, uint256 timestamp);

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    constructor() payable{
        owner = msg.sender;
    }

    function changeOwner(address newOwner) public onlyOwner{
        owner = newOwner;
    }

    function addHospital(address h_owner, string memory name) public onlyOwner{ 
        require(!hospitals[msg.sender].exists, "Hospital exists");
        hospitals[h_owner] = Hospital(name, block.timestamp, true);
        emit HospitalAddSuccess(h_owner, name, block.timestamp);
    }

    function addDoctor(address d_address, string memory name) public { 
        require(hospitals[msg.sender].exists, "Hospital doesn't exists");
        doctors[msg.sender].push(Doctor(d_address, name, block.timestamp));
    }

    function getHospital(address h_address) public view returns (Hospital memory){
        return hospitals[h_address];
    }

    function getDoctors(address h_address) public view returns (Doctor [] memory){
        return doctors[h_address];
    }
}