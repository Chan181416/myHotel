const axios = require("axios");

exports.loadData = async (req, res) => {
  try {
    const [registeredsResponse, roomsResponse] = await Promise.all([
      axios.get("http://localhost:5044/api/Registereds"),
      axios.get("http://localhost:5044/api/RoomsDB")
    ]);

    res.json({
      registereds: registeredsResponse.data,
      rooms: roomsResponse.data
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};