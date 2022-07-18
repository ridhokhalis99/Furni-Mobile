"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/products.json");
    const products = data.map((product) => {
      product.createdAt = product.updatedAt = new Date();
      return product;
    });

    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
