import { WebSocketProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import Cert from "../Cert.json" assert { type: "json" };

const wsprovider = new WebSocketProvider("ws://127.0.0.1:8545");
const signer = await wsprovider.getSigner();
const wsInstance = new Contract(Cert.ContractAddress, Cert.abi, signer);
console.log(Cert.ContractAddress);
(() => {
  console.log("Listening for Events....");
  wsInstance.on("Issued", (course, id, grade, event) => {
    console.log("**** EVENT OCCURED ****");
    console.log("course:", course);
    console.log("id:", Number(id));
    console.log("grade:", grade);
    console.log("event:", event);
    console.log("***********************");
  });
  wsInstance.on("AdminRevoked", (caller, revoked) => {
    console.log("**** EVENT OCCURED ****");
    console.log("Caller:", caller);
    console.log("Revoked:", revoked);
    console.log("***********************");
  });
  wsInstance.on("AdminAdded", (caller, added) => {
    console.log("**** EVENT OCCURED ****");
    console.log("Caller:", caller);
    console.log("Added:", added);
    console.log("***********************");
  });
})();
