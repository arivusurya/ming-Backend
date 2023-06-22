const Joi = require("joi");

const validation = {};

validation.addAdmin = Joi.object().keys({
  adminName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  image: Joi.string().required(),
  privilege: Joi.string().required(),
});

validation.addCategory = Joi.object().keys({
  name: Joi.string().required(),
  image: Joi.string().required(),
});

validation.addProduct = Joi.object().keys({
  categoryId: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  weight: Joi.number().required(),
  type: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports = validation;
