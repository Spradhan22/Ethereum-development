const ethers = require("ethers");
require("dotenv").config();
RPC_URL = "https://mainnet.infura.io/v3/8aa36d2a0a074e62900ec006218d2160";
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const signer = provider.getSigner();

const inspectBlock = async () => {
  const blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlock(blockNumber);
  console.log(blockNumber);
  provider.getTransaction(block.transactions[0]).then((tx) => {
    console.log(tx);
  });
};

function getContractAddress(from, nonce) {
  contractAddress = ethers.utils.getContractAddress({
    from: from,
    nonce: nonce,
  });
  console.log(contractAddress);
  return contractAddress;
}
