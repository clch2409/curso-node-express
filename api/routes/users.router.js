const express = require('express');

const userRouter = express.Router();
const boom = require('@hapi/boom')
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schema/user.schema')
const usersService = require('./../services/users.service')

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


async function findAll(req, res, next){
  try{
    const users = await usersService.findAll();

    if (users.length == 0){
      new Error('No hay usuarios registrados');
    }

    res.status(200).json(users);
  }
  catch(e){
    next(e)
  }
}

async function createUser(req, res, next){
  try{
    const body = req.body;

    const newUser = await usersService.createUser(body);
    const users = await usersService.findAll()

    res.status(201).json({
      newUser,
      users
    })
  }
  catch(e){
    next(e)
  }
}

async function getUserById(req, res, next){
  try{
    const { id } = req.params;

    const foundUser = await usersService.getUserById(id);
    if(!foundUser){
      new boom.badRequest('El id del usuario no existe')
    }

    res.status(302).json({
      foundUser,
    })
  }
  catch(e){
    next(e)
  }
}

async function updateUser(req, res, next){
  try{
    const { id } = req.params;
    const body = req.body

    const foundUser = await usersService.updateUser(id, body);
    const users = await usersService.findAll();
    if(!foundUser){
      new boom.badRequest('El id del usuario no existe')
    }

    res.status(302).json({
      updatedUser: foundUser,
      users
    })
  }
  catch(e){
    next(e)
  }
}

async function deleteUser(req, res, next){
  try{
    const { id } = req.params;

    const foundUser = await usersService.deleteUser(id);
    const users = await usersService.findAll();
    if(!foundUser){
      new boom.badRequest('El id del usuario no existe')
    }

    res.status(302).json({
      deletedUser: foundUser,
      users
    })
  }
  catch(e){
    next(e)
  }
}


module.exports = userRouter;

