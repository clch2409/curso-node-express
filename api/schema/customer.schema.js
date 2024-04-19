const joi = require('joi');
const { createUserSchema } = require('../schema/user.schema')

const id = joi.number().integer();
const name = joi.string();
const lastName = joi.string();
const phone = joi.string().min(5).max(9);
// const idUser = joi.number().integer();


const getCustomerSchema = joi.object({
  id: id.required(),
});

const createCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema.required()
});

const updateCustomerSchema = joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema }


