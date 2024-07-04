import Web3 from "web3";
import Cert from "./Cert.json" assert { type: "json" };

const web3 = new Web3("http://127.0.0.1:8545");

const account = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

const account1 = web3.eth.accounts.wallet.add(
  "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"
);
const instance = new web3.eth.Contract(Cert.abi, Cert.ContractAddress);


export default instance;
