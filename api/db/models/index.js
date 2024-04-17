const { Customer, customerSchema } = require('./customers');
const { User, userSchema } = require('./user.model');

function setupModels(sequelize){
  User.init(userSchema, User.config(sequelize))
  Customer.init(customerSchema, Customer.config(sequelize));
}

module.exports = setupModels;
