import { Router } from "express";
import { instance } from "../../Instance.js";
import { provider } from "../../Instance.js";
import { Interface } from "ethers/lib/utils.js";
import { id } from "ethers/lib/utils.js";
import { address } from "../../Instance.js";
import { abi } from "../../Instance.js";
const router = Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/issue", async (req, res) => {
  try {
    const trx = await instance.issue(
      req.body.id,
      req.body.name,
      req.body.course,
      req.body.grade,
      req.body.date
    );
    console.log(trx);
    res.json(trx);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const result = await instance.Certificates(req.query.id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post("/add-admin", async (req, res) => {
  try {
    const trx = await instance.addAdmin(req.body._admin);
    console.log(trx);
    res.json(trx);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post("/revoke-admin", async (req, res) => {
  try {
    const trx = await instance.revokeAdmin(req.body._admin);
    console.log(trx);
    res.json(trx);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/events", async function (req, res) {
  try {
    const eventTopic = id("Issued(string,uint256,string)");
    let eventlogs = [];
    const iface = new Interface(abi);

    BigInt.prototype.toJSON = function () {
      return this.toString();
    };

    await provider
      .getLogs({
        fromBlock: 0,
        toBlock: "latest",
        address: address,
        topics: [eventTopic],
      })
      .then((logs) => {
        // if(logs.topics.course === req.query.course){
        //   eventlogs.push(iface.parseLog(logs));
        // }
        logs.forEach((log) => eventlogs.push(iface.parseLog(log)));
      });

    res.json(eventlogs);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
export default router;
