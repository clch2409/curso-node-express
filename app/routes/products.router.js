const express = require('express');
const {createProducts} = require('../utils')
const productsRouter = express.Router();

let products = [];

productsRouter.get('', (req, res) => {
  const {size} = req.query;
  const limit = size || 10;
  products = products.length && products.length === limit ? products : createProducts(limit);
  res.json(products);
});

productsRouter.post('', (req, res) =>{
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  });
})

productsRouter.get('/:id', (req, res) =>{//! Los parametros se especifican en la ruta y los podemos obtener en los parámetros
  const { id } = req.params;
  const identificador = parseInt(id);
  const encontrado = products.find(product => product.id === identificador)
  if (products.length === 0){
    res.send('No hay productos disponibles')
  }
  else if (!encontrado){
    res.send('Este producto no existe')
  }
  else{
    res.json(encontrado)
  }
})

module.exports = productsRouter;

