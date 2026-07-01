import axios from "axios";
import { Request, Response } from "express";

export const getRoomLocationsView = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${process.env.CSHARP_API}/api/roomLocation/view`
    );

    return res.json(response.data);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};