

import axios from "axios";
import { Request, Response } from "express";



export const checkAllTablesHaveData = async () => {

    try {
      const response = await fetch(
        `${process.env.CSHARP_API}/api/checkTableController/allTablesHaveData`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check database");
      }

      const data = await response.json();

      // data הוא true או false
      return data;
    } catch (error) {
     console.log(error);
     
    }
  }

export const getId = async (req: Request, res: Response) => {
  const option = req.params.option;
  console.log("option:", option);

  try {
    const response = await axios.get(
      `${process.env.CSHARP_API}/Condition/idbyoption/${option}`
    );

    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addRole = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${process.env.CSHARP_API}/api/Role/AddRole`,
      req.body
    );

    res.json(response.data);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



export const addPriceList = async (req: Request, res: Response) => {
  try {
    console.log("BODY:");
    console.log(req.body);

    const response = await axios.post(
      `${process.env.CSHARP_API}/PricesList`,
      req.body
    );

    console.log("SUCCESS");
    console.log(response.status);

    res.sendStatus(204);
  } catch (error: any) {
    console.log("STATUS:");
    console.log(error.response?.status);

    console.log("DATA:");
    console.log(error.response?.data);

    console.log("MESSAGE:");
    console.log(error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const addCondition = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${process.env.CSHARP_API}/Condition`,
      req.body
    );

    res.json(response.data);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const addRoom = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${process.env.CSHARP_API}/RoomDB`,
      req.body
    );

    res.json(response.data);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};