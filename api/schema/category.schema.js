const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(5).max(20);
const image = joi.string().uri();
// const isActive = joi.boolean();

const createCategorySchema = joi.object({
  name: name.required(),
  image: image.required(),
  // isActive: isActive,
});

const updateCategorySchema = joi.object({
  name: name,
  image: image,
  // isActive: isActive,
});

const getCategorySchema = joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
