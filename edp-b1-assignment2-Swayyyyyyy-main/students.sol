// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Students{
    struct Student{
      string name;
      uint program_enum;
      bool enrolled;
    }
    mapping (uint => Student) studentid;
    address public owner;
    uint ugcount;
    uint total;
    uint pgcount;
    constructor(){
        owner = msg.sender;
    }
    modifier Owneronly (address addr){
         require(addr == owner,"Insufficient Previlledge");
         _;
    }
    function getStudent(uint id) public view returns (Student memory){
           require(id <= total,"Invalid!!");
           return (studentid[id]);

    }
  function setStudent(string memory sname, uint num) public returns (uint)  {
           require(num == 1 || num == 2,"Invalid enum");
           studentid[total++] = Student(sname,num,false) ;
        if(num == 1) ugcount++;
        else pgcount++;
        return total;
    } 
    function enrollStudent(uint id) public payable {
         uint amt = 0.001 ether;
         require(id <= total,"Invalid!!");
         if(studentid[id].program_enum == 1){
            amt = 0.002 ether;
         }
         require(msg.value >= amt);
         uint balance = msg.value - amt;
         studentid[id].enrolled = true;
         payable(msg.sender).transfer(balance) ;
    }
    function getCountUG() public view Owneronly(msg.sender) returns (uint){
         return ugcount;
    }
    function getCountPG() public view Owneronly(msg.sender) returns (uint){
        return pgcount;
    }

}
