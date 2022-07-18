const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://ridhokhalis:p3-challenge-2@cluster0.a84qe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
let database;

async function connect() {
  try {
    await client.connect();
    database = client.db("p3-challenge-2");
  } catch (err) {
    console.log(err);
  }
}

function getDatabase() {
  return database;
}

module.exports = {
  connect,
  getDatabase,
};
