const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, ", "Mouse and Keyboard!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, Mouse and Keyboard!");

    const setGreetingTx = await greeter.setGreeting("Hola, ");
    const setNameTx = await greeter.setName("Apple and Orange and ...");

    // wait until the transaction is mined
    await setGreetingTx.wait();
    await setNameTx.wait();

    expect(await greeter.greet()).to.equal("Hola, Apple and Orange and ...");
  });
});
