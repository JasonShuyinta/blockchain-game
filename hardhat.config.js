/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { API_URL_POLYGON, API_URL_FANTOM, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: API_URL_POLYGON,
      accounts: [`${PRIVATE_KEY}`],
    },
    fantom: {
      url: API_URL_FANTOM,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};
