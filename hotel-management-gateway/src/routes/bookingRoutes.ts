import { Router } from "express";
import { confirmBooking } from "../controllers/bookingController";

const router = Router();

router.post("/confirm-booking", confirmBooking);

export default router;