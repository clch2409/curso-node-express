const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(5).max(20);
const isActive = joi.boolean();

const createCategorySchema = joi.object({
  name: name.required(),
  isActive: isActive,
});

const updateCategorySchema = joi.object({
  name: name,
  isActive: isActive,
});

const getCategorySchema = joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
