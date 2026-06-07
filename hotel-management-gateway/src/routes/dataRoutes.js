const router = require("express").Router();

const dataController = require("../controllers/dataController");

router.post("/loadData", dataController.loadData);

module.exports = router;