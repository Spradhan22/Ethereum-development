import { Router } from "express";
import { instance } from "../../Instance.js";
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
    console.log(req.body);
    res.status(500).json({ error });
  }
});

export default router;
