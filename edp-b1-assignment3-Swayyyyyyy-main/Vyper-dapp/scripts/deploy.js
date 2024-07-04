const hre = require("hardhat");
const fs = require("fs");
const bytecode =
  "0x3461001957335f5561031e61001d6100003961031e610000f35b5f80fd5f3560e01c60026003820660011b61031801601e395f51565b639622c8368118610310576024361034176103145760208060405260016004356020525f5260405f2081604001608080825280820183548152600184015460208201528051806020830101601f825f03163682375050601f19601f825160200101169050810190508060208301526002830181830181548152600182015460208201528051806020830101601f825f03163682375050601f19601f8251602001011690509050810190508060408301526004830181830181548152600182015460208201528051806020830101601f825f03163682375050601f19601f8251602001011690509050810190508060608301526006830181830181548152600182015460208201528051806020830101601f825f03163682375050601f19601f82516020010116905090508101905090509050810190506040f3610310565b63d1e7be2681186103105761012436103417610314576024356004016010813511610314576020813501808260403750506044356004016020813511610314576020813501808260803750506064356004016001813511610314576020813501808260c0375050608435600401601081351161031457602081350180826101003750505f5433181561024757600d610140527f4163636573732044656e696564000000000000000000000000000000000000006101605261014050610140518061016001601f825f031636823750506308c379a061010052602061012052601f19601f61014051011660440161011cfd5b60016004356020525f5260405f2060405181556060516001820155608051600282015560a051600160028301015560c051600482015560e05160016004830101556101005160068201556101205160016006830101555060805160a0207fc7fc4858662996e8fe091a9941384ab745bfc51199d7c0a5e45a791ff945993c6040600435610140528061016052806101400160c051815260e05160208201528051806020830101601f825f03163682375050601f19601f82516020010116905081019050610140a2005b5f5ffd5b5f80fd0018031001568419031e810600a16576797065728300030a0014";
const abi = [
  {
    name: "Issued",
    inputs: [
      { name: "course", type: "string", indexed: true },
      { name: "id", type: "uint256", indexed: false },
      { name: "grade", type: "string", indexed: false },
    ],
    anonymous: false,
    type: "event",
  },
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "issue",
    inputs: [
      { name: "_id", type: "uint256" },
      { name: "_name", type: "string" },
      { name: "_course", type: "string" },
      { name: "_grade", type: "string" },
      { name: "_date", type: "string" },
    ],
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "Certificates",
    inputs: [{ name: "arg0", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "name", type: "string" },
          { name: "course", type: "string" },
          { name: "grade", type: "string" },
          { name: "date", type: "string" },
        ],
      },
    ],
  },
];
async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Read the compiled contract

  // Create a ContractFactory using the contract's ABI and bytecode
  const ContractFactory = new ethers.ContractFactory(abi, bytecode, deployer);

  // Deploy the contract
  const contract = await ContractFactory.deploy();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
