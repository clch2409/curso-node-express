const express = require('express');
const passport = require('passport');

const customerRouter = express.Router();
// const boom = require('@hapi/boom')
const validatorHandler = require('./../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('./../schema/customer.schema');
const { checkRoles } = require('./../middlewares/auth.handler');
const customerService = require('./../services/customer.service');

customerRouter.get('', findAll);

customerRouter.post('',
  validatorHandler(createCustomerSchema, 'body'),
  createCustomer);

// customerRouter.get('/:id',
//   validatorHandler(getCustomerSchema, 'params'),
//   getUserById);

// customerRouter.put('/:id',
//   validatorHandler(getCustomerSchema, 'params'),
//   validatorHandler(updateCustomerSchema, 'body'),
//   updateUser);

// userRouter.patch('/:id',
//   validatorHandler(updateUserSchema, 'body'),
//   updateUser);

// customerRouter.delete('/:id',
//   validatorHandler(updateCustomerSchema, 'params'),
//   deleteUser);


async function findAll(req, res, next){
  try{
    const customers = await customerService.findAll();

    if (customers.length == 0){
      new Error('No hay usuarios registrados');
    }

    res.status(200).json(customers);
  }
  catch(e){
    next(e)
  }
}

async function createCustomer(req, res, next){
  try{
    const body = req.body;

    const newCustomer = await customerService.createCustomer(body, next);
    const customers = await customerService.findAll();

    res.status(201).json({
      newCustomer,
      customers
    })
  }
  catch(e){
    next(e)
  }
}

async function findAllByUser(req, res, next){
  try{

  }
  catch(e){
    next(e)
  }
}

// async function getUserById(req, res, next){
//   try{
//     const { id } = req.params;

//     const foundUser = await usersService.getUserById(id);

//     res.status(302).json({
//       foundUser,
//     })
//   }
//   catch(e){
//     next(e)
//   }
// }

// async function updateUser(req, res, next){
//   try{
//     const { id } = req.params;
//     const body = req.body

//     const foundUser = await usersService.updateUser(id, body, next);
//     const users = await usersService.findAll();

//     res.status(302).json({
//       updatedUser: foundUser,
//       users
//     })
//   }
//   catch(e){
//     next(e)
//   }
// }

// async function deleteUser(req, res, next){
//   try{
//     const { id } = req.params;

//     const foundUser = await usersService.deleteUser(id, next);
//     const users = await usersService.findAll();

//     res.status(302).json({
//       deletedUser: foundUser,
//       users
//     })
//   }
//   catch(e){
//     next(e)
//   }
// }


module.exports = customerRouter;
