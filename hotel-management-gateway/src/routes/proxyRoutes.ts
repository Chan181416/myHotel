// const router = require("express").Router();
// const proxyController = require("../controllers/proxyController");

// router.post("/Role/AddRole", proxyController.addRole);

// router.post("/PricesList", proxyController.addPriceList);

// router.post("/Condition", proxyController.addCondition);

// router.post("/RoomDB", proxyController.addRoom);

// module.exports = router;

import { Router } from "express";
import {
  addRole,
  addPriceList,
  addCondition,
  addRoom,
  getId,
} from "../controllers/proxyController";

const router = Router();

router.post("/Role/AddRole", addRole);

router.post("/PricesList", addPriceList);

router.get("/Condition/idbyoption/:option", getId);

router.post("/Condition/add", addCondition);

router.post("/RoomDB", addRoom);

export default router;