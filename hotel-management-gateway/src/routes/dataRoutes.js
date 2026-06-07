const router = require("express").Router();

const dataController = require("../controllers/dataController");

router.post("/load", dataController.loadData);

module.exports = router;