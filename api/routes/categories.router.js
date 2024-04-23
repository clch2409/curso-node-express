const express = require('express');
const boom = require('@hapi/boom')
const categoriesRouter = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, getCategorySchema, updateCategorySchema } = require('./../schema/category.schema');
const { checkRoles } = require('./../middlewares/auth.handler')
const categoriesService = require('./../services/categories.service');
const passport = require('passport');

categoriesRouter.get('', findAll);

categoriesRouter.post('',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validatorHandler(createCategorySchema, 'body'),
  createCategory);

categoriesRouter.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validatorHandler(getCategorySchema, 'params'),
  findById);

categoriesRouter.put('/:id',
  validatorHandler(updateCategorySchema, 'body'),
  updateCategory);

// categoriesRouter.patch('/:id',
//   validatorHandler(updateCategorySchema, 'body'),
//   updateCategory);

categoriesRouter.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  deleteCategory);

async function findAll(req, res, next){
  res.json(await categoriesService.findAll())
}

async function createCategory(req, res, next){
  try{
    let categories = []

    const newCategory = await categoriesService.createCategory(req.body);

    categories = await categoriesService.findAll();

    res.status(201).json({
      newCategory: newCategory,
      categories: categories
    })
  }
  catch(e){
    next(e)
  }
}

async function findById(req, res, next){
  try{
    const categoryId = req.params.id;
    const foundCategory = await categoriesService.findCategoryById(categoryId);

    if (!foundCategory){
      throw new boom.badRequest('El id de la categoría no existe');
    }
    // else if(!foundCategory.isActive){
    //   throw new boom.unauthorized('La categoría está desactivada')
    // }

    res.status(302).json({
      foundCategory: foundCategory
    })
  }
  catch(e){
    next(e)
  }
}

async function updateCategory(req, res, next){
  try{
    const {id} = req.params;
    const body = req.body;

    const updatedCategory = await categoriesService.updateCategory(id, body);
    const categories = await categoriesService.findAll();

    if (!updatedCategory){
      throw new boom.badRequest('El id de la categoría no existe');
    }

    res.status(202).json({
      updatedCategory: updatedCategory,
      categories: categories
    })
  }
  catch(e){
    next(e)
  }
}

async function deleteCategory(req, res, next){
  try{
    const {id} = req.params
    const deletedCategory = await categoriesService.deleteCategory(id);
    const categories = await categoriesService.findAll();

    if (!deletedCategory){
      throw new boom.badRequest('El id de la categoria no existe');
    }

    res.status(200).json({
      deletedCategory: deletedCategory,
      categories: categories
    })
  }
  catch(e){
    next(e);
  }
}


module.exports = categoriesRouter;
