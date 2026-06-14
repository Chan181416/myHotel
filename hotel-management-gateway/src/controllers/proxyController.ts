// const axios = require("axios");

// exports.addRole = async (req, res) => {
//   try {

//     const response = await axios.post(
//       "http://localhost:5044/api/Role/AddRole",
//       req.body
//     );

//     res.json(response.data);

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: error.message
//     });

//   }
// };



//  exports.addPriceList = async (req, res) => {
//   try {

//     console.log("BODY:");
//     console.log(req.body);

//     const response = await axios.post(
//       "http://localhost:5044/PricesList",
//       req.body
//     );

//     console.log("SUCCESS");
//     console.log(response.status);

//     res.sendStatus(204);

//   } catch (error) {

//     console.log("STATUS:");
//     console.log(error.response?.status);

//     console.log("DATA:");
//     console.log(error.response?.data);

//     console.log("MESSAGE:");
//     console.log(error.message);

//     res.status(500).json({
//       message: error.message
//     });

//   }
// };


// exports.addCondition = async (req, res) => {
//   try {

//     const response = await axios.post(
//       "http://localhost:5044/Condition",
//       req.body
//     );

//     res.json(response.data);

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: error.message
//     });

//   }
// };

// exports.addRoom = async (req, res) => {
//   try {

//     const response = await axios.post(
//       "http://localhost:5044/RoomDB",
//       req.body
//     );

//     res.json(response.data);

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: error.message
//     });

//   }
// };

import axios from "axios";
import { Request, Response } from "express";

export const addRole = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      "http://localhost:5044/api/Role/AddRole",
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
      "http://localhost:5044/PricesList",
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
      "http://localhost:5044/Condition",
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
      "http://localhost:5044/RoomDB",
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