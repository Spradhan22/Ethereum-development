// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
contract A {
  address public origin;
  address public sender;

  function callB(address _b) public {
    B b = B(_b);
    b.callC(address(this));
  }

  function funA() public {
    origin = tx.origin;
    sender = msg.sender;
  }
}

contract B {

  function callC(address addr_A) public {
    C c = new C();
    c.callA(addr_A);
  }
}

contract C {
  function callA(address addr_A) public {
    A a = A(addr_A); 
    a.funA();
  }
}
