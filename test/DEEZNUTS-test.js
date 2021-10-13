const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = ethers.BigNumber

describe("DEEZNUTS", function () {

  it("Total supply equal to what you set", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const DEEZNUTS = await ethers.getContractFactory("DEEZNUTS");
    const deeznuts = await DEEZNUTS.deploy(owner.address, addr1.address);

    const zeros = "0".repeat(9 + 18);
    expect(await deeznuts.totalSupply()).to.equal(BigNumber.from(`1${zeros}`)); 
  });
  
  it("Transfer to wallets that are excluded and not excluded from fee", async function () {

    const [owner, addr1, trash] = await ethers.getSigners();
    const DEEZNUTS = await ethers.getContractFactory("DEEZNUTS");
    const deeznuts = await DEEZNUTS.deploy(owner.address, addr1.address);

    const toWei = BigNumber.from(`1${"0".repeat(18)}`);
    const amount = BigNumber.from(100).mul(toWei);
    const requiredBalance = (await deeznuts.balanceOf(owner.address)).sub(amount)
    
    await deeznuts.transfer(addr1.address, amount);
    
    //by default owner and contract both are excluded from fee 
    expect(await deeznuts.balanceOf(owner.address)).to.equal(requiredBalance);

    await deeznuts.connect(addr1).transfer(trash.address, amount);

    // addr1 included in fees, means trash address should receive 90%
    expect(await deeznuts.balanceOf(addr1.address)).to.equal(0); 
    expect(await deeznuts.balanceOf(trash.address)).to.be.lt(amount);

  });
  // it("Make sure adding liquidity works", async function () {

  //   const [owner, addr1] = await ethers.getSigners();
  //   const DEEZNUTS = await ethers.getContractFactory("DEEZNUTS");
  //   const deeznuts = await DEEZNUTS.deploy(owner.address, addr1.address);
  // });
});
