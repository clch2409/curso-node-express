const { Category, categorySchema } = require('./category.model');
const { Customer, customerSchema } = require('./customers.model');
const { Order, orderSchema } = require('./order.model');
const { OrderProduct, productOrderSchema } = require('./product_order.model');
const { Product, productSchema } = require('./proudct.model');
const { User, userSchema } = require('./user.model');


function setupModels(sequelize){
  User.init(userSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  OrderProduct.init(productOrderSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
