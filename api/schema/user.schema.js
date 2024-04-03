const joi = require('joi');

const regexPasswordRule = RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)

const id = joi.string().uuid();
const name = joi.string().min(5).max(20);
const email = joi.string().email();
const password = joi.string().regex(regexPasswordRule);
const role = joi.number().integer().min(0).max(3);
const isActive = joi.boolean();

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
})

const updateUserSchema = joi.object({
  name: name,
  email: email,
  password: password,
  role: role,
  isActive: isActive,
})

const getUserSchema = joi.object({
  id: id.required(),
})


module.exports = { createUserSchema, updateUserSchema, getUserSchema }
