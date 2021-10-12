//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    string private name;

    constructor(string memory _greeting, string memory _name) {
        console.log("Deploying a Greeter with greeting: %s", combine(_greeting, _name));
        greeting = _greeting;
        name = _name;
    }

    function greet() public view returns (string memory) {
        return combine(greeting, name);
    }

    function combine(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function setName(string memory _name) public {
        console.log("Changing name from '%s' to '%s'", name, _name);
        name = _name;
    }
}
