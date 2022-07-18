const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/connection");

class User {
  static users() {
    const db = getDatabase();
    const users = db.collection("users");
    return users;
  }

  static async findAll() {
    try {
      const users = this.users();
      const result = await users.find().toArray();
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async findOne(_id) {
    try {
      const users = this.users();
      const result = await users.findOne({
        _id: ObjectId(_id),
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async create(userInput) {
    try {
      const users = this.users();
      const result = await users.insertOne(userInput);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(_id) {
    try {
      const users = this.users();
      const result = await users.deleteOne({
        _id: ObjectId(_id),
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
