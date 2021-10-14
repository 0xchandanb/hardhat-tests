const hre = require("hardhat");
const {ethers} = require("hardhat");

async function main() {

  // return deploy_Greeter()
  return deploy_Deeznuts()
}

async function deploy_Deeznuts() {
  const [owner, charity, marketing] = await ethers.getSigners();

  const DEEZNUTS = await hre.ethers.getContractFactory("DEEZNUTS");
  const deeznuts = await DEEZNUTS.deploy(charity.address, marketing.address);
  console.log("DEEZNUTS deployed at: %s \nOwner: %s \nCharity: %s \nMarketing: %s \n", deeznuts.address, owner.address, charity.address, marketing.address);
  return deeznuts
}

async function deploy_Greeter() {
  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, ", "Aleks and Evgeniy!");

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
  return greeter
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
