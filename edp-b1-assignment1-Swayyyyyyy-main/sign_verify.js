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

function generateSignature(transaction, privateKey) {
  const wallet = new ethers.Wallet(privateKey);
  const signedTransaction = wallet.sign(transaction);
  console.log(signedTransaction);
  return signedTransaction;
}

function verifySignature(signedTransaction, signerAddress) {
  const tx = signedTransaction;
  const digest = ethers.utils.keccak256(tx.hash);
  const sig = {
    r: tx.r,
    s: tx.s,
    v: tx.v,
  };
  const recoveredAddress = ethers.utils.recoverAddress(digest, sig);
  var result = recoveredAddress === signerAddress;
  console.log(result);
  return result;
}
