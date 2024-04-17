const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const customerSchema = {

  idCustomer: {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUser: {
    field: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }

}

class Customer extends Model{

  static asocciations(models){
    this.belongsTo(models.User, { as: 'user' })
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
