const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = ethers.BigNumber

describe("DEEZNUTS", function () {
  it("Total supply equal to what you set.", async function () {

    const [owner, addr1] = await ethers.getSigners();
    const DEEZNUTS = await ethers.getContractFactory("DEEZNUTS");
    const deeznuts = await DEEZNUTS.deploy(owner.address, addr1.address);

    // console.log(await deeznuts.totalSupply());

    const zeros = "0".repeat(9 + 18)
    expect(await deeznuts.totalSupply()).to.equal(BigNumber.from(`1${zeros}`)); 
  });
});
