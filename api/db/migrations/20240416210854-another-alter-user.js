'use strict';

const { userSchema, USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'is_active', userSchema.isActive);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'is_active');
  }
};
