const { userAxios, appAxios } = require("../axiosInstance");
const Redis = require("ioredis");
const redis = new Redis();

class UserController {
  static async readAllUsers(req, res, next) {
    try {
      const usersCache = await redis.get("user:users");
      if (usersCache) {
        const data = JSON.parse(usersCache);
        res.status(200).json(data);
      } else {
        const { data } = await userAxios.get("/");
        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const userInput = {
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      };
      const { data } = await userAxios.post("/", userInput);
      await redis.del("user:users");
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async readUserById(req, res, next) {
    try {
      const { _id } = req.params;
      const { data } = await userAxios.get(`/${_id}`);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { _id } = req.params;
      const { data: user } = await userAxios.delete(`/${_id}`);
      await appAxios.delete(`/products/users/${_id}`);
<<<<<<< HEAD
      await redis.del("user:users");
=======
>>>>>>> 43a63be (add: cascade when delete user and include user when read product by slug)
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
