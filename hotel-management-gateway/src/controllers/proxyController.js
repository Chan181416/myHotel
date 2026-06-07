const axios = require("axios");

exports.addRole = async (req, res) => {
  try {

    const response = await axios.post(
      "http://localhost:5044/api/Role/AddRole",
      req.body
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

exports.addPriceList = async (req, res) => {
  try {

    const response = await axios.post(
      "http://localhost:5044/PriceList",
      req.body
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

exports.addCondition = async (req, res) => {
  try {

    const response = await axios.post(
      "http://localhost:5044/Condition",
      req.body
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

exports.addRoom = async (req, res) => {
  try {

    const response = await axios.post(
      "http://localhost:5044/RoomDB",
      req.body
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};