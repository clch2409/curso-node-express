'use strict';

const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      unique: true
    })
  },

  async down (queryInterface) {
    queryInterface.removeColumn(USER_TABLE, 'recovery_token')
  }
};
