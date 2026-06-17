// const router = require("express").Router();

// const dataController = require("../controllers/dataController");

// router.post("/loadData", dataController.loadData);

// module.exports = router;

// import { Router } from "express";
// import { loadData } from "../controllers/dataController";

// const router = Router();

// router.post("/loadData", loadData);

// export default router;

import { Router } from "express";
import axios from "axios";
import { loadData } from "../controllers/dataController";

const router = Router();

const CSHARP = "http://localhost:5044/api/Role";

router.get("/getByNameAndId/:name/:id", async (req, res) => {
  try {
    const { name, id } = req.params;

    const response = await axios.get(
      `${CSHARP}/getByNameAndId/${name}/${id}`
    );

    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: "Gateway failed", details: err.message });
  }
});

router.post('/loaddata', async (req, res) => {
  try {
    const response = await loadData(req, res);
    res.json(response);
  }
  catch (err: any) {
    res.status(500).json({ error: "Gateway failed", details: err.message });
  }
}
)

export default router;