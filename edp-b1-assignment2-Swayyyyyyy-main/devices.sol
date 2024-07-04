// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface device {
    
    function getPrice() external returns (uint) ;
    function getOS() external returns (string memory);
    function getmodel() external returns (string memory);
}
contract Laptop is device {
   
        uint price = 2 ether;
        string OS = "macOS";
        string model = "Macbook";
     function getPrice() external view override returns (uint){
    return price;
     }
   function getOS() external view override returns (string memory){
    return OS;
   }
    function getmodel() external view override returns (string memory){
        return model;
    }

}
contract Mobile is device {
     
        uint price = 0.1 ether;
        string OS = "ios";
        string model = "Iphone";
     function getPrice() external view override returns (uint){
    return price;
     }
   function getOS() external view override returns (string memory){
    return OS;
   }
    function getmodel() external view override returns (string memory){
        return model;
    }

}
contract Tab is device {
     
        uint price = 0.5 ether;
        string OS = "Android 10.0";
        string model = "Samsung";
     function getPrice() external view override returns (uint){
    return price;
     }
   function getOS() external view override returns (string memory){
    return OS;
   }
    function getmodel() external view override returns (string memory){
        return model;
    }

}
