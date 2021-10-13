const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = ethers.BigNumber

describe("DEEZNUTS", function () {

  const toWei = BigNumber.from(`1${"0".repeat(18)}`);

  it("Total supply equal to what you set", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const DEEZNUTS = await ethers.getContractFactory("DEEZNUTS");
    const deeznuts = await DEEZNUTS.deploy(owner.address, addr1.address);

    expect(await deeznuts.totalSupply()).to.equal(BigNumber.from(10).pow(9).mul(toWei));
  });
  
  it("Transfer to wallets that are excluded and not excluded from fee", async function () {

    const [owner, addr1, trash] = await ethers.getSigners();
    const DEEZNUTS = await ethers.getContractFactory("DEEZNUTS");
    const deeznuts = await DEEZNUTS.deploy(owner.address, addr1.address);

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
  it("Check that the fees are sent to appropriate wallets correctly", async function () {

    const [owner, dummy, charity, marketing] = await ethers.getSigners();
    const DEEZNUTS = await ethers.getContractFactory("DEEZNUTS");
    const deeznuts = await DEEZNUTS.deploy(charity.address, marketing.address);

    const amount = BigNumber.from(100).mul(toWei);
    await deeznuts.transfer(dummy.address, amount);

    console.log("charity: %s, marketing: %s", await deeznuts.balanceOf(charity.address), await deeznuts.balanceOf(marketing.address));

  });
});
