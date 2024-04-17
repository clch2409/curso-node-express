'use strict';

const { CUSTOMER_TABLE } = require('../models/customers.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn(CUSTOMER_TABLE, 'idCustomer', 'id');
    await queryInterface.renameColumn(CUSTOMER_TABLE, 'lastName', 'last_name');
  },

  async down (queryInterface) {
    await queryInterface.renameColumn(CUSTOMER_TABLE, 'id', 'idCustomer');
    await queryInterface.renameColumn(CUSTOMER_TABLE, 'last_name', 'lastName');
  }
};
