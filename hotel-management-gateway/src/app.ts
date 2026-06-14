

import express from "express";
import cors from "cors";

// const registeredRoutes = require("./routes/registered.routes");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/registereds", registeredRoutes);

export default app;