"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.hasMany(models.Image, {
        foreignKey: "productId",
        onDelete: "Cascade",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Product name can't be empty` },
          notEmpty: { msg: `Product name can't be empty` },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      overview: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Overview can't be empty` },
          notEmpty: { msg: `Overview can't be empty` },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: `Description can't be empty` },
          notEmpty: { msg: `Description can't be empty` },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `Price can't be empty` },
          notEmpty: { msg: `Price can't be empty` },
          min: {
            args: [0],
            msg: "Minimum price is 0",
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Main image can't be empty` },
          notEmpty: { msg: `Main image can't be empty` },
        },
      },
      categoryId: DataTypes.INTEGER,
      userMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  Product.beforeCreate((product, options) => {
    product.slug = product.name.split(" ").join("-").toLowerCase();
  });
  Product.beforeUpdate((product, options) => {
    product.slug = product.name.split(" ").join("-").toLowerCase();
  });
  return Product;
};
