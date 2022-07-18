const express = require("express");
const app = express();
const { connect } = require("./config/connection");
const router = require("./routes");
const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", router);

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
