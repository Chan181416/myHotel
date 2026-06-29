import { Request, Response } from "express";
// שירות C#
import api from "../services/csharp.service";

export const getByNameAndId = async (req: Request, res: Response) => {
  const { username, idNumber } = req.params;
  try {
    const response = await api.get(
      `/api/Role/getByNameAndId/${username}/${idNumber}`
    );

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};