const express = require("express");
const cors = require("cors");

const registeredRoutes = require("./routes/registered.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/registereds", registeredRoutes);

module.exports = app;