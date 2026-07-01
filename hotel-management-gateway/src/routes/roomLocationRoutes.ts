import { Router } from "express";
import { getRoomLocationsView } from "../controllers/roomLocationController";

const router = Router();

router.get("/view", getRoomLocationsView);

export default router;