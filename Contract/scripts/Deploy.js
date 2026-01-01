const hre = require("hardhat");

async function main() {
  const Property = await hre.ethers.getContractFactory("PropertyToken");
  console.log("Deploying Property...");

  const PropertyContract = await Property.deploy();
  await PropertyContract.waitForDeployment();

  console.log("Property Contract deployed to:", PropertyContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 

// 0xAf33E31C3D2E117384De2e255d3F14Fb14705ED7

// Only Owner Wala Bug in settlement 