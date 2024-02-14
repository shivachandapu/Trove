async function main() {
  const [deployer] = await ethers.getSigners();
  
  const Drive = await ethers.getContractFactory("Drive");
  console.log("Deploying contracts with the account:", deployer.address);
  const drive = await ethers.deployContract("Drive");
  console.log("Drive address:", await drive.getAddress());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });