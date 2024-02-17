// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const entryPointArtifacts = require("../artifacts/contracts/core/EntryPoint.sol/EntryPoint.json");
const contractDB = require("../dataBase/controller/saveContractInfo");
const db = require("../dataBase/models");
const ContractInfo = require("../dataBase/table/ContractInfo");

async function main() {
  ContractInfo.init(db.sequelize);
  await db.sequelize.sync();
  const EntryPoint = await hre.ethers.getContractFactory(
    "contracts/core/EntryPoint.sol:EntryPoint"
  );
  const entryPoint = await EntryPoint.deploy();
  await entryPoint.waitForDeployment();

  const EntryPointAddress = await entryPoint.getAddress();
  console.log("BatchMinter deployed : ", EntryPointAddress);

  await contractDB.contracts.saveContractInfo(
    "EntryPoint",
    EntryPointAddress,
    entryPointArtifacts.abi
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
