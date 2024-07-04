require("@nomiclabs/hardhat-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  vyper: "0.3.10",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
    },
  },
};
