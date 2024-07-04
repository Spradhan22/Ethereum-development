import { Router } from "express";
import instance from "../../Instance.js";
const router = Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("Hello World!");
});

const account = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

router.get("/fetch", async function (req, res) {
  try {
    const certificates = await instance.Certificates(req.query.id);
    res.status(200).json(certificates);
  } catch (error) {
    console.log(req.query.id);
    res.status(500).json({ error });
  }
});

router.post("/issue", async function (req, res) {
  try {
    const tx = await instance.methods
      .issue(
        req.body.id,
        req.body.name,
        req.body.course,
        req.body.grade,
        req.body.date
      )
      .send({ from: account });
    for (let key in tx) {
      if (typeof tx[key] === "bigint") {
        tx[key] = tx[key].toString();
      }
    }
    res.status(201).json(tx);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
router.post("/add-admin", async function (req, res) {
  try {
    const admin = req.body.admin.toString(); // Convert BigInt to string
    const tx = await instance.methods.addAdmin(admin).send({ from: account });
    for (let key in tx) {
      if (typeof tx[key] === "bigint") {
        tx[key] = tx[key].toString();
      }
    }
    res.status(201).json(tx);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
});

export default router;
