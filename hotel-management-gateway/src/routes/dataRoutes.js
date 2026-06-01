const router = require("express").Router();

const dataController = require("../controllers/dataController");

router.get("/load", dataController.loadData);

module.exports = router;