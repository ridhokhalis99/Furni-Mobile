const axios = require("axios");

const userAxios = axios.create({
  baseURL: "http://localhost:4001/users/",
});

const appAxios = axios.create({
  baseURL: "http://localhost:4002/",
});

module.exports = { userAxios, appAxios };
