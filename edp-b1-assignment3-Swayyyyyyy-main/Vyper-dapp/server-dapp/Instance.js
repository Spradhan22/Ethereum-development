import ethers from "ethers";
const {
  Contract,
  providers: { JsonRpcProvider },
} = ethers;

import Cert from "./Cert.json" assert { type: "json" };

const provider = new JsonRpcProvider("http://localhost:8545");

const signer = provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
console.log(Cert.Contractaddress);
export const instance = new Contract(Cert.ContractAddress, Cert.abi, signer);
