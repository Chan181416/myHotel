// const router = require("express").Router();

// const dataController = require("../controllers/dataController");

// router.post("/loadData", dataController.loadData);

// module.exports = router;

import { Router } from "express";
import { loadData } from "../controllers/dataController";

const router = Router();

router.post("/loadData", loadData);

export default router;