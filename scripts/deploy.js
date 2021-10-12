// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const {ethers} = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  Promise.all(deploy_Greeter(), deploy_Deeznuts())
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

}

async function deploy_Deeznuts() {
  const [owner, addr1] = await ethers.getSigners();

  const DEEZNUTS = await hre.ethers.getContractFactory("DEEZNUTS");
  const deeznuts = await DEEZNUTS.deploy(owner.address, addr1.address);
  console.log("DEEZNUTS deployment arguments: \n1. %s \n2. %s \n", owner.address, addr1.address);
  // await deeznuts.deployed();
  console.log("DEEZNUTS deployed to:", deeznuts.address);
}

async function deploy_Greeter() {
  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, ", "Aleks and Evgeniy!");

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
  return greeter.address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
