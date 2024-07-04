require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const RPC_URL = "https://sepolia.infura.io/v3/10dfca41eca84b82ad7f517bc2a33d98";
module.exports = {
  solidity: "0.8.20",
  networks: {
    local: {
      url: RPC_URL,
      accounts: [
        "0xeb3589ef594121c623ae255fab8af1f9811d411e01020e40494bf42e92b49c16",
      ],
    },
  },
};
