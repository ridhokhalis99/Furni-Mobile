const { Product, Image, Category, sequelize } = require("../models");

class Controller {
  static async readAllProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Image, attributes: ["imgUrl"] },
          { model: Category, attributes: ["name"] },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async readProductBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        where: {
          slug,
        },
        include: [
          { model: Image, attributes: ["imgUrl"] },
          { model: Category, attributes: ["name"] },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    const t = await sequelize.transaction();
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
        price: +price,
        mainImg,
        userMongoId,
        categoryId: +categoryId,
      };

      const product = await Product.create(productInput, { transaction: t });
      const imageInput = Images.map((image) => {
        return { imgUrl: image.imgUrl, productId: product.id };
      });
      await Image.bulkCreate(imageInput, { transaction: t });

      await t.commit();
      res.status(201).json({
        message: "Product has been added successfully",
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
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
        price: +price,
        mainImg,
        categoryId: +categoryId,
      };
      const { slug } = req.params;
      const productFound = await Product.findOne({ where: { slug } });
      if (!productFound) {
        throw { name: "Product Not Found" };
      }
      await Product.update(productInput, {
        where: {
          slug,
        },
        transaction: t,
        individualHooks: true,
      });
      const imageInput = Images.map((image) => {
        return { imgUrl: image.imgUrl, slug };
      });
      await Image.destroy({
        where: {
          id: productFound.id,
        },
        transaction: t,
      });
      await Image.bulkCreate(imageInput, { transaction: t });
      await t.commit();
      res.status(200).json({
        message: "Product has been updated successfully",
      });
    } catch (err) {
      await t.rollback();
      console.log(err);
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { slug } = req.params;
      const productFound = await Product.findOne({ where: { slug } });
      if (!productFound) {
        throw { name: "Product Not Found" };
      }
      await Product.destroy({
        where: {
          slug,
        },
      });
      res.status(200).json({
        message: "Product has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProductByMongoId(req, res, next) {
<<<<<<< HEAD
=======
    try {
      const { userMongoId } = req.params;
      await Product.destroy({
        where: {
          userMongoId,
        },
      });
      res.status(200).json({
        message: "Product has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async readAllCategories(req, res, next) {
>>>>>>> 43a63be (add: cascade when delete user and include user when read product by slug)
    try {
      const { userMongoId } = req.params;
      await Product.destroy({
        where: {
          userMongoId,
        },
      });
      res.status(200).json({
        message: "Product has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
