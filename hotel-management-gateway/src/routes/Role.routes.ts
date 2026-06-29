
import { Router } from "express";
import { getByNameAndId } from "../controllers/Role.controller";

const router = Router();

router.get(
  "/getByNameAndId/:username/:idNumber",
  getByNameAndId
);

export default router;