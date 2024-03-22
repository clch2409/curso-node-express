const express = require('express');
const {createProducts} = require('/app/utils/utils')

const router = express.Router();

const products = createProducts(10);

router.get('/categories/:id/products', (req, res) =>{
  const { id } = req.params;
  res.json(products.filter(product => product.category.id == id))
})
