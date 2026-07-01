import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/view", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${process.env.DOTNET_URL}/api/roomLocation/view`
    );

    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({
      message: "RoomLocation gateway error",
      error: err.message
    });
  }
});

export default router;