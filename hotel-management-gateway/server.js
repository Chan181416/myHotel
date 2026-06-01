require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const roleRoutes = require("./src/routes/Role.routes");
const dataRoutes = require("./src/routes/data.routes");

app.use("/api/Role", roleRoutes);
app.use("/api/data", dataRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
});