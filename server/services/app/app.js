const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
