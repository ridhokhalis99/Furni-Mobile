const axios = require("axios");

const userAxios = axios.create({
  baseURL: "https://p3-challenge-2-service-user.herokuapp.com/users",
});

const appAxios = axios.create({
  baseURL: "https://p3-challenge-2-service-app.herokuapp.com",
});

module.exports = { userAxios, appAxios };
