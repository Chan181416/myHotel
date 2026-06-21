

import dotenv from "dotenv";
dotenv.config();
import roleRoutes from "./routes/Role.routes";
import dataRoutes from "./routes/dataRoutes";
import proxyRoutes from "./routes/proxyRoutes";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Routes ישנים

app.get('/', (req, res)=>{
  res.status(200).send('server works')
})
// app נוסף (registereds)
// import registeredApp from "./app";

// app.use(registeredApp);

// Register routes
app.use("/api/Role", roleRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/proxy", proxyRoutes);

const PORT = Number(process.env.PORT) ||3001 ;
app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
});