    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.19;

    contract Cert {
        address[] admins;
       event Issued(string course, uint256 id, string grade);
        event AdminAdded(address caller,address added);
        event AdminRevoked(address caller,address revoked);
        constructor() {
        admins.push(msg.sender); 
        }
        function checkAdmin(address _admin) private view returns (bool) {
            for (uint256 i = 0; i < admins.length; i++) {
                if (admins[i] == _admin) {
                    return true;
                }
            }
            return false;
        }
        modifier onlyAdmin() {
            require(checkAdmin( msg.sender ), "Access Denied");
                _;
        }
        function addAdmin(address _admin) public onlyAdmin {
            admins.push(_admin);
            emit AdminAdded(msg.sender, _admin);
        }
        function revokeAdmin(address _admin) public onlyAdmin{
            for(uint i = 0;i < admins.length; i++){
                if(admins[i] == _admin){
                 uint len = admins.length;
                 address temp = admins[i];
                 admins[i] = admins[len - 1];
                 admins[len - 1] = temp;
                 delete admins[len - 1];
                }
            }
             emit AdminRevoked(msg.sender, _admin);
        }
        struct Certificate {
            string name;
            string course;
            string grade;
            string date;
        }

        mapping(uint256 => Certificate) public Certificates;
        mapping (uint256 => bool) public CertificatesIssued;
        function issue(
        uint256 _id,
        string memory _name,
        string memory _course,
        string memory _grade,
        string memory _date
             ) public onlyAdmin {
             Certificates[_id] = Certificate(_name, _course, _grade, _date);
          emit Issued(_course, _id, _grade);
}
    }