const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const price = joi.number().min(10).max(1000);
const stock = joi.number().min(1).max(50);
const image = joi.string().min(1).max(1000);
const isVisible = joi.bool();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  stock: stock.required(),
  image: image.required(),
})

const updateProductSchema = joi.object({
  name: name,
  price: price,
  stock: stock,
  image: image,
  isVisible: isVisible,
})

const getProductSchema = joi.object({
  id: id.required()
})

module.exports = {createProductSchema, updateProductSchema, getProductSchema}
