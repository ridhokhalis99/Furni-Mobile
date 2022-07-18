"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/images.json");
    const images = data.map((image) => {
      image.createdAt = image.updatedAt = new Date();
      return image;
    });

    await queryInterface.bulkInsert("Images", images, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
