'use strict';

const { PRODUCT_ORDER_TABLE, productOrderSchema } = require('../models/product_order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCT_ORDER_TABLE, productOrderSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_ORDER_TABLE);
  }
};
