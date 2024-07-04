import { Router } from "express";

import {
  instance,
  signer,
  wallet,
  connectedWallet,
  provider,
  addr,
  contract,
} from "../../Instance.js";
const router = Router();
/* GET home page. */
router.get("/", function (req, res) {
  res.send("Hello World!");
});

router.post("/issue", async function (req, res) {
  try {
    const tx = await instance.issue(
      req.body.id,
      req.body.name,
      req.body.course,
      req.body.grade,
      req.body.date
    );
    console.log(tx);
    res.status(201).json(tx);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/fetch", async function (req, res) {
  try {
    const id = parseInt(req.query.id);
    const cert = await instance.getCertificate(id);
    res.status(200).json(cert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
