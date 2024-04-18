const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const customerSchema = {

  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    field: 'last_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }

}

class Customer extends Model{

  static associate(models){
    this.belongsTo(models.User, { as: 'user' })
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }

}

module.exports = { CUSTOMER_TABLE, Customer, customerSchema }
