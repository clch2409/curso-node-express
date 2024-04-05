const express = require('express');
const productsRouter = express.Router();

const ProductsService = require('../services/products.service');
const boom = require('@hapi/boom');
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schema/product.schema')

productsRouter.get('', findAll);

productsRouter.post('',
  validatorHandler(createProductSchema, 'body'),
  createProduct)

productsRouter.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  findById)

productsRouter.put('/:id',
  validatorHandler(updateProductSchema, 'body'),
  updateProduct)

// productsRouter.patch('/:id',
//   validatorHandler(updateProductSchema, 'body'),
//   updateProduct)

productsRouter.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  deleteProduct)

async function findAll (req, res) {
  const products = await ProductsService.findAll();
  res.json(products);
}

async function createProduct(req, res){
  const body = req.body;
  await ProductsService.createProduct(body)

  const products = await ProductsService.findAll();

  res.status(201).json({
    message: 'created',
    data: body,
    products: products
  });
}

async function findById(req, res, next){
  try{
    const products = await ProductsService.findAll()
    const { id } = req.params;
    const encontrado = await ProductsService.findById(id)

    if (!products.length){
      throw new boom.notFound('No contamos con productos disponibles');
    }
    else if (!encontrado){
      throw new boom.notFound('El producto no existe');
    }
    else if (!encontrado.isVisible){
      throw new boom.unauthorized('No tiene permitido ver este producto');
    }
    else{
      res.status(302).json(encontrado)
    }
  }
  catch(error){
    next(error);
  }
}

async function updateProduct(req, res, next){
  try{
    let products = await ProductsService.findAll();
    const {id} = req.params;
    const sentProduct = req.body;

    const productUpdated = await ProductsService.updateProduct(id, sentProduct);

    if (productUpdated){
      products = await ProductsService.findAll()
      res.json({
        message: 'Producto Actualizado',
        data: productUpdated,
        products: products
      })
    }
    else{
      throw new boom.notFound('El producto no existe');
    }
  }
  catch(e){
    next(e);
  }
}

async function deleteProduct(req, res, next){
  let products = await ProductsService.findAll();
  const {id} = req.params;

  const deletedProduct = await ProductsService.deleteProduct(id);

  try{
    if (deletedProduct){
      products = await ProductsService.findAll()
      res.json({
        message: 'Producto Eliminado',
        data: deletedProduct,
        products: products
      })
    }
    else{
      throw new boom.notFound('Producto no encontrado');
    }
  }
  catch(e){
    next(e);
  }
}


module.exports = productsRouter;

