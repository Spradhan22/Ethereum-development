const ethers = require("ethers");
const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  const wallet = ethers.Wallet.createRandom();
  const walletPath = "./wallet.json";
  const response = {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server is running and listening at http://localhost:${port}`);
});
