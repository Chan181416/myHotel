
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes ישנים
const roleRoutes = require("./src/routes/Role.routes");
const dataRoutes = require("./src/routes/dataRoutes");
const proxyRoutes = require("./src/routes/proxyRoutes");
// Routes מ־src/app.js
const registeredApp = require("./src/app");  // מייבא את ה־app של registereds
app.use(registeredApp);  // מוסיף את כל ה־routes של registereds

// Register routes
app.use("/api/Role", roleRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/proxy", proxyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
});