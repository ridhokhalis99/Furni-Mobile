const { getDatabase } = require("../config/connection");
const User = require("../models/User");
const hashPassword = require("../helpers/bcrypt");

class Controller {
  static users() {
    const db = getDatabase();
    const users = db.collection("users");
    return users;
  }

  static async readAllUsers(req, res) {
    try {
      let result = await User.findAll();
      result.map((el) => delete el.password);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async createUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const userInput = {
        username,
        email,
        password: hashPassword(password),
        role,
        phoneNumber,
        address,
      };
      await User.create(userInput);
      res.status(201).json({
        message: "User has been added successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async readUserById(req, res) {
    try {
      const { _id } = req.params;
      let result = await User.findOne(_id);
      delete result.password;
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { _id } = req.params;
      await User.delete(_id);
      res.status(200).json({
        message: "User has been deleted successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
