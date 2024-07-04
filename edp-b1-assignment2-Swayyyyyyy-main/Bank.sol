// SPDX-License-Identifier: MIT
pragma solidity 0.8.20; 
contract Bank{
    mapping(address=>uint) balanceLedger; // <<acc1,bal1>, <ac2,bal2>, <ac3,bal3>...
    mapping(uint=>address) index;// <0,acc1>, <1,ac2>, <2,ac3>,....
    uint addressCount;
     
    modifier balanceCheck(uint amt){
        require(amt <= balanceLedger[msg.sender],"Insufficient Balance");
        _;
    }
   function SelfDestruct()public{
           uint total = address(this).balance;
           payable(msg.sender).transfer(total);

     }

    function deposit()public payable{
        if(balanceLedger[msg.sender]==0){ // first happen
            index[addressCount++]=msg.sender;
        }
        balanceLedger[msg.sender] += msg.value;
    }
 
    function withdraw(uint amt)public balanceCheck(amt){
      //  require(amt <= balanceLedger[msg.sender],"Insufficient Balance");
        balanceLedger[msg.sender]=balanceLedger[msg.sender]-amt;
        payable(msg.sender).transfer(amt);
 
    }

    function deleteAccount() public{
        payable(msg.sender).transfer(balanceLedger[msg.sender]);
        balanceLedger[msg.sender] = 0;
        uint i=0;
        uint count = 0;
        while(i<addressCount && count<addressCount){
            if(index[i] == msg.sender){
                i--;
            }
            else{
                index[i] = msg.sender;
                count++;
            }
            i++;
        }
        addressCount--;
    }
 
    function transfer(address recipient,uint amt)public  balanceCheck(amt){
        //require(amt <= balanceLedger[msg.sender],"Insufficient Balance");
        balanceLedger[msg.sender]=balanceLedger[msg.sender]-amt;
        payable(recipient).transfer(amt);
    }
 
    function getMyBalance()public view returns(uint){
        return balanceLedger[msg.sender];
    }
 
    function getMaxDeposit()public view returns(address maxAddress, uint maxBalance){
        address indexAddress;
        for(uint i=0; i<addressCount;i++){
            indexAddress = index[i];
            if(balanceLedger[indexAddress]>maxBalance){
                maxBalance = balanceLedger[indexAddress];
                maxAddress = indexAddress;
            }
 
}
    
}
    
}
