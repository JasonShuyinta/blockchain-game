const fs = require("fs");

async function main() {
  const MainContract = await ethers.getContractFactory("MainContract");

  // Start deployment, returning a promise that resolves to a contract object
  const main_contract = await MainContract.deploy();
  console.log("Contract deployed to address:", main_contract.address);
  // Write data in 'address.txt' .
  fs.writeFileSync(
    "./artifacts/build-info/address.json",
    JSON.stringify({ address: main_contract.address }),
    (err) => {
      // In case of a error throw err.
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
