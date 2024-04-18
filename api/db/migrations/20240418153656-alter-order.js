'use strict';

const { query } = require('express');
const { ORDER_TABLE } = require('../models/order.model');
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customers.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(ORDER_TABLE, 'customer_id', {
      field: 'customer_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      References: {
        model: CUSTOMER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  async down (queryInterface, Sequelize) {
    //
  }
};
