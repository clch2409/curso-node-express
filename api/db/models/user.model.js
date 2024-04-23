const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')

const USER_TABLE = 'users';

const userSchema = {
  id:{
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('now')
  }
}

class User extends Model{

  static associate(models){
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (instance) => {
          const hash = await bcrypt.hash(instance.password, 10);
          instance.password = hash;
        }
      },
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      },
      scopes: {
        withPassword: {
          attributes: ['id', 'email', 'password', 'role', 'isActive', 'createdAt', 'recoveryToken'],
        }
      },
    }
  }

}

module.exports = { USER_TABLE, userSchema, User }
