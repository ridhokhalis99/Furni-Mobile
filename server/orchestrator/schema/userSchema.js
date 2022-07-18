const { gql } = require("apollo-server");
const { userAxios, appAxios } = require("../axiosInstance");
const Redis = require("ioredis");
const redis = new Redis({
  port: 13932,
  host: "redis-13932.c232.us-east-1-2.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASSWORD,
});

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Message {
    message: String
  }

  input UserInput {
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    getUsers: [User]
    getUser(_id: String): User
  }

  type Mutation {
    addUser(userInput: UserInput): Message
    deleteUser(_id: String): Message
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const userCache = await redis.get("user:users");
        if (userCache) {
          const data = JSON.parse(userCache);
          return data;
        }
        const { data } = await userAxios.get("/");
        await redis.set("user:users", JSON.stringify(data));
        return data;
      } catch (err) {
        throw err;
      }
    },
    getUser: async (parent, args) => {
      try {
        const { _id } = args;
        const { data } = await userAxios.get(`/${_id}`);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const { userInput } = args;
        const { data } = await userAxios.post("/", userInput);
        await redis.del("user:users");
        return data;
      } catch (err) {
        throw err;
      }
    },
    deleteUser: async (parent, args) => {
      try {
        const { _id } = args;
        const { data } = await userAxios.delete(`/${_id}`);
        await appAxios.delete(`/products/users/${_id}`);
        await redis.del("user:users");
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
