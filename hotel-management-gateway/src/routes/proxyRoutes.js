const router = require("express").Router();
const proxyController = require("../controllers/proxyController");

router.post("/Role/AddRole", proxyController.addRole);

router.post("/PriceList", proxyController.addPriceList);

router.post("/Condition", proxyController.addCondition);

router.post("/RoomDB", proxyController.addRoom);

module.exports = router;