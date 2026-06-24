

import { Router } from "express";
import axios from "axios";
import { loadData } from "../controllers/dataController";

const router = Router();

const CSHARP = "http://localhost:5044/api/Role";

router.get("/getByNameAndId/:name/:id", async (req, res) => {
  try {
    const { name, id } = req.params;

    const response = await axios.get(
      `${CSHARP}/getByNameAndId/${name}/${id}`
    );

    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: "Gateway failed", details: err.message });
  }
});

router.post('/loaddata', loadData);

export default router;