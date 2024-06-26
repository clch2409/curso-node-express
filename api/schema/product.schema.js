const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);
const description = joi.string().min(10).max(500);
const price = joi.number().min(10).max(1000);
const stock = joi.number().min(1).max(50);
const image = joi.string().uri();
const isVisible = joi.bool();
const categoryId = joi.number().integer();

const limit = joi.number().integer();
const offset = joi.number().integer();

const price_min = joi.number().integer();
const price_max = joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  image: image.required(),
  categoryId: categoryId.required()
})

const updateProductSchema = joi.object({
  name: name,
  description: description,
  price: price,
  stock: stock,
  image: image,
  isVisible: isVisible,
})

const getProductSchema = joi.object({
  id: id.required()
})

const querySchema = joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min',{
    is: joi.number().integer().required(),
    then: joi.required()
  })
})

module.exports = {createProductSchema, updateProductSchema, getProductSchema, querySchema}
