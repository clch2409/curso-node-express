const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const userRouter = require('./users.router');
const customerRouter = require('./customer.router');
const orderRouter = require('./order.router');
const authRouter = require('./auth.router');

const root = '/api/v1'

function routerApi(app){
  const router = express.Router();

  app.use(`${root}`, router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', userRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
