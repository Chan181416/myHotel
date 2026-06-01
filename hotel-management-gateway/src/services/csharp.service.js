const axios = require("axios");

const api = axios.create({
    baseURL: process.env.CSHARP_API
});

module.exports = api;