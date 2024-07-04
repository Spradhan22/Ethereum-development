// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Factorial {

    function factorial(uint x) public returns (uint) {
        uint result = 1;
        for (uint i = 1; i <= x; i++) {
            result *= i;
        }
        return result;
    }

    function factRec(uint x) public  returns (uint) {
        if (x == 0) {
            return 1;
        } else {
            return x * factRec(x - 1);
        }
    }
}
