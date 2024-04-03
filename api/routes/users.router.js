const express = require('express');

const userRouter = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schema/user.schema')

userRouter.get('', findAll);

userRouter.post('',
  validatorHandler(createUserSchema, 'body'),
  createUser);

userRouter.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  getUserById);

userRouter.put('/:id',
  validatorHandler(updateUserSchema, 'body'),
  updateUser);

userRouter.patch('/:id',
  validatorHandler(updateUserSchema, 'body'),
  updateUser);

userRouter.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  deleteUser);


module.exports = userRouter;

