"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/categories.json");
    const categories = data.map((category) => {
      category.createdAt = category.updatedAt = new Date();
      return category;
    });

    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
