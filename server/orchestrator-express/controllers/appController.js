const { appAxios, userAxios } = require("../axiosInstance");
<<<<<<< HEAD
const Redis = require("ioredis");
const redis = new Redis();
=======
>>>>>>> 43a63be (add: cascade when delete user and include user when read product by slug)

class AppController {
  static async readAllProducts(req, res, next) {
    try {
      const productsCache = await redis.get("app:products");
      if (productsCache) {
        const data = JSON.parse(productsCache);
        res.status(200).json(data);
      } else {
        const { data } = await appAxios.get("/products");
        await redis.set("app:products", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const {
        name,
        overview,
        description,
        price,
        mainImg,
        categoryId,
        userMongoId,
        Images,
      } = req.body;
      const productInput = {
        name,
        overview,
        description,
        price,
        mainImg,
        userMongoId,
        categoryId,
        Images,
      };
      const { data } = await appAxios.post("/products/add", productInput);
      await redis.del("app:products");
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async readProductBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      let { data: product } = await appAxios.get(`/products/${slug}`);
      if (!product) throw { name: "Product Not Found" };
      let { data: user } = await userAxios.get(`/${product.userMongoId}`);
      delete product.userMongoId;
      product.User = user;
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async editProductBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const {
        name,
        overview,
        description,
        price,
        mainImg,
        categoryId,
        Images,
      } = req.body;
      const productInput = {
        name,
        overview,
        description,
        price,
        mainImg,
        categoryId,
        Images,
      };
      const { data } = await appAxios.put(
        `/products/${slug}/edit`,
        productInput
      );
      await redis.del("app:products");
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProductBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const { data } = await appAxios.delete(`/products/${slug}/delete`);
      await redis.del("app:products");
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AppController;
