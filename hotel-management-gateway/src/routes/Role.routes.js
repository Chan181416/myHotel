
// role.routes.js
const router = require("express").Router();
const roleController = require("../controllers/Role.controller"); // כאן R גדולה בקובץ

// הנתיב הזה מחבר את ה-URL לפונקציה ב-Controller
router.get("/getByNameAndId/:username/:idNumber", roleController.getByNameAndId);

module.exports = router;