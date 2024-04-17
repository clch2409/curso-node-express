'use strict';

const { CUSTOMER_TABLE } = require('../models/customers.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn(CUSTOMER_TABLE, 'id_user', 'user_id');
  },

  async down (queryInterface) {
    await queryInterface.renameColumn(CUSTOMER_TABLE, 'user_id', 'id_user');
  }
};
