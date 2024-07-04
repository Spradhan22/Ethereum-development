import * as ethers from "ethers";
import Cert from "./Cert.json" assert { type: "json" };
import Web3 from "web3";
const RPC_URL = "https://sepolia.infura.io/v3/10dfca41eca84b82ad7f517bc2a33d98";
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
let wallet = new ethers.Wallet(
  "0xeb3589ef594121c623ae255fab8af1f9811d411e01020e40494bf42e92b49c16"
);
let connectedWallet = wallet.connect(provider);
const signer = await provider.getSigner(
  "0x68e64059220BB8840E8c262aBAaE6D88D2c5A02B"
);
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(Cert.abi, Cert.ContractAddress);

const instance = new ethers.Contract(
  Cert.ContractAddress,
  Cert.abi,
  connectedWallet
);
const addr = Cert.ContractAddress;
export { instance, connectedWallet, wallet, signer, provider, addr, contract };
