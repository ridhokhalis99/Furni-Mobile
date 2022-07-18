const { gql } = require("apollo-server");
const { appAxios, userAxios } = require("../axiosInstance");
const Redis = require("ioredis");
const redis = new Redis({
  port: 13932,
  host: "redis-13932.c232.us-east-1-2.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASSWORD,
});

const typeDefs = gql`
  type Product {
    id: ID
    name: String
    slug: String
    overview: String
    description: String
    mainImg: String
    price: Int
    Category: Category
    Images: [Image]
  }

  type ProductDetail {
    id: ID
    name: String
    slug: String
    overview: String
    description: String
    mainImg: String
    price: Int
    Category: Category
    Images: [Image]
    User: User
  }

  type Category {
    name: String
  }

  type Image {
    imgUrl: String
  }

  type Message {
    message: String
  }

  type User {
    _id: String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  input ImageInput {
    imgUrl: String
  }

  input AddProductInput {
    name: String
    overview: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    Images: [ImageInput]
    userMongoId: String
  }

  input EditProductInput {
    name: String
    overview: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    Images: [ImageInput]
  }

  type Query {
    getProducts: [Product]
    getProduct(slug: String): ProductDetail
  }

  type Mutation {
    addProduct(productInput: AddProductInput): Message
    updateProduct(productInput: EditProductInput, slug: String): Message
    deleteProduct(slug: String): Message
  }
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const productsCache = await redis.get("app:products");
        if (productsCache) {
          const data = JSON.parse(productsCache);
          return data;
        }
        const { data } = await appAxios.get("/products");
        await redis.set("app:products", JSON.stringify(data));
        return data;
      } catch (err) {
        throw err;
      }
    },
    getProduct: async (parent, args) => {
      try {
        const { slug } = args;
        const { data } = await appAxios.get(`/products/${slug}`);
        const { data: User } = await userAxios.get(`/${data.userMongoId}`);
        data.User = User;
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addProduct: async (parent, args) => {
      try {
        const { productInput } = args;
        const { data } = await appAxios.post(`products/add`, productInput);
        await redis.del("app:products");
        return data;
      } catch (err) {
        throw err;
      }
    },
    updateProduct: async (parent, args) => {
      try {
        const { productInput, slug } = args;
        const { data } = await appAxios.put(`products/${slug}`, productInput);
        await redis.del("app:products");
        return data;
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (parent, args) => {
      try {
        const { slug } = args;
        const { data } = await appAxios.delete(`products/${slug}`);
        await redis.del("app:products");
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
